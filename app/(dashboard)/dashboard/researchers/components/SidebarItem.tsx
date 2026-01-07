import Link from "next/link";
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

export const SidebarItem = ({
  icon,
  label,
  active = false,
  href,
}: SidebarItemProps) => {
  const content = (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors mb-1 ${
        active
          ? "bg-orange-50/50 text-[#f76a23]"
          : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      <div className={`${active ? "text-[#f76a23]" : "text-gray-400"}`}>
        {icon}
      </div>
      <span
        className={`font-medium text-sm ${
          active ? "text-[#f76a23]" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
