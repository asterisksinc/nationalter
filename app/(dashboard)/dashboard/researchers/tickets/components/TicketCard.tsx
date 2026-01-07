import React from "react";
import { MoreVertical, Calendar, Eye } from "lucide-react";

export interface TicketCardData {
  id: string;
  title: string;
  status: "Pending" | "In-Progress" | "Completed";
  time: string;
  date: string;
  imgUrl: string;
}

interface TicketCardProps {
  data: TicketCardData;
}

export const TicketCard = ({ data }: TicketCardProps) => {
  // Colors for status, time
  const statusColor =
    data.status === "Pending"
      ? "bg-red-50 text-red-500"
      : data.status === "In-Progress"
      ? "bg-yellow-50 text-yellow-600"
      : "bg-green-50 text-green-600";

  // Remarks link styling based on status
  const remarksStyle =
    data.status === "Completed"
      ? "text-[#f76a23] underline hover:text-[#e05a1a]"
      : "text-gray-600 hover:text-gray-900";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-3">
          <img
            src={data.imgUrl}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h5 className="font-semibold text-gray-900 text-sm md:text-base">
              {data.title}
            </h5>
            <span className="text-gray-500 text-xs">{data.id}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <span
          className={`px-2.5 py-1 rounded text-xs font-medium ${statusColor}`}
        >
          {data.status}
        </span>
        <span
          className={`px-2.5 py-1 rounded text-xs font-medium ${statusColor}`}
        >
          {data.time}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={14} />
          <span>{data.date}</span>
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer text-sm font-medium ${remarksStyle}`}
        >
          <Eye size={14} />
          <span>View Remarks</span>
        </div>
      </div>
    </div>
  );
};
