import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export type ScholarAnalyticsContext = {
  nationciteId: string;
  scholar: {
    nationciteId: string;
    mainSubject: string | null;
    hIndexTotal: number;
    hIndexLast5: number;
  };
};

export async function getScholarAnalyticsContext(
  req: NextRequest,
): Promise<ScholarAnalyticsContext> {
  const payload = requireAuth(req);

  if (!payload?.userId) {
    throw new Error("Unauthorized");
  }

  const registration = await prisma.registration.findUnique({
    where: { authUserId: payload.userId },
    select: { nationciteId: true },
  });

  if (!registration?.nationciteId) {
    throw new Error("NationCite ID not found for user");
  }

  const scholar = await prisma.scholarsPublic.findUnique({
    where: { nationciteId: registration.nationciteId },
    select: {
      nationciteId: true,
      mainSubject: true,
      hIndexTotal: true,
      hIndexLast5: true,
    },
  });

  if (!scholar) {
    throw new Error("Scholar data not found");
  }

  return {
    nationciteId: registration.nationciteId,
    scholar,
  };
}

export async function getPublicationStatsWithFallback(
  nationciteId: string,
  hIndexTotal: number,
  hIndexLast5: number,
) {
  const publicationCount = await prisma.publication.count({
    where: { nationciteId },
  });

  const firstPublication = await prisma.publication.findFirst({
    where: { nationciteId },
    orderBy: { datePublished: "asc" },
    select: { datePublished: true },
  });

  const hasPublicationRows = publicationCount > 0;
  const estimatedPublicationCount = Math.max(
    1,
    Math.round(Math.max(hIndexTotal * 4, hIndexLast5 * 5)),
  );

  const publications = hasPublicationRows
    ? publicationCount
    : estimatedPublicationCount;

  if (firstPublication) {
    const currentYear = new Date().getFullYear();
    const yearsSinceFirstPublication = Math.max(
      1,
      currentYear - firstPublication.datePublished.getFullYear(),
    );

    return {
      hasPublicationRows,
      publications,
      yearsSinceFirstPublication,
      isEstimated: !hasPublicationRows,
    };
  }

  const estimatedCareerYears = Math.max(
    5,
    Math.min(
      30,
      Math.round((hIndexTotal / Math.max(hIndexLast5 || 1, 1)) * 7),
    ),
  );

  return {
    hasPublicationRows,
    publications,
    yearsSinceFirstPublication: estimatedCareerYears,
    isEstimated: true,
  };
}