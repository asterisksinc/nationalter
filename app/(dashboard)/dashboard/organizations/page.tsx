"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  StatItem,
  HIndexChart,
  ProfileCompleteness,
  TicketsTable,
} from "./components";
import { CreateTicketModal } from "@/components/shared/tickets"; // Using organization ticket modal

// --- Types ---

interface TicketData {
  id: string;
  type: string;
  status: string;
  date: string;
  createdAt: string;
}

interface DashboardData {
  user: {
    id: number;
    email: string;
    lastLoginAt: string;
    createdAt: string;
  };
  registration: {
    id: number;
    nationciteId: string;
    type: string;
    status: string;
  };
  organizationProfile: {
    name: string;
    domain: string;
    email: string;
  };
  organizationMetrics: {
    worldRank?: number;
    countryRank?: number;
    hIndexTotal?: number;
    hIndexLast5?: number;
    orgName?: string;
  } | null;
  tickets: {
    id: number;
    ticketId: string;
    issueType: string;
    status: string;
    createdAt: string;
  }[];
}

// --- Mock Data for Chart ---
const chartData = [
  { month: "Jan", value: 4.2 },
  { month: "Feb", value: 5.8 },
  { month: "Mar", value: 4.5 },
  { month: "Apr", value: 5.5 },
  { month: "May", value: 7.2 },
  { month: "Jun", value: 6.1 },
  { month: "Jul", value: 7.3 },
  { month: "Aug", value: 5.2 },
  { month: "Sept", value: 6.5 },
  { month: "Oct", value: 7.8 },
  { month: "Nov", value: 7.0 },
  { month: "Dec", value: 5.5 },
];

// --- Main Page Component ---

export default function OrganizationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/org/me");
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          throw new Error(json.message || "Failed to load data");
        }
      } catch (err) {
        console.error(err);
        setError("Could not load dashboard information.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2
          className="animate-spin text-[var(--color-primary)]"
          size={32}
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || "No data found"}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  // Map API status to StatusBadge-compatible status
  const mapStatus = (
    status: string,
  ):
    | "Approved"
    | "Awaiting Review"
    | "Rejected"
    | "Under Review"
    | "Active" => {
    const statusUpper = status?.toUpperCase() || "";
    const statusLower = status?.toLowerCase() || "";

    if (statusUpper === "RESOLVED" || statusLower === "approved")
      return "Approved";
    if (statusUpper === "OPEN" || statusUpper === "PENDING")
      return "Awaiting Review";
    if (statusUpper === "REJECTED") return "Rejected";
    if (statusUpper === "IN_PROGRESS" || statusLower === "under review")
      return "Under Review";
    if (statusUpper === "CLOSED" || statusLower === "active") return "Active";

    // Default fallback for unknown statuses
    return "Awaiting Review";
  };

  // Derived Data
  // Filter out registration tickets
  const recentTickets: TicketData[] = data.tickets
    .filter((t) => t.issueType !== "NEW_REGISTRATION")
    .map((t) => ({
      id: t.ticketId,
      type: t.issueType,
      status: mapStatus(t.status),
      date: new Date(t.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdAt: t.createdAt,
    }));

  const openCount = data.tickets.filter(
    (t) =>
      t.issueType !== "NEW_REGISTRATION" &&
      (t.status === "OPEN" || t.status === "PENDING"),
  ).length;
  const reviewCount = data.tickets.filter(
    (t) =>
      t.issueType !== "NEW_REGISTRATION" &&
      (t.status === "IN_PROGRESS" || t.status === "Under Review"),
  ).length;
  const approvedCount = data.tickets.filter(
    (t) =>
      t.issueType !== "NEW_REGISTRATION" &&
      (t.status === "RESOLVED" ||
        t.status === "Approved" ||
        t.status === "CLOSED"),
  ).length;
  const rejectedCount = data.tickets.filter(
    (t) =>
      t.issueType !== "NEW_REGISTRATION" &&
      (t.status === "REJECTED" || t.status === "Rejected"),
  ).length;

  const name = data.organizationProfile?.name || data.user.email.split("@")[0];

  const metrics = data.organizationMetrics || {
    worldRank: 0,
    countryRank: 0,
    hIndexTotal: 0,
  };

  return (
    <>
      <main className="pb-8">
        {/* Welcome */}
        <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
          <div className="text-[18px] md:text-[16px] font-semibold leading-[120%] tracking-[-0.006em] text-[#0E121B]">
            Welcome, {name}!
          </div>
          <p className="text-[13px] md:text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mt-1">
            Track your organization's research impact. NationCite ID:{" "}
            <span className="font-mono text-[var(--color-primary)]">
              {data.registration.nationciteId}
            </span>
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-4 md:mb-6">
          <div
            className="
              rounded-xl border border-[#E1E4EA] bg-white
              flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_minmax(100px,0.8fr)] lg:h-[100px] lg:items-center
              overflow-hidden
            "
          >
            {/* Mobile: 2x2 Grid for first 4 items */}
            <div className="grid grid-cols-2 lg:contents">
              <StatItem
                label="World Rank"
                value={
                  metrics.worldRank
                    ? `#${metrics.worldRank.toLocaleString()}`
                    : "--"
                }
                change=""
                isPositive={true}
                className=""
              />
              <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>

              <StatItem
                label="Country Rank"
                value={
                  metrics.countryRank
                    ? `#${metrics.countryRank.toLocaleString()}`
                    : "--"
                }
                change=""
                isPositive={false}
                className="relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] lg:after:hidden"
              />
              <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>

              <StatItem
                label="Total H-Index"
                value={metrics.hIndexTotal?.toString() || "0"}
                change=""
                isPositive={true}
                className=""
              />
              <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>

              {/* Add another metric or spacer if needed */}
              {/* Using placeholder for alignment equality with researcher dashboard if desired, or skip */}
            </div>
            {/* Divider handled above */}

            {/* Mobile: Publications Full Width */}
            <div className="col-span-2 lg:col-span-1 lg:border-t-0 border-[#E1E4EA] lg:h-auto lg:self-center lg:max-w-[140px]">
              <StatItem
                label="Publications"
                value="N/A"
                change=""
                isPositive
                isHighlight
                className="h-full px-4 py-3 lg:px-5 lg:py-3"
              />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <HIndexChart data={chartData} />
          <div className="hidden lg:block lg:col-span-4">
            <ProfileCompleteness percentage={90} missingPublications={0} />
          </div>
        </div>

        {/* Tickets */}
        <TicketsTable
          tickets={recentTickets}
          openCount={openCount}
          reviewCount={reviewCount}
          approvedCount={approvedCount}
          rejectedCount={rejectedCount}
          onRaiseTicket={() => setIsModalOpen(true)}
          onFilter={() => {
            // Filter functionality - can be enhanced later
            console.log("Filter clicked");
          }}
        />

        {/* Mobile Profile Completeness */}
        <div className="mt-6 lg:hidden">
          <ProfileCompleteness percentage={90} missingPublications={0} />
        </div>
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userType="Organization"
        nationciteId={data.registration.nationciteId}
        userName={name}
      />
    </>
  );
}
