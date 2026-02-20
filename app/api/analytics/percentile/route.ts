import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Authenticate user
    const payload = requireAuth(req);
    if (!payload?.userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Get nationciteId from registration
    const registration = await prisma.registration.findUnique({
      where: { authUserId: payload.userId },
      select: { nationciteId: true },
    });

    if (!registration?.nationciteId) {
      return NextResponse.json(
        { success: false, message: "NationCite ID not found for user" },
        { status: 404 }
      );
    }

    const nationciteId = registration.nationciteId;

    // 3️⃣ Get user's scholar metrics
    const scholar = await prisma.scholarsPublic.findUnique({
      where: { nationciteId },
    });

    if (!scholar) {
      return NextResponse.json(
        { success: false, message: "Scholar data not found" },
        { status: 404 }
      );
    }

    const userField = scholar.mainSubject || "General";
    const userH = scholar.hIndexTotal;

    // 4️⃣ Get all scholars in the same field for percentile calculation
    const fieldScholars = await prisma.scholarsPublic.findMany({
      where: { mainSubject: userField },
      select: { hIndexTotal: true, nationciteId: true },
      orderBy: { hIndexTotal: "desc" },
    });

    // 5️⃣ Calculate user's rank within field
    let fieldRank = 1;
    for (const s of fieldScholars) {
      if (s.nationciteId === nationciteId) break;
      fieldRank++;
    }

    const fieldTotal = fieldScholars.length || 1;

    // 6️⃣ Calculate percentile (percentage of scholars below this user)
    // Percentile = ((fieldTotal - fieldRank) / fieldTotal) * 100
    const percentile = Math.round(((fieldTotal - fieldRank) / fieldTotal) * 100);

    // 7️⃣ Use existing ranks if available, or calculate
    const worldRank = scholar.worldRank || fieldRank;
    const countryRank = scholar.countryRank || Math.ceil(fieldRank * 0.3);

    // 8️⃣ Get field statistics for context
    const fieldStats = await prisma.scholarsPublic.aggregate({
      where: { mainSubject: userField },
      _avg: { hIndexTotal: true },
      _max: { hIndexTotal: true },
      _min: { hIndexTotal: true },
      _count: true,
    });

    // 9️⃣ Determine performance tier
    let tier = "Developing";
    if (percentile >= 90) tier = "Elite";
    else if (percentile >= 75) tier = "High";
    else if (percentile >= 50) tier = "Above Average";
    else if (percentile >= 25) tier = "Average";

    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        field: userField,
        percentile: Math.max(1, Math.min(99, percentile)), // Clamp between 1-99
        rank: scholar.countryRank || fieldRank,
        worldRank,
        countryRank,
        total: fieldTotal,
        tier,
        fieldStats: {
          avgHIndex: Math.round(fieldStats._avg.hIndexTotal || 0),
          maxHIndex: fieldStats._max.hIndexTotal || 0,
          minHIndex: fieldStats._min.hIndexTotal || 0,
          totalScholars: fieldStats._count,
        },
        userHIndex: userH,
      },
    });
  } catch (error) {
    console.error("Percentile API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
