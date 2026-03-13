import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CmsRow = {
  key: string;
  value: unknown;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  try {
    const { page } = await params;
    const normalizedPage = decodeURIComponent(page || "").trim().toLowerCase();

    if (!/^[a-z0-9-]+$/.test(normalizedPage)) {
      return NextResponse.json(
        { success: false, message: "Invalid page key" },
        { status: 400 },
      );
    }

    const likePattern = `${normalizedPage}.%`;

    const rows = await prisma.$queryRaw<CmsRow[]>(Prisma.sql`
      SELECT key, value
      FROM "Cms"
      WHERE key LIKE ${likePattern}
      ORDER BY key ASC
    `);

    const cms: Record<string, unknown> = {};

    for (const row of rows) {
      const prefix = `${normalizedPage}.`;
      if (!row.key.startsWith(prefix)) continue;
      const section = row.key.slice(prefix.length);
      if (!section) continue;
      cms[section] = row.value;
    }

    return NextResponse.json({ success: true, page: normalizedPage, cms });
  } catch (error) {
    console.error("CMS_PAGE_FETCH_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch CMS content" },
      { status: 500 },
    );
  }
}
