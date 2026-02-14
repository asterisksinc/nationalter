import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    requireAdmin(req);
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

    await prisma.$transaction(async (tx) => {
      const ticket = await tx.tickets.findUnique({
        where: { ticketId },
        include: { registration: true },
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      // ✅ Update Ticket (attachments now live here)
      await tx.tickets.update({
        where: { ticketId },
        data: {
          status: status ?? ticket.status,
          nationciteId: nationciteId ?? ticket.nationciteId,
          attachments: attachments ?? ticket.attachments, 
          updatedAt: new Date(),
        },
      });

      // ✅ Add comment only (no attachments here)
      if (comment) {
        await tx.ticketComments.create({
          data: {
            ticketId,
            comments: comment,
            createdAt: new Date(),
          },
        });
      }

      // ✅ Update Registration if needed
      if (nationciteId && ticket.registration.length > 0) {
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
