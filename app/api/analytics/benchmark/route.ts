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

    // 4️⃣ Get user's publications data
    const userPubs = await prisma.publication.findMany({
      where: { nationciteId },
      select: { citationsTotal: true, citationsLast5Years: true },
    });

    const userPublicationCount = userPubs.length || Math.round(scholar.hIndexTotal * 4);
    const userTotalCitations = userPubs.reduce((sum, p) => sum + p.citationsTotal, 0) || Math.round(scholar.hIndexTotal * 120);

    // 5️⃣ Calculate field averages (scholars in same mainSubject)
    const fieldScholars = await prisma.scholarsPublic.aggregate({
      where: { mainSubject: userField },
      _avg: {
        hIndexTotal: true,
        hIndexLast5: true,
      },
      _count: true,
    });

    // 6️⃣ Calculate national averages (all scholars)
    const nationalScholars = await prisma.scholarsPublic.aggregate({
      _avg: {
        hIndexTotal: true,
        hIndexLast5: true,
      },
      _count: true,
    });

    // 7️⃣ Get field publication averages
    const fieldPubStats = await prisma.publication.aggregate({
      where: { field: userField },
      _avg: { citationsTotal: true },
      _count: true,
    });

    // 8️⃣ Get national publication averages
    const nationalPubStats = await prisma.publication.aggregate({
      _avg: { citationsTotal: true },
      _count: true,
    });

    // 9️⃣ Calculate productivity metrics
    const userH = scholar.hIndexTotal;
    const userH5 = scholar.hIndexLast5;
    const fieldAvgH = fieldScholars._avg.hIndexTotal || userH * 0.7;
    const fieldAvgH5 = fieldScholars._avg.hIndexLast5 || userH5 * 0.7;
    const nationalAvgH = nationalScholars._avg.hIndexTotal || userH * 0.5;
    const nationalAvgH5 = nationalScholars._avg.hIndexLast5 || userH5 * 0.5;

    // Publications per scholar estimate
    const fieldAvgPubs = Math.round(fieldAvgH * 3.5);
    const nationalAvgPubs = Math.round(nationalAvgH * 3);

    // Citations estimate
    const fieldAvgCitations = Math.round(fieldAvgH * 100);
    const nationalAvgCitations = Math.round(nationalAvgH * 80);

    // Productivity = H / sqrt(publications)
    const userProductivity = userPublicationCount > 0 ? userH / Math.sqrt(userPublicationCount) : userH * 0.5;
    const fieldProductivity = fieldAvgPubs > 0 ? fieldAvgH / Math.sqrt(fieldAvgPubs) : fieldAvgH * 0.4;
    const nationalProductivity = nationalAvgPubs > 0 ? nationalAvgH / Math.sqrt(nationalAvgPubs) : nationalAvgH * 0.35;

    // Impact score (simplified ARIS)
    const userImpact = userH * Math.log(userPublicationCount + 1);
    const fieldImpact = fieldAvgH * Math.log(fieldAvgPubs + 1);
    const nationalImpact = nationalAvgH * Math.log(nationalAvgPubs + 1);

    // 🔟 Build benchmark data for radar chart (normalized to 100)
    const maxH = Math.max(userH, fieldAvgH, nationalAvgH) * 1.2;
    const maxPubs = Math.max(userPublicationCount, fieldAvgPubs, nationalAvgPubs) * 1.2;
    const maxCit = Math.max(userTotalCitations, fieldAvgCitations, nationalAvgCitations) * 1.2;
    const maxProd = Math.max(userProductivity, fieldProductivity, nationalProductivity) * 1.2;
    const maxImpact = Math.max(userImpact, fieldImpact, nationalImpact) * 1.2;

    const benchmark = [
      {
        subject: "H-Index",
        A: Math.round((userH / maxH) * 100),
        B: Math.round((fieldAvgH / maxH) * 100),
        C: Math.round((nationalAvgH / maxH) * 100),
        fullMark: 100,
      },
      {
        subject: "Publications",
        A: Math.round((userPublicationCount / maxPubs) * 100),
        B: Math.round((fieldAvgPubs / maxPubs) * 100),
        C: Math.round((nationalAvgPubs / maxPubs) * 100),
        fullMark: 100,
      },
      {
        subject: "Citations",
        A: Math.round((userTotalCitations / maxCit) * 100),
        B: Math.round((fieldAvgCitations / maxCit) * 100),
        C: Math.round((nationalAvgCitations / maxCit) * 100),
        fullMark: 100,
      },
      {
        subject: "Productivity",
        A: Math.round((userProductivity / maxProd) * 100),
        B: Math.round((fieldProductivity / maxProd) * 100),
        C: Math.round((nationalProductivity / maxProd) * 100),
        fullMark: 100,
      },
      {
        subject: "Impact",
        A: Math.round((userImpact / maxImpact) * 100),
        B: Math.round((fieldImpact / maxImpact) * 100),
        C: Math.round((nationalImpact / maxImpact) * 100),
        fullMark: 100,
      },
    ];

    // 1️⃣1️⃣ Build raw benchmark data for display
    const benchmarkRaw = [
      {
        metric: "H-Index",
        you: userH.toString(),
        field: Math.round(fieldAvgH).toString(),
        national: Math.round(nationalAvgH).toString(),
      },
      {
        metric: "Publications",
        you: userPublicationCount.toString(),
        field: fieldAvgPubs.toString(),
        national: nationalAvgPubs.toString(),
      },
      {
        metric: "Citations",
        you: userTotalCitations.toLocaleString(),
        field: fieldAvgCitations.toLocaleString(),
        national: nationalAvgCitations.toLocaleString(),
      },
      {
        metric: "Productivity",
        you: userProductivity.toFixed(2),
        field: fieldProductivity.toFixed(2),
        national: nationalProductivity.toFixed(2),
      },
      {
        metric: "Impact",
        you: userImpact.toFixed(1),
        field: fieldImpact.toFixed(1),
        national: nationalImpact.toFixed(1),
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        field: userField,
        benchmark,
        benchmarkRaw,
        cohortStats: {
          fieldScholarsCount: fieldScholars._count,
          nationalScholarsCount: nationalScholars._count,
        },
      },
    });
  } catch (error) {
    console.error("Benchmark API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
