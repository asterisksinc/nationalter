import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendForgotPasswordMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Find user
    const user = await prisma.authUser.findUnique({
      where: { email },
    });

    // Don't reveal whether email exists (security best practice)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If this email exists, a reset password has been sent.",
      });
    }

    // 2️⃣ Generate random temporary password
    const tempPassword = crypto.randomBytes(6).toString("base64").slice(0, 10);

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // 4️⃣ Update DB
    await prisma.authUser.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
      },
    });

    // 5️⃣ Send email
    await sendForgotPasswordMail({
      to: user.email,
      name: user.email,
      password: tempPassword,
    });

    return NextResponse.json({
      success: true,
      message: "If this email exists, a reset password has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}
