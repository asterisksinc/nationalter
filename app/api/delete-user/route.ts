import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function parseTargetUserId(req: NextRequest, authenticatedUserId: number) {
  const requestedUserId = req.nextUrl.searchParams.get("id");

  if (!requestedUserId) {
    return authenticatedUserId;
  }

  const parsedUserId = Number(requestedUserId);
  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new Error("Invalid user id");
  }

  return parsedUserId;
}

// DELETE /api/delete-user
export async function DELETE(req: NextRequest) {
  try {
    let authenticatedUser;

    try {
      authenticatedUser = requireAuth(req);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message || "Unauthorized" },
        { status: 401 },
      );
    }

    const targetUserId = parseTargetUserId(req, authenticatedUser.userId);
    const isSelfDelete = targetUserId === authenticatedUser.userId;

    if (!isSelfDelete && authenticatedUser.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    const targetUser = await prisma.authUser.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        registration: {
          select: {
            id: true,
            nationciteId: true,
            medical: { select: { id: true } },
            researcher: { select: { id: true } },
            orgReg: { select: { id: true } },
          },
        },
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const registrationId = targetUser.registration?.id;
      const nationciteId = targetUser.registration?.nationciteId;

      // Remove records that reference the user's public identity so no orphan data remains.
      if (nationciteId) {
        const ownedTickets = await tx.tickets.findMany({
          where: { nationciteId },
          select: { ticketId: true },
        });

        const ticketIds = ownedTickets.map((ticket) => ticket.ticketId);

        if (ticketIds.length > 0) {
          // Delete comments first because they depend on ticket ids.
          await tx.ticketComments.deleteMany({
            where: { ticketId: { in: ticketIds } },
          });

          // Delete tickets after their comments are gone.
          await tx.tickets.deleteMany({
            where: { ticketId: { in: ticketIds } },
          });
        }

        // Delete publications tied to the same nationcite id.
        await tx.publication.deleteMany({
          where: { nationciteId },
        });
      }

      if (registrationId) {
        // Delete optional role-specific profile rows safely.
        await tx.researchers.deleteMany({
          where: { registrationId },
        });

        await tx.medicalProfessional.deleteMany({
          where: { registrationId },
        });

        await tx.orgsRegistered.deleteMany({
          where: { registrationId },
        });

        // Delete the registration after all dependent records are removed.
        await tx.registration.delete({
          where: { id: registrationId },
        });
      }

      // Delete the auth user last so the account is only removed after all related cleanup succeeds.
      await tx.authUser.delete({
        where: { id: targetUser.id },
      });
    });

    const response = NextResponse.json({
      success: true,
      message: isSelfDelete
        ? "Account deleted successfully"
        : "User deleted successfully",
    });

    if (isSelfDelete) {
      response.cookies.delete("nationciteId");
      response.cookies.delete("userRole");
      response.cookies.delete("registrationType");
    }

    return response;
  } catch (error: any) {
    console.error("Delete user error:", error);

    if (error.message === "Invalid or expired token") {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    if (error.message === "Invalid user id") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete user",
      },
      { status: 500 },
    );
  }
}
