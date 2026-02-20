import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * Clean name by removing common prefixes and normalizing
 */
function cleanName(name: string): string {
  const prefixes = ["dr.", "dr", "prof.", "prof", "mr.", "mr", "mrs.", "mrs", "ms.", "ms"];
  let cleaned = name.toLowerCase().trim();

  for (const prefix of prefixes) {
    if (cleaned.startsWith(prefix + " ") || cleaned.startsWith(prefix + ".")) {
      cleaned = cleaned.slice(prefix.length).trim();
      if (cleaned.startsWith(".")) cleaned = cleaned.slice(1).trim();
    }
  }

  return cleaned;
}

/**
 * Extract meaningful search terms from a name
 */
function extractSearchTerms(name: string): string[] {
  const cleaned = cleanName(name);
  const terms = cleaned
    .split(/[\s,.-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);

  return [...new Set(terms)];
}

/**
 * GET /api/registration/compare/[ticketId]
 * Fetch registration data and potential matches from pre-seeded data
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ ticketId: string }> }
) {
  try {
    requireAdmin(req);

    const { ticketId } = await context.params;

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "ticketId is required" },
        { status: 400 }
      );
    }

    // Get already-linked nationciteIds (approved registrations with authUserId)
    const linkedRegistrations = await prisma.registration.findMany({
      where: {
        status: "APPROVED",
        authUserId: { not: null },
      },
      select: { nationciteId: true },
    });
    const linkedNationCiteIds = new Set(
      linkedRegistrations.map((r) => r.nationciteId)
    );

    // Fetch the registration by ticket ID
    const registration = await prisma.registration.findFirst({
      where: { ticketId },
      include: {
        medical: true,
        researcher: true,
        orgReg: true,
        ticket: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    // Get registrant details
    let registrantData: Record<string, unknown> | null = null;
    let name = "";
    let institution = "";

    if (registration.type === "MEDICAL" && registration.medical) {
      registrantData = registration.medical;
      name = registration.medical.name;
      institution = registration.medical.primaryHospital || "";
    } else if (registration.type === "RESEARCHER" && registration.researcher) {
      registrantData = registration.researcher;
      name = registration.researcher.name;
      institution = registration.researcher.institute || "";
    } else if (registration.type === "ORG" && registration.orgReg) {
      registrantData = registration.orgReg;
      name = registration.orgReg.name;
    }

    const searchTerms = extractSearchTerms(name);
    const institutionTerms = institution ? extractSearchTerms(institution) : [];

    // Find potential matches in pre-seeded data
    let potentialMatches: Array<{
      nationciteId: string;
      name: string;
      organization?: string;
      mainSubject?: string | null;
      subField?: string | null;
      hIndexTotal?: number;
      hIndexLast5?: number;
      hIndexRatio?: number;
      worldRank?: number | null;
      countryRank?: number | null;
      universityRank?: number | null;
      matchScore?: number;
    }> = [];

    if (registration.type === "MEDICAL" || registration.type === "RESEARCHER") {
      // Build search conditions for scholars
      const searchConditions: Array<{ scholarName: { contains: string; mode: "insensitive" } }> = [];
      const orgConditions: Array<{ orgName: { contains: string; mode: "insensitive" } }> = [];

      // Add name-based search conditions
      for (const term of searchTerms) {
        searchConditions.push({
          scholarName: { contains: term, mode: "insensitive" as const },
        });
      }

      // Add institution-based search conditions
      for (const term of institutionTerms) {
        if (term.length >= 3) {
          orgConditions.push({
            orgName: { contains: term, mode: "insensitive" as const },
          });
        }
      }

      // Search by name terms
      let scholarMatches = await prisma.scholarsPublic.findMany({
        where: {
          OR: searchConditions.length > 0 ? searchConditions : undefined,
        },
        take: 20,
        orderBy: { worldRank: "asc" },
      });

      // If no matches found by name, try institution
      if (scholarMatches.length === 0 && orgConditions.length > 0) {
        scholarMatches = await prisma.scholarsPublic.findMany({
          where: {
            OR: orgConditions,
          },
          take: 20,
          orderBy: { worldRank: "asc" },
        });
      }

      // If still no matches, fetch top scholars as fallback
      if (scholarMatches.length === 0) {
        scholarMatches = await prisma.scholarsPublic.findMany({
          take: 10,
          orderBy: { worldRank: "asc" },
        });
      }

      // Filter out already-linked and score matches
      potentialMatches = scholarMatches
        .filter((s) => !linkedNationCiteIds.has(s.nationciteId))
        .map((s) => {
        const scholarNameLower = s.scholarName.toLowerCase();
        const orgNameLower = s.orgName.toLowerCase();
        let score = 0;

        // Score based on name matching
        for (const term of searchTerms) {
          if (scholarNameLower.includes(term)) {
            score += 10;
          }
        }

        // Score based on institution matching
        for (const term of institutionTerms) {
          if (orgNameLower.includes(term)) {
            score += 5;
          }
        }

        // Bonus for high-ranked scholars
        if (s.worldRank && s.worldRank <= 1000) {
          score += 2;
        }

        return {
          nationciteId: s.nationciteId,
          name: s.scholarName,
          organization: s.orgName,
          mainSubject: s.mainSubject,
          subField: s.subField,
          hIndexTotal: s.hIndexTotal,
          hIndexLast5: s.hIndexLast5,
          hIndexRatio: s.hIndexRatio,
          worldRank: s.worldRank,
          countryRank: s.countryRank,
          universityRank: s.universityRank,
          matchScore: score,
        };
      });

      // Sort by score descending, then by worldRank ascending
      potentialMatches.sort((a, b) => {
        if ((b.matchScore || 0) !== (a.matchScore || 0)) {
          return (b.matchScore || 0) - (a.matchScore || 0);
        }
        return (a.worldRank || 999999) - (b.worldRank || 999999);
      });

      // Limit to top 10
      potentialMatches = potentialMatches.slice(0, 10);
    } else if (registration.type === "ORG") {
      // Search in OrgsPublic with improved matching
      const orgSearchConditions = searchTerms.map((term) => ({
        orgName: { contains: term, mode: "insensitive" as const },
      }));

      let orgMatches = await prisma.orgsPublic.findMany({
        where: {
          OR: orgSearchConditions.length > 0 ? orgSearchConditions : undefined,
        },
        take: 20,
        orderBy: { worldRank: "asc" },
      });

      // Fallback to top organizations
      if (orgMatches.length === 0) {
        orgMatches = await prisma.orgsPublic.findMany({
          take: 10,
          orderBy: { worldRank: "asc" },
        });
      }

      // Filter out already-linked and score matches
      potentialMatches = orgMatches
        .filter((o) => !linkedNationCiteIds.has(o.nationciteId))
        .map((o) => {
        const orgNameLower = o.orgName.toLowerCase();
        let score = 0;

        for (const term of searchTerms) {
          if (orgNameLower.includes(term)) {
            score += 10;
          }
        }

        return {
          nationciteId: o.nationciteId,
          name: o.orgName,
          hIndexTotal: o.hIndexTotal,
          hIndexLast5: o.hIndexLast5,
          worldRank: o.worldRank,
          countryRank: o.countryRank,
          matchScore: score,
        };
      });

      potentialMatches.sort((a, b) => {
        if ((b.matchScore || 0) !== (a.matchScore || 0)) {
          return (b.matchScore || 0) - (a.matchScore || 0);
        }
        return (a.worldRank || 999999) - (b.worldRank || 999999);
      });

      potentialMatches = potentialMatches.slice(0, 10);
    }

    // If already approved, fetch the linked public record
    let linkedPublicRecord: Record<string, unknown> | null = null;
    if (registration.status === "APPROVED" && registration.nationciteId) {
      if (registration.type === "MEDICAL" || registration.type === "RESEARCHER") {
        linkedPublicRecord = await prisma.scholarsPublic.findUnique({
          where: { nationciteId: registration.nationciteId },
        });
      } else if (registration.type === "ORG") {
        linkedPublicRecord = await prisma.orgsPublic.findUnique({
          where: { nationciteId: registration.nationciteId },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        registration: {
          id: registration.id,
          nationciteId: registration.nationciteId,
          type: registration.type,
          status: registration.status,
          ticketId: registration.ticketId,
        },
        ticket: registration.ticket,
        registrantData,
        potentialMatches,
        linkedPublicRecord,
      },
    });
  } catch (error) {
    console.error("Registration compare fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
