import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    // 1️⃣ Get latest login date
    const latestLog = await prisma.loginLog.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    if (!latestLog) {
      return NextResponse.json({
        success: true,
        data: {},
      });
    }

    const latestDate = new Date(latestLog.createdAt);
    latestDate.setHours(0, 0, 0, 0);

    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - 29);

    // 2️⃣ Get all logs in range
    const logs = await prisma.loginLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: new Date(latestDate.getTime() + 86400000),
        },
      },
      select: {
        nationciteId: true,
        loginType: true,
        createdAt: true,
      },
    });

    // 3️⃣ Prepare map
    const result: Record<
      string,
      {
        total: number;
        medical: number;
        researcher: number;
        org: number;
      }
    > = {};

    // Initialize all 30 days with 0
    for (let i = 0; i < 30; i++) {
      const date = new Date(latestDate);
      date.setDate(latestDate.getDate() - i);

      const key = date.toISOString().split("T")[0];

      result[key] = {
        total: 0,
        medical: 0,
        researcher: 0,
        org: 0,
      };
    }

    // 4️⃣ Track unique users per day
    const uniqueTracker: Record<
      string,
      {
        total: Set<string>;
        medical: Set<string>;
        researcher: Set<string>;
        org: Set<string>;
      }
    > = {};

    for (const log of logs) {
      const date = new Date(log.createdAt);
      date.setHours(0, 0, 0, 0);

      const key = date.toISOString().split("T")[0];

      if (!uniqueTracker[key]) {
        uniqueTracker[key] = {
          total: new Set(),
          medical: new Set(),
          researcher: new Set(),
          org: new Set(),
        };
      }

      uniqueTracker[key].total.add(log.nationciteId);

      if (log.loginType === "MEDICAL_PROFESSIONAL") {
        uniqueTracker[key].medical.add(log.nationciteId);
      }

      if (log.loginType === "RESEARCHER") {
        uniqueTracker[key].researcher.add(log.nationciteId);
      }

      if (log.loginType === "ORG") {
        uniqueTracker[key].org.add(log.nationciteId);
      }
    }

    // 5️⃣ Convert sets to counts
    for (const date in uniqueTracker) {
      result[date] = {
        total: uniqueTracker[date].total.size,
        medical: uniqueTracker[date].medical.size,
        researcher: uniqueTracker[date].researcher.size,
        org: uniqueTracker[date].org.size,
      };
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Active user analytics error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
