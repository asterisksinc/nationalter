import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// generate 4 digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// hash OTP
function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();

    if (!mobile) {
      return NextResponse.json(
        { success: false, message: "Mobile required" },
        { status: 400 }
      );
    }

    // check if mobile exists
    const medical = await prisma.medicalProfessional.findUnique({
      where: { mobile },
    });

    const researcher = await prisma.researchers.findUnique({
      where: { mobile },
    });

    const org = await prisma.orgsRegistered.findUnique({
      where: { number: mobile },
    });

    if (!medical && !researcher && !org) {
      return NextResponse.json(
        { success: false, message: "Mobile not registered" },
        { status: 404 }
      );
    }

    const otp = generateOtp();

    const otpHash = hashOtp(otp);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await prisma.otp.create({
      data: {
        mobile,
        otpHash,
        expiresAt,
      },
    });

    // TODO: integrate SMS provider here
    console.log("OTP:", otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
