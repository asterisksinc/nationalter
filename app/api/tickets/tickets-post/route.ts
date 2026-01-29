import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      nationciteId,
      name,
      type,
      issueType,
      description,
      comment,
      attachments,
    } = body;

    // Basic validation
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
        status: "OPEN",
        createdAt: new Date(),
        updatedAt: new Date(),

        comments: comment
          ? {
              create: {
                comments: comment,
                attachments: attachments || null,
                createdAt: new Date(),
              },
            }
          : undefined,
      },
      include: {
        comments: true,
      },
    });

    return NextResponse.json(
      {
        message: "Ticket created successfully",
        ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ticket creation error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
