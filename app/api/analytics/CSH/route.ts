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
    const Y = publicationStats.yearsSinceFirstPublication;
    const csHIndex = Y > 0 ? H / Math.log(Y + 1) : H;

    return NextResponse.json({
      success: true,
      data: {
        nationciteId,
        hIndex: H,
        publications: publicationStats.publications,
        yearsSinceFirstPublication: Y,
        isEstimated: publicationStats.isEstimated,
        csHIndex: Number(csHIndex.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("CS-H Index API error:", error);
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
