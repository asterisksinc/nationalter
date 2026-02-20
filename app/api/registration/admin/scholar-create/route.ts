import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { requireAdmin } from "@/lib/auth";
import { sendApprovalCredentialsMail } from "@/lib/mailer";

///////////////////////////////////////////////////////////
// HELPERS
///////////////////////////////////////////////////////////

function generateTempPassword() {
  return crypto.randomBytes(6).toString("hex");
}

function normalizeMobile(input: string) {
  return input.replace(/\D/g, "");
}

///////////////////////////////////////////////////////////
// POST /admin/scholar-create
///////////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    ///////////////////////////////////////////////////////////
    // REQUIRE ADMIN
    ///////////////////////////////////////////////////////////
    requireAdmin(req);

    const body = await req.json();

    ///////////////////////////////////////////////////////////
    // BODY FIELDS
    ///////////////////////////////////////////////////////////

    const {
      nationciteId, // ✅ ADMIN WILL PROVIDE THIS
      type, // MEDICAL | RESEARCHER

      name,
      email,
      mobile,
      city,
      state,

      // MEDICAL
      medCouncilRegNo,
      stateCouncil,
      primaryHospital,
      specialty,
      researchFocus,
      medicalDegreeUrl,
      regCertificateUrl,

      // RESEARCHER
      institute,
      instituteEmail,
      orcidId,
      institutionalIdCardUrl,
      googleScholarUrl,
      primaryDomain,
      profilePhotoUrl,
    } = body;

    ///////////////////////////////////////////////////////////
    // VALIDATION
    ///////////////////////////////////////////////////////////

    if (!nationciteId) {
      return NextResponse.json(
        {
          success: false,
          message: "nationciteId is required",
        },
        { status: 400 }
      );
    }

    if (!type || !["MEDICAL", "RESEARCHER"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid type",
        },
        { status: 400 }
      );
    }

    if (!name || !email || !mobile || !city || !state) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    ///////////////////////////////////////////////////////////
    // CHECK DUPLICATES
    ///////////////////////////////////////////////////////////

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        nationciteId,
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          message: "nationciteId already exists",
        },
        { status: 400 }
      );
    }

    const existingAuthUser = await prisma.authUser.findUnique({
      where: {
        email,
      },
    });

    if (existingAuthUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    ///////////////////////////////////////////////////////////
    // PASSWORD
    ///////////////////////////////////////////////////////////

    const tempPassword = generateTempPassword();

    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const normalizedMobile = normalizeMobile(mobile);

    ///////////////////////////////////////////////////////////
    // DB TRANSACTION
    ///////////////////////////////////////////////////////////

    await prisma.$transaction(async (tx) => {
      ///////////////////////////////////////
      // CREATE REGISTRATION
      ///////////////////////////////////////

      await tx.registration.create({
        data: {
          nationciteId,
          type,
          status: "APPROVED",
        },
      });

      ///////////////////////////////////////
      // CREATE PROFILE TABLE ENTRY
      ///////////////////////////////////////

      if (type === "MEDICAL") {
        await tx.medicalProfessional.create({
          data: {
            nationciteId,
            name,
            email,
            mobile: normalizedMobile,
            city,
            state,

            medCouncilRegNo,
            stateCouncil,
            primaryHospital,
            specialty,
            researchFocus,

            medicalDegreeUrl: medicalDegreeUrl || null,
            regCertificateUrl: regCertificateUrl || null,

            status: "APPROVED",
            plan: "FREE",
          },
        });
      }

      if (type === "RESEARCHER") {
        await tx.researchers.create({
          data: {
            nationciteId,
            name,
            email,
            mobile: normalizedMobile,
            city,
            state,

            institute,
            instituteEmail,
            orcidId,

            institutionalIdCardUrl:
              institutionalIdCardUrl || null,

            googleScholarUrl,
            primaryDomain,
            profilePhotoUrl,

            status: "APPROVED",
            plan: "FREE",
          },
        });
      }

      ///////////////////////////////////////
      // CREATE AUTH USER
      ///////////////////////////////////////

      await tx.authUser.create({
        data: {
          email,
          passwordHash,
          role: "SCHOLAR",
          isEmailVerified: true,
          isActive: true,
        },
      });
    });

    ///////////////////////////////////////////////////////////
    // SEND EMAIL
    ///////////////////////////////////////////////////////////

    await sendApprovalCredentialsMail({
      to: email,
      name,
      username: email,
      password: tempPassword,
    });

    ///////////////////////////////////////////////////////////
    // RESPONSE
    ///////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: true,
        message: "Scholar created successfully",

        data: {
          nationciteId,
          email,
          tempPassword,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin scholar create error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create scholar",
      },
      { status: 500 }
    );
  }
}
