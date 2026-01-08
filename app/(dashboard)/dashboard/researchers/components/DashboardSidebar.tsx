import React from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Ticket,
  Settings,
  LogOut,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface DashboardSidebarProps {
  activePage?: "overview" | "publications" | "tickets" | "settings";
}

export const DashboardSidebar = ({
  activePage = "overview",
}: DashboardSidebarProps) => {
  return (
    <aside className="w-[260px] bg-[#F5F7FA] border-r border-[#E1E4EA] flex flex-col fixed h-full z-20">
      <div className="h-[72px] flex items-center px-[20px] border-b border-[#E1E4EA]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="NationCite Logo" className="h-[32px] w-auto" />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          active={activePage === "overview"}
          href="/dashboard/researchers"
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="My Publications"
          active={activePage === "publications"}
          href="/dashboard/researchers/publications"
        />
        <SidebarItem icon={<BarChart2 size={18} />} label="Analytics" />
        <SidebarItem
          icon={<Ticket size={18} />}
          label="Ticket Center"
          active={activePage === "tickets"}
          href="/dashboard/researchers/tickets"
        />
        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings & Privacy"
          active={activePage === "settings"}
          href="/dashboard/researchers/settings"
        />
      </nav>

      <div className="p-[20px] border-t border-[#E1E4EA] mt-auto">
        <div className="flex items-center gap-[12px] p-[8px] rounded-[8px] hover:bg-[#E1E4EA] cursor-pointer transition-colors">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            className="w-[40px] h-[40px] rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[14px] font-semibold text-[#181B25] truncate">
              John Doe
            </span>
            <span className="text-[12px] text-[#525866] truncate">
              example@gmail.com
            </span>
          </div>
          <button className="text-[#525866] hover:text-[#E82323] transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
