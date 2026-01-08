import React from "react";
import { Ban, CheckCircle2, Clock, Star } from "lucide-react";

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
    Approved: {
      text: "text-[#0E121B]",
      icon: CheckCircle2,
      iconColor: "text-[#27B973]",
    },
    Active: {
      text: "text-[#0E121B]",
      icon: CheckCircle2,
      iconColor: "text-[#27B973]",
    },
    "Awaiting Review": {
      text: "text-[#0E121B]",
      icon: Clock,
      iconColor: "text-[#FF7A00]",
    },
    "Under Review": {
      text: "text-[#0E121B]",
      icon: Star,
      iconColor: "text-[#F5A623]",
    },
    Rejected: {
      text: "text-[#0E121B]",
      icon: Ban,
      iconColor: "text-[#E82323]",
    },
  };

  const config = styles[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E1E4EA] rounded-[5px] text-[14px] font-normal leading-[120%] bg-white ${config.text}`}
    >
      <Icon size={14} className={config.iconColor} strokeWidth={2} />
      {status}
    </span>
  );
};
