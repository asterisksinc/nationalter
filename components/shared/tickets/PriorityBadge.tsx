import React from "react";

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyle = () => {
    const priorityLower = priority?.toLowerCase() || "normal";

    switch (priorityLower) {
      case "high":
      case "urgent":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          label: "High",
        };
      case "medium":
        return {
          bg: "bg-orange-50",
          text: "text-orange-700",
          border: "border-orange-200",
          label: "Medium",
        };
      case "low":
      case "normal":
      default:
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          label: "Normal",
        };
    }
  };

  const style = getPriorityStyle();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium leading-[120%] border ${style.bg} ${style.text} ${style.border}`}
    >
      {style.label}
    </span>
  );
};
