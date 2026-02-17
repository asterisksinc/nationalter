"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Plus, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface Ticket {
  ticketId?: string;
  id?: string;
  issueType?: string;
  type?: string;
  status: string;
  createdAt: string;
  date?: string;
}

interface TicketsTableProps {
  tickets: Ticket[];
  openCount: number;
  reviewCount: number;
  approvedCount: number;
  rejectedCount: number;
  onRaiseTicket: () => void;
  onFilter: () => void;
}

export const TicketsTable = ({
  tickets,
  openCount,
  reviewCount,
  approvedCount,
  rejectedCount,
  onRaiseTicket,
  onFilter,
}: TicketsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    issueType: "",
  });

  // Get unique values for filter options
  const uniqueStatuses = useMemo(
    () => [...new Set(tickets.map((t) => t.status))],
    [tickets],
  );
  const uniqueIssueTypes = useMemo(
    () =>
      [...new Set(tickets.map((t) => t.issueType || t.type))].filter(
        (t): t is string => t !== undefined,
      ),
    [tickets],
  );

  // Filter tickets based on search query and filters
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        ticket.ticketId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.issueType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.type?.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = !filters.status || ticket.status === filters.status;

      // Issue type filter
      const matchesIssueType =
        !filters.issueType ||
        ticket.issueType === filters.issueType ||
        ticket.type === filters.issueType;

      return matchesSearch && matchesStatus && matchesIssueType;
    });
  }, [tickets, searchQuery, filters]);

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ status: "", issueType: "" });
  };

  const activeFilterCount = [filters.status, filters.issueType].filter(
    (f) => f !== "",
  ).length;
  const StatsGrid = ({ isMobile = false }) => (
    <div
      className={`border border-[#E1E4EA] rounded-xl overflow-hidden mb-6 ${
        isMobile
          ? "block lg:hidden w-full"
          : "hidden lg:block border-y-0 border-x-0 rounded-none mb-0"
      }`}
    >
      <div
        className={`${
          isMobile ? "grid grid-cols-2" : "lg:grid lg:grid-cols-4"
        } ${!isMobile && "border-y border-[#E1E4EA] py-4"}`}
      >
        {[
          ["Open Tickets", openCount],
          ["In Review Tickets", reviewCount],
          ["Approved Tickets", approvedCount],
          ["Rejected", rejectedCount],
        ].map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-col gap-2 p-4 relative ${
              // Desktop borders
              !isMobile && i < 3 ? "lg:border-r lg:border-[#E1E4EA]" : ""
            } ${
              // Mobile borders - vertical dividers on positions 0 and 2 (left cards) with limited height
              isMobile && (i === 0 || i === 2)
                ? "after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-px after:bg-[#E1E4EA]"
                : ""
            } ${!isMobile ? "px-3 py-0 border-0" : ""}`}
          >
            <span className="text-[13px] md:text-[14px] font-normal text-[#525866]">
              {label}
            </span>
            <span className="text-[24px] md:text-[24px] font-bold leading-[120%] text-[#0E121B]">
              {String(value).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-white border border-[#E1E4EA] rounded-xl p-4 md:p-6 w-full">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 lg:h-10">
        <div className="text-[18px] md:text-[16px] font-bold md:font-semibold leading-[120%] text-[#0E121B] w-full lg:w-auto">
          On-Going Tickets
        </div>

        {/* Mobile Stats (Between Title and Controls) */}
        <StatsGrid isMobile={true} />

        <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full lg:w-[273px] h-11 lg:h-10">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866]"
            />
            <input
              placeholder="Search by ticket id or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-10 pr-3 bg-white
                         text-[14px] font-normal leading-[120%]
                         border border-[#E1E4EA] rounded-lg
                         placeholder-[#525866]
                         focus:outline-none focus:bg-[#F9FAFB] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Filter */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-[50%] lg:w-auto h-11 lg:h-10 px-3 flex items-center justify-center gap-2
                                border border-[#E1E4EA] rounded-lg
                                text-[14px] font-medium text-[#222530] hover:bg-gray-50 transition-colors bg-white relative"
            >
              <Filter size={18} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF7A00] text-white rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Raise Ticket (Desktop & Mobile Unified Logic, styled differently) */}
            <button
              onClick={onRaiseTicket}
              className="flex-1 lg:flex-none h-11 lg:h-10 px-4
                                flex items-center justify-center gap-2
                                bg-[#FF7A00] rounded-lg text-white font-semibold text-[14px] hover:bg-[#FF8A1A] transition-colors"
            >
              <Plus size={18} className="text-white" strokeWidth={2.5} />
              <span>Raise Ticket</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00] bg-white text-[#0E121B]"
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status: string) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* Issue Type Filter */}
              <select
                value={filters.issueType}
                onChange={(e) =>
                  setFilters({ ...filters, issueType: e.target.value })
                }
                className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00] bg-white text-[#0E121B]"
              >
                <option value="">All Issue Types</option>
                {uniqueIssueTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-3 py-2 text-[#FF7A00] hover:bg-orange-50 rounded-lg text-[14px] transition-colors w-full"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}

            {/* Results count */}
            {(searchQuery || activeFilterCount > 0) && (
              <div className="text-[12px] text-[#525866]">
                Showing {filteredTickets.length} of {tickets.length} tickets
              </div>
            )}
          </div>
        )}
      </div>

      {/* STATS (Desktop) */}
      <StatsGrid isMobile={false} />

      {/* TABLE */}
      <div className="border border-[#E1E4EA] rounded-lg overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth: "600px" }}>
          <colgroup>
            <col style={{ width: "90px", minWidth: "90px" }} />
            <col style={{ width: "140px", minWidth: "140px" }} />
            <col style={{ width: "150px", minWidth: "130px" }} />
            <col style={{ width: "120px", minWidth: "100px" }} />
          </colgroup>
          <thead className="bg-[#F9FAFB]">
            <tr>
              {[
                "Ticket ID",
                "Ticket Type",
                "Current Status",
                "Submitted On",
              ].map((h) => (
                <th
                  key={h}
                  className="h-9 px-3
                               text-[11px] md:text-[12px] font-medium
                               text-[#6B7280]
                               border-b border-[#E1E4EA]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((ticket, i) => (
              <tr
                key={i}
                className="h-12 md:h-[54px] border-b border-[#E1E4EA]
                           hover:bg-[#F9FAFB]"
              >
                <td className="px-3 text-[13px] md:text-[14px] font-medium text-[#222530]">
                  {ticket.ticketId || ticket.id}
                </td>
                <td className="px-3 text-[13px] md:text-[14px] text-[#525866]">
                  {ticket.issueType || ticket.type}
                </td>
                <td className="px-1.5 md:px-3">
                  <StatusBadge status={ticket.status as any} />
                </td>
                <td className="px-1.5 md:px-3 text-[13px] md:text-[14px] text-[#525866]">
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleDateString("en-GB")
                    : ticket.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
