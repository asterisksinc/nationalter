import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  try {
    // Authenticate user
    const payload = requireAuth(req);
    const authUserId = payload.userId;

    // Fetch auth user to get registration
    const authUser = await prisma.authUser.findUnique({
      where: { id: authUserId },
      include: {
        registration: true,
      },
    });

    if (!authUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Use transaction to delete all related data
    await prisma.$transaction(async (tx) => {
      const nationciteId = authUser.registration?.nationciteId;
      const registrationId = authUser.registration?.id;

      // Delete ticket comments for user's tickets
      if (nationciteId) {
        const userTickets = await tx.tickets.findMany({
          where: { nationciteId },
          select: { ticketId: true },
        });

        const ticketIds = userTickets.map((t) => t.ticketId);

        if (ticketIds.length > 0) {
          await tx.ticketComments.deleteMany({
            where: { ticketId: { in: ticketIds } },
          });

          // Delete tickets
          await tx.tickets.deleteMany({
            where: { nationciteId },
          });
        }

        // Delete publications
        await tx.publication.deleteMany({
          where: { nationciteId },
        });
      }

      // Delete profile records based on type
      if (registrationId) {
        // Delete researcher profile if exists
        await tx.researchers.deleteMany({
          where: { registrationId },
        });

        // Delete medical profile if exists
        await tx.medicalProfessional.deleteMany({
          where: { registrationId },
        });

        // Delete organization profile if exists
        await tx.orgsRegistered.deleteMany({
          where: { registrationId },
        });

        // Delete registration
        await tx.registration.delete({
          where: { id: registrationId },
        });
      }

      // Delete auth user
      await tx.authUser.delete({
        where: { id: authUserId },
      });
    });

    // Clear cookies in response
    const response = NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

    response.cookies.delete("nationciteId");
    response.cookies.delete("userRole");
    response.cookies.delete("registrationType");

    return response;
  } catch (error: any) {
    console.error("Delete account error:", error);

    if (error.message === "Unauthorized" || error.message === "Invalid or expired token") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to delete account" },
      { status: 500 }
    );
  }
}
