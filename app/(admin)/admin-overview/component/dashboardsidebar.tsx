import React from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Ticket,
  Settings,
  LogOut,
  UsersRound,
  ChartColumnIncreasing,
  Landmark,
  File,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface DashboardSidebarProps {
  activePage?: "overview" | "usermanagement" | "tickets" | "datasets";
}

export const DashboardSidebar = ({
  activePage = "overview",
}: DashboardSidebarProps) => {
  return (
    <aside
      className="w-[260px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-20"
      style={{ backgroundColor: "#f6f6f6" }}
    >
      <div
        className="h-20 flex items-center px-6 border-b border-gray-100"
        style={{ paddingLeft: "0px", borderColor: "#e5e5e5" }}
      >
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="NationCite Logo" className="h-28 w-auto" />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={activePage === "overview"}
          href="/admin-overview"
        />
        <SidebarItem
          icon={<UsersRound size={18} />}
          label="User Management"
          active={activePage === "usermanagement"}
          href="/admin-overview/user-management"
        />
        <SidebarItem
          icon={<ChartColumnIncreasing size={18} />}
          label="Analytics"
        />
        <SidebarItem
          icon={<Landmark size={18} />}
          label="Monetization"
         
        />
        <SidebarItem icon={<File size={18} />} label="Compliance" />
      </nav>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-none"
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
