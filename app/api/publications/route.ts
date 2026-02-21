import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

////////////////////////////////////////////////
// POST /api/publications  — Create a publication
////////////////////////////////////////////////
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);

    // Look up the caller's nationciteId from their registration
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
      title,
      journalName,
      datePublished,
      field,
      publicationType,
      authors,
      publisher,
      doi,
      citationsTotal = 0,
      citationsLast5Years = 0,
    } = body;

    // Validation — title and journalName are required
    if (!title || !journalName) {
      return NextResponse.json(
        { success: false, message: "Title and Journal Name are required" },
        { status: 400 }
      );
    }

    const publication = await prisma.publication.create({
      data: {
        nationciteId: registration.nationciteId,
        title,
        journalName,
        datePublished: datePublished ? new Date(datePublished) : new Date(),
        field: field || publicationType || "General",
        citationsTotal,
        citationsLast5Years,
      },
    });

    return NextResponse.json(
      { success: true, publication },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create publication error:", error);

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
// GET /api/publications  — List user's publications
////////////////////////////////////////////////
export async function GET(req: NextRequest) {
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
    const title = searchParams.get("title");

    const whereClause: any = {
      nationciteId: registration.nationciteId,
    };

    if (title) {
      whereClause.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    const publications = await prisma.publication.findMany({
      where: whereClause,
      orderBy: { datePublished: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: publications.length,
      publications,
    });
  } catch (error: any) {
    console.error("Fetch publications error:", error);

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
