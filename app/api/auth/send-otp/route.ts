import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// ✅ Initialize SNS
const sns = new SNSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Generate 4 digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Hash OTP
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

    // 🔥 Clean input (remove spaces)
    const cleanedMobile = mobile.replace(/\s+/g, "");

    // ✅ Normalize for DB lookup (store without +91)
    let dbMobile = cleanedMobile;

    if (cleanedMobile.startsWith("+91")) {
      dbMobile = cleanedMobile.slice(3);
    } else if (cleanedMobile.startsWith("91") && cleanedMobile.length === 12) {
      dbMobile = cleanedMobile.slice(2);
    }

    // ✅ Check DB
    const medical = await prisma.medicalProfessional.findUnique({
      where: { mobile: dbMobile },
    });

    const researcher = await prisma.researchers.findUnique({
      where: { mobile: dbMobile },
    });

    const org = await prisma.orgsRegistered.findUnique({
      where: { number: dbMobile },
    });

    if (!medical && !researcher && !org) {
      return NextResponse.json(
        { success: false, message: "Mobile not registered" },
        { status: 404 }
      );
    }

    // ✅ Generate OTP
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.create({
      data: {
        mobile: dbMobile,
        otpHash,
        expiresAt,
      },
    });

    // 🔥 FORCE correct Indian format for SNS
    const formattedNumber = `+91${dbMobile}`;

    console.log("Sending SMS to:", formattedNumber);

    // ✅ Send SMS
    await sns.send(
      new PublishCommand({
        Message: `Your NationCite OTP is ${otp}. It expires in 5 minutes.`,
        PhoneNumber: formattedNumber,
      })
    );

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("SNS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}