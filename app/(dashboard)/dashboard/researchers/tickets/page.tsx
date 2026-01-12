"use client";

import React, { useState, useEffect, Suspense } from "react";
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

function TicketsPageContent() {
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
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="text-[18px] md:text-base font-bold md:font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          Ticket Center
        </div>
        <p className="text-[13px] md:text-sm font-normal leading-6 tracking-[-0.02em] text-[#525866]">
          Manage your Tickets
        </p>
      </div>

      {/* Search Bar - Mobile First */}
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by ticket id or type...."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-normal leading-6 tracking-[-0.02em] focus:outline-none focus:border-[#f76a23] text-[#333333] placeholder-[#8E8E93]"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium leading-5 text-[#525866] hover:bg-gray-50 bg-white">
            <Filter size={16} /> Filter
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-[#FF7A00] rounded-lg text-sm font-semibold text-white hover:bg-[#FF8A1A]"
          >
            <Plus size={16} className="text-white" strokeWidth={2.5} /> Raise
            Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards - Responsive */}
      <div className="mb-6">
        <div className="rounded-xl border border-[#E1E4EA] bg-white md:flex md:flex-row md:items-center md:h-[102px] overflow-hidden">
          {/* Mobile: 2x2 Grid for all 4 items */}
          <div className="grid grid-cols-2 md:flex md:flex-1">
            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8 relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] md:after:hidden">
              <span className="text-[13px] md:text-sm text-[#525866]">
                Open Tickets
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                01
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8">
              <span className="text-[13px] md:text-sm text-[#525866]">
                In Review Tickets
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                210
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8 relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] md:after:hidden">
              <span className="text-[13px] md:text-sm text-[#525866]">
                Approved Tickets
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                11
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8">
              <span className="text-[13px] md:text-sm text-[#525866]">
                Rejected
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                129
              </span>
            </div>
          </div>

          {/* Desktop: Vertical dividers */}
          <div className="hidden md:block w-px h-[54px] bg-[#D9D9D9]" />
          <div className="hidden md:block w-px h-[54px] bg-[#D9D9D9]" />
          <div className="hidden md:block w-px h-[54px] bg-[#D9D9D9]" />
        </div>
      </div>

      {/* Tickets Table */}
      <TicketTable tickets={tickets} />

      {/* Create Ticket Modal */}
      <CreateTicketModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default function TicketsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <TicketsPageContent />
    </Suspense>
  );
}
