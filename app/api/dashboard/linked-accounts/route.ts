import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

////////////////////////////////////////////////////////////
// POST /api/profile/linked-accounts
// Add new linked account URL
////////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {

    //////////////////////////////////////////////////////
    // 1️⃣ Authenticate user
    //////////////////////////////////////////////////////
    const authUser = requireAuth(req);

    //////////////////////////////////////////////////////
    // 2️⃣ Parse body
    //////////////////////////////////////////////////////
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    //////////////////////////////////////////////////////
    // 3️⃣ Validate URL format
    //////////////////////////////////////////////////////
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid URL format" },
        { status: 400 }
      );
    }

    //////////////////////////////////////////////////////
    // 4️⃣ Get user's registration
    //////////////////////////////////////////////////////
    const registration = await prisma.registration.findUnique({
      where: { authUserId: authUser.userId },
      include: {
        medical: true,
        researcher: true,
        orgReg: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    //////////////////////////////////////////////////////
    // 5️⃣ Determine profile type
    //////////////////////////////////////////////////////
    let updatedProfile:
        | Awaited<ReturnType<typeof prisma.medicalProfessional.update>>
        | Awaited<ReturnType<typeof prisma.researchers.update>>
        | Awaited<ReturnType<typeof prisma.orgsRegistered.update>>
        | null = null;


    //////////////////////////////////////
    // MedicalProfessional
    //////////////////////////////////////
    if (registration.medical) {

      if (registration.medical.linkedAccounts.includes(url)) {
        return NextResponse.json(
          { success: false, message: "URL already added" },
          { status: 400 }
        );
      }

      updatedProfile = await prisma.medicalProfessional.update({
        where: { id: registration.medical.id },
        data: {
          linkedAccounts: {
            push: url,
          },
        },
      });

    }

    //////////////////////////////////////
    // Researchers
    //////////////////////////////////////
    else if (registration.researcher) {

      if (registration.researcher.linkedAccounts.includes(url)) {
        return NextResponse.json(
          { success: false, message: "URL already added" },
          { status: 400 }
        );
      }

      updatedProfile = await prisma.researchers.update({
        where: { id: registration.researcher.id },
        data: {
          linkedAccounts: {
            push: url,
          },
        },
      });

    }

    //////////////////////////////////////
    // OrgsRegistered
    //////////////////////////////////////
    else if (registration.orgReg) {

      if (registration.orgReg.linkedAccounts.includes(url)) {
        return NextResponse.json(
          { success: false, message: "URL already added" },
          { status: 400 }
        );
      }

      updatedProfile = await prisma.orgsRegistered.update({
        where: { id: registration.orgReg.id },
        data: {
          linkedAccounts: {
            push: url,
          },
        },
      });

    }

    //////////////////////////////////////////////////////
    // 6️⃣ Safety check
    //////////////////////////////////////////////////////
    else {
      return NextResponse.json(
        { success: false, message: "No profile found" },
        { status: 404 }
      );
    }

    //////////////////////////////////////////////////////
    // 7️⃣ Return success
    //////////////////////////////////////////////////////
    return NextResponse.json({
      success: true,
      message: "Linked account added successfully",
      linkedAccounts: updatedProfile.linkedAccounts,
    });

  } catch (error) {

    console.error("LINKED_ACCOUNT_ADD_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );

  }
}
