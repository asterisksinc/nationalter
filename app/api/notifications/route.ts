import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/notifications
 * Fetches unread + recent notifications for the current user.
 * Admin sees recipientId="ADMIN"; users see recipientId=nationciteId.
 * Query params: ?unreadOnly=true&limit=20&after=<isoDate>
 */
export async function GET(req: NextRequest) {
  try {
    const payload = requireAuth(req);
    const isAdmin = payload.role === "ADMIN";

    console.log(`[notifications API] Request from ${isAdmin ? 'ADMIN' : 'USER'}:`, { 
      role: payload.role, 
      nationciteId: payload.nationciteId,
      userId: payload.userId,
      registrationId: payload.registrationId 
    });

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limit = Math.min(Number(searchParams.get("limit")) || 30, 50);
    const after = searchParams.get("after"); // ISO date string for incremental polling

    // Determine recipientId
    let recipientId: string;
    if (isAdmin) {
      recipientId = "ADMIN";
    } else {
      // Resolve nationciteId from JWT or registration lookup
      recipientId = (payload.nationciteId as string) || "";

      if (!recipientId) {
        const registrationOr: Array<{ id?: number; authUserId?: number }> = [];
        const registrationId = Number(payload.registrationId);
        const userId = Number(payload.userId);
        if (Number.isFinite(registrationId) && registrationId > 0) registrationOr.push({ id: registrationId });
        if (Number.isFinite(userId) && userId > 0) registrationOr.push({ authUserId: userId });

        if (registrationOr.length > 0) {
          const reg = await prisma.registration.findFirst({
            where: { OR: registrationOr },
            select: { nationciteId: true },
          });
          recipientId = reg?.nationciteId || "";
        }
      }

      if (!recipientId) {
        console.log('[notifications API] No recipientId found for user, returning empty');
        return NextResponse.json({ success: true, data: [], unreadCount: 0 });
      }
    }

    console.log(`[notifications API] Fetching notifications for recipientId: ${recipientId}`);

    // Build where clause — lightweight query
    const where: Record<string, unknown> = { recipientId };
    if (unreadOnly) where.isRead = false;
    if (after) where.createdAt = { gt: new Date(after) };

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      prisma.notification.count({
        where: { recipientId, isRead: false },
      }),
    ]);

    console.log(`[notifications API] Found ${notifications.length} notifications, ${unreadCount} unread`);

    return NextResponse.json({ success: true, data: notifications, unreadCount });
  } catch (error: any) {
    console.error('[notifications API] Error:', error);
    if (error.message === "Unauthorized" || error.message?.includes("token")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/notifications
 * Mark notifications as read.
 * Body: { ids: number[] } or { markAll: true }
 */
export async function PATCH(req: NextRequest) {
  try {
    const payload = requireAuth(req);
    const isAdmin = payload.role === "ADMIN";
    const body = await req.json();

    let recipientId: string;
    if (isAdmin) {
      recipientId = "ADMIN";
    } else {
      recipientId = (payload.nationciteId as string) || "";
      if (!recipientId) {
        const registrationOr: Array<{ id?: number; authUserId?: number }> = [];
        const registrationId = Number(payload.registrationId);
        const userId = Number(payload.userId);
        if (Number.isFinite(registrationId) && registrationId > 0) registrationOr.push({ id: registrationId });
        if (Number.isFinite(userId) && userId > 0) registrationOr.push({ authUserId: userId });

        if (registrationOr.length > 0) {
          const reg = await prisma.registration.findFirst({
            where: { OR: registrationOr },
            select: { nationciteId: true },
          });
          recipientId = reg?.nationciteId || "";
        }
      }
    }

    if (body.markAll) {
      await prisma.notification.updateMany({
        where: { recipientId, isRead: false },
        data: { isRead: true },
      });
    } else if (body.ids && Array.isArray(body.ids)) {
      await prisma.notification.updateMany({
        where: { id: { in: body.ids }, recipientId },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message?.includes("token")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    console.error("Notification update error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
