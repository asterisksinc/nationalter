import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface TicketData {
  id: string;
  type: string;
  status:
    | "Approved"
    | "Awaiting Review"
    | "Rejected"
    | "Under Review"
    | "Active";
  date: string;
}

interface TicketsTableProps {
  tickets: TicketData[];
  openCount: number;
  reviewCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export const TicketsTable = ({
  tickets,
  openCount,
  reviewCount,
  approvedCount,
  rejectedCount,
}: TicketsTableProps) => {
  return (
    <section className="bg-white rounded-lg border border-[#E1E4EA] p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-[#0E121B]">
          On-Going Tickets
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search by ticket id or type..."
              className="pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-md text-[14px] font-normal leading-[150%] tracking-[-0.02em] focus:outline-none focus:border-[#f76a23] w-56 h-[32px] text-[#333333] placeholder-[#8E8E93]"
            />
          </div>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-md text-[14px] font-medium leading-[120%] text-[#525866] hover:bg-gray-50 h-[32px]">
            <Filter size={14} strokeWidth={1.5} /> Filter
          </button>
          <button className="flex items-center gap-1.5 bg-[#f76a23] hover:bg-[#e05a1a] text-white px-3 py-1.5 rounded-md text-[14px] font-semibold leading-[120%] tracking-[-0.04em] transition-colors h-[32px]">
            <Plus size={14} strokeWidth={2.5} /> Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-[#E1E4EA]">
        <div>
          <span className="block text-[14px] font-normal leading-[120%] text-[#525866] mb-0.5">
            Open Tickets
          </span>
          <span className="text-[24px] font-semibold leading-tight text-[#0E121B]">
            {String(openCount).padStart(2, "0")}
          </span>
        </div>
        <div>
          <span className="block text-[14px] font-normal leading-[120%] text-[#525866] mb-0.5">
            In Review Tickets
          </span>
          <span className="text-[24px] font-semibold leading-tight text-[#0E121B]">
            {reviewCount}
          </span>
        </div>
        <div>
          <span className="block text-[14px] font-normal leading-[120%] text-[#525866] mb-0.5">
            Approved Tickets
          </span>
          <span className="text-[24px] font-semibold leading-tight text-[#0E121B]">
            {approvedCount}
          </span>
        </div>
        <div>
          <span className="block text-[14px] font-normal leading-[120%] text-[#525866] mb-0.5">
            Rejected
          </span>
          <span className="text-[24px] font-semibold leading-tight text-[#0E121B]">
            {String(rejectedCount).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-[#E1E4EA]">
        <table className="w-full text-[14px] text-left">
          <thead className="bg-gray-50 text-[#525866] font-medium leading-[120%]">
            <tr>
              <th className="px-4 py-2.5 border-b border-[#E1E4EA] w-[20%]">
                Ticket ID
              </th>
              <th className="px-4 py-2.5 border-b border-[#E1E4EA] w-[30%]">
                Ticket Type
              </th>
              <th className="px-4 py-2.5 border-b border-[#E1E4EA] w-[25%]">
                Current Status
              </th>
              <th className="px-4 py-2.5 border-b border-[#E1E4EA] w-[25%]">
                Submitted On
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F7] bg-white">
            {tickets.map((ticket, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-[14px] font-medium leading-[120%] text-[#0E121B]">
                  {ticket.id}
                </td>
                <td className="px-4 py-3 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {ticket.type}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-4 py-3 text-[14px] font-normal leading-[120%] text-[#525866]">
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
