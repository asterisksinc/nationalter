import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

////////////////////////////////////////////////
// PUT /api/publications/publication-update
////////////////////////////////////////////////
export async function PUT(req: NextRequest) {
  try {
    const user = requireAuth(req);

    // Look up the caller's nationciteId
    const registration = await prisma.registration.findUnique({
      where: { id: user.registrationId },
      select: { nationciteId: true },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      id,
      title,
      journalName,
      datePublished,
      field,
      publicationType,
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

    // Ownership check — admin can edit any, scholars can only edit their own
    if (user.role !== "ADMIN" && existing.nationciteId !== registration.nationciteId) {
      return NextResponse.json(
        { success: false, message: "You can only edit your own publications" },
        { status: 403 }
      );
    }

    const updatedPublication = await prisma.publication.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        journalName: journalName ?? existing.journalName,
        datePublished: datePublished
          ? new Date(datePublished)
          : existing.datePublished,
        field: field || publicationType || existing.field,
        citationsTotal: citationsTotal ?? existing.citationsTotal,
        citationsLast5Years: citationsLast5Years ?? existing.citationsLast5Years,
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
  } catch (error: any) {
    console.error("Update publication error:", error);

    if (error.message === "Unauthorized" || error.message === "Invalid or expired token") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

////////////////////////////////////////////////
// DELETE /api/publications/publication-update
////////////////////////////////////////////////
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);

    // Look up the caller's nationciteId
    const registration = await prisma.registration.findUnique({
      where: { id: user.registrationId },
      select: { nationciteId: true },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { success: false, message: "Publication id is required as query param" },
        { status: 400 }
      );
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid publication id" },
        { status: 400 }
      );
    }

    // Check if exists
    const existing = await prisma.publication.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Publication not found" },
        { status: 404 }
      );
    }

    // Ownership check
    if (user.role !== "ADMIN" && existing.nationciteId !== registration.nationciteId) {
      return NextResponse.json(
        { success: false, message: "You can only delete your own publications" },
        { status: 403 }
      );
    }

    await prisma.publication.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Publication deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete publication error:", error);

    if (error.message === "Unauthorized" || error.message === "Invalid or expired token") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
