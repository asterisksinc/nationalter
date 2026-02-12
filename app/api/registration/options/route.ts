import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/registration/options
 * Fetch dropdown options for registration forms
 * Query params: type (institutions | specialties | hospitals | councils | domains)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search") || "";

    if (!type) {
      return NextResponse.json(
        { success: false, message: "type parameter is required" },
        { status: 400 }
      );
    }

    let options: string[] = [];

    switch (type) {
      case "institutions":
        // Fetch unique organization names from OrgsPublic
        const orgs = await prisma.orgsPublic.findMany({
          where: search
            ? { orgName: { contains: search, mode: "insensitive" } }
            : undefined,
          select: { orgName: true },
          distinct: ["orgName"],
          take: 50,
          orderBy: { worldRank: "asc" },
        });
        options = orgs.map((o) => o.orgName);
        break;

      case "specialties":
        // Static list of medical specialties
        options = [
          "Cardiology",
          "Neurology",
          "Oncology",
          "Orthopedics",
          "Pediatrics",
          "Dermatology",
          "Psychiatry",
          "Radiology",
          "Anesthesiology",
          "Emergency Medicine",
          "General Surgery",
          "Internal Medicine",
          "Obstetrics & Gynecology",
          "Ophthalmology",
          "Pathology",
          "Nephrology",
          "Gastroenterology",
          "Pulmonology",
          "Endocrinology",
          "Rheumatology",
          "Urology",
          "ENT (Otolaryngology)",
          "Plastic Surgery",
          "Vascular Surgery",
          "Geriatrics",
          "Infectious Disease",
          "Hematology",
          "Palliative Care",
          "Sports Medicine",
          "Family Medicine",
        ];
        if (search) {
          options = options.filter((o) =>
            o.toLowerCase().includes(search.toLowerCase())
          );
        }
        break;

      case "hospitals":
        // Static list of major hospitals (can be expanded)
        options = [
          "All India Institute of Medical Sciences (AIIMS), Delhi",
          "Apollo Hospitals",
          "Fortis Healthcare",
          "Max Healthcare",
          "Medanta - The Medicity",
          "Kokilaben Dhirubhai Ambani Hospital",
          "Lilavati Hospital",
          "Hinduja Hospital",
          "Tata Memorial Hospital",
          "Christian Medical College (CMC), Vellore",
          "PGIMER, Chandigarh",
          "NIMHANS, Bangalore",
          "Narayana Health",
          "Manipal Hospitals",
          "Columbia Asia Hospitals",
          "Aster DM Healthcare",
          "Wockhardt Hospitals",
          "Global Hospitals",
          "Sir Ganga Ram Hospital",
          "BLK Super Speciality Hospital",
          "Jaslok Hospital",
          "Breach Candy Hospital",
          "Sankara Nethralaya",
          "L V Prasad Eye Institute",
          "Government Medical College Hospital",
          "Private Practice",
        ];
        if (search) {
          options = options.filter((o) =>
            o.toLowerCase().includes(search.toLowerCase())
          );
        }
        break;

      case "councils":
        // State Medical Councils
        options = [
          "Medical Council of India (MCI)",
          "National Medical Commission (NMC)",
          "Andhra Pradesh Medical Council",
          "Bihar Medical Council",
          "Chhattisgarh Medical Council",
          "Delhi Medical Council",
          "Goa Medical Council",
          "Gujarat Medical Council",
          "Haryana Medical Council",
          "Himachal Pradesh Medical Council",
          "Jharkhand Medical Council",
          "Karnataka Medical Council",
          "Kerala Medical Council",
          "Madhya Pradesh Medical Council",
          "Maharashtra Medical Council",
          "Manipur Medical Council",
          "Meghalaya Medical Council",
          "Nagaland Medical Council",
          "Odisha Medical Council",
          "Punjab Medical Council",
          "Rajasthan Medical Council",
          "Tamil Nadu Medical Council",
          "Telangana Medical Council",
          "Travancore Cochin Medical Council",
          "Tripura Medical Council",
          "Uttar Pradesh Medical Council",
          "Uttarakhand Medical Council",
          "West Bengal Medical Council",
        ];
        if (search) {
          options = options.filter((o) =>
            o.toLowerCase().includes(search.toLowerCase())
          );
        }
        break;

      case "domains":
        // Research domains
        options = [
          "Life Sciences",
          "Physical Sciences",
          "Engineering & Technology",
          "Computer Science & AI",
          "Mathematics",
          "Chemistry",
          "Physics",
          "Biology",
          "Medicine & Health Sciences",
          "Environmental Sciences",
          "Agricultural Sciences",
          "Materials Science",
          "Earth Sciences",
          "Social Sciences",
          "Psychology",
          "Economics",
          "Business & Management",
          "Law",
          "Education",
          "Humanities",
          "Arts",
          "Philosophy",
          "History",
          "Linguistics",
          "Political Science",
          "Sociology",
          "Anthropology",
        ];
        if (search) {
          options = options.filter((o) =>
            o.toLowerCase().includes(search.toLowerCase())
          );
        }
        break;

      case "researchFocus":
        // Medical research focus areas
        options = [
          "Clinical Trials",
          "Public Health",
          "Epidemiology",
          "Genetics & Genomics",
          "Drug Discovery",
          "Cancer Research",
          "Cardiovascular Research",
          "Neuroscience",
          "Infectious Diseases",
          "Immunology",
          "Regenerative Medicine",
          "Stem Cell Research",
          "Biomedical Engineering",
          "Health Policy",
          "Preventive Medicine",
          "Medical Imaging",
          "Translational Research",
          "Precision Medicine",
          "Digital Health",
          "Global Health",
        ];
        if (search) {
          options = options.filter((o) =>
            o.toLowerCase().includes(search.toLowerCase())
          );
        }
        break;

      default:
        return NextResponse.json(
          { success: false, message: "Invalid type parameter" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error("Registration options fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
