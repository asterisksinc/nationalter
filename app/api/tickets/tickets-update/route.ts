import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireAuth } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    // Try to authenticate - if user is admin, they can do everything
    // If user is regular user, they can only add comments to their own tickets
    const payload = requireAuth(req);
    const isAdmin = payload.role === "ADMIN";
    
    const body = await req.json();

    const {
      ticketId,
      status,
      comment,
      attachments,
      nationciteId,
    } = body;

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "ticketId is required" },
        { status: 400 }
      );
    }

    // If non-admin user trying to update status/attachments/nationciteId, deny
    if (!isAdmin && (status || attachments || nationciteId)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Only admins can update ticket status" },
        { status: 403 }
      );
    }

    await prisma.$transaction(async (tx) => {
      const ticket = await tx.tickets.findUnique({
        where: { ticketId },
        include: { registration: true },
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      // Non-admin users can only comment on their own tickets
      if (!isAdmin && ticket.nationciteId !== payload.nationciteId) {
        throw new Error("Unauthorized: You can only comment on your own tickets");
      }

      // ✅ Update Ticket (only if admin)
      if (isAdmin) {
        await tx.tickets.update({
          where: { ticketId },
          data: {
            status: status ?? ticket.status,
            nationciteId: nationciteId ?? ticket.nationciteId,
            attachments: attachments ?? ticket.attachments, 
            updatedAt: new Date(),
          },
        });
      }

      // ✅ Add comment with admin marker
      if (comment) {
        const commentText = isAdmin ? `[ADMIN] ${comment}` : comment;
        await tx.ticketComments.create({
          data: {
            ticketId,
            comments: commentText,
            createdAt: new Date(),
          },
        });
      }

      // ✅ Update Registration if needed (only if admin)
      if (isAdmin && nationciteId && ticket.registration.length > 0) {
        const registration = ticket.registration[0];

        await tx.registration.update({
          where: { id: registration.id },
          data: { nationciteId },
        });
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Ticket updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Ticket update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
