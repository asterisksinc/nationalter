import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, context: any) {
  try {
    // Next.js may type params as a Promise
    const { id } = await context.params; // ORG00017

    if (!id) {
      return NextResponse.json(
        { success: false, message: "nationciteId is required" },
        { status: 400 }
      );
    }

    const org = await prisma.orgsPublic.findUnique({
      where: { nationciteId: id },
      select: {
        id: true,
        nationciteId: true,
        orgName: true,
        worldRank: true,
        countryRank: true,
        hIndexTotal: true,
        hIndexLast5: true,
      },
    });

    if (!org) {
      return NextResponse.json(
        { success: false, message: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: org,
    });
  } catch (error) {
    console.error("Get Org by ID API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch organization" },
      { status: 500 }
    );
  }
}
