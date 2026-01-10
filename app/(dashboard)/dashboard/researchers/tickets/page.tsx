"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { StatCard, TicketTable, CreateTicketModal } from "./components";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// --- Types ---

interface TicketData {
  id: string;
  submittedOn: string;
  issueType: string;
  status:
    | "Active"
    | "Awaiting Review"
    | "Approved"
    | "Under Review"
    | "Rejected";
  priority: "High" | "Normal" | "Low";
  lastUpdate: string;
  adminResponse: string;
}

// --- Mock Data ---

const tickets: TicketData[] = [
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Profile Data Incorrect",
    status: "Active",
    priority: "Normal",
    lastUpdate: "28/11/2025",
    adminResponse: "We're verifying this with your...",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Not My Paper",
    status: "Awaiting Review",
    priority: "High",
    lastUpdate: "28/11/2025",
    adminResponse: "-",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Affiliation Issue",
    status: "Approved",
    priority: "Low",
    lastUpdate: "-",
    adminResponse: "Please upload your acceptan...",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Not My Paper",
    status: "Awaiting Review",
    priority: "High",
    lastUpdate: "28/11/2025",
    adminResponse: "-",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Not My Paper",
    status: "Awaiting Review",
    priority: "Normal",
    lastUpdate: "-",
    adminResponse: "-",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Affiliation Issue",
    status: "Awaiting Review",
    priority: "Low",
    lastUpdate: "28/11/2025",
    adminResponse: "-",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Missing Publication",
    status: "Under Review",
    priority: "Normal",
    lastUpdate: "-",
    adminResponse: "Please upload your acceptan...",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Profile Data Incorrect",
    status: "Active",
    priority: "Low",
    lastUpdate: "28/11/2025",
    adminResponse: "We're verifying this with your...",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Missing Publication",
    status: "Active",
    priority: "Normal",
    lastUpdate: "28/11/2025",
    adminResponse: "We're verifying this with your...",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Profile Data Incorrect",
    status: "Rejected",
    priority: "High",
    lastUpdate: "-",
    adminResponse: "Due to unforseen reasons tic...",
  },
  {
    id: "TKT-15678",
    submittedOn: "24/11/2025",
    issueType: "Profile Data Incorrect",
    status: "Rejected",
    priority: "High",
    lastUpdate: "28/11/2025",
    adminResponse: "Due to unforseen reasons tic...",
  },
];

// --- Main Page Component ---

export default function TicketsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams?.get("openCreate") === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setIsModalOpen(false);
    // Remove query param if present
    if (searchParams?.get("openCreate") === "true") {
      router.replace(pathname);
    }
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <div className="text-[16px] font-semibold leading-[20px] tracking-[-0.006em] text-[#0E121B] mb-1">
          Ticket Center
        </div>
        <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
          Manage your Tickets
        </p>
      </div>

      {/* Stats Cards */}
      <div className="w-full bg-white border mb-[24px] border-[#E1E4EA] rounded-xl px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-[#525866]">Open Tickets</span>
          <span className="text-2xl font-semibold text-[#0E121B]">01</span>
        </div>

        <div className="w-px h-10 bg-[#D9D9D9]" />

        <div className="flex flex-col">
          <span className="text-sm text-[#525866]">In Review Tickets</span>
          <span className="text-2xl font-semibold text-[#0E121B]">04</span>
        </div>

        <div className="w-px h-10 bg-[#D9D9D9]" />

        <div className="flex flex-col">
          <span className="text-sm text-[#525866]">Approved Tickets</span>
          <span className="text-2xl font-semibold text-[#0E121B]">03</span>
        </div>

        <div className="w-px h-10 bg-[#D9D9D9]" />

        <div className="flex flex-col">
          <span className="text-sm text-[#525866]">Rejected</span>
          <span className="text-2xl font-semibold text-[#0E121B]">00</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Tickets"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-normal leading-[150%] tracking-[-0.02em] focus:outline-none focus:border-[#f76a23] text-[#333333] placeholder-[#8E8E93]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-[8px] text-[14px] font-medium leading-[120%] text-[#525866] hover:bg-gray-50 bg-white">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Tickets Table */}
      <TicketTable tickets={tickets} />

      {/* Create Ticket Modal */}
      <CreateTicketModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
