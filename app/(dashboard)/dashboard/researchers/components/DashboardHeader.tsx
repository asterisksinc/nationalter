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
    <header className="flex justify-between items-center mb-[20px] h-[72px]">
      <div className="flex items-center text-[12px] leading-[14px] text-[#525866]">
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
                    ? "text-[#1e1e1e] font-medium"
                    : ""
                }
              >
                {item.label}
              </span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <ChevronRight size={14} className="mx-[8px] text-[#8E8E93]" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-[20px]">
        <div className="relative">
          <Search
            className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#525866]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-[36px] pr-[16px] py-[10px] bg-[#F2F5F8] border border-transparent focus:bg-white focus:border-[#E1E4EA] rounded-[8px] text-[14px] focus:outline-none w-[280px] text-[#333333] placeholder-[#8E8E93] transition-all"
          />
        </div>
        <button className="p-[10px] bg-white border border-[#E1E4EA] rounded-[8px] text-[#525866] hover:text-[#0E121B] hover:bg-[#F5F7FA] relative">
          <Bell size={20} />
          <span className="absolute top-[8px] right-[8px] w-[5px] h-[5px] bg-[#DF120B] rounded-full"></span>
        </button>
        <button
          onClick={onRaiseTicket}
          className="flex items-center gap-[8px] bg-[#FF7A00] hover:bg-[#FF8D28] text-white px-[16px] py-[10px] rounded-[6px] text-[14px] font-semibold transition-colors h-[40px]"
        >
          <Plus size={16} /> Raise Ticket
        </button>
      </div>
    </header>
  );
};
