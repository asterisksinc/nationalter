import React from "react";
import { CheckCircle2, Clock, Star, Ban } from "lucide-react";

type TicketStatus =
  | "Approved"
  | "Awaiting Review"
  | "Rejected"
  | "Under Review"
  | "Active";

interface StatusBadgeProps {
  status: TicketStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    Approved: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle2 },
    Active: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle2 },
    "Awaiting Review": {
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: Clock,
    },
    "Under Review": { bg: "bg-yellow-50", text: "text-yellow-700", icon: Star },
    Rejected: { bg: "bg-red-50", text: "text-red-700", icon: Ban },
  };

  const config = styles[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium leading-[120%] border ${config.bg} ${config.text} border-transparent`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {status}
    </span>
  );
};
