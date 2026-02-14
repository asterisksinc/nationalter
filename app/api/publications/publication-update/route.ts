import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

////////////////////////////////////////////////
// PUT /api/publications/publication-update
////////////////////////////////////////////////
export async function PUT(req: NextRequest) {
  try {
    const user = requireAuth(req);

    // ✅ Allow only ADMIN
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      id, 
      title,
      journalName,
      datePublished,
      citationsTotal,
      citationsLast5Years,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Publication id is required" },
        { status: 400 }
      );
    }

    // Check if publication exists
    const existing = await prisma.publication.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Publication not found" },
        { status: 404 }
      );
    }

    // Update dynamically (only provided fields)
    const updatedPublication = await prisma.publication.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        journalName: journalName ?? existing.journalName,
        datePublished: datePublished
          ? new Date(datePublished)
          : existing.datePublished,
        citationsTotal:
          citationsTotal ?? existing.citationsTotal,
        citationsLast5Years:
          citationsLast5Years ?? existing.citationsLast5Years,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Publication updated successfully",
        publication: updatedPublication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update publication error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
