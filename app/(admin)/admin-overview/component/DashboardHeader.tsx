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
    <header className="flex justify-between items-center mb-3" style={{borderBottom:"1px solid  #E1E4EA",     padding: "18px 32px"}}>
      <div className="flex items-center text-sm text-gray-500">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-900 cursor-pointer"
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
              <ChevronRight size={14} className="mx-2 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text" style={{paddingLeft:'32px!important'}}
            placeholder="Search"
            className="pl-9 pr-4 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg text-sm focus:outline-none w-64 text-gray-700 placeholder:text-gray-400 transition-all"
          />
        </div>
        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 relative shadow-sm" style={{borderRadius:'6px'}}>
          <Bell size={25} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};
