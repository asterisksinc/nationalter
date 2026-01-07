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
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h5 className="font-semibold text-gray-900">On-Going Tickets</h5>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by ticket id or type..."
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f76a23] w-64 text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 bg-[#f76a23] hover:bg-[#e05a1a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="flex gap-8 mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="block text-sm text-gray-500 mb-1">Open Tickets</span>
          <span className="text-2xl font-bold text-gray-900">
            {String(openCount).padStart(2, "0")}
          </span>
        </div>
        <div className="w-px bg-gray-200 h-10 self-center"></div>
        <div>
          <span className="block text-sm text-gray-500 mb-1">
            In Review Tickets
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {reviewCount}
          </span>
        </div>
        <div className="w-px bg-gray-200 h-10 self-center"></div>
        <div>
          <span className="block text-sm text-gray-500 mb-1">
            Approved Tickets
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {approvedCount}
          </span>
        </div>
        <div className="w-px bg-gray-200 h-10 self-center"></div>
        <div>
          <span className="block text-sm text-gray-500 mb-1">Rejected</span>
          <span className="text-2xl font-bold text-gray-900">
            {String(rejectedCount).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 w-[20%]">
                Ticket ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 w-[30%]">
                Ticket Type
              </th>
              <th className="px-6 py-3 border-b border-gray-200 w-[25%]">
                Current Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 w-[25%]">
                Submitted On
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {tickets.map((ticket, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {ticket.id}
                </td>
                <td className="px-6 py-4 text-gray-600">{ticket.type}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-6 py-4 text-gray-500">{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
