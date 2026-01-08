import React from "react";
import Link from "next/link";
import { Search, Bell, Plus, ChevronRight } from "lucide-react";

interface DashboardHeaderProps {
  breadcrumbItems: { label: string; href?: string }[];
  onRaiseTicket?: () => void;
}

export const DashboardHeader = ({
  breadcrumbItems,
  onRaiseTicket,
}: DashboardHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-[16px] h-[48px]">
      <div className="flex items-center text-[12px] font-normal leading-[120%] text-[#525866]">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#0E121B] cursor-pointer"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  index === breadcrumbItems.length - 1
                    ? "text-[#0E121B] font-medium"
                    : ""
                }
              >
                {item.label}
              </span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <ChevronRight size={12} className="mx-[6px] text-[#8E8E93]" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-[12px]">
        <div className="relative">
          <Search
            className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#525866]"
            size={14}
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-[32px] pr-[12px] py-[7px] bg-[#F2F5F8] border border-transparent focus:bg-white focus:border-[#E1E4EA] rounded-[6px] text-[14px] font-normal leading-[150%] tracking-[-0.02em] focus:outline-none w-[240px] h-[34px] text-[#333333] placeholder-[#8E8E93] transition-all"
          />
        </div>
        <button className="p-[7px] bg-white border border-[#E1E4EA] rounded-[6px] text-[#525866] hover:text-[#0E121B] hover:bg-[#F5F7FA] relative h-[34px] w-[34px] flex items-center justify-center">
          <Bell size={16} strokeWidth={1.5} />
          <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#DF120B] rounded-full"></span>
        </button>
        <button
          onClick={onRaiseTicket}
          className="flex items-center gap-[6px] bg-[#FF7A00] hover:bg-[#FF8D28] text-white px-[14px] py-[7px] rounded-[6px] text-[14px] font-semibold leading-[120%] tracking-[-0.04em] transition-colors h-[34px]"
        >
          <Plus size={14} strokeWidth={2.5} /> Raise Ticket
        </button>
      </div>
    </header>
  );
};
