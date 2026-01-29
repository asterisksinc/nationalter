import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, context: any) {
  try {
    // Await the params if it's a Promise
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "nationciteId is required" },
        { status: 400 }
      );
    }

    const scholar = await prisma.scholarsPublic.findUnique({
      where: { nationciteId: id },
      select: {
        id: true,
        nationciteId: true,
        scholarName: true,
        orgName: true,
        worldRank: true,
        countryRank: true,
        universityRank: true,
        mainSubject: true,
        subField: true,
        hIndexTotal: true,
        hIndexLast5: true,
        hIndexRatio: true,
      },
    });

    if (!scholar) {
      return NextResponse.json(
        { success: false, message: "Scholar not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: scholar });
  } catch (error) {
    console.error("Get Scholar by ID API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch scholar" },
      { status: 500 }
    );
  }
}
