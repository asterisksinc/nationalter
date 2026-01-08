import React from "react";
import { Check } from "lucide-react";

interface StatItemProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  isHighlight?: boolean;
}

export const StatItem = ({
  label,
  value,
  change,
  isPositive,
  isHighlight = false,
}: StatItemProps) => (
  <div
    className={`flex flex-col px-4 py-3 relative ${
      isHighlight ? "bg-[#FFF4ED]" : ""
    }`}
  >
    {isHighlight && (
      <div className="absolute top-2 right-2">
        <div className="bg-orange-100 rounded-full p-1">
          <Check size={10} className="text-[#FF7A00]" strokeWidth={3} />
        </div>
      </div>
    )}
    <span className="text-[14px] font-medium leading-[20px] text-[#525866] mb-0.5">
      {label}
    </span>
    <div className="flex items-center gap-1.5">
      <span
        className={`text-[24px] font-semibold leading-tight ${
          isHighlight ? "text-[#FF7A00]" : "text-[#0E121B]"
        }`}
      >
        {value}
      </span>
      {change && (
        <span
          className={`text-[11px] font-semibold leading-[120%] px-1 py-0.5 rounded flex items-center gap-0.5 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}
          <span className="text-[8px]">{isPositive ? "▲" : "▼"}</span>
        </span>
      )}
    </div>
  </div>
);
