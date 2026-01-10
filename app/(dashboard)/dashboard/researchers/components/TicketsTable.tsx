import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export const TicketsTable = ({
  tickets,
  openCount,
  reviewCount,
  approvedCount,
  rejectedCount,
}: any) => {
  const StatsGrid = ({ isMobile = false }) => (
    <div
      className={`border-y border-[#E1E4EA] py-3 md:py-4 mb-4 md:mb-6 ${
        isMobile ? "block lg:hidden" : "hidden lg:block "
      }`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {[
          ["Open Tickets", openCount],
          ["In Review Tickets", reviewCount],
          ["Approved Tickets", approvedCount],
          ["Rejected", rejectedCount],
        ].map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-col gap-1.5 md:gap-2 px-3 md:px-4 ${
              // Desktop borders
              i < 3 ? "lg:border-r lg:border-[#D9D9D9]" : ""
            } ${
              // Mobile borders
              isMobile && i % 2 === 0 ? "border-r border-[#E1E4EA]" : ""
            } ${
              isMobile && i < 2 ? "border-b border-[#E1E4EA] pb-3 mb-3" : ""
            }`}
          >
            <span className="text-[12px] md:text-[14px] font-normal text-[#6B7280]">
              {label}
            </span>
            <span className="text-[20px] md:text-[24px] font-semibold leading-[120%] text-[#0E121B]">
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 md:gap-4 mb-4 md:mb-6 lg:h-10">
        <div className="text-[14px] md:text-[16px] font-semibold leading-[120%] text-[#0E121B] w-full lg:w-auto">
          On-Going Tickets
        </div>

        {/* Mobile Stats (Between Title and Controls) */}
        <StatsGrid isMobile={true} />

        <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-[273px] h-10">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866]"
            />
            <input
              placeholder="Search by ticket id or type..."
              className="w-full h-full pl-10 pr-3 bg-white
                         text-[13px] md:text-[14px] font-normal leading-[120%]
                         border border-[#E1E4EA] rounded-md
                         placeholder-[#525866]
                         focus:outline-none focus:bg-[#F9FAFB]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter */}
            <button
              className="flex-1 sm:flex-none h-10 px-3 flex items-center justify-center gap-2
                                border border-[#E1E4EA] rounded-md
                                text-[13px] md:text-[14px] font-medium text-[#222530] hover:bg-gray-50"
            >
              <Filter size={16} /> Filter
            </button>

            {/* Add (Desktop) */}
            <button
              className="hidden lg:flex h-10 w-10
                                flex items-center justify-center
                                bg-[#FF7A00] rounded-md hover:bg-[#FF8A1A]"
            >
              <Plus size={18} className="text-white" />
            </button>

            {/* Add (Mobile) */}
            <button
              className="flex lg:hidden flex-1 sm:flex-none h-10 px-4
                                items-center justify-center gap-2
                                bg-[#FF7A00] rounded-md text-white font-medium text-[13px] md:text-[14px] hover:bg-[#FF8A1A]"
            >
              <Plus size={16} className="text-white" />
              Raise Ticket
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
            <col style={{ width: "110px", minWidth: "110px" }} />
            <col style={{ width: "180px", minWidth: "150px" }} />
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
            {tickets.map((ticket: any, i: number) => (
              <tr
                key={i}
                className="h-[48px] md:h-[54px] border-b border-[#E1E4EA]
                           hover:bg-[#F9FAFB]"
              >
                <td className="px-3 text-[13px] md:text-[14px] font-medium text-[#222530]">
                  {ticket.id}
                </td>
                <td className="px-3 text-[13px] md:text-[14px] text-[#525866]">
                  {ticket.type}
                </td>
                <td className="px-3">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-3 text-[13px] md:text-[14px] text-[#525866]">
                  {ticket.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
