import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

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
    const { mobile, loginType } = await req.json();

    if (!mobile) {
      return NextResponse.json(
        { success: false, message: "Mobile required" },
        { status: 400 }
      );
    }

    const dbMobile = normalizeMobile(mobile);

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

    if (loginType) {
      const isMedicalLogin = loginType === "Medical Professional";
      const isResearcherLogin = loginType === "Researcher";
      const isOrgLogin = loginType === "Institution/ Organisation";

      if (isMedicalLogin && !medical) {
        return NextResponse.json(
          { success: false, message: "This mobile is not registered as a medical professional" },
          { status: 403 }
        );
      }

      if (isResearcherLogin && !researcher) {
        return NextResponse.json(
          { success: false, message: "This mobile is not registered as a researcher" },
          { status: 403 }
        );
      }

      if (isOrgLogin && !org) {
        return NextResponse.json(
          { success: false, message: "This mobile is not registered as an organization" },
          { status: 403 }
        );
      }
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