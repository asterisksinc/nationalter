"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

export interface TicketData {
  ticketId: string;
  createdAt: string;
  issueType: string;
  status: string;
  impactLevel?: string;
  updatedAt?: string;
  description?: string;
}

interface TicketTableProps {
  tickets: TicketData[];
  loading?: boolean;
  onTicketClick?: (ticket: TicketData) => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({
  tickets,
  loading = false,
  onTicketClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    issueType: "",
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // Get unique values for filter options
  const uniqueStatuses = useMemo(
    () => [...new Set(tickets.map((t) => t.status))],
    [tickets],
  );
  const uniquePriorities = useMemo(
    () => [...new Set(tickets.map((t) => t.impactLevel || "normal"))],
    [tickets],
  );
  const uniqueIssueTypes = useMemo(
    () => [...new Set(tickets.map((t) => t.issueType))],
    [tickets],
  );

  // Filter and search tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Search filter (ticket ID and issue type)
      const matchesSearch =
        searchQuery === "" ||
        ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        filters.status === "" || ticket.status === filters.status;

      // Priority filter
      const matchesPriority =
        filters.priority === "" ||
        (ticket.impactLevel || "normal") === filters.priority;

      // Issue type filter
      const matchesIssueType =
        filters.issueType === "" || ticket.issueType === filters.issueType;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesIssueType
      );
    });
  }, [tickets, searchQuery, filters]);

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ status: "", priority: "", issueType: "" });
  };

  const activeFilterCount = [
    filters.status,
    filters.priority,
    filters.issueType,
  ].filter((f) => f !== "").length;

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f76a23]"></div>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-8">
        <div className="text-center text-gray-500">
          <p className="text-[14px] font-normal">No tickets found</p>
          <p className="text-[12px] text-gray-400 mt-1">
            Create your first ticket to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866]"
            />
            <input
              type="text"
              placeholder="Search by Ticket ID or Issue Type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E1E4EA] rounded-lg text-[14px] hover:bg-gray-50 transition-colors relative"
          >
            <Filter size={18} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF7A00] text-white rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 pb-2">
            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00]"
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
              className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00]"
            >
              <option value="">All Priorities</option>
              {uniquePriorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>

            {/* Issue Type Filter */}
            <select
              value={filters.issueType}
              onChange={(e) =>
                setFilters({ ...filters, issueType: e.target.value })
              }
              className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00]"
            >
              <option value="">All Issue Types</option>
              {uniqueIssueTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/-/g, " ")}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="md:col-span-3 flex items-center justify-center gap-2 px-3 py-2 text-[#FF7A00] hover:bg-orange-50 rounded-lg text-[14px] transition-colors"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {(searchQuery || activeFilterCount > 0) && (
          <div className="text-[12px] text-[#525866]">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </div>
        )}
      </div>

      {/* Table */}
      {filteredTickets.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p className="text-[14px] font-normal">
            No tickets match your filters
          </p>
          <p className="text-[12px] text-gray-400 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]" style={{ minWidth: "700px" }}>
            <colgroup>
              <col className="w-[120px] md:w-auto" />
              <col className="w-[110px] md:w-auto" />
              <col className="w-auto" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                  Created On
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                  Issue Type
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTickets.map((ticket, index) => (
                <tr
                  key={index}
                  onClick={() => onTicketClick?.(ticket)}
                  className={`transition-colors ${
                    onTicketClick
                      ? "hover:bg-gray-50 cursor-pointer"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-3 md:px-6 py-4 text-[13px] md:text-[14px] font-medium leading-[120%] text-[#0E121B]">
                    {ticket.ticketId}
                  </td>
                  <td className="px-3 md:px-6 py-4 text-[13px] md:text-[14px] font-normal leading-[120%] text-[#333333]">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="px-3 md:px-6 py-4 text-[13px] md:text-[14px] font-normal leading-[120%] text-[#0E121B] capitalize">
                    {ticket.issueType?.replace(/-/g, " ")}
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <PriorityBadge priority={ticket.impactLevel || "normal"} />
                  </td>
                  <td className="px-3 md:px-6 py-4 text-[13px] md:text-[14px] font-normal leading-[120%] text-[#333333]">
                    {ticket.updatedAt ? formatDate(ticket.updatedAt) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
