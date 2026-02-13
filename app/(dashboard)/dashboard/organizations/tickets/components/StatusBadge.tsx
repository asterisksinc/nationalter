import React from "react";
import { Check, Clock, Ban, Star, ShieldCheck } from "lucide-react";

interface StatusBadgeProps {
  status:
    | "Active"
    | "Awaiting Review"
    | "Approved"
    | "Under Review"
    | "Rejected";
}

type Status = StatusBadgeProps["status"];

const STATUS_CONFIG: Record<Status, { Icon: any; color: string }> = {
  Approved: {
    Icon: Check,
    color: "#1FC16B",
  },
  "Awaiting Review": {
    Icon: Clock,
    color: "#FF7A00",
  },
  Rejected: {
    Icon: Ban,
    color: "#E82222",
  },
  "Under Review": {
    Icon: Star,
    color: "#FFE100",
  },
  Active: {
    Icon: ShieldCheck,
    color: "#1FC16B",
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Fallback to "Awaiting Review" if status is undefined
  const validStatus = status || "Awaiting Review";
  const config = STATUS_CONFIG[validStatus];

  if (!config) {
    // Render a default fallback badge for unknown statuses
    return (
      <div className="inline-flex items-center gap-[4px] h-[24px] px-[8px] py-[4px] border border-[#E1E4EA] rounded-[6px] bg-white">
        <div
          className="w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0"
          style={{ background: "#999999" }}
        >
          <Clock size={10} color="#ffffff" strokeWidth={3} />
        </div>

        <span className="text-[12px] font-medium leading-[16px] text-[#525866] whitespace-nowrap">
          {status || "Unknown"}
        </span>
      </div>
    );
  }

  const { Icon, color } = config;

  return (
    <div className="inline-flex items-center gap-[4px] h-[24px] px-[8px] py-[4px] border border-[#E1E4EA] rounded-[6px] bg-white">
      <div
        className="w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0"
        style={{ background: color }}
      >
        <Icon size={10} color="#ffffff" strokeWidth={3} />
      </div>

      <span className="text-[12px] font-medium leading-[16px] text-[#525866] whitespace-nowrap">
        {validStatus}
      </span>
    </div>
  );
};
