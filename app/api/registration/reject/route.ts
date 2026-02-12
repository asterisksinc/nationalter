import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Send rejection notification email
 */
async function sendRejectionMail({
  to,
  name,
  ticketId,
  reason,
}: {
  to: string;
  name: string;
  ticketId: string;
  reason?: string;
}) {
  const subject = "NationCite | Registration Status Update";

  const body = `
Hello ${name},

We regret to inform you that your NationCite registration request (Ticket ID: ${ticketId}) could not be approved at this time.

${reason ? `Reason: ${reason}` : ""}

If you believe this was an error or would like more information, please contact our support team with your Ticket ID.

Warm regards,
NationCite Team
`;

  await transporter.sendMail({
    from: `"NationCite" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}

/**
 * PATCH /api/registration/reject
 * Reject a registration request
 */
export async function PATCH(req: NextRequest) {
  try {
    requireAdmin(req);

    const { ticketId, reason } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "ticketId is required" },
        { status: 400 }
      );
    }

    // Fetch the registration
    const registration = await prisma.registration.findFirst({
      where: { ticketId },
      include: {
        medical: true,
        researcher: true,
        orgReg: true,
        ticket: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    if (registration.status !== "PENDING") {
      return NextResponse.json(
        { success: false, message: "Registration already processed" },
        { status: 400 }
      );
    }

    // Get email and name for notification
    let email = "";
    let name = "";

    if (registration.type === "MEDICAL" && registration.medical) {
      email = registration.medical.email;
      name = registration.medical.name;
    } else if (registration.type === "RESEARCHER" && registration.researcher) {
      email = registration.researcher.email;
      name = registration.researcher.name;
    } else if (registration.type === "ORG" && registration.orgReg) {
      email = registration.orgReg.email;
      name = registration.orgReg.name;
    }

    // Update status in transaction
    await prisma.$transaction(async (tx) => {
      // Update ticket status
      if (registration.ticket) {
        await tx.tickets.update({
          where: { ticketId },
          data: {
            status: "REJECTED",
            updatedAt: new Date(),
          },
        });
      }

      // Update registration status
      await tx.registration.update({
        where: { id: registration.id },
        data: { status: "REJECTED" },
      });

      // Update type-specific table
      if (registration.type === "MEDICAL" && registration.medical) {
        await tx.medicalProfessional.update({
          where: { id: registration.medical.id },
          data: { status: "REJECTED" },
        });
      } else if (registration.type === "RESEARCHER" && registration.researcher) {
        await tx.researchers.update({
          where: { id: registration.researcher.id },
          data: { status: "REJECTED" },
        });
      } else if (registration.type === "ORG" && registration.orgReg) {
        await tx.orgsRegistered.update({
          where: { id: registration.orgReg.id },
          data: { status: "REJECTED" },
        });
      }
    });

    // Send rejection email (non-blocking)
    try {
      await sendRejectionMail({
        to: email,
        name,
        ticketId,
        reason,
      });
    } catch (mailError) {
      console.error("Rejection mail failed:", mailError);
    }

    return NextResponse.json({
      success: true,
      message: "Registration rejected successfully",
    });
  } catch (error) {
    console.error("Registration rejection error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
