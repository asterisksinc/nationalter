import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Verify admin access
    requireAdmin(req);

    // Fetch all users with their registration data
    const users = await prisma.authUser.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        registration: {
          select: {
            nationciteId: true,
            type: true,
            status: true,
            medical: {
              select: {
                plan: true,
                name: true,
              },
            },
            researcher: {
              select: {
                plan: true,
                name: true,
              },
            },
            orgReg: {
              select: {
                plan: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data to match frontend expectations
    const formattedUsers = users.map((user) => {
      // Extract plan and name from the appropriate registration type
      let plan = "Basic"; // Default plan
      let displayName = user.email.split("@")[0];

      if (user.registration) {
        // Get plan from the specific registration type
        if (user.registration.medical) {
          plan = user.registration.medical.plan || "Basic";
          displayName = user.registration.medical.name || displayName;
        } else if (user.registration.researcher) {
          plan = user.registration.researcher.plan || "Basic";
          displayName = user.registration.researcher.name || displayName;
        } else if (user.registration.orgReg) {
          plan = user.registration.orgReg.plan || "Basic";
          displayName = user.registration.orgReg.name || displayName;
        }
      }

      return {
        id: user.id,
        name: displayName,
        email: user.email,
        role: user.role,
        status: user.isActive ? "Active" : "Inactive",
        plan: plan,
        lastLogin: user.lastLoginAt ? getTimeAgo(user.lastLoginAt) : "Never",
        avatar: "/logos/user.png",
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedUsers,
      total: formattedUsers.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch users",
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 403 }
    );
  }
}

// Helper function to get relative time
function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 120) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;

  return `${Math.floor(days / 30)}mo ago`;
}
