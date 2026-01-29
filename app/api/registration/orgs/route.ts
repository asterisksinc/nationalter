import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const { ticket, registration, orgRegistered } =
      await prisma.$transaction(async (tx) => {
        // 1️⃣ Create Ticket
        const ticket = await tx.tickets.create({
          data: {
            ticketId,
            nationciteId: tempNationciteId,
            name,
            type: "Organization",
            issueType: "Registration Approval",
            description:
              "New organization registration awaiting admin approval",
            status: "Pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        // 2️⃣ Create Registration
        const registration = await tx.registration.create({
          data: {
            nationciteId: tempNationciteId,
            type: "Organization",
            ticketId: ticket.ticketId,
          },
        });

        // 3️⃣ Create OrgsRegistered
        const orgRegistered = await tx.orgsRegistered.create({
          data: {
            registrationId: registration.id,
            nationciteId: tempNationciteId,
            domain,
            name,
            email,
            number,
            letterOfAuthorizationUrl: letterOfAuthorizationUrl || "",
            accreditationProofUrl: accreditationProofUrl || "",
            status: "Pending",
            plan: "Free", // billing APIs will handle upgrades
          },
        });

        return { ticket, registration, orgRegistered };
      });

    return NextResponse.json(
      {
        success: true,
        message: "Organization registered successfully and ticket created",
        data: {
          registration: {
            id: registration.id,
            nationciteId: registration.nationciteId,
            type: registration.type,
            ticketId: registration.ticketId,
          },
          orgRegistered: {
            id: orgRegistered.id,
            registrationId: orgRegistered.registrationId,
            name: orgRegistered.name,
            domain: orgRegistered.domain,
            status: orgRegistered.status,
            plan: orgRegistered.plan,
          },
          ticket: {
            ticketId: ticket.ticketId,
            status: ticket.status,
          },
        },
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
