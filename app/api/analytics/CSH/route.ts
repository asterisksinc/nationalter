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

    // 4️⃣ Fetch earliest publication to compute career years
    const firstPublication = await prisma.publication.findFirst({
      where: { nationciteId },
      orderBy: { datePublished: "asc" },
      select: { datePublished: true },
    });

    if (!firstPublication) {
      return NextResponse.json(
        { success: false, message: "No publications found for this scholar" },
        { status: 404 }
      );
    }

    const firstYear = firstPublication.datePublished.getFullYear();
    const currentYear = new Date().getFullYear();
    const Y = currentYear - firstYear;

    // 5️⃣ Calculate CS-H Index: H / ln(Y + 1)
    const csHIndex = Y > 0 ? H / Math.log(Y + 1) : H; // fallback if Y = 0

    // 6️⃣ Return result
    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        hIndex: H,
        yearsSinceFirstPublication: Y,
        csHIndex: Number(csHIndex.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("CS-H Index API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
