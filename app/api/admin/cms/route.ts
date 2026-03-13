import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth"; // adjust path if needed


/////////////////////////////////////////////////////
// GET CMS VALUE
/////////////////////////////////////////////////////

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "Key is required" },
        { status: 400 }
      );
    }

    const cms = await prisma.cms.findUnique({
      where: { key }
    });

    if (!cms) {
      return NextResponse.json(
        { error: "CMS entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cms);

  } catch (error) {
    console.error("CMS GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/////////////////////////////////////////////////////
// CREATE CMS ENTRY
/////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const cms = await prisma.cms.create({
      data: {
        key,
        value
      }
    });

    return NextResponse.json({
      message: "CMS entry created",
      data: cms
    });

  } catch (error: any) {
    console.error("CMS POST Error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Key already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/////////////////////////////////////////////////////
// UPDATE CMS ENTRY
/////////////////////////////////////////////////////

export async function PUT(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    const cms = await prisma.cms.update({
      where: { key },
      data: {
        value
      }
    });

    return NextResponse.json({
      message: "CMS updated successfully",
      data: cms
    });

  } catch (error) {
    console.error("CMS PUT Error:", error);

    return NextResponse.json(
      { error: "CMS entry not found or update failed" },
      { status: 500 }
    );
  }
}