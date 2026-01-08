import React from "react";

interface StatItemProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export const StatItem = ({
  label,
  value,
  change,
  isPositive,
}: StatItemProps) => (
  <div className="flex flex-col px-6 py-4">
    <span className="text-[14px] font-medium leading-[20px] text-[#525866] mb-1">
      {label}
    </span>
    <div className="flex items-center gap-2">
      <span className="text-[24px] font-semibold leading-tight text-[#0E121B]">
        {value}
      </span>
      <span
        className={`text-[12px] font-semibold leading-[120%] px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}
        <span className="text-[10px]">{isPositive ? "▲" : "▼"}</span>
      </span>
    </div>
  </div>
);
