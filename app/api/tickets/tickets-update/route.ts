import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createNotification, createAdminNotification } from "@/lib/notifications";

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

    const ticket = await prisma.tickets.findUnique({
      where: { ticketId },
      include: { registration: true },
    });

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: "Ticket not found" },
        { status: 404 }
      );
    }

    // Resolve nationciteId for non-admin users from JWT claim or linked registration
    let requesterNationciteId: string | null =
      (payload.nationciteId as string | undefined) ?? null;

    if (!isAdmin && !requesterNationciteId) {
      const registrationOr: Array<{ id?: number; authUserId?: number }> = [];
      const registrationId = Number(payload.registrationId);
      const userId = Number(payload.userId);

      if (Number.isFinite(registrationId) && registrationId > 0) {
        registrationOr.push({ id: registrationId });
      }
      if (Number.isFinite(userId) && userId > 0) {
        registrationOr.push({ authUserId: userId });
      }

      const registration = await prisma.registration.findFirst({
        where: registrationOr.length > 0 ? { OR: registrationOr } : undefined,
        select: {
          nationciteId: true,
        },
      });

      requesterNationciteId = registration?.nationciteId ?? null;
    }

    // Non-admin users can only comment on their own tickets
    if (!isAdmin && ticket.nationciteId !== requesterNationciteId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: You can only comment on your own tickets",
        },
        { status: 403 }
      );
    }

    await prisma.$transaction(async (tx) => {

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

    // Notify ticket owner when admin makes changes
    if (isAdmin && ticket.nationciteId) {
      const changes: string[] = [];
      if (status && status !== ticket.status) changes.push(`Status changed to ${status}`);
      if (comment) changes.push("Admin added a comment");

      if (changes.length > 0) {
        const notifType = (status === "RESOLVED" || status === "CLOSED")
          ? "TICKET_RESOLVED"
          : comment && !status
            ? "TICKET_COMMENT"
            : "TICKET_UPDATED";

        const regType = ticket.registration?.[0]?.type || "RESEARCHER";
        const dashboardBase =
          regType === "MEDICAL"
            ? "/dashboard/medical"
            : regType === "ORG"
              ? "/dashboard/organizations"
              : "/dashboard/researchers";

        createNotification({
          recipientId: ticket.nationciteId,
          type: notifType,
          title: notifType === "TICKET_RESOLVED"
            ? `Ticket ${ticketId} Resolved`
            : notifType === "TICKET_COMMENT"
              ? `New comment on ${ticketId}`
              : `Ticket ${ticketId} Updated`,
          message: changes.join(". "),
          redirectUrl: `${dashboardBase}/tickets/${ticketId}`,
          referenceId: ticketId,
        }).catch(() => { });
      }
    }

    // Notify admin when user adds comment
    if (!isAdmin && comment) {
      console.log(`[tickets-update] User ${requesterNationciteId} commented on ticket ${ticketId}, notifying admin`);
      createAdminNotification({
        type: "TICKET_COMMENT",
        title: `New comment on ${ticketId}`,
        message: `${ticket.name} added a comment: ${comment.slice(0, 100)}${comment.length > 100 ? '...' : ''}`,
        redirectUrl: `/admin-overview/tickets/${ticketId}`,
        referenceId: ticketId,
      }).catch((err) => {
        console.error('[tickets-update] Failed to create admin notification:', err);
      });
    }

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
