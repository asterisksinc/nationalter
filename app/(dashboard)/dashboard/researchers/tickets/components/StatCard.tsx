import React from "react";

interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
    <span className="text-sm text-gray-500 mb-1">{label}</span>
    <span className="text-3xl font-bold text-gray-900">{value}</span>
  </div>
);
