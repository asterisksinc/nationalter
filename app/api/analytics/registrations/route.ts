import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    // 1️⃣ Get latest registration date
    const latest = await prisma.registration.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    if (!latest) {
      return NextResponse.json({
        success: true,
        data: {},
      });
    }

    const latestDate = new Date(latest.createdAt);
    latestDate.setHours(0, 0, 0, 0);

    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - 29);

    // 2️⃣ Fetch registrations in range
    const registrations = await prisma.registration.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: new Date(latestDate.getTime() + 86400000),
        },
      },
      select: {
        type: true,
        status: true,
        createdAt: true,
      },
    });

    // 3️⃣ Initialize result with all 30 days
    const result: Record<
      string,
      {
        total: number;
        medical: number;
        researcher: number;
        org: number;
        approved: number;
        pending: number;
        rejected: number;
      }
    > = {};

    for (let i = 0; i < 30; i++) {
      const date = new Date(latestDate);
      date.setDate(latestDate.getDate() - i);

      const key = date.toISOString().split("T")[0];

      result[key] = {
        total: 0,
        medical: 0,
        researcher: 0,
        org: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
      };
    }

    // 4️⃣ Aggregate counts
    for (const reg of registrations) {
      const date = new Date(reg.createdAt);
      date.setHours(0, 0, 0, 0);

      const key = date.toISOString().split("T")[0];

      if (!result[key]) continue;

      // total
      result[key].total++;

      // type count
      if (reg.type === "MEDICAL") {
        result[key].medical++;
      }

      if (reg.type === "RESEARCHER") {
        result[key].researcher++;
      }

      if (reg.type === "ORG") {
        result[key].org++;
      }

      // status count
      if (reg.status === "APPROVED") {
        result[key].approved++;
      }

      if (reg.status === "PENDING") {
        result[key].pending++;
      }

      if (reg.status === "REJECTED") {
        result[key].rejected++;
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Registration analytics error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
