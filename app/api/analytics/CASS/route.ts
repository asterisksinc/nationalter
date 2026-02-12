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

    // 2️⃣ Fetch user's registration to get nationciteId
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

    // 3️⃣ Fetch scholar's H-index and citations in last 5 years
    const scholar = await prisma.scholarsPublic.findUnique({
      where: { nationciteId },
      select: { hIndexTotal: true, hIndexLast5: true },
    });

    if (!scholar) {
      return NextResponse.json(
        { success: false, message: "Scholar data not found" },
        { status: 404 }
      );
    }

    const H = scholar.hIndexTotal;
    const C5y = scholar.hIndexLast5;

    // 4️⃣ Count total publications
    const P = await prisma.publication.count({ where: { nationciteId } });

    // 5️⃣ Determine years since first publication
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
    const Y = currentYear - firstYear || 1; // avoid division by zero

    // 6️⃣ Compute CASS
    const CASS = 0.4 * H + 0.3 * Math.log(P + 1) + 0.3 * (C5y / Y);

    // 7️⃣ Return result
    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        publications: P,
        hIndex: H,
        citationsLast5Years: C5y,
        yearsSinceFirstPublication: Y,
        CASS: Number(CASS.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("CASS calculation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
