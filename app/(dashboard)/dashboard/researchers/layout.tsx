"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar, DashboardHeader } from "./components";

interface ResearchersLayoutProps {
  children: React.ReactNode;
}

export default function ResearchersLayout({
  children,
}: ResearchersLayoutProps) {
  const pathname = usePathname();

  // Determine active page based on current pathname
  const getActivePage = ():
    | "overview"
    | "publications"
    | "tickets"
    | "settings" => {
    if (pathname.includes("/publications")) return "publications";
    if (pathname.includes("/tickets")) return "tickets";
    if (pathname.includes("/settings")) return "settings";
    return "overview";
  };

  const activePage = getActivePage();

  // Generate dynamic breadcrumbs based on current page
  const getBreadcrumbs = () => {
    const baseItems = [{ label: "Home", href: "/dashboard/researchers" }];

    switch (activePage) {
      case "publications":
        return [...baseItems, { label: "My Publications" }];
      case "tickets":
        return [...baseItems, { label: "Ticket Center" }];
      case "settings":
        return [...baseItems, { label: "Settings & Privacy" }];
      default:
        return [...baseItems, { label: "Overview" }];
    }
  };

  const breadcrumbItems = getBreadcrumbs();

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
      {/* Sidebar */}
      <DashboardSidebar activePage={activePage} />

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-6 min-w-[1000px]">
        {/* Header */}
        <DashboardHeader breadcrumbItems={breadcrumbItems} />

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
