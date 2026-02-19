export type AdminFunctionality = {
  id: string;
  title: string;
  description: string;
  route: string;
  section: string;
  keywords: string[];
};

export const ADMIN_FUNCTIONALITY_INDEX: AdminFunctionality[] = [
  {
    id: "dashboard.overview",
    title: "Dashboard Overview",
    description: "Open command center and platform summary",
    route: "/admin-overview",
    section: "Dashboard",
    keywords: ["dashboard", "overview", "home", "command center"],
  },
  {
    id: "dashboard.analyticsReports",
    title: "View All Reports",
    description: "Open analytics reports from dashboard",
    route: "/admin-overview/analytics",
    section: "Dashboard",
    keywords: ["reports", "analytics report", "view reports", "metrics"],
  },
  {
    id: "registrations.list",
    title: "Registration Requests",
    description: "Review pending registration submissions",
    route: "/admin-overview/registration-requests",
    section: "Registrations",
    keywords: ["registration", "requests", "pending approvals", "review registrations"],
  },
  {
    id: "registrations.approve",
    title: "Approve Registration",
    description: "Approve and assign NationCite ID",
    route: "/admin-overview/registration-requests",
    section: "Registrations",
    keywords: ["approve registration", "approve user", "assign nationcite id", "approval"],
  },
  {
    id: "registrations.reject",
    title: "Reject Registration",
    description: "Reject registration requests with reason",
    route: "/admin-overview/registration-requests",
    section: "Registrations",
    keywords: ["reject registration", "decline request", "deny registration"],
  },
  {
    id: "registrations.revoke",
    title: "Revoke Approval",
    description: "Revoke approved registration and unlink record",
    route: "/admin-overview/registration-requests",
    section: "Registrations",
    keywords: ["revoke approval", "unlink record", "undo approval"],
  },
  {
    id: "users.manage",
    title: "User Management",
    description: "Manage platform users and account access",
    route: "/admin-overview/user-management",
    section: "Users",
    keywords: ["users", "manage users", "user list", "accounts"],
  },
  {
    id: "users.add",
    title: "Add User",
    description: "Open user management to create a new user",
    route: "/admin-overview/user-management",
    section: "Users",
    keywords: ["add user", "create user", "new user", "invite user"],
  },
  {
    id: "users.edit",
    title: "Edit User",
    description: "Open user management to edit user profile and role",
    route: "/admin-overview/user-management",
    section: "Users",
    keywords: ["edit user", "update user", "change role"],
  },
  {
    id: "users.export",
    title: "Export Users",
    description: "Export filtered users to CSV",
    route: "/admin-overview/user-management",
    section: "Users",
    keywords: ["export users", "download users", "users csv"],
  },
  {
    id: "users.filter",
    title: "Filter Users",
    description: "Filter users by role, status, and plan",
    route: "/admin-overview/user-management",
    section: "Users",
    keywords: ["filter users", "user filters", "role filter", "status filter"],
  },
  {
    id: "tickets.list",
    title: "Support Tickets",
    description: "Open and manage admin support tickets",
    route: "/admin-overview/tickets",
    section: "Tickets",
    keywords: ["tickets", "support", "issues", "help requests"],
  },
  {
    id: "tickets.refresh",
    title: "Refresh Tickets",
    description: "Refresh ticket list and latest status",
    route: "/admin-overview/tickets",
    section: "Tickets",
    keywords: ["refresh tickets", "reload tickets", "sync tickets"],
  },
  {
    id: "tickets.filter",
    title: "Filter Tickets",
    description: "Filter tickets by status: open, in progress, resolved",
    route: "/admin-overview/tickets",
    section: "Tickets",
    keywords: ["filter tickets", "open tickets", "resolved tickets", "in progress"],
  },
  {
    id: "tickets.update",
    title: "Update Ticket Status",
    description: "Open ticket workflows to change status or priority",
    route: "/admin-overview/tickets",
    section: "Tickets",
    keywords: ["update ticket", "change status", "change priority", "resolve ticket"],
  },
  {
    id: "analytics.dashboard",
    title: "Analytics",
    description: "View analytics oversight dashboard",
    route: "/admin-overview/analytics",
    section: "Analytics",
    keywords: ["analytics", "dashboard analytics", "metrics", "reports"],
  },
  {
    id: "analytics.export",
    title: "Export Analytics Data",
    description: "Export analytics and performance data",
    route: "/admin-overview/analytics",
    section: "Analytics",
    keywords: ["export analytics", "download analytics", "analytics csv"],
  },
  {
    id: "analytics.timeRange",
    title: "Change Analytics Time Range",
    description: "Switch analytics window (e.g. last 30 days)",
    route: "/admin-overview/analytics",
    section: "Analytics",
    keywords: ["time range", "last 30 days", "analytics period", "date range"],
  },
  {
    id: "monetization.dashboard",
    title: "Monetization",
    description: "Open revenue cockpit and subscriber metrics",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["monetization", "revenue", "billing", "subscribers"],
  },
  {
    id: "monetization.addSubscriber",
    title: "Add Subscriber",
    description: "Open monetization page to add a subscriber",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["add subscriber", "new subscriber", "create subscriber"],
  },
  {
    id: "monetization.manageSubscriber",
    title: "Manage Subscriber",
    description: "Manage subscriber status, billing, and actions",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["manage subscriber", "subscriber actions", "subscription details"],
  },
  {
    id: "monetization.manualPayment",
    title: "Record Manual Payment",
    description: "Record offline/manual subscriber payment",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["manual payment", "record payment", "payment entry"],
  },
  {
    id: "monetization.grantAccess",
    title: "Grant Access",
    description: "Grant free-time access to a subscriber",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["grant access", "free time", "promotional access"],
  },
  {
    id: "monetization.cancelSubscription",
    title: "Cancel Subscription",
    description: "Cancel subscriber access at end or immediately",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["cancel subscription", "end subscription", "stop plan"],
  },
  {
    id: "monetization.export",
    title: "Export Revenue CSV",
    description: "Export monetization and subscriber CSV data",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["export csv", "revenue csv", "billing export"],
  },
  {
    id: "monetization.settings",
    title: "Billing Settings",
    description: "Open billing configuration options",
    route: "/admin-overview/monetization",
    section: "Monetization",
    keywords: ["billing settings", "payment settings", "invoice settings"],
  },
  {
    id: "dataset.new",
    title: "New Dataset Integration",
    description: "Upload and validate a new dataset",
    route: "/admin-overview/dataset/new",
    section: "Datasets",
    keywords: ["dataset", "new dataset", "data upload", "integration job"],
  },
  {
    id: "dataset.upload",
    title: "Upload Dataset File",
    description: "Upload CSV source file for import",
    route: "/admin-overview/dataset/new",
    section: "Datasets",
    keywords: ["upload file", "upload csv", "source file"],
  },
  {
    id: "dataset.validate",
    title: "Validate Dataset",
    description: "Validate rows, inspect errors, and re-validate",
    route: "/admin-overview/dataset/new",
    section: "Datasets",
    keywords: ["validate data", "error log", "re-validate", "data validation"],
  },
  {
    id: "dataset.publish",
    title: "Publish Dataset",
    description: "Confirm and publish dataset to production",
    route: "/admin-overview/dataset/new",
    section: "Datasets",
    keywords: ["publish dataset", "import data", "confirm import", "production publish"],
  },
];

const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

export const ADMIN_FUNCTIONALITY_LOOKUP: Record<string, string[]> =
  ADMIN_FUNCTIONALITY_INDEX.reduce<Record<string, string[]>>((acc, item) => {
    const keys = [item.title, item.description, item.route, ...item.keywords];

    keys.forEach((key) => {
      const normalizedKey = normalize(key);
      if (!acc[normalizedKey]) {
        acc[normalizedKey] = [];
      }
      acc[normalizedKey].push(item.id);
    });

    return acc;
  }, {});

const byId: Record<string, AdminFunctionality> =
  ADMIN_FUNCTIONALITY_INDEX.reduce<Record<string, AdminFunctionality>>(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {},
  );

export const searchAdminFunctionalities = (
  rawQuery: string,
  limit = 8,
): AdminFunctionality[] => {
  const query = normalize(rawQuery);

  if (!query) {
    return ADMIN_FUNCTIONALITY_INDEX.slice(0, limit);
  }

  const scores: Record<string, number> = {};

  Object.entries(ADMIN_FUNCTIONALITY_LOOKUP).forEach(([key, ids]) => {
    if (!key.includes(query)) {
      return;
    }

    ids.forEach((id) => {
      scores[id] = (scores[id] || 0) + 3;
    });
  });

  const tokens = query.split(" ").filter(Boolean);

  tokens.forEach((token) => {
    Object.entries(ADMIN_FUNCTIONALITY_LOOKUP).forEach(([key, ids]) => {
      if (!key.includes(token)) {
        return;
      }

      ids.forEach((id) => {
        scores[id] = (scores[id] || 0) + 1;
      });
    });
  });

  const ranked = Object.entries(scores)
    .map(([id, score]) => ({ item: byId[id], score }))
    .filter((entry) => Boolean(entry.item))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);

  return ranked;
};
