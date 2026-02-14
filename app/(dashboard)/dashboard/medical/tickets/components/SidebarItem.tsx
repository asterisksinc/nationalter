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
      className={`flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer transition-colors mb-[4px] ${
        active
          ? "bg-[#FF7A00]/10 text-[#FF7A00]"
          : "text-[#525866] hover:bg-[#E1E4EA]"
      }`}
    >
      <div className={`${active ? "text-[#FF7A00]" : "text-[#525866]"}`}>
        {icon}
      </div>
      <span
        className={`font-medium text-[14px] leading-[120%] tracking-[-0.006em] ${
          active ? "text-[#FF7A00]" : "text-[#525866]"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
