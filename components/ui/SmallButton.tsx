import React from "react";

type SmallButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "orange" | "slate";
};

export default function SmallButton({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "default",
}: SmallButtonProps) {
  const baseStyles =
    "flex items-center justify-center font-inter font-medium rounded-md transition-colors";

  const variantStyles = {
    default: "w-8 h-8 bg-white text-[#FF7A00] shadow-sm hover:bg-white/80",
    orange: "w-8 h-8 bg-[#FF7A00] text-white shadow-sm hover:bg-[#E66A00]",
    slate: "w-8 h-8 text-slate-500 hover:bg-white/50 border border-slate-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
