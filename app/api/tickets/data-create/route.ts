import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // ✅ Admin auth
    requireAdmin(req);

    const body = await req.json();
    const { type } = body;

    if (!type || !["SCHOLAR", "ORG"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "type must be SCHOLAR or ORG",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // =========================
      // SCHOLAR CREATE
      // =========================
      if (type === "SCHOLAR") {
        const last = await tx.scholarsPublic.findFirst({
          orderBy: { id: "desc" },
        });

        const nextId = (last?.id || 0) + 1;

        const nationciteId =
          "SC" + nextId.toString().padStart(7, "0");

        const created = await tx.scholarsPublic.create({
          data: {
            nationciteId,
            worldRank: body.worldRank ?? null,
            countryRank: body.countryRank ?? null,
            universityRank: body.universityRank ?? null,
            scholarName: body.scholarName,
            orgName: body.orgName,
            mainSubject: body.mainSubject ?? null,
            subField: body.subField ?? null,
            hIndexTotal: body.hIndexTotal,
            hIndexLast5: body.hIndexLast5,
            hIndexRatio: body.hIndexRatio,
          },
        });

        return created;
      }

      // =========================
      // ORG CREATE
      // =========================
      if (type === "ORG") {
        const last = await tx.orgsPublic.findFirst({
          orderBy: { id: "desc" },
        });

        const nextId = (last?.id || 0) + 1;

        const nationciteId =
          "ORG" + nextId.toString().padStart(5, "0");

        const created = await tx.orgsPublic.create({
          data: {
            nationciteId,
            worldRank: body.worldRank ?? null,
            countryRank: body.countryRank ?? null,
            orgName: body.orgName,
            hIndexTotal: body.hIndexTotal,
            hIndexLast5: body.hIndexLast5,
          },
        });

        return created;
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: `${type} created successfully`,
        data: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("tickets-create error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
