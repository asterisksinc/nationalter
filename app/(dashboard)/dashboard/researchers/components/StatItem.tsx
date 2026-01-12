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
    className={`flex flex-col h-full justify-center px-3 md:px-4 py-3 relative ${isHighlight
        ? "bg-[#FFF4ED] border-0 rounded-[12px] px-6 md:px-8 py-5 md:py-6"
        : "bg-white lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-[15%] lg:after:bottom-[15%] lg:after:w-[1px] lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:via-[#E1E4EA] lg:after:to-transparent last:after:hidden"
      } ${className}`}
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
        className={`text-[20px] md:text-[24px] font-semibold leading-tight ${isHighlight ? "text-[#FF7A00]" : "text-[#0E121B]"
          }`}
      >
        {value}
      </span>
      {change && (
        <span
          className={`text-[10px] md:text-[11px] font-semibold leading-[120%] px-1 py-0.5 rounded flex items-center gap-0.5 ${isPositive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
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
