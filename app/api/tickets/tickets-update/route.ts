import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      ticketId,
      status,
      comment,
      attachments,
      nationciteId, // OPTIONAL: new nationciteId (real one after approval)
    } = body;

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "ticketId is required" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      // 1️⃣ Fetch ticket with registrations
      const ticket = await tx.tickets.findUnique({
        where: { ticketId },
        include: {
          registration: true,
        },
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      // 2️⃣ Update ticket fields
      await tx.tickets.update({
        where: { ticketId },
        data: {
          status: status ?? ticket.status,
          nationciteId: nationciteId ?? ticket.nationciteId,
          updatedAt: new Date(),
        },
      });

      // 3️⃣ Add comment if provided
      if (comment || attachments) {
        await tx.ticketComments.create({
          data: {
            ticketId,
            comments: comment || "",
            attachments: attachments || null,
            createdAt: new Date(),
          },
        });
      }

      // 4️⃣ Update Registration nationciteId (if provided)
      if (nationciteId && ticket.registration.length > 0) {
        const registration = ticket.registration[0];

        await tx.registration.update({
          where: { id: registration.id },
          data: {
            nationciteId,
          },
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
