import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const { searchParams } = new URL(req.url);

    const nationciteId = searchParams.get("nationciteId");
    const issueType = searchParams.get("issueType");
    const type = searchParams.get("type");
    const name = searchParams.get("name");
    const status = searchParams.get("status");
    const excludeRegistration = searchParams.get("excludeRegistration");

    // Build dynamic filter
    const whereClause: any = {};

    if (nationciteId) whereClause.nationciteId = nationciteId;
    if (issueType) whereClause.issueType = issueType;
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    if (excludeRegistration === "true") {
      whereClause.issueType = {
        not: "NEW_REGISTRATION",
      };
    }

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
  } catch (error: any) {
    console.error("Tickets fetch error:", error);

    // Return proper status codes for auth errors
    if (
      error.message === "Unauthorized" ||
      error.message === "Invalid or expired token"
    ) {
      return NextResponse.json(
        { error: "Unauthorized — please log in as admin", tickets: [] },
        { status: 401 }
      );
    }

    if (error.message === "Forbidden: Admin access required") {
      return NextResponse.json(
        { error: "Admin access required", tickets: [] },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", tickets: [] },
      { status: 500 }
    );
  }
}
