import { NextRequest, NextResponse } from "next/server";
import { ContactStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { sendContactReplyMail } from "@/lib/mailer";

const SORTABLE_FIELDS = new Set(["createdAt", "name", "email", "inquiryType", "status"]);

const CONTACT_REPLY_TEMPLATES: Record<
  string,
  { subject: string; body: (params: { name: string; inquiryType: string }) => string }
> = {
  acknowledgement: {
    subject: "NationCite | We received your query",
    body: ({ name, inquiryType }) =>
      `Hello ${name},\n\nThank you for reaching out regarding ${inquiryType}. We have reviewed your request and will share the next update shortly.\n\nRegards,\nNationCite Support`,
  },
  need_more_info: {
    subject: "NationCite | Additional details needed",
    body: ({ name }) =>
      `Hello ${name},\n\nThank you for contacting NationCite. To help you better, please share any relevant screenshots, IDs, or reference links related to your request.\n\nRegards,\nNationCite Support`,
  },
  resolved: {
    subject: "NationCite | Query resolved",
    body: ({ name }) =>
      `Hello ${name},\n\nYour query has been addressed and marked as resolved from our side. If you still need assistance, please reply to this email.\n\nRegards,\nNationCite Support`,
  },
};

function isMissingPhoneColumnError(error: unknown) {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return false;
  if (error.code !== "P2022") return false;
  const column = String(error.meta?.column || "").toLowerCase();
  return column.includes("phone");
}

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

    let rows: Array<{
      id: number;
      name: string;
      email: string;
      phone: string | null;
      org: string | null;
      inquiryType: string;
      message: string;
      status: ContactStatus;
      createdAt: Date;
    }> = [];
    let total = 0;
    let inquiryTypes: Array<{ inquiryType: string }> = [];

    try {
      [rows, total, inquiryTypes] = await Promise.all([
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
    } catch (error: unknown) {
      if (!isMissingPhoneColumnError(error)) throw error;

      // Backward-compatible fallback for DBs where ContactUs.phone migration is not applied.
      const fallbackWhere: {
        OR?: Array<Record<string, unknown>>;
        status?: ContactStatus;
        inquiryType?: string;
      } = { ...where };

      if (search) {
        fallbackWhere.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { org: { contains: search, mode: "insensitive" } },
          { inquiryType: { contains: search, mode: "insensitive" } },
          { message: { contains: search, mode: "insensitive" } },
        ];
      }

      const [fallbackRows, fallbackTotal, fallbackInquiryTypes] = await Promise.all([
        prisma.contactUs.findMany({
          where: fallbackWhere,
          orderBy: { [orderByField]: sortOrder },
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            name: true,
            email: true,
            org: true,
            inquiryType: true,
            message: true,
            status: true,
            createdAt: true,
          },
        }),
        prisma.contactUs.count({ where: fallbackWhere }),
        prisma.contactUs.findMany({
          select: { inquiryType: true },
          distinct: ["inquiryType"],
          orderBy: { inquiryType: "asc" },
        }),
      ]);

      rows = fallbackRows.map((row) => ({ ...row, phone: null }));
      total = fallbackTotal;
      inquiryTypes = fallbackInquiryTypes;
    }

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
    const action = String(body?.action || "status");

    if (action === "reply") {
      const id = Number(body?.id);
      const templateKey = String(body?.templateKey || "");
      const customMessage = String(body?.customMessage || "").trim();
      const markResolved = body?.markResolved === true;

      if (!Number.isFinite(id) || id <= 0) {
        return NextResponse.json({ success: false, message: "Valid id is required" }, { status: 400 });
      }
      if (!CONTACT_REPLY_TEMPLATES[templateKey]) {
        return NextResponse.json({ success: false, message: "Valid templateKey is required" }, { status: 400 });
      }

      const contact = await prisma.contactUs.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          inquiryType: true,
          status: true,
        },
      });

      if (!contact) {
        return NextResponse.json({ success: false, message: "Contact query not found" }, { status: 404 });
      }

      const template = CONTACT_REPLY_TEMPLATES[templateKey];
      const templateBody = template.body({
        name: contact.name,
        inquiryType: contact.inquiryType,
      });
      const finalBody = customMessage
        ? `${templateBody}\n\nAdditional Notes:\n${customMessage}`
        : templateBody;

      await sendContactReplyMail({
        to: contact.email,
        subject: template.subject,
        body: finalBody,
      });

      const updated = await prisma.contactUs.update({
        where: { id },
        data: { status: markResolved ? "RESOLVED" : contact.status },
      });

      return NextResponse.json({ success: true, data: updated, message: "Reply mail sent successfully" }, { status: 200 });
    }

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
