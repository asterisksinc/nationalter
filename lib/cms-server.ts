import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CmsMap, mergeCmsWithDefaults } from "@/lib/cms-utils";

type CmsRow = {
  key: string;
  value: unknown;
};

export async function getCmsPageServer<T extends CmsMap>(
  page: string,
  defaults: T,
): Promise<T> {
  const normalizedPage = page.trim().toLowerCase();

  if (!/^[a-z0-9_-]+$/.test(normalizedPage)) {
    return defaults;
  }

  try {
    const likePattern = `${normalizedPage}.%`;

    const rows = await prisma.$queryRaw<CmsRow[]>(Prisma.sql`
      SELECT key, value
      FROM "Cms"
      WHERE key LIKE ${likePattern}
      ORDER BY key ASC
    `);

    const pageCms: Record<string, unknown> = {};

    for (const row of rows) {
      const prefix = `${normalizedPage}.`;
      if (!row.key.startsWith(prefix)) continue;
      const section = row.key.slice(prefix.length);
      if (!section) continue;
      pageCms[section] = row.value;
    }

    return mergeCmsWithDefaults(defaults, pageCms);
  } catch {
    return defaults;
  }
}
