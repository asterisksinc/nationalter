import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const top = Math.min(
      parseInt(searchParams.get("top") || "100", 10),
      500
    );
    const statsOnly = searchParams.get("statsOnly") === "true";

    const orgName = searchParams.get("orgName") || undefined;

    const where: Prisma.OrgsPublicWhereInput | undefined = orgName
      ? {
          orgName: {
            contains: orgName,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : undefined;

    if (statsOnly) {
      const totalCount = await prisma.orgsPublic.count({ where });
      return NextResponse.json({
        success: true,
        count: 0,
        totalCount,
        data: [],
      });
    }

    const [totalCount, orgs] = await Promise.all([
      prisma.orgsPublic.count({ where }),
      prisma.orgsPublic.findMany({
        where,
        take: top,
        orderBy: { worldRank: "asc" },
        select: {
          id: true,
          nationciteId: true,
          orgName: true,
          worldRank: true,
          countryRank: true,
          hIndexTotal: true,
          hIndexLast5: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      count: orgs.length,
      totalCount,
      data: orgs,
    });
  } catch (error) {
    console.error("Orgs API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
