import React from "react";

type BadgeButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "orange" | "white";
};

export default function BadgeButton({
  children,
  onClick,
  className = "",
  variant = "orange",
}: BadgeButtonProps) {
  const baseStyles =
    "inline-block px-4 py-1 rounded-[8px] text-sm font-medium font-inter transition-colors";

  const variantStyles = {
    orange:
      "bg-[#FFF5EB] text-[#FF7A00] border border-[#FFD6B3] hover:bg-[#FFE9D5]",
    white:
      "bg-white text-[#F76A23] border border-[#F76A23]/30 hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
