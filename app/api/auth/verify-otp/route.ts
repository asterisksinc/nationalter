import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { signJwt } from "@/lib/jwt";
import { LoginType } from "@prisma/client";

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function normalizeMobile(input: string) {
  const cleanedMobile = String(input ?? "").replace(/\s+/g, "");

  if (cleanedMobile.startsWith("+91")) {
    return cleanedMobile.slice(3);
  }

  if (cleanedMobile.startsWith("91") && cleanedMobile.length === 12) {
    return cleanedMobile.slice(2);
  }

  return cleanedMobile.replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const { mobile, otp, loginType } = await req.json();

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, message: "mobile and otp required" },
        { status: 400 }
      );
    }

    const normalizedMobile = normalizeMobile(mobile);

    const otpHash = hashOtp(otp);

    // 1️⃣ find valid OTP
    const otpRecord = await prisma.otp.findFirst({
      where: {
        mobile: normalizedMobile,
        otpHash,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // 2️⃣ mark OTP used
    await prisma.otp.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // 3️⃣ find user type and nationciteId

    let nationciteId: string | null = null;
    let role: string | null = null;
    let registrationType: "MEDICAL" | "RESEARCHER" | "ORG" | null = null;
    let loginLogType: LoginType | null = null;

    const medical = await prisma.medicalProfessional.findUnique({
      where: { mobile: normalizedMobile },
    });

    if (medical) {
      nationciteId = medical.nationciteId;
      role = "SCHOLAR";
      registrationType = "MEDICAL";
      loginLogType = LoginType.MEDICAL_PROFESSIONAL;
    }

    const researcher = await prisma.researchers.findUnique({
      where: { mobile: normalizedMobile },
    });

    if (researcher) {
      nationciteId = researcher.nationciteId;
      role = "SCHOLAR";
      registrationType = "RESEARCHER";
      loginLogType = LoginType.RESEARCHER;
    }

    const org = await prisma.orgsRegistered.findUnique({
      where: { number: normalizedMobile },
    });

    if (org) {
      nationciteId = org.nationciteId;
      role = "ORG";
      registrationType = "ORG";
      loginLogType = LoginType.ORG;
    }

    if (loginType) {
      const isMedicalLogin = loginType === "Medical Professional";
      const isResearcherLogin = loginType === "Researcher";
      const isOrgLogin = loginType === "Institution/ Organisation";

      if (isMedicalLogin && registrationType !== "MEDICAL") {
        return NextResponse.json(
          { success: false, message: "This mobile is not registered as a medical professional" },
          { status: 403 }
        );
      }

      if (isResearcherLogin && registrationType !== "RESEARCHER") {
        return NextResponse.json(
          { success: false, message: "This mobile is not registered as a researcher" },
          { status: 403 }
        );
      }

      if (isOrgLogin && registrationType !== "ORG") {
        return NextResponse.json(
          { success: false, message: "This mobile is not registered as an organization" },
          { status: 403 }
        );
      }
    }

    if (!nationciteId || !role || !registrationType) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 4️⃣ create JWT
    const token = signJwt({
      mobile: normalizedMobile,
      nationciteId,
      role,
    });

    if (loginLogType) {
      await prisma.loginLog.create({
        data: {
          nationciteId,
          loginType: loginLogType,
        },
      });
    }

    // 5️⃣ return token + set cookies like normal login
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      data: {
        mobile: normalizedMobile,
        nationciteId,
        role,
        registrationType,
      },
    });

    response.cookies.set("nationciteId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set("userRole", role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    if (registrationType) {
      response.cookies.set("registrationType", registrationType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return response;

  } catch (error) {
    console.error("OTP verify error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
