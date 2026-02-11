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

    // 2️⃣ Get user's registration to fetch nationciteId
    const registration = await prisma.registration.findUnique({
      where: { authUserId: payload.userId },
    });

    if (!registration?.nationciteId) {
      return NextResponse.json(
        { success: false, message: "NationCite ID not found for user" },
        { status: 404 }
      );
    }

    const nationciteId = registration.nationciteId;

    // 3️⃣ Fetch H-index from ScholarsPublic
    const scholar = await prisma.scholarsPublic.findUnique({
      where: { nationciteId },
    });

    if (!scholar) {
      return NextResponse.json(
        { success: false, message: "Scholar data not found" },
        { status: 404 }
      );
    }

    const H = scholar.hIndexTotal;

    // 4️⃣ Count publications
    const P = await prisma.publication.count({
      where: { nationciteId },
    });

    // 5️⃣ Calculate PIBI
    const PIBI = P > 0 ? H / Math.sqrt(P) : 0;

    // 6️⃣ Return result
    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        publications: P,
        hIndex: H,
        PIBI: Number(PIBI.toFixed(2)), // round to 2 decimals
      },
    });
  } catch (error) {
    console.error("PIBI calculation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
