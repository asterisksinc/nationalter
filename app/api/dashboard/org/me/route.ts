import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Authenticate user
    const payload = requireAuth(req);
    const authUserId = payload.userId;

    // 2️⃣ Fetch approved org registration
    const registration = await prisma.registration.findFirst({
      where: {
        authUserId,
        status: "APPROVED",
        type: "ORG",
      },
      include: {
        orgReg: true,
      },
    });

    if (!registration || !registration.orgReg) {
      return NextResponse.json(
        {
          success: false,
          message: "Approved organization registration not found",
        },
        { status: 404 }
      );
    }

    const { nationciteId } = registration;

    // 3️⃣ Fetch public org metrics (H-index, ranks)
    const orgMetrics = await prisma.orgsPublic.findFirst({
      where: { nationciteId },
    });

    // 4️⃣ Fetch all tickets raised by this organization
    const tickets = await prisma.tickets.findMany({
      where: { nationciteId },
      orderBy: { createdAt: "desc" },
    });

    // 5️⃣ Fetch auth user info
    const authUser = await prisma.authUser.findUnique({
      where: { id: authUserId },
      select: {
        id: true,
        email: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    // 6️⃣ Final response
    return NextResponse.json({
      success: true,
      data: {
        user: authUser,
        registration: {
          id: registration.id,
          nationciteId: registration.nationciteId,
          type: registration.type,
          status: registration.status,
        },
        organizationProfile: registration.orgReg,
        organizationMetrics: orgMetrics,
        tickets,
      },
    });
  } catch (error) {
    console.error("Dashboard Org API Error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Unauthorized" || message === "Invalid or expired token") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (message.startsWith("Forbidden")) {
      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch organization dashboard data",
      },
      { status: 500 }
    );
  }
}
