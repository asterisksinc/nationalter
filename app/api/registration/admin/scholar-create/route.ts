import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { requireAdmin } from "@/lib/auth";
import { sendApprovalCredentialsMail } from "@/lib/mailer";
import { Prisma } from "@prisma/client";

///////////////////////////////////////////////////////////
// HELPERS
///////////////////////////////////////////////////////////

function generateTempPassword() {
  return crypto.randomBytes(6).toString("hex");
}

function normalizeMobile(input: string) {
  return input.replace(/\D/g, "");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    const fieldErrors: Record<string, string> = {};

    if (!name) fieldErrors.name = "Name is required";
    if (!email) fieldErrors.email = "Email is required";
    if (email && !isValidEmail(email)) fieldErrors.email = "Invalid email";
    if (!mobile) fieldErrors.mobile = "Mobile is required";
    if (!city) fieldErrors.city = "City is required";
    if (!state) fieldErrors.state = "State is required";

    if (type === "MEDICAL") {
      if (!medCouncilRegNo) fieldErrors.medCouncilRegNo = "Medical council registration number is required";
      if (!stateCouncil) fieldErrors.stateCouncil = "State council is required";
      if (!primaryHospital) fieldErrors.primaryHospital = "Primary hospital is required";
      if (!specialty) fieldErrors.specialty = "Specialty is required";
      if (!researchFocus) fieldErrors.researchFocus = "Research focus is required";
    }

    if (type === "RESEARCHER") {
      if (!institute) fieldErrors.institute = "Institute is required";
      if (!instituteEmail) fieldErrors.instituteEmail = "Institute email is required";
      if (!orcidId) fieldErrors.orcidId = "ORCID ID is required";
      if (!googleScholarUrl) fieldErrors.googleScholarUrl = "Google Scholar URL is required";
      if (!primaryDomain) fieldErrors.primaryDomain = "Primary domain is required";
      if (!profilePhotoUrl) fieldErrors.profilePhotoUrl = "Profile photo URL is required";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          fieldErrors,
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

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedMobile = normalizeMobile(mobile);

    const existingAuthUser = await prisma.authUser.findUnique({
      where: {
        email: normalizedEmail,
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

    ///////////////////////////////////////////////////////////
    // DB TRANSACTION
    ///////////////////////////////////////////////////////////

    await prisma.$transaction(async (tx) => {
      ///////////////////////////////////////
      // CREATE REGISTRATION
      ///////////////////////////////////////

      const registration = await tx.registration.create({
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
            registration: { connect: { id: registration.id } },
            nationciteId,
            name,
            email: normalizedEmail,
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
            registration: { connect: { id: registration.id } },
            nationciteId,
            name,
            email: normalizedEmail,
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
          email: normalizedEmail,
          passwordHash,
          role: "SCHOLAR",
          isEmailVerified: true,
          isActive: true,
          registration: {
            connect: {
              id: registration.id,
            },
          },
        },
      });
    });

    ///////////////////////////////////////////////////////////
    // SEND EMAIL
    ///////////////////////////////////////////////////////////

    try {
      await sendApprovalCredentialsMail({
        to: normalizedEmail,
        name,
        username: normalizedEmail,
        password: tempPassword,
      });
    } catch (err) {
      console.error("Mail send failed:", err);
    }

    ///////////////////////////////////////////////////////////
    // RESPONSE
    ///////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: true,
        message: "Scholar created successfully",

        data: {
          nationciteId,
          email: normalizedEmail,
          tempPassword,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targets = error.meta?.target as string[] | undefined;
      const fieldErrors: Record<string, string> = {};

      if (targets?.includes("email")) fieldErrors.email = "Email already exists";
      if (targets?.includes("mobile")) fieldErrors.mobile = "Mobile already exists";
      if (targets?.includes("nationciteId")) fieldErrors.nationciteId = "NationCite ID already exists";

      return NextResponse.json(
        {
          success: false,
          message: "Duplicate fields",
          fieldErrors,
        },
        { status: 409 }
      );
    }

    console.error("Admin scholar create error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create scholar",
      },
      { status: 500 }
    );
  }
}
