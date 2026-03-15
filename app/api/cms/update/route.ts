import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCmsSchema } from "@/lib/cms-schema";
import { requireAdmin } from "@/lib/auth";

type UpsertResult = {
  key: string;
  updatedAt: Date;
};

type ExistingRow = {
  value: unknown;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(existing: unknown, incoming: unknown): unknown {
  if (!isPlainObject(existing)) {
    return incoming;
  }

  if (!isPlainObject(incoming)) {
    return incoming ?? existing;
  }

  const merged: Record<string, unknown> = { ...existing };

  for (const [key, value] of Object.entries(incoming)) {
    const prev = merged[key];
    merged[key] = isPlainObject(prev) && isPlainObject(value) ? deepMerge(prev, value) : value;
  }

  return merged;
}

export async function POST(req: NextRequest) {
  try {
    try {
      requireAdmin(req);
    } catch (authError) {
      const message = authError instanceof Error ? authError.message : "Unauthorized";
      const status = message.toLowerCase().includes("forbidden") ? 403 : 401;
      return NextResponse.json({ success: false, message }, { status });
    }

    const body = await req.json();
    const key = String(body?.key || "").trim();
    const value = body?.value;

    if (!key) {
      return NextResponse.json(
        { success: false, message: "key is required" },
        { status: 400 },
      );
    }

    if (!/^[a-z0-9_-]+\.[a-z0-9_-]+$/i.test(key)) {
      return NextResponse.json(
        { success: false, message: "Invalid key format. Expected page.section" },
        { status: 400 },
      );
    }

    if (value === undefined) {
      return NextResponse.json(
        { success: false, message: "value is required" },
        { status: 400 },
      );
    }

    const schema = getCmsSchema(key);
    if (!schema) {
      return NextResponse.json(
        { success: false, message: `Unsupported CMS key: ${key}` },
        { status: 400 },
      );
    }

    const existingRows = await prisma.$queryRaw<ExistingRow[]>(Prisma.sql`
      SELECT value
      FROM "Cms"
      WHERE key = ${key}
      LIMIT 1
    `);

    const existingValue = isPlainObject(existingRows[0]?.value)
      ? existingRows[0].value
      : {};

    const mergedValue = deepMerge(existingValue, value);
    const validation = schema.safeParse(mergedValue);
    if (!validation.success) {
      const message = validation.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ");
      return NextResponse.json(
        { success: false, message },
        { status: 400 },
      );
    }

    const valueJson = JSON.stringify(validation.data);

    const rows = await prisma.$queryRaw<UpsertResult[]>(Prisma.sql`
      INSERT INTO "Cms" (key, value, "createdAt", "updatedAt")
      VALUES (${key}, ${valueJson}::jsonb, NOW(), NOW())
      ON CONFLICT (key)
      DO UPDATE SET
        value = EXCLUDED.value,
        "updatedAt" = NOW()
      RETURNING key, "updatedAt"
    `);

    return NextResponse.json({
      success: true,
      key,
      updatedAt: rows[0]?.updatedAt ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error("CMS_UPDATE_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update CMS content" },
      { status: 500 },
    );
  }
}
