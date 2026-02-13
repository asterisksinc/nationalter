import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { signJwt } from "@/lib/jwt";

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { mobile, otp } = await req.json();

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, message: "mobile and otp required" },
        { status: 400 }
      );
    }

    const otpHash = hashOtp(otp);

    // 1️⃣ find valid OTP
    const otpRecord = await prisma.otp.findFirst({
      where: {
        mobile,
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

    const medical = await prisma.medicalProfessional.findUnique({
      where: { mobile },
    });

    if (medical) {
      nationciteId = medical.nationciteId;
      role = "SCHOLAR";
    }

    const researcher = await prisma.researchers.findUnique({
      where: { mobile },
    });

    if (researcher) {
      nationciteId = researcher.nationciteId;
      role = "SCHOLAR";
    }

    const org = await prisma.orgsRegistered.findUnique({
      where: { number: mobile },
    });

    if (org) {
      nationciteId = org.nationciteId;
      role = "ORG";
    }

    if (!nationciteId) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 4️⃣ create JWT
    const token = signJwt({
      mobile,
      nationciteId,
      role,
    });

    // 5️⃣ return token
    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      data: {
        mobile,
        nationciteId,
        role,
      },
    });

  } catch (error) {
    console.error("OTP verify error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
