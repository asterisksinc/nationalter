import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationMail, sendAdminRegistrationAlert } from "@/lib/mailer";
import { Prisma } from "@prisma/client";
import { createAdminNotification } from "@/lib/notifications";

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
  const value = String(domain ?? "").trim();
  if (!value) return false;
  return /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(
    value,
  );
}

/**
 * Generate temporary NationCite ID
 * Example: REG20260129AB12
 */
function generateTempNationciteId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REG${date}${rand}`;
}

/**
 * Generate Ticket ID
 * Example: TCK-20260129-0001
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
      name,
      domain,
      email,
      number,
      letterOfAuthorizationUrl,
      accreditationProofUrl,
      city,
      state,
    } = body;

    const fieldErrors: Record<string, string> = {};
    if (!name) fieldErrors.name = "Organization name is required";
    if (!domain) fieldErrors.domain = "Domain is required";
    if (!email) fieldErrors.email = "Email is required";
    if (!number) fieldErrors.number = "Mobile number is required";
    if (!city) fieldErrors.city = "City is required";
    if (!state) fieldErrors.state = "State is required";
    if (!letterOfAuthorizationUrl) {
      fieldErrors.letterOfAuthorizationUrl = "Letter of authorization is required";
    }
    if (!accreditationProofUrl) {
      fieldErrors.accreditationProofUrl = "Accreditation proof is required";
    }

    if (name && name.trim().length < 3) {
      fieldErrors.name = "Organization name must be at least 3 characters";
    }
    if (domain && !isValidDomain(domain)) {
      fieldErrors.domain = "Enter a valid domain (e.g. university.edu.in)";
    }
    if (email && !isValidEmail(email)) {
      fieldErrors.email = "Enter a valid email";
    }
    if (number && !isValidMobile(number)) {
      fieldErrors.number = "Enter a valid mobile number";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Please fix the highlighted fields", fieldErrors },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).trim();
    const normalizedNumber = normalizeMobileDigits(number);
    const normalizedDomain = String(domain).trim();

    const tempNationciteId = generateTempNationciteId();
    const ticketId = await generateTicketId();

    // 🧠 Atomic DB transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Ticket
      const ticket = await tx.tickets.create({
        data: {
          ticketId,
          nationciteId: tempNationciteId,
          name,
          type: "ORG",
          issueType: "NEW_REGISTRATION",
          description: "New organization registration request",
          status: "PENDING",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 2️⃣ Registration
      const registration = await tx.registration.create({
        data: {
          nationciteId: tempNationciteId,
          type: "ORG",
          ticketId: ticket.ticketId,
        },
      });

      // 3️⃣ Org record
      const orgRegistered = await tx.orgsRegistered.create({
        data: {
          nationciteId: tempNationciteId,
          name,
          domain: normalizedDomain,
          email: normalizedEmail,
          number: normalizedNumber,
          letterOfAuthorizationUrl,
          accreditationProofUrl,
          status: "PENDING",
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

      return {
        ticketId: ticket.ticketId,
        nationciteId: tempNationciteId,
        registrationId: registration.id,
        orgId: orgRegistered.id,
      };
    });

    // Send registration mail to user (non-blocking)
    try {
      await sendRegistrationMail({
        to: normalizedEmail,
        name,
        ticketId: result.ticketId,
        type: "ORG",
      });
    } catch (mailError) {
      console.error("Organization registration mail failed:", mailError);
    }

    // Send notification to admin (non-blocking)
    try {
      await sendAdminRegistrationAlert({
        name,
        email: normalizedEmail,
        type: "ORG",
        ticketId: result.ticketId,
        nationciteId: result.nationciteId,
      });
    } catch (adminMailError) {
      console.error("Admin notification mail failed:", adminMailError);
    }

    // Notify admin about new org registration
    createAdminNotification({
      type: "REGISTRATION_REQUEST",
      title: "New Organization Registration",
      message: `${name} (${normalizedEmail}) submitted an organization registration request`,
      redirectUrl: "/admin-overview/registration-requests",
      referenceId: result.ticketId,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Organization registration submitted successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targets = (error.meta?.target as string[]) ?? [];
      const fieldErrors: Record<string, string> = {};
      if (targets.includes("number")) {
        fieldErrors.number = "This mobile number is already registered";
      }
      if (targets.includes("email")) {
        fieldErrors.email = "This email is already registered";
      }
      if (targets.includes("domain")) {
        fieldErrors.domain = "This domain is already registered";
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

    console.error("Organization registration error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
