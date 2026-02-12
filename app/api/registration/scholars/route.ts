import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationMail, sendAdminNotificationMail } from "@/lib/mailer";

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

    // 🔐 Basic validation
    if (!type || !name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["MEDICAL", "RESEARCHER"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid registration type" },
        { status: 400 }
      );
    }

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
            mobile,
            email,
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
            instituteEmail,
            orcidId,
            institutionalIdCardUrl: institutionalIdCardUrl || null,
            mobile,
            email,
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

    // Send registration mail to user (non-blocking)
    try {
      await sendRegistrationMail({
        to: email,
        name,
        ticketId: result.ticketId,
        type: "SCHOLAR",
      });
    } catch (mailError) {
      console.error("Registration mail failed:", mailError);
    }

    // Send notification to admin (non-blocking)
    try {
      await sendAdminNotificationMail({
        ticketId: result.ticketId,
        registrantName: name,
        registrationType: type,
        email,
      });
    } catch (adminMailError) {
      console.error("Admin notification mail failed:", adminMailError);
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
    console.error("Scholar registration error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
