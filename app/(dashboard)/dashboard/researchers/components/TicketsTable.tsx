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
  return (
    <section className="bg-white border border-[#E1E4EA] rounded-xl p-6 w-full">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 lg:h-10">
        <div className="text-[16px] font-semibold leading-[120%] text-[#0E121B]">
          On-Going Tickets
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-[273px] h-10">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866]"
            />
            <input
              placeholder="Search by ticket id or type..."
              className="w-full h-full pl-10 pr-3
                         text-[14px] font-normal leading-[120%]
                         border border-[#E1E4EA] rounded-md
                         placeholder-[#525866]
                         focus:outline-none"
            />
          </div>

          {/* Filter */}
          <button
            className="h-10 px-2.5 flex items-center gap-2
                             border border-[#E1E4EA] rounded-md
                             text-[14px] font-medium text-[#222530]"
          >
            <Filter size={16} /> Filter
          </button>

          {/* Add */}
          <button
            className="h-10 w-10
                             flex items-center justify-center
                             bg-[#FF7A00] rounded-md"
          >
            <Plus size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="border-y border-[#E1E4EA] py-4 mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            ["Open Tickets", openCount],
            ["In Review Tickets", reviewCount],
            ["Approved Tickets", approvedCount],
            ["Rejected", rejectedCount],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`flex flex-col gap-2 px-4 ${
                i < 3 ? "lg:border-r lg:border-[#D9D9D9]" : ""
              }`}
            >
              <span className="text-[14px] font-normal text-[#525866]">
                {label}
              </span>
              <span className="text-[24px] font-semibold leading-[120%] text-[#0E121B]">
                {String(value).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-[#E1E4EA] rounded-lg overflow-x-auto">
        <table className="w-full table-fixed text-left">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[40%]" />
            <col className="w-[22%]" />
            <col className="w-[16%]" />
          </colgroup>
          <thead className="bg-[#F5F7FA]">
            <tr>
              {[
                "Ticket ID",
                "Ticket Type",
                "Current Status",
                "Submitted On",
              ].map((h) => (
                <th
                  key={h}
                  className="h-9 px-4
                               text-[12px] font-medium
                               text-[#525866]
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
                className="h-[54px] border-b border-[#E1E4EA]
                           hover:bg-[#F9FAFB]"
              >
                <td className="px-4 text-[14px] font-medium text-[#222530]">
                  {ticket.id}
                </td>
                <td className="px-4 text-[14px] text-[#525866]">
                  {ticket.type}
                </td>
                <td className="px-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-4 text-[14px] text-[#525866]">
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
