import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// Helper function to generate CSV
function generateCSV(data: any): string {
  const lines: string[] = [];
  
  // User information
  lines.push("USER INFORMATION");
  lines.push("Email,Role,Email Verified,Last Login,Account Created");
  lines.push(
    `"${data.user.email}","${data.user.role}","${data.user.isEmailVerified}","${data.user.lastLoginAt || 'N/A'}","${data.user.accountCreatedAt}"`
  );
  lines.push("");
  
  // Registration
  if (data.registration) {
    lines.push("REGISTRATION");
    lines.push("NationCite ID,Type,Status");
    lines.push(`"${data.registration.nationciteId}","${data.registration.type}","${data.registration.status}"`);
    lines.push("");
  }
  
  // Profile
  if (data.profile) {
    lines.push("PROFILE");
    lines.push("Type,Name,Institution,Field");
    const name = data.profile.name || data.profile.orgName || 'N/A';
    const institution = data.profile.institution || data.profile.address || 'N/A';
    const field = data.profile.field || data.profile.specialty || 'N/A';
    lines.push(`"${data.profile.type}","${name}","${institution}","${field}"`);
    lines.push("");
  }
  
  // Publications
  if (data.publications && data.publications.length > 0) {
    lines.push("PUBLICATIONS");
    lines.push("Title,Journal,Date Published,Field,Total Citations,Citations (Last 5 Years)");
    data.publications.forEach((pub: any) => {
      lines.push(
        `"${pub.title || ''}","${pub.journalName || ''}","${pub.datePublished || ''}","${pub.field || ''}","${pub.citationsTotal || 0}","${pub.citationsLast5Years || 0}"`
      );
    });
    lines.push("");
  }
  
  // Tickets
  if (data.tickets && data.tickets.length > 0) {
    lines.push("TICKETS");
    lines.push("Ticket ID,Type,Issue Type,Status,Created,Updated");
    data.tickets.forEach((ticket: any) => {
      lines.push(
        `"${ticket.ticketId}","${ticket.type || ''}","${ticket.issueType || ''}","${ticket.status}","${ticket.createdAt}","${ticket.updatedAt || ''}"`
      );
    });
    lines.push("");
  }
  
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const payload = requireAuth(req);
    const body = await req.json();
    const format = body.format || "json"; // 'json' or 'csv'
    const authUserId = payload.userId;

    // Fetch auth user details
    const authUser = await prisma.authUser.findUnique({
      where: { id: authUserId },
      select: {
        id: true,
        email: true,
        role: true,
        isEmailVerified: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!authUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Fetch registration data
    const registration = await prisma.registration.findFirst({
      where: { authUserId },
      include: {
        researcher: true,
        medical: true,
        orgReg: true,
      },
    });

    // Fetch tickets
    const tickets = registration?.nationciteId
      ? await prisma.tickets.findMany({
          where: { nationciteId: registration.nationciteId },
          include: { comments: true },
        })
      : [];

    // Fetch publications
    const publications = registration?.nationciteId
      ? await prisma.publication.findMany({
          where: { nationciteId: registration.nationciteId },
        })
      : [];

    // Fetch public scholar metrics if applicable
    let scholarMetrics: any = null;
    if (registration?.nationciteId && authUser.role === "SCHOLAR") {
      scholarMetrics = await prisma.scholarsPublic.findUnique({
        where: { nationciteId: registration.nationciteId },
      });
    }

    // Fetch public org metrics if applicable
    let orgMetrics: any = null;
    if (registration?.nationciteId && authUser.role === "ORG") {
      orgMetrics = await prisma.orgsPublic.findUnique({
        where: { nationciteId: registration.nationciteId },
      });
    }

    // Compile export data
    const exportData = {
      exportedAt: new Date().toISOString(),
      exportedBy: "NationCite",
      user: {
        email: authUser.email,
        role: authUser.role,
        isEmailVerified: authUser.isEmailVerified,
        lastLoginAt: authUser.lastLoginAt,
        accountCreatedAt: authUser.createdAt,
      },
      registration: registration
        ? {
            nationciteId: registration.nationciteId,
            type: registration.type,
            status: registration.status,
          }
        : null,
      profile: registration?.researcher
        ? {
            type: "RESEARCHER",
            ...registration.researcher,
          }
        : registration?.medical
          ? {
              type: "MEDICAL",
              ...registration.medical,
            }
          : registration?.orgReg
            ? {
                type: "ORGANIZATION",
                ...registration.orgReg,
              }
            : null,
      metrics: scholarMetrics || orgMetrics || null,
      publications: publications.map((pub) => ({
        title: pub.title,
        journalName: pub.journalName,
        datePublished: pub.datePublished,
        field: pub.field,
        citationsTotal: pub.citationsTotal,
        citationsLast5Years: pub.citationsLast5Years,
      })),
      tickets: tickets.map((ticket) => ({
        ticketId: ticket.ticketId,
        type: ticket.type,
        issueType: ticket.issueType,
        description: ticket.description,
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        comments: ticket.comments.map((c) => ({
          comment: c.comments,
          createdAt: c.createdAt,
        })),
      })),
    };

    // Return based on format
    if (format === "csv") {
      // Generate CSV
      const csv = generateCSV(exportData);
      
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="nationcite-data-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    } else {
      // Return as JSON download
      const jsonString = JSON.stringify(exportData, null, 2);

      return new NextResponse(jsonString, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="nationcite-data-${new Date().toISOString().split("T")[0]}.json"`,
        },
      });
    }
  } catch (error: any) {
    console.error("Export data error:", error);

    if (error.message === "Unauthorized" || error.message === "Invalid or expired token") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to export data" },
      { status: 500 }
    );
  }
}
