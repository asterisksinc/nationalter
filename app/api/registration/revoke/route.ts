import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * POST /api/registration/revoke
 * Revoke an approved registration - deletes auth user and unlinks from public record
 */
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "ticketId is required" },
        { status: 400 }
      );
    }

    // Find the registration
    const registration = await prisma.registration.findFirst({
      where: { ticketId },
      include: {
        authUser: true,
        medical: true,
        researcher: true,
        orgReg: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    if (registration.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, message: "Only approved registrations can be revoked" },
        { status: 400 }
      );
    }

    const authUserIdToDelete = registration.authUserId;

    await prisma.$transaction(async (tx) => {
      // First: Update registration to disconnect authUser (removes FK constraint)
      await tx.registration.update({
        where: { id: registration.id },
        data: {
          status: "PENDING",
          authUserId: null,
          nationciteId: registration.nationciteId, // Keep temp ID
        },
      });

      // Now delete AuthUser after disconnection
      if (authUserIdToDelete) {
        await tx.authUser.delete({
          where: { id: authUserIdToDelete },
        });
      }

      // Update ticket status
      if (registration.ticketId) {
        await tx.tickets.update({
          where: { ticketId: registration.ticketId },
          data: {
            status: "PENDING",
            updatedAt: new Date(),
          },
        });
      }

      // Update type-specific table - clear nationciteId to allow re-linking
      if (registration.type === "MEDICAL" && registration.medical) {
        await tx.medicalProfessional.update({
          where: { id: registration.medical.id },
          data: { status: "PENDING", nationciteId: null },
        });
      }

      if (registration.type === "RESEARCHER" && registration.researcher) {
        await tx.researchers.update({
          where: { id: registration.researcher.id },
          data: { status: "PENDING", nationciteId: null },
        });
      }

      if (registration.type === "ORG" && registration.orgReg) {
        await tx.orgsRegistered.update({
          where: { id: registration.orgReg.id },
          data: { status: "PENDING", nationciteId: null },
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: "Registration revoked successfully. Account deleted and public record unlinked.",
    });
  } catch (error) {
    console.error("Registration revoke error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to revoke registration" },
      { status: 500 }
    );
  }
}
