import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Optional query params
    const orgName = searchParams.get("orgName") || undefined;
    const mainSubject = searchParams.get("mainSubject") || undefined;
    const top = Math.min(
      parseInt(searchParams.get("top") || "100", 10),
      500 // safety cap
    );

    // Build the Prisma "where" filter dynamically
    const where: any = {};
    if (orgName) where.orgName = orgName;
    if (mainSubject) where.mainSubject = mainSubject;

    const scholars = await prisma.scholarsPublic.findMany({
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
    });

    return NextResponse.json({
      success: true,
      count: scholars.length,
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
