import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { ticketId, status, comment, attachments } = body;

    if (!ticketId) {
      return NextResponse.json(
        { error: "ticketId is required" },
        { status: 400 }
      );
    }

    // Ensure ticket exists
    const ticket = await prisma.tickets.findUnique({
      where: { ticketId },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    // Update ticket status if provided
    if (status) {
      await prisma.tickets.update({
        where: { ticketId },
        data: {
          status,
          updatedAt: new Date(),
        },
      });
    }

    // Add comment if provided
    if (comment || attachments) {
      await prisma.ticketComments.create({
        data: {
          ticketId,
          comments: comment || "",
          attachments: attachments || null,
          createdAt: new Date(),
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ticket updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ticket update error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
