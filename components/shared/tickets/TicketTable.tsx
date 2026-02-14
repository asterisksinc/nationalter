import React from "react";
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
            {tickets.map((ticket, index) => (
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
    </div>
  );
};
