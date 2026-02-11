import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Authenticate user
    const payload = requireAuth(req);
    const authUserId = payload.userId;

    // 2️⃣ Fetch approved registration with all possible profiles
    const registration = await prisma.registration.findFirst({
      where: {
        authUserId,
        status: "APPROVED",
      },
      include: {
        researcher: true,
        medical: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Approved registration not found" },
        { status: 404 }
      );
    }

    const { nationciteId, type } = registration;

    // 3️⃣ Resolve scholar profile dynamically
    let scholarProfile: any = null;

    if (registration.researcher) {
      scholarProfile = {
        role: "RESEARCHER",
        data: registration.researcher,
      };
    } else if (registration.medical) {
      scholarProfile = {
        role: "MEDICAL_PROFESSIONAL",
        data: registration.medical,
      };
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Scholar profile not linked to registration",
        },
        { status: 500 }
      );
    }

    // 4️⃣ Fetch public scholar metrics (H-index, ranks, etc.)
    const scholarMetrics = await prisma.scholarsPublic.findUnique({
      where: { nationciteId },
    });

    // 5️⃣ Fetch tickets created by this scholar
    const tickets = await prisma.tickets.findMany({
      where: { nationciteId },
      orderBy: { createdAt: "desc" },
    });

    // 6️⃣ Fetch auth user details
    const authUser = await prisma.authUser.findUnique({
      where: { id: authUserId },
      select: {
        id: true,
        email: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    // 7️⃣ Final response
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
        scholarProfile,
        scholarMetrics,
        tickets,
      },
    });
  } catch (error) {
    console.error("Dashboard Scholar API Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
