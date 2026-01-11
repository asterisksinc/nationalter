import React from "react";
import { Check } from "lucide-react";

interface StatItemProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  isHighlight?: boolean;
  className?: string;
}

export const StatItem = ({
  label,
  value,
  change,
  isPositive,
  isHighlight = false,
  className = "",
}: StatItemProps) => (
  <div
    className={`flex flex-col h-full justify-center px-3 md:px-4 py-3 relative border-r border-[#E1E4EA] ${
      isHighlight ? "bg-[#FFF4ED]" : "bg-white"
    } last:border-r-0 ${className}`}
    style={{
      borderImageSource:
        "linear-gradient(to bottom, transparent 15%, #E1E4EA 15%, #E1E4EA 85%, transparent 85%)",
      borderImageSlice: "1",
    }}
  >
    {isHighlight && (
      <div className="absolute top-2 right-2">
        <div className="bg-[#FFE7D6] rounded-full p-1">
          <Check size={10} className="text-[#FF7A00]" strokeWidth={3} />
        </div>
      </div>
    )}
    <span className="text-[12px] flex align-middle md:text-[14px] font-medium leading-[120%] text-[#525866] mb-1">
      {label}
    </span>
    <div className="flex items-center gap-1.5">
      <span
        className={`text-[20px] md:text-[24px] font-semibold leading-tight ${
          isHighlight ? "text-[#FF7A00]" : "text-[#0E121B]"
        }`}
      >
        {value}
      </span>
      {change && (
        <span
          className={`text-[10px] md:text-[11px] font-semibold leading-[120%] px-1 py-0.5 rounded flex items-center gap-0.5 ${
            isPositive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
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
