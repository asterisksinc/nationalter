import { NextRequest, NextResponse } from "next/server";
import {
  getPublicationStatsWithFallback,
  getScholarAnalyticsContext,
} from "../_shared/scholar-context";

export async function GET(req: NextRequest) {
  try {
    const { nationciteId, scholar } = await getScholarAnalyticsContext(req);
    const publicationStats = await getPublicationStatsWithFallback(
      nationciteId,
      scholar.hIndexTotal,
      scholar.hIndexLast5,
    );

    const H = scholar.hIndexTotal;
    const C5y = scholar.hIndexLast5;
    const P = publicationStats.publications;
    const Y = Math.max(1, publicationStats.yearsSinceFirstPublication);

    const CASS = 0.4 * H + 0.3 * Math.log(P + 1) + 0.3 * (C5y / Y);

    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        publications: P,
        hIndex: H,
        citationsLast5Years: C5y,
        yearsSinceFirstPublication: Y,
        isEstimated: publicationStats.isEstimated,
        CASS: Number(CASS.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("CASS calculation error:", error);
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
