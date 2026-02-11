import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const payload = requireAuth(req); // optional: auth
    const body = await req.json();

    const {
      title,
      journalName,
      datePublished,
      citationsTotal,
      citationsLast5Years,
      scholarNationciteIds = [], // array of scholars
      orgNationciteIds = [],     // array of orgs
    } = body;

    if (!title || !journalName || !datePublished) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const publication = await prisma.publication.create({
      data: {
        title,
        journalName,
        datePublished: new Date(datePublished),
        citationsTotal: citationsTotal || 0,
        citationsLast5Years: citationsLast5Years || 0,
        scholars: {
          create: scholarNationciteIds.map((id: string) => ({ scholarNationciteId: id })),
        },
        orgs: {
          create: orgNationciteIds.map((id: string) => ({ orgNationciteId: id })),
        },
      },
      include: {
        scholars: true,
        orgs: true,
      },
    });

    return NextResponse.json({ success: true, publication }, { status: 201 });
  } catch (error) {
    console.error("Create publication error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const publications = await prisma.publication.findMany({
      include: {
        scholars: true,
        orgs: true,
      },
      orderBy: {
        datePublished: "desc",
      },
    });

    return NextResponse.json({ success: true, count: publications.length, publications });
  } catch (error) {
    console.error("Fetch publications error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
