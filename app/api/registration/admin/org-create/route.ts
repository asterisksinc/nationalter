import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { requireAdmin } from "@/lib/auth";
import { sendApprovalCredentialsMail } from "@/lib/mailer";
import { Prisma } from "@prisma/client";

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeMobileDigits(input: string) {
  return String(input ?? "").replace(/\D/g, "");
}

function isValidMobile(input: string) {
  const digits = normalizeMobileDigits(input);
  return digits.length >= 10 && digits.length <= 15;
}

function isValidDomain(domain: string) {
  return /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(
    domain
  );
}

function generateTempPassword() {
  return crypto.randomBytes(6).toString("hex");
}

//////////////////////////////////////////////////////
// POST /api/admin/org-create
//////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();

    const {
      nationciteId, // ✅ admin provided
      name,
      domain,
      email,
      number,
      city,
      state,
      letterOfAuthorizationUrl,
      accreditationProofUrl,
    } = body;

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    const fieldErrors: Record<string, string> = {};

    if (!nationciteId)
      fieldErrors.nationciteId = "NationCite ID is required";

    if (!name)
      fieldErrors.name = "Name is required";

    if (!domain)
      fieldErrors.domain = "Domain is required";

    if (!email)
      fieldErrors.email = "Email is required";

    if (!number)
      fieldErrors.number = "Mobile number is required";

    if (!city)
      fieldErrors.city = "City is required";

    if (!state)
      fieldErrors.state = "State is required";

    if (!letterOfAuthorizationUrl)
      fieldErrors.letterOfAuthorizationUrl =
        "Letter of authorization is required";

    if (!accreditationProofUrl)
      fieldErrors.accreditationProofUrl =
        "Accreditation proof is required";

    if (email && !isValidEmail(email))
      fieldErrors.email = "Invalid email";

    if (number && !isValidMobile(number))
      fieldErrors.number = "Invalid mobile number";

    if (domain && !isValidDomain(domain))
      fieldErrors.domain = "Invalid domain";

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

    const normalizedEmail = email.trim();
    const normalizedNumber = normalizeMobileDigits(number);
    const normalizedDomain = domain.trim();

    //////////////////////////////////////////////////////
    // GENERATE PASSWORD
    //////////////////////////////////////////////////////

    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    //////////////////////////////////////////////////////
    // TRANSACTION
    //////////////////////////////////////////////////////

    const result = await prisma.$transaction(async (tx) => {

      ////////////////////////////////////////////////////
      // Prevent duplicate NationCiteId
      ////////////////////////////////////////////////////

      const existingRegistration = await tx.registration.findFirst({
        where: { nationciteId },
      });

      if (existingRegistration) {
        throw new Error("NATIONCITE_EXISTS");
      }

      ////////////////////////////////////////////////////
      // 1. Create Registration
      ////////////////////////////////////////////////////

      const registration = await tx.registration.create({
        data: {
          nationciteId,
          type: "ORG",
          status: "APPROVED",
        },
      });

      ////////////////////////////////////////////////////
      // 2. Create Org
      ////////////////////////////////////////////////////

      const org = await tx.orgsRegistered.create({
        data: {
          nationciteId,
          name,
          domain: normalizedDomain,
          email: normalizedEmail,
          number: normalizedNumber,
          letterOfAuthorizationUrl,
          accreditationProofUrl,
          status: "APPROVED",
          plan: "FREE",
          city,
          state,
          registration: {
            connect: {
              id: registration.id,
            },
          },
        },
      });

      ////////////////////////////////////////////////////
      // 3. Create AuthUser
      ////////////////////////////////////////////////////

      const authUser = await tx.authUser.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: "ORG",
          isEmailVerified: true,
          isActive: true,
          registration: {
            connect: {
              id: registration.id,
            },
          },
        },
      });

      return {
        nationciteId,
        orgId: org.id,
        authUserId: authUser.id,
      };
    });

    //////////////////////////////////////////////////////
    // SEND EMAIL
    //////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////
    // SUCCESS RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: true,
        message: "Organization created successfully",
        data: result,
      },
      { status: 201 }
    );

  } catch (error: any) {

    //////////////////////////////////////////////////////
    // NationCite duplicate error
    //////////////////////////////////////////////////////

    if (error.message === "NATIONCITE_EXISTS") {
      return NextResponse.json(
        {
          success: false,
          message: "NationCite ID already exists",
        },
        { status: 409 }
      );
    }

    //////////////////////////////////////////////////////
    // Prisma unique constraint
    //////////////////////////////////////////////////////

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targets = error.meta?.target as string[];

      const fieldErrors: Record<string, string> = {};

      if (targets.includes("email"))
        fieldErrors.email = "Email already exists";

      if (targets.includes("number"))
        fieldErrors.number = "Mobile already exists";

      if (targets.includes("domain"))
        fieldErrors.domain = "Domain already exists";

      return NextResponse.json(
        {
          success: false,
          message: "Duplicate fields",
          fieldErrors,
        },
        { status: 409 }
      );
    }

    //////////////////////////////////////////////////////
    // General error
    //////////////////////////////////////////////////////

    console.error("Admin org create error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
