import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { requireAuth } from "@/lib/auth";
import { createAdminNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);

    const body = await req.json();

    const {
      nationciteId,
      name,
      type,
      issueType,
      description,

      issueReason,
      links,
      attachments,
      impactLevel,
      preferredOutcome,

      comment,
    } = body;

    // validation
    if (!nationciteId || !name || !type || !issueType || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const ticketId = `TCK-${randomUUID().slice(0, 8).toUpperCase()}`;

    const ticket = await prisma.tickets.create({
      data: {
        ticketId,
        nationciteId,
        name,
        type,
        issueType,
        description,

        // ✅ new fields
        issueReason: issueReason || null,
        links: links || [],
        attachments: attachments || [],
        impactLevel: impactLevel || null,
        preferredOutcome: preferredOutcome || null,

        status: "OPEN",
        createdAt: new Date(),
        updatedAt: new Date(),

        comments: comment
          ? {
              create: {
                comments: comment,
                createdAt: new Date(),
              },
            }
          : undefined,
      },

      include: {
        comments: true,
      },
    });

    // Notify admin about new ticket
    createAdminNotification({
      type: "TICKET_CREATED",
      title: `New Ticket: ${issueType}`,
      message: `${name} raised a ticket (${ticketId}) — ${description.slice(0, 80)}`,
      redirectUrl: `/admin-overview/tickets/${ticketId}`,
      referenceId: ticketId,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Ticket created successfully",
        ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ticket creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
