import { NextRequest, NextResponse } from "next/server";
import { ContactStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const SORTABLE_FIELDS = new Set(["createdAt", "name", "email", "inquiryType", "status"]);

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim();
    const status = (searchParams.get("status") || "ALL").trim().toUpperCase();
    const inquiryType = (searchParams.get("inquiryType") || "ALL").trim();
    const sortBy = (searchParams.get("sortBy") || "createdAt").trim();
    const sortOrder = (searchParams.get("sortOrder") || "desc").trim().toLowerCase() === "asc" ? "asc" : "desc";
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") || "25")));

    const where: {
      OR?: Array<Record<string, unknown>>;
      status?: ContactStatus;
      inquiryType?: string;
    } = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { org: { contains: search, mode: "insensitive" } },
        { inquiryType: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status !== "ALL" && ["PENDING", "RESOLVED", "CLOSED"].includes(status)) {
      where.status = status as ContactStatus;
    }

    if (inquiryType && inquiryType !== "ALL") {
      where.inquiryType = inquiryType;
    }

    const orderByField = SORTABLE_FIELDS.has(sortBy) ? sortBy : "createdAt";

    const [rows, total, inquiryTypes] = await Promise.all([
      prisma.contactUs.findMany({
        where,
        orderBy: { [orderByField]: sortOrder },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactUs.count({ where }),
      prisma.contactUs.findMany({
        select: { inquiryType: true },
        distinct: ["inquiryType"],
        orderBy: { inquiryType: "asc" },
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: rows,
        meta: {
          total,
          page,
          pageSize,
          totalPages: Math.max(1, Math.ceil(total / pageSize)),
          inquiryTypes: inquiryTypes.map((x) => x.inquiryType),
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";

    if (message === "Unauthorized" || message === "Invalid or expired token") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (message === "Forbidden: Admin access required") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();
    const id = Number(body?.id);
    const statusRaw = String(body?.status || "").toUpperCase();

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ success: false, message: "Valid id is required" }, { status: 400 });
    }

    if (!["PENDING", "RESOLVED", "CLOSED"].includes(statusRaw)) {
      return NextResponse.json({ success: false, message: "Valid status is required" }, { status: 400 });
    }

    const updated = await prisma.contactUs.update({
      where: { id },
      data: { status: statusRaw as ContactStatus },
    });

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";

    if (message === "Unauthorized" || message === "Invalid or expired token") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    if (message === "Forbidden: Admin access required") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
