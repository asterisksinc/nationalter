"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export const TicketsTable = ({
  tickets,
  openCount,
  reviewCount,
  approvedCount,
  rejectedCount,
  onRaiseTicket,
  onFilter,
}: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tickets based on search query
  const filteredTickets = useMemo(() => {
    if (!searchQuery) return tickets;
    return tickets.filter(
      (ticket: any) =>
        ticket.ticketId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.issueType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.type?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tickets, searchQuery]);
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
                ? "after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA]"
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
          <div className="relative w-full lg:w-[273px] h-[44px] lg:h-10">
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
              onClick={onFilter}
              className="w-[50%] lg:w-auto h-[44px] lg:h-10 px-3 flex items-center justify-center gap-2
                                border border-[#E1E4EA] rounded-lg
                                text-[14px] font-medium text-[#222530] hover:bg-gray-50 transition-colors bg-white"
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>

            {/* Raise Ticket (Desktop & Mobile Unified Logic, styled differently) */}
            <button
              onClick={onRaiseTicket}
              className="flex-1 lg:flex-none h-[44px] lg:h-10 px-4
                                flex items-center justify-center gap-2
                                bg-[#FF7A00] rounded-lg text-white font-semibold text-[14px] hover:bg-[#FF8A1A] transition-colors"
            >
              <Plus size={18} className="text-white" strokeWidth={2.5} />
              <span>Raise Ticket</span>
            </button>
          </div>
        </div>
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
            {filteredTickets.map((ticket: any, i: number) => (
              <tr
                key={i}
                className="h-[48px] md:h-[54px] border-b border-[#E1E4EA]
                           hover:bg-[#F9FAFB]"
              >
                <td className="px-3 text-[13px] md:text-[14px] font-medium text-[#222530]">
                  {ticket.ticketId || ticket.id}
                </td>
                <td className="px-3 text-[13px] md:text-[14px] text-[#525866]">
                  {ticket.issueType || ticket.type}
                </td>
                <td className="px-1.5 md:px-3">
                  <StatusBadge status={ticket.status} />
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
