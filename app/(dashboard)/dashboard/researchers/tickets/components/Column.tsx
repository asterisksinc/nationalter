import React from "react";
import { Plus } from "lucide-react";
import { TicketCard, TicketCardData } from "./TicketCard";

interface ColumnProps {
  title: string;
  count: number;
  tickets: TicketCardData[];
  status: string;
}

export const Column = ({ title, count, tickets, status }: ColumnProps) => {
  let badgeClass = "";
  if (status === "Pending") badgeClass = "bg-red-50 text-red-600";
  else if (status === "In-Progress")
    badgeClass = "bg-yellow-50 text-yellow-600";
  else badgeClass = "bg-green-50 text-green-600";

  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {title}
          </span>
          <span className="text-gray-500 text-sm font-medium">{count}</span>
        </div>
        {status === "Pending" && (
          <button className="text-gray-400 hover:text-gray-600">
            <Plus size={18} />
          </button>
        )}
      </div>
      <div>
        {tickets.map((t, i) => (
          <TicketCard key={i} data={t} />
        ))}
      </div>
    </div>
  );
};
