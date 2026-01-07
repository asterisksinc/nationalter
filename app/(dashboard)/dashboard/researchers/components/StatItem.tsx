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
    <span className="text-gray-500 text-sm mb-1">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span
        className={`text-xs font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
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
