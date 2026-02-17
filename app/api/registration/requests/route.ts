import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/registration/requests
 * Fetch all pending registration requests for admin review
 * Query params: type, status
 */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status") || "PENDING";

    // Build filter for registrations
    const whereClause: Record<string, unknown> = {};

    if (type && type !== "ALL") {
      whereClause.type = type;
    }

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    // Fetch registrations with related data
    const registrations = await prisma.registration.findMany({
      where: whereClause,
      orderBy: { id: "desc" },
      include: {
        medical: true,
        researcher: true,
        orgReg: true,
        ticket: {
          select: {
            ticketId: true,
            createdAt: true,
            status: true,
          },
        },
      },
    });

    // Transform data for frontend
    const formattedRegistrations = registrations.map((reg) => {
      let registrantData: any = null;
      let name = "";
      let email = "";

      if (reg.type === "MEDICAL" && reg.medical) {
        registrantData = reg.medical;
        name = reg.medical.name;
        email = reg.medical.email;
      } else if (reg.type === "RESEARCHER" && reg.researcher) {
        registrantData = reg.researcher;
        name = reg.researcher.name;
        email = reg.researcher.email;
      } else if (reg.type === "ORG" && reg.orgReg) {
        registrantData = reg.orgReg;
        name = reg.orgReg.name;
        email = reg.orgReg.email;
      }

      return {
        id: reg.id,
        nationciteId: reg.nationciteId,
        type: reg.type,
        status: reg.status,
        ticketId: reg.ticket?.ticketId || null,
        createdAt: reg.ticket?.createdAt || null,
        name,
        email,
        registrantData,
      };
    });

    return NextResponse.json({
      success: true,
      count: formattedRegistrations.length,
      data: formattedRegistrations,
    });
  } catch (error) {
    console.error("Registration requests fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
