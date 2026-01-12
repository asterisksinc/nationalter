import React from "react";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

interface TicketData {
  id: string;
  submittedOn: string;
  issueType: string;
  status:
    | "Active"
    | "Awaiting Review"
    | "Approved"
    | "Under Review"
    | "Rejected";
  priority: "High" | "Normal" | "Low";
  lastUpdate: string;
  adminResponse: string;
}

interface TicketTableProps {
  tickets: TicketData[];
}

export const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Submitted On
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Issue Type
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Current Status
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Last Update
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Admin Response
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tickets.map((ticket, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-[14px] font-medium leading-[120%] text-[#0E121B]">
                  {ticket.id}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {ticket.submittedOn}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#0E121B]">
                  {ticket.issueType}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {ticket.lastUpdate}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {ticket.adminResponse}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
