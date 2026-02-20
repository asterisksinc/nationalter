import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//////////////////////////////////////////////////////
// GET LAST 7 DAYS RANGE
//////////////////////////////////////////////////////
function getLast7DaysRange() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  return { start, end };
}

//////////////////////////////////////////////////////
// ANALYTICS OVERVIEW API
// /api/analytics/overview
//////////////////////////////////////////////////////
export async function GET() {
  try {
    const { start, end } = getLast7DaysRange();

    //////////////////////////////////////////////////////
    // REGISTRATION COUNTS BY TYPE + STATUS (ALL TIME)
    //////////////////////////////////////////////////////
    const registrations = await prisma.registration.groupBy({
      by: ["type", "status"],
      _count: {
        id: true,
      },
    });

    //////////////////////////////////////////////////////
    // LAST 7 DAYS REGISTRATIONS
    //////////////////////////////////////////////////////
    const last7DaysRegistrations = await prisma.registration.groupBy({
      by: ["type"],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      _count: {
        id: true,
      },
    });

    //////////////////////////////////////////////////////
    // LAST 7 DAYS LOGIN COUNTS
    //////////////////////////////////////////////////////
    const last7DaysLogins = await prisma.loginLog.groupBy({
      by: ["loginType"],
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      _count: {
        id: true,
      },
    });

    //////////////////////////////////////////////////////
    // TYPES CONFIG
    //////////////////////////////////////////////////////
    const types = [
      {
        key: "MEDICAL",
        label: "medicalProfessional",
        loginType: "MEDICAL_PROFESSIONAL",
      },
      {
        key: "RESEARCHER",
        label: "researcher",
        loginType: "RESEARCHER",
      },
      {
        key: "ORG",
        label: "organization",
        loginType: "ORG",
      },
    ];

    //////////////////////////////////////////////////////
    // TOTAL APPROVED TRACKERS
    //////////////////////////////////////////////////////
    let totalApprovedMedicalProfessionals = 0;
    let totalApprovedResearchers = 0;
    let totalApprovedOrganizations = 0;

    //////////////////////////////////////////////////////
    // BUILD RESULT OBJECT
    //////////////////////////////////////////////////////
    const result: any = {};

    for (const type of types) {
      const approved =
        registrations.find(
          (r) => r.type === type.key && r.status === "APPROVED"
        )?._count.id || 0;

      const pending =
        registrations.find(
          (r) => r.type === type.key && r.status === "PENDING"
        )?._count.id || 0;

      const rejected =
        registrations.find(
          (r) => r.type === type.key && r.status === "REJECTED"
        )?._count.id || 0;

      const total = approved + pending + rejected;

      const approvalPercentage =
        total === 0 ? 0 : Number(((approved / total) * 100).toFixed(2));

      //////////////////////////////////////////////////////
      // LAST 7 DAYS REGISTRATION AVG
      //////////////////////////////////////////////////////
      const last7Registrations =
        last7DaysRegistrations.find((r) => r.type === type.key)?._count.id ||
        0;

      const avgRegistrationsPerDay = Number(
        (last7Registrations / 7).toFixed(2)
      );

      //////////////////////////////////////////////////////
      // LAST 7 DAYS LOGIN AVG
      //////////////////////////////////////////////////////
      const last7Logins =
        last7DaysLogins.find((l) => l.loginType === type.loginType)?._count
          .id || 0;

      const avgActiveUsersPerDay = Number((last7Logins / 7).toFixed(2));

      //////////////////////////////////////////////////////
      // STORE TOTAL APPROVED
      //////////////////////////////////////////////////////
      if (type.key === "MEDICAL")
        totalApprovedMedicalProfessionals = approved;

      if (type.key === "RESEARCHER")
        totalApprovedResearchers = approved;

      if (type.key === "ORG")
        totalApprovedOrganizations = approved;

      //////////////////////////////////////////////////////
      // STORE TYPE DATA
      //////////////////////////////////////////////////////
      result[type.label] = {
        approvedCount: approved,
        approvalPercentage,
        avgRegistrationsPerDay,
        avgActiveUsersPerDay,
      };
    }

    //////////////////////////////////////////////////////
    // FINAL RESPONSE
    //////////////////////////////////////////////////////
    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalApprovedMedicalProfessionals,
          totalApprovedResearchers,
          totalApprovedOrganizations,
          totalApprovedOverall:
            totalApprovedMedicalProfessionals +
            totalApprovedResearchers +
            totalApprovedOrganizations,
        },

        medicalProfessional: result.medicalProfessional,
        researcher: result.researcher,
        organization: result.organization,
      },
    });

  } catch (error) {
    console.error("Analytics Overview Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics overview",
      },
      { status: 500 }
    );
  }
}
