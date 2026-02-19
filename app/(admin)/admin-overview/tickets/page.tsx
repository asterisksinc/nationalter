"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { TicketTable, TicketData } from "@/components/shared/tickets";
import { RefreshCw, Loader2 } from "lucide-react";
import "../tickets/ticket.css";

export default function TicketPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, OPEN, IN_PROGRESS, RESOLVED

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("excludeRegistration", "true");
      if (filter !== "ALL") {
        queryParams.append("status", filter);
      }

      const res = await fetch(
        `/api/tickets/tickets-get?${queryParams.toString()}`,
      );
      const json = await res.json();

      if (json.tickets) {
        setTickets(json.tickets);
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const handleTicketClick = (ticket: TicketData) => {
    router.push(`/admin-overview/tickets/${ticket.ticketId}`);
  };

  const getStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "OPEN" || t.status === "PENDING")
        .length,
      resolved: tickets.filter(
        (t) =>
          t.status === "RESOLVED" ||
          t.status === "APPROVED" ||
          t.status === "CLOSED",
      ).length,
      urgent: tickets.filter((t) => t.impactLevel === "high").length,
    };
  };

  const stats = getStats();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="zui-admin-layout min-h-screen flex relative">
      <DashboardSidebar
        activePage="tickets"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="kryx-main-content flex-1 transition-all duration-300 ml-0 md:ml-[260px] bg-gray-50 w-full overflow-x-hidden">
        <DashboardHeader
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Tickets" }]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-2xl font-bold text-[#0E121B]">
                Support Tickets
              </div>
              <p className="text-sm text-[#525866]">
                Manage and resolve user support requests
              </p>
            </div>

            <button
              onClick={fetchTickets}
              className="p-2 text-[#525866] hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
              title="Refresh Tickets"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-[#525866] mb-1">Total Tickets</p>
              <p className="text-2xl font-bold text-[#0E121B]">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-[#525866] mb-1">Open Tickets</p>
              <p className="text-2xl font-bold text-[#f59e0b]">{stats.open}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-[#525866] mb-1">Resolved</p>
              <p className="text-2xl font-bold text-[#10b981]">
                {stats.resolved}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-[#525866] mb-1">High Priority</p>
              <p className="text-2xl font-bold text-[#ef4444]">
                {stats.urgent}
              </p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 overflow-x-auto mb-4">
                <span className="text-sm text-[#525866] font-medium">
                  Filter by Status:
                </span>
                <button
                  onClick={() => setFilter("ALL")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === "ALL"
                    ? "bg-[#FFF1E7] text-[#FF7A00]"
                    : "text-[#525866] hover:bg-gray-100"
                    }`}
                >
                  All Tickets
                </button>
                <button
                  onClick={() => setFilter("OPEN")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === "OPEN"
                    ? "bg-[#FFF1E7] text-[#FF7A00]"
                    : "text-[#525866] hover:bg-gray-100"
                    }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setFilter("IN_PROGRESS")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === "IN_PROGRESS"
                    ? "bg-[#FFF1E7] text-[#FF7A00]"
                    : "text-[#525866] hover:bg-gray-100"
                    }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter("RESOLVED")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === "RESOLVED"
                    ? "bg-[#FFF1E7] text-[#FF7A00]"
                    : "text-[#525866] hover:bg-gray-100"
                    }`}
                >
                  Resolved
                </button>
              </div>
            </div>

            {/* Shared Ticket Table */}
            <TicketTable
              tickets={tickets}
              loading={loading}
              onTicketClick={handleTicketClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
