"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar, DashboardHeader } from "./components";

interface ResearchersLayoutProps {
  children: React.ReactNode;
}

export default function ResearchersLayout({
  children,
}: ResearchersLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine active page based on current pathname
  const getActivePage = ():
    | "overview"
    | "publications"
    | "tickets"
    | "analytics"
    | "settings" => {
    if (pathname.includes("/my-researchers")) return "publications";
    if (pathname.includes("/tickets")) return "tickets";
    if (pathname.includes("/analytics")) return "analytics";
    if (pathname.includes("/settings")) return "settings";
    return "overview";
  };

  const activePage = getActivePage();

  // Generate dynamic breadcrumbs based on current page
  const getBreadcrumbs = () => {
    const baseItems = [{ label: "Home", href: "/dashboard/organizations" }];

    switch (activePage) {
      case "publications":
        return [...baseItems, { label: "My Researchers" }];
      case "tickets":
        return [...baseItems, { label: "Ticket Center" }];
      case "analytics":
        return [...baseItems, { label: "Analytics" }];
      case "settings":
        return [...baseItems, { label: "Settings & Privacy" }];
      default:
        return [...baseItems, { label: "Overview" }];
    }
  };

  const breadcrumbItems = getBreadcrumbs();

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        activePage={activePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-[260px] p-4 md:p-6 min-w-0 md:min-w-[1000px] overflow-x-hidden">
        {/* Header */}
        <DashboardHeader
          breadcrumbItems={breadcrumbItems}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
