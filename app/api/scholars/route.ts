import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Optional query params
    const orgName = searchParams.get("orgName") || undefined;
    const mainSubject = searchParams.get("mainSubject") || undefined;
    const scholarName = searchParams.get("scholarName") || undefined;

    const top = Math.min(
      parseInt(searchParams.get("top") || "100", 10),
      500 // safety cap
    );
    const statsOnly = searchParams.get("statsOnly") === "true";

    // Build Prisma where filter dynamically
    const where: Prisma.ScholarsPublicWhereInput = {};

    if (orgName) {
      where.orgName = orgName;
    }

    if (mainSubject) {
      where.mainSubject = mainSubject;
    }

    if (scholarName) {
      where.scholarName = {
        contains: scholarName,
        mode: "insensitive", // case-insensitive search
      };
    }

    if (statsOnly) {
      const totalCount = await prisma.scholarsPublic.count({ where });
      return NextResponse.json({
        success: true,
        count: 0,
        totalCount,
        data: [],
      });
    }

    const [totalCount, scholars] = await Promise.all([
      prisma.scholarsPublic.count({ where }),
      prisma.scholarsPublic.findMany({
        take: top,
        where,
        orderBy: { worldRank: "asc" },
        select: {
          id: true,
          nationciteId: true,
          scholarName: true,
          orgName: true,
          worldRank: true,
          countryRank: true,
          universityRank: true,
          mainSubject: true,
          subField: true,
          hIndexTotal: true,
          hIndexLast5: true,
          hIndexRatio: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      count: scholars.length,
      totalCount,
      data: scholars,
    });
  } catch (error) {
    console.error("Scholars API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch scholars" },
      { status: 500 }
    );
  }
}
