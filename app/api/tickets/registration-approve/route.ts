import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendApprovalCredentialsMail } from "@/lib/mailer";

/**
 * Generate random temporary password
 */
function generateTempPassword() {
  return crypto.randomBytes(6).toString("hex"); // 12 chars
}

export async function PATCH(req: NextRequest) {
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "ticketId is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch ticket + registration
    const ticket = await prisma.tickets.findUnique({
      where: { ticketId },
    });

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: "Ticket not found" },
        { status: 404 }
      );
    }

    if (ticket.status === "APPROVED") {
      return NextResponse.json(
        { success: false, message: "Ticket already approved" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findFirst({
      where: { ticketId: ticket.ticketId },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Generate credentials
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    let email = "";
    let name = "";

    await prisma.$transaction(async (tx) => {
      // 3️⃣ Update ticket
      await tx.tickets.update({
        where: { ticketId },
        data: {
          status: "APPROVED",
          updatedAt: new Date(),
        },
      });

      // 4️⃣ Update registration
      await tx.registration.update({
        where: { id: registration.id },
        data: { status: "APPROVED" },
      });

      // 5️⃣ Handle Organization
      if (registration.type === "Organization") {
        const org = await tx.orgsRegistered.update({
          where: { registrationId: registration.id },
          data: { status: "APPROVED" },
        });

        email = org.email;
        name = org.name;

        // Create user account
        await tx.authUser.create({
          data: {
            email,
            passwordHash: hashedPassword,
            isEmailVerified: false,
            isActive: true,
            registration: { connect: { id: registration.id } },
          },
        });
      }

      // 6️⃣ Handle Scholars (MEDICAL or RESEARCHER)
      if (registration.type === "MEDICAL" || registration.type === "RESEARCHER") {
        const scholar =
          registration.type === "MEDICAL"
            ? await tx.medicalProfessional.update({
                where: { registrationId: registration.id },
                data: { status: "APPROVED" },
              })
            : await tx.researchers.update({
                where: { registrationId: registration.id },
                data: { status: "APPROVED" },
              });

        email = scholar.email;
        name = scholar.name;

        // Create user account
        await tx.authUser.create({
          data: {
            email,
            passwordHash: hashedPassword,
            isEmailVerified: false,
            isActive: true,
            registration: { connect: { id: registration.id } },
          },
        });
      }
    });

    // 7️⃣ Send credentials mail
    await sendApprovalCredentialsMail({
      to: email,
      name,
      username: email,
      password: tempPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Registration approved and credentials sent successfully",
    });
  } catch (error) {
    console.error("Registration approval error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to approve registration" },
      { status: 500 }
    );
  }
}
