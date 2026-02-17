import React from "react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyle = () => {
    const statusUpper = status?.toUpperCase() || "";

    switch (statusUpper) {
      case "OPEN":
      case "PENDING":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
          label: "Awaiting Review",
        };
      case "RESOLVED":
      case "APPROVED":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          label: "Approved",
        };
      case "IN_PROGRESS":
      case "UNDER_REVIEW":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          label: "Under Review",
        };
      case "REJECTED":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          label: "Rejected",
        };
      case "CLOSED":
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          label: "Closed",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          label: status,
        };
    }
  };

  const style = getStatusStyle();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium leading-[120%] border ${style.bg} ${style.text} ${style.border}`}
    >
      {style.label}
    </span>
  );
};
