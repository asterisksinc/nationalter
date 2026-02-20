import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { LoginType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { email, password, loginType } = await req.json();
    console.log("[AUTH] Login attempt for:", email, "via:", loginType);

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find auth user
    const user = await prisma.authUser.findUnique({
      where: { email },
      include: {
        registration: true, 
      },
    });
    
    console.log("[AUTH] User found:", !!user, user ? { role: user.role, hasReg: !!user.registration } : null);

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const role = user.role; 
    const registrationType = user.registration?.type ?? null;

    // Validate login type matches user's actual registration type
    if (loginType) {
      const isOrgLogin = loginType === "Institution/ Organisation";
      const isResearcherLogin = loginType === "Researcher";
      const isMedicalLogin = loginType === "Medical Professional";
      
      if (isOrgLogin && registrationType !== "ORG") {
        return NextResponse.json(
          { success: false, message: "This account is not registered as an organization" },
          { status: 403 }
        );
      }
      if (isResearcherLogin && registrationType !== "RESEARCHER") {
        return NextResponse.json(
          { success: false, message: "This account is not registered as a researcher" },
          { status: 403 }
        );
      }
      if (isMedicalLogin && registrationType !== "MEDICAL") {
        return NextResponse.json(
          { success: false, message: "This account is not registered as a medical professional" },
          { status: 403 }
        );
      }
    }

    if (role !== "ADMIN" && !user.registration) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration not linked to user",
        },
        { status: 403 }
      );
    }

    // Generate JWT
    const token = signJwt({
      userId: user.id,
      email: user.email,
      role,
      registrationId: user.registration?.id ?? null,
    });

    // Update last login
    await prisma.authUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    let loginLogType: LoginType;

    if (role === "ADMIN") {
      loginLogType = LoginType.ADMIN;
    } else if (registrationType === "RESEARCHER") {
      loginLogType = LoginType.RESEARCHER;
    } else if (registrationType === "MEDICAL") {
      loginLogType = LoginType.MEDICAL_PROFESSIONAL;
    } else if (registrationType === "ORG") {
      loginLogType = LoginType.ORG;
    } else {
      throw new Error("Unknown login type");
    }

    // Create login log entry
    await prisma.loginLog.create({
      data: {
        nationciteId: user.registration?.nationciteId || `ADMIN-${user.id}`,
        loginType: loginLogType,
      },
    });

    // Set HTTP-only cookies for authentication
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role,
          registrationId: user.registration?.id ?? null,
          registrationType: user.registration?.type ?? null,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });

    // Set auth token in HTTP-only cookie (secure, not accessible via JS)
    response.cookies.set("nationciteId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set user role in regular cookie for middleware routing
    response.cookies.set("userRole", role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set registration type cookie for medical/researcher differentiation
    if (registrationType) {
      response.cookies.set("registrationType", registrationType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    console.log("[AUTH] Setting cookies:", { nationciteId: !!token, userRole: role, registrationType });
    console.log("[AUTH] Login successful for:", email, "Role:", role);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}