"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar, DashboardHeader } from "./components";
import { CreateTicketModal } from "@/components/shared/tickets";

interface ResearchersLayoutProps {
  children: React.ReactNode;
}

export default function MedicalLayout({ children }: ResearchersLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data for the modal
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/dashboard/scholar/me");
        const json = await res.json();
        if (json.success && json.data) {
          setUserData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
    const baseItems = [{ label: "Home", href: "/dashboard/medical" }];

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
      <main className="flex-1 ml-0 md:ml-[260px] p-4 md:p-6 overflow-x-hidden">
        {/* Header */}
        <DashboardHeader
          breadcrumbItems={breadcrumbItems}
          onMenuClick={() => setIsSidebarOpen(true)}
          onRaiseTicket={() => setIsModalOpen(true)}
        />

        {/* Page Content */}
        {children}

        {/* Ticket Modal */}
        {userData && (
          <CreateTicketModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            userType="Medical Professional"
            nationciteId={userData.registration.nationciteId}
            userName={
              userData.scholarProfile?.data?.name ||
              userData.user.email.split("@")[0]
            }
          />
        )}
      </main>
    </div>
  );
}
