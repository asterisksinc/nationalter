import { NextRequest, NextResponse } from "next/server";
import {
  getPublicationStatsWithFallback,
  getScholarAnalyticsContext,
} from "../_shared/scholar-context";

export async function GET(req: NextRequest) {
  try {
    const { nationciteId, scholar } = await getScholarAnalyticsContext(req);
    const H = scholar.hIndexTotal;
    const publicationStats = await getPublicationStatsWithFallback(
      nationciteId,
      scholar.hIndexTotal,
      scholar.hIndexLast5,
    );
    const P = publicationStats.publications;

    const PIBI = P > 0 ? H / Math.sqrt(P) : 0;

    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        publications: P,
        hIndex: H,
        isEstimated: publicationStats.isEstimated,
        PIBI: Number(PIBI.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("PIBI calculation error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message },
      {
        status:
          message === "Unauthorized" || message === "Invalid or expired token"
            ? 401
            : message.includes("not found")
              ? 404
              : 500,
      }
    );
  }
}
