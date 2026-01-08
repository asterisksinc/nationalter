import React from "react";

interface PriorityBadgeProps {
  priority: "High" | "Normal" | "Low";
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles = {
    High: "text-red-600",
    Normal: "text-gray-600",
    Low: "text-gray-600",
  };

  return (
    <span
      className={`text-[14px] font-medium leading-[120%] ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};
