import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth"; // your existing admin guard

// All Indian States + UTs
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export async function GET(req: NextRequest) {
  try {
    // ✅ Admin check
    await requireAdmin(req);

    // Initialize all states with 0
    const stateCounts: Record<string, number> = {};

    INDIAN_STATES.forEach(state => {
      stateCounts[state] = 0;
    });

    // Fetch approved medical professionals
    const medical = await prisma.medicalProfessional.findMany({
      where: {
        registration: {
          status: "APPROVED"
        }
      },
      select: {
        state: true
      }
    });

    // Fetch approved researchers
    const researchers = await prisma.researchers.findMany({
      where: {
        registration: {
          status: "APPROVED"
        }
      },
      select: {
        state: true
      }
    });

    // Fetch approved orgs
    const orgs = await prisma.orgsRegistered.findMany({
      where: {
        registration: {
          status: "APPROVED"
        }
      },
      select: {
        state: true
      }
    });

    // Combine all
    const all = [...medical, ...researchers, ...orgs];

    // Count per state
    for (const entry of all) {
      const state = entry.state?.trim();

      if (!state) continue;

      // Only count Indian states
      if (stateCounts.hasOwnProperty(state)) {
        stateCounts[state]++;
      }
    }

    return NextResponse.json(stateCounts);

  } catch (error) {
    console.error("Map analytics error:", error);

    return NextResponse.json(
      { error: "Failed to fetch map analytics" },
      { status: 500 }
    );
  }
}
