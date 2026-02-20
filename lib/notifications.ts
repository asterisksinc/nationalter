import { prisma } from "@/lib/prisma";

// Force TypeScript to reload Prisma types
type CreateNotificationParams = {
  recipientId: string;
  type: string;
  title: string;
  message: string;
  redirectUrl: string;
  referenceId?: string;
};

export async function createNotification(params: CreateNotificationParams) {
  console.log('[notifications] Creating notification:', params);
  
  // Prevent duplicate: same recipient + type + referenceId within last 60 seconds
  if (params.referenceId) {
    const recent = await prisma.notification.findFirst({
      where: {
        recipientId: params.recipientId,
        type: params.type,
        referenceId: params.referenceId,
        createdAt: { gte: new Date(Date.now() - 60_000) },
      },
    });
    if (recent) {
      console.log('[notifications] Duplicate notification prevented:', recent.id);
      return recent;
    }
  }

  const notification = await prisma.notification.create({ data: params });
  console.log('[notifications] Notification created successfully:', notification.id);
  return notification;
}

export async function createAdminNotification(
  params: Omit<CreateNotificationParams, "recipientId">,
) {
  return createNotification({ ...params, recipientId: "ADMIN" });
}
