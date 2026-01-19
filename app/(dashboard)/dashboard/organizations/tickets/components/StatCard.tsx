import React from "react";

interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
    <span className="text-[14px] font-normal leading-[120%] text-[#525866] mb-1">
      {label}
    </span>
    <span className="text-[24px] font-semibold leading-tight text-[#0E121B]">
      {value}
    </span>
  </div>
);
