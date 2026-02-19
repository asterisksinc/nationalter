import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationMail, sendAdminRegistrationAlert } from "@/lib/mailer";
import { Prisma } from "@prisma/client";

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

function normalizeOrcid(input: string) {
  const trimmed = String(input ?? "").trim();
  if (!trimmed) return "";
  const withoutUrl = trimmed.replace(/^https?:\/\/orcid\.org\//i, "");
  return withoutUrl.replace(/\s+/g, "");
}

// ORCID ISO 7064 (MOD 11-2) check
function isValidOrcid(input: string) {
  const orcid = normalizeOrcid(input);
  if (!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i.test(orcid)) return false;

  const digits = orcid.replace(/-/g, "").toUpperCase();
  let total = 0;
  for (let i = 0; i < 15; i++) {
    total = (total + Number(digits[i])) * 2;
  }
  const remainder = total % 11;
  const result = (12 - remainder) % 11;
  const checkDigit = result === 10 ? "X" : String(result);
  return digits[15] === checkDigit;
}

function badRequest(message: string, fieldErrors?: Record<string, string>) {
  return NextResponse.json(
    { success: false, message, fieldErrors: fieldErrors ?? {} },
    { status: 400 },
  );
}

/**
 * Helper to generate temporary NationCite ID
 * Example: REG20250214AB12
 */
function generateTempNationciteId() {
  const date = new Date();
  const ymd = date
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REG${ymd}${rand}`;
}

/**
 * Helper to generate ticket ID
 * Example: TCK-20250214-0001
 */
async function generateTicketId() {
  const count = await prisma.tickets.count();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `TCK-${date}-${String(count + 1).padStart(4, "0")}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      type, // "MEDICAL" | "RESEARCHER"
      name,
      email,
      mobile,

      // Medical specific
      medCouncilRegNo,
      stateCouncil,
      primaryHospital,
      specialty,
      researchFocus,
      medicalDegreeUrl,
      regCertificateUrl,

      // Researcher specific
      institute,
      instituteEmail,
      orcidId,
      institutionalIdCardUrl,
      googleScholarUrl,
      primaryDomain,
      profilePhotoUrl,
    } = body;

    const fieldErrors: Record<string, string> = {};

    if (!type) fieldErrors.type = "Registration type is required";
    if (!name) fieldErrors.name = "Name is required";
    if (!email) fieldErrors.email = "Email is required";
    if (!mobile) fieldErrors.mobile = "Mobile number is required";

    if (email && !isValidEmail(email)) {
      fieldErrors.email = "Enter a valid email";
    }
    if (mobile && !isValidMobile(mobile)) {
      fieldErrors.mobile = "Enter a valid mobile number";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return badRequest("Please fix the highlighted fields", fieldErrors);
    }

    if (!["MEDICAL", "RESEARCHER"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid registration type" },
        { status: 400 }
      );
    }

    // Type-specific validation
    if (type === "RESEARCHER") {
      const rErrors: Record<string, string> = {};
      if (!institute) rErrors.institution = "Institution is required";
      if (!instituteEmail) rErrors.instituteEmail = "Institutional email is required";
      if (instituteEmail && !isValidEmail(instituteEmail)) {
        rErrors.instituteEmail = "Enter a valid institutional email";
      }
      if (!orcidId) rErrors.orcidId = "ORCID is required";
      if (orcidId && !isValidOrcid(orcidId)) {
        rErrors.orcidId = "Enter a valid ORCID (e.g. 0000-0002-1825-0097)";
      }
      if (!primaryDomain) rErrors.primaryDomain = "Primary domain is required";
      if (!googleScholarUrl) rErrors.googleScholarUrl = "Google Scholar URL is required";

      if (Object.keys(rErrors).length > 0) {
        return badRequest("Please fix the highlighted fields", rErrors);
      }
    }

    if (type === "MEDICAL") {
      const mErrors: Record<string, string> = {};
      if (!medCouncilRegNo) mErrors.medCouncilRegNo = "Registration number is required";
      if (!stateCouncil) mErrors.stateCouncil = "State council is required";
      if (!primaryHospital) mErrors.primaryHospital = "Primary hospital is required";
      if (!specialty) mErrors.specialty = "Specialty is required";
      if (!researchFocus) mErrors.researchFocus = "Research focus is required";

      if (Object.keys(mErrors).length > 0) {
        return badRequest("Please fix the highlighted fields", mErrors);
      }
    }

    const normalizedMobile = normalizeMobileDigits(mobile);
    const normalizedEmail = String(email).trim();
    const normalizedInstituteEmail = String(instituteEmail ?? "").trim();
    const normalizedOrcid = normalizeOrcid(orcidId);

    const tempNationciteId = generateTempNationciteId();
    const ticketId = await generateTicketId();

    // 🧠 DB transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Ticket
      const ticket = await tx.tickets.create({
        data: {
          ticketId,
          nationciteId: tempNationciteId,
          name,
          type,
          issueType: "NEW_REGISTRATION",
          description: "New scholar registration request",
          status: "PENDING",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 2️⃣ Registration
      const registration = await tx.registration.create({
        data: {
          nationciteId: tempNationciteId,
          type,
          ticketId: ticket.ticketId,
          authUserId: null, // ⚡ Required now, null until approval
          status: "PENDING",
        },
      });

      // 3️⃣ Type-specific tables
      if (type === "MEDICAL") {
        await tx.medicalProfessional.create({
          data: {
            nationciteId: tempNationciteId,
            name,
            medCouncilRegNo,
            stateCouncil,
            mobile: normalizedMobile,
            email: normalizedEmail,
            primaryHospital,
            specialty,
            researchFocus,
            medicalDegreeUrl: medicalDegreeUrl || null,
            regCertificateUrl: regCertificateUrl || null,
            status: "PENDING",
            plan: "FREE",
            registration: {
              connect: {
                id: registration.id,
              },
            },
          },
        });
      }

      if (type === "RESEARCHER") {
        await tx.researchers.create({
          data: {
            nationciteId: tempNationciteId,
            name,
            institute,
            instituteEmail: normalizedInstituteEmail,
            orcidId: normalizedOrcid,
            institutionalIdCardUrl: institutionalIdCardUrl || null,
            mobile: normalizedMobile,
            email: normalizedEmail,
            primaryDomain,
            googleScholarUrl,
            profilePhotoUrl,
            status: "PENDING",
            plan: "FREE",
            registration: {
              connect: {
                id: registration.id,
              },
            },
          },
        });
      }

      return {
        ticketId: ticket.ticketId,
        nationciteId: tempNationciteId,
        registrationId: registration.id,
      };
    });

    // ✉️ Send user + admin mails (non-blocking)
    try {
      await Promise.all([
        sendRegistrationMail({
          to: normalizedEmail,
          name,
          ticketId: result.ticketId,
          type: "SCHOLAR",
        }),
        sendAdminRegistrationAlert({
          name,
          email: normalizedEmail,
          type,
          ticketId: result.ticketId,
          nationciteId: result.nationciteId,
        }),
      ]);
    } catch (mailError) {
      console.error("Mail sending failed:", mailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    // Prisma common user-facing errors
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targets = (error.meta?.target as string[]) ?? [];
      const fieldErrors: Record<string, string> = {};

      if (targets.includes("mobile")) {
        fieldErrors.mobile = "This mobile number is already registered";
      }
      if (targets.includes("email")) {
        fieldErrors.email = "This email is already registered";
      }
      if (targets.includes("instituteEmail")) {
        fieldErrors.instituteEmail = "This email is already registered";
      }

      return NextResponse.json(
        {
          success: false,
          message: "Some details are already in use",
          fieldErrors,
        },
        { status: 409 },
      );
    }

    console.error("Scholar registration error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
