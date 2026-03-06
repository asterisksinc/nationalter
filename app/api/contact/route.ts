import { NextRequest, NextResponse } from "next/server";
import { sendContactMail, sendAdminContactAlert } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { createAdminNotification } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, institution, inquiryType, message } = body;

    const nameValue = typeof name === "string" ? name.trim() : "";
    const phoneValue = typeof phone === "string" ? phone.trim() : "";
    const emailValue = typeof email === "string" ? email.trim() : "";
    const institutionValue = typeof institution === "string" ? institution.trim() : "";
    const inquiryTypeValue = typeof inquiryType === "string" ? inquiryType.trim() : "";
    const messageValue = typeof message === "string" ? message.trim() : "";

    // Validate required fields
    if (!nameValue || !phoneValue || !emailValue || !institutionValue || !inquiryTypeValue || !messageValue) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const contactEntry = await prisma.contactUs.create({
      data: {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        org: institutionValue,
        inquiryType: inquiryTypeValue,
        message: messageValue,
      },
    });

    await Promise.allSettled([
      sendContactMail({
        to: emailValue,
        name: nameValue,
        inquiryType: inquiryTypeValue,
      }),
      sendAdminContactAlert({
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        institution: institutionValue,
        inquiryType: inquiryTypeValue,
        message: messageValue,
      }),
      createAdminNotification({
        type: "CONTACT_QUERY",
        title: `New contact from ${nameValue}`,
        message: `${inquiryTypeValue} | ${emailValue} | ${phoneValue}`,
        redirectUrl: "/admin-overview/contact",
        referenceId: `CONTACT-${contactEntry.id}`,
      }),
    ]);

    return NextResponse.json(
      { message: "Contact form submitted successfully", data: { id: contactEntry.id } },
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