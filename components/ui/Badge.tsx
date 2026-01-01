import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-sm mt-4 sm:mt-5 md:mt-5 lg:mt-5 mb-2 sm:mb-4 md:mb-4 lg:mb-4 ${className}`}
    >
      {children}
    </span>
  );
}
