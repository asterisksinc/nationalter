import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendApprovalCredentialsMail } from "@/lib/mailer";
import { requireAdmin } from "@/lib/auth";

/**
 * Generate random temporary password
 */
function generateTempPassword() {
  return crypto.randomBytes(6).toString("hex");
}

export async function PATCH(req: NextRequest) {
  try {
    requireAdmin(req);

    const { ticketId, nationciteId } = await req.json();

    if (!ticketId || !nationciteId) {
      return NextResponse.json(
        { success: false, message: "ticketId and nationciteId are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch ticket
    const ticket = await prisma.tickets.findUnique({ where: { ticketId } });
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

    // 2️⃣ Fetch registration
    const registration = await prisma.registration.findFirst({
      where: { ticketId },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Generate credentials
    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    let email = "";
    let name = "";
    let role: "ORG" | "SCHOLAR";

    await prisma.$transaction(async (tx) => {
      // 4️⃣ Update ticket
      await tx.tickets.update({
        where: { ticketId },
        data: {
          status: "APPROVED",
          nationciteId,
          updatedAt: new Date(),
        },
      });

      // 5️⃣ Update registration
      await tx.registration.update({
        where: { id: registration.id },
        data: {
          status: "APPROVED",
          nationciteId,
        },
      });

      // 6️⃣ Handle ORG
      if (registration.type === "ORG") {
        const org = await tx.orgsRegistered.update({
          where: { registrationId: registration.id },
          data: {
            status: "APPROVED",
            nationciteId,
          },
        });

        email = org.email;
        name = org.name;
        role = "ORG";
      }

      // 7️⃣ Handle SCHOLARS
      if (registration.type === "MEDICAL") {
        const med = await tx.medicalProfessional.update({
          where: { registrationId: registration.id },
          data: {
            status: "APPROVED",
            nationciteId,
          },
        });

        email = med.email;
        name = med.name;
        role = "SCHOLAR";
      }

      if (registration.type === "RESEARCHER") {
        const res = await tx.researchers.update({
          where: { registrationId: registration.id },
          data: {
            status: "APPROVED",
            nationciteId,
          },
        });

        email = res.email;
        name = res.name;
        role = "SCHOLAR";
      }

      // 8️⃣ Create Auth User
      await tx.authUser.create({
        data: {
          email,
          passwordHash,
          role,
          isEmailVerified: false,
          isActive: true,
          registration: { connect: { id: registration.id } },
        },
      });
    });

    // 9️⃣ Send credentials
    await sendApprovalCredentialsMail({
      to: email,
      name,
      username: email,
      password: tempPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Registration approved and NationCite ID mapped successfully",
    });
  } catch (error) {
    console.error("Registration approval error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to approve registration" },
      { status: 500 }
    );
  }
}
