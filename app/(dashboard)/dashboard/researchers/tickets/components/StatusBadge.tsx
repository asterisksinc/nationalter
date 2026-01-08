import React from "react";

interface StatusBadgeProps {
  status:
    | "Active"
    | "Awaiting Review"
    | "Approved"
    | "Under Review"
    | "Rejected";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    Active: "bg-green-50 text-green-700 border-green-200",
    "Awaiting Review": "bg-orange-50 text-orange-700 border-orange-200",
    Approved: "bg-green-50 text-green-700 border-green-200",
    "Under Review": "bg-yellow-50 text-yellow-700 border-yellow-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium leading-[120%] border ${styles[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
};
