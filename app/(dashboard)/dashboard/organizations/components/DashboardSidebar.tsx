import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Ticket,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface DashboardSidebarProps {
  activePage?:
    | "overview"
    | "publications"
    | "tickets"
    | "analytics"
    | "settings";
  isOpen?: boolean;
  onClose?: () => void;
}

interface UserData {
  name: string;
  email: string;
}

export const DashboardSidebar = ({
  activePage = "overview",
  isOpen = false,
  onClose,
}: DashboardSidebarProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("/api/dashboard/org/me");
        const json = await res.json();
        if (json.success && json.data) {
          const { user, organizationProfile } = json.data;
          setUserData({
            name:
              organizationProfile?.name || user?.email?.split("@")[0] || "User",
            email: user?.email || "unknown@email.com",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData({
          name: "User",
          email: "unknown@email.com",
        });
      }
    }

    fetchUserData();
  }, []);
  return (
    <aside
      className={`
        w-[260px] bg-[#F5F7FA] border-r border-[#E1E4EA] flex flex-col fixed h-full z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="h-[72px] flex items-center justify-between pr-5 pb-3 border-b border-[#E1E4EA]">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="NationCite Logo"
            className="h-[90px] w-auto"
          />
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-[#E1E4EA] rounded-lg transition-colors"
        >
          <X size={20} className="text-[#525866]" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          active={activePage === "overview"}
          href="/dashboard/organizations"
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="My Researchers"
          active={activePage === "publications"}
          href="/dashboard/organizations/my-researchers"
        />
        <SidebarItem
          icon={<BarChart2 size={18} />}
          label="Analytics"
          active={activePage === "analytics"}
          href="/dashboard/organizations/analytics"
        />
        <SidebarItem
          icon={<Ticket size={18} />}
          label="Ticket Center"
          active={activePage === "tickets"}
          href="/dashboard/organizations/tickets"
        />
        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings & Privacy"
          active={activePage === "settings"}
          href="/dashboard/organizations/settings"
        />
      </nav>

      <div className="p-5 border-t border-[#E1E4EA] mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#E1E4EA] cursor-pointer transition-colors">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt={userData?.name || "User"}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[14px] font-semibold leading-[120%] text-[#181B25] truncate">
              {userData?.name || "User"}
            </span>
            <span className="text-[12px] font-normal leading-[120%] text-[#525866] truncate">
              {userData?.email || "unknown@email.com"}
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
