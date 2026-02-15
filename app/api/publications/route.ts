import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

////////////////////////////////////////////////
// POST /api/publications
////////////////////////////////////////////////
export async function POST(req: NextRequest) {
  try {
    // Require login
    requireAuth(req);

    const body = await req.json();

    const {
      nationciteId,
      title,
      journalName,
      datePublished,
      field,
      citationsTotal = 0,
      citationsLast5Years = 0,
    } = body;

    // ✅ Validation
    if (
      !nationciteId ||
      !title ||
      !journalName ||
      !datePublished ||
      !field
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const publication = await prisma.publication.create({
      data: {
        nationciteId,
        title,
        journalName,
        datePublished: new Date(datePublished),
        field,
        citationsTotal,
        citationsLast5Years,
      },
    });

    return NextResponse.json(
      { success: true, publication },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create publication error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

////////////////////////////////////////////////
// GET /api/publications
////////////////////////////////////////////////
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const nationciteId = searchParams.get("nationciteId");
    const title = searchParams.get("title");
    const field = searchParams.get("field");

    const whereClause: any = {};

    if (nationciteId) {
      whereClause.nationciteId = nationciteId;
    }

    if (title) {
      whereClause.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (field) {
      whereClause.field = {
        contains: field,
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

  } catch (error) {
    console.error("Fetch publications error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
