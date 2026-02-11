import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Find auth user
    const user = await prisma.authUser.findUnique({
      where: { email },
      include: {
        registration: true, 
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const role = user.role; 

    if (role !== "ADMIN" && !user.registration) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration not linked to user",
        },
        { status: 403 }
      );
    }

    // 4️⃣ Generate JWT
    const token = signJwt({
      userId: user.id,
      email: user.email,
      role,
      registrationId: user.registration?.id ?? null,
    });

    // 5️⃣ Update last login
    await prisma.authUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role,
          registrationId: user.registration?.id ?? null,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
