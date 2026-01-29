// app/api/leaderboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // top n rows, default 100
    const top = Math.min(
      parseInt(searchParams.get("top") || "100", 10),
      100 // safety cap
    );

    // fetch leaderboard sorted by worldRank ascending
    const leaderboard = await prisma.scholarsPublic.findMany({
      take: top,
      orderBy: [
        { worldRank: "asc" } // lowest world rank first
      ],
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
    });

    return NextResponse.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
