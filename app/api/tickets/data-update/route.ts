import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    // ✅ Admin auth
    requireAdmin(req);

    const body = await req.json();

    const { type, nationciteId } = body;

    // ✅ Validate type
    if (!type || !["SCHOLAR", "ORG"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "type must be SCHOLAR or ORG",
        },
        { status: 400 }
      );
    }

    // ✅ Validate nationciteId
    if (!nationciteId) {
      return NextResponse.json(
        {
          success: false,
          message: "nationciteId is required",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {

      // =========================
      // SCHOLAR UPDATE
      // =========================
      if (type === "SCHOLAR") {

        const existing = await tx.scholarsPublic.findUnique({
          where: { nationciteId },
        });

        if (!existing) {
          throw new Error("Scholar not found");
        }

        const updated = await tx.scholarsPublic.update({
          where: { nationciteId },
          data: {

            worldRank: body.worldRank ?? existing.worldRank,
            countryRank: body.countryRank ?? existing.countryRank,
            universityRank: body.universityRank ?? existing.universityRank,

            scholarName: body.scholarName ?? existing.scholarName,
            orgName: body.orgName ?? existing.orgName,

            mainSubject: body.mainSubject ?? existing.mainSubject,
            subField: body.subField ?? existing.subField,

            hIndexTotal: body.hIndexTotal ?? existing.hIndexTotal,
            hIndexLast5: body.hIndexLast5 ?? existing.hIndexLast5,
            hIndexRatio: body.hIndexRatio ?? existing.hIndexRatio,
          },
        });

        return updated;
      }

      // =========================
      // ORG UPDATE
      // =========================
      if (type === "ORG") {

        const existing = await tx.orgsPublic.findUnique({
          where: { nationciteId },
        });

        if (!existing) {
          throw new Error("Organization not found");
        }

        const updated = await tx.orgsPublic.update({
          where: { nationciteId },
          data: {

            worldRank: body.worldRank ?? existing.worldRank,
            countryRank: body.countryRank ?? existing.countryRank,

            orgName: body.orgName ?? existing.orgName,

            hIndexTotal: body.hIndexTotal ?? existing.hIndexTotal,
            hIndexLast5: body.hIndexLast5 ?? existing.hIndexLast5,
          },
        });

        return updated;
      }

      throw new Error("Invalid type");

    });

    return NextResponse.json(
      {
        success: true,
        message: `${type} updated successfully`,
        data: result,
      },
      { status: 200 }
    );

  } catch (error: any) {

    console.error("data-update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );

  }
}
