import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const nationciteId = searchParams.get("nationciteId");
    const issueType = searchParams.get("issueType");
    const type = searchParams.get("type");
    const name = searchParams.get("name");
    const status = searchParams.get("status");

    // Build dynamic filter
    const whereClause: any = {};

    if (nationciteId) whereClause.nationciteId = nationciteId;
    if (issueType) whereClause.issueType = issueType;
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;

    if (name) {
      whereClause.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    const tickets = await prisma.tickets.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        count: tickets.length,
        tickets,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Tickets fetch error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
