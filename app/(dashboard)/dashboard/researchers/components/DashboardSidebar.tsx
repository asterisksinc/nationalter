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
  activePage?: "overview" | "publications" | "tickets";
}

export const DashboardSidebar = ({
  activePage = "overview",
}: DashboardSidebarProps) => {
  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="NationCite Logo" className="h-28 w-auto" />
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
        <SidebarItem icon={<Settings size={18} />} label="Settings & Privacy" />
      </nav>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold text-gray-900 truncate">
              John Doe
            </span>
            <span className="text-xs text-gray-500 truncate">
              example@gmail.com
            </span>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
