import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

////////////////////////////////////////////////
// POST /api/contact
////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, org, inquiryType, message } = body;

    //////////////////////////////////////////////////////
    // Validation
    //////////////////////////////////////////////////////
    if (!name || !email || !inquiryType || !message) {
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
        name,
        email,
        org,
        inquiryType,
        message,
      },
    });

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
