import { NextRequest, NextResponse } from "next/server";
import { sendContactMail, sendAdminContactAlert } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, institution, inquiryType, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !institution || !inquiryType || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    await sendContactMail({
      to: email,
      name,
      inquiryType,
    });

    // Send notification email to admin
    await sendAdminContactAlert({
      name,
      email,
      phone,
      institution,
      inquiryType,
      message,
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}