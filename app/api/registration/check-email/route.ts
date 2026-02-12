import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/registration/check-email
 * Check if email is already registered
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Check in AuthUser (existing accounts)
    const existingUser = await prisma.authUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: "This email is already registered. Please sign in.",
      });
    }

    // Check in pending registrations (MedicalProfessional)
    const pendingMedical = await prisma.medicalProfessional.findFirst({
      where: { email, status: "PENDING" },
    });

    if (pendingMedical) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: "A registration with this email is pending approval.",
      });
    }

    // Check in pending registrations (Researchers)
    const pendingResearcher = await prisma.researchers.findFirst({
      where: { email, status: "PENDING" },
    });

    if (pendingResearcher) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: "A registration with this email is pending approval.",
      });
    }

    // Check in pending registrations (OrgsRegistered)
    const pendingOrg = await prisma.orgsRegistered.findFirst({
      where: { email, status: "PENDING" },
    });

    if (pendingOrg) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: "A registration with this email is pending approval.",
      });
    }

    return NextResponse.json({
      success: true,
      exists: false,
      message: "Email is available",
    });
  } catch (error) {
    console.error("Email check error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
