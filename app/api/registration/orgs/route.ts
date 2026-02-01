import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationMail } from "@/lib/mailer";

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
    } = body;

    // 🔐 Validation
    if (!name || !domain || !email || !number) {
      return NextResponse.json(
        {
          success: false,
          message: "name, domain, email, and number are required",
        },
        { status: 400 }
      );
    }

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
          domain,
          email,
          number,
          letterOfAuthorizationUrl: letterOfAuthorizationUrl || null,
          accreditationProofUrl: accreditationProofUrl || null,
          status: "PENDING",
          plan: "FREE",
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

    // ✉️ Send registration mail (non-blocking)
    try {
      await sendRegistrationMail({
        to: email,
        name,
        ticketId: result.ticketId,
        type: "ORG",
      });
    } catch (mailError) {
      console.error("Organization registration mail failed:", mailError);
      // do not fail registration
    }

    return NextResponse.json(
      {
        success: true,
        message: "Organization registration submitted successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Organization registration error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
