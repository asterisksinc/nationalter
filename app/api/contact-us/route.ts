import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAdminNotification } from "@/lib/notifications";

////////////////////////////////////////////////
// POST /api/contact-us
////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, org, institution, phone, inquiryType, message } = body;

    const nameValue = typeof name === "string" ? name.trim() : "";
    const emailValue = typeof email === "string" ? email.trim() : "";
    const orgValue =
      typeof org === "string"
        ? org.trim()
        : typeof institution === "string"
          ? institution.trim()
          : null;
    const phoneValue = typeof phone === "string" ? phone.trim() : null;
    const inquiryTypeValue = typeof inquiryType === "string" ? inquiryType.trim() : "";
    const messageValue = typeof message === "string" ? message.trim() : "";

    //////////////////////////////////////////////////////
    // Validation
    //////////////////////////////////////////////////////
    if (!nameValue || !emailValue || !inquiryTypeValue || !messageValue) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    //////////////////////////////////////////////////////
    // Create Entry
    //////////////////////////////////////////////////////
    const contactEntry = await prisma.contactUs.create({
      data: {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        org: orgValue,
        inquiryType: inquiryTypeValue,
        message: messageValue,
      },
    });

    createAdminNotification({
      type: "CONTACT_QUERY",
      title: `New contact from ${nameValue}`,
      message: `${inquiryTypeValue} | ${emailValue}${phoneValue ? ` | ${phoneValue}` : ""}`,
      redirectUrl: "/admin-overview/contact",
      referenceId: `CONTACT-${contactEntry.id}`,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully",
      data: contactEntry,
    });

  } catch (error) {
    console.error("CONTACT_SUBMIT_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
