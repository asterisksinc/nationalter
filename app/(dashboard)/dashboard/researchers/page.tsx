"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  StatItem,
  HIndexChart,
  ProfileCompleteness,
  TicketsTable,
} from "./components";
import { CreateTicketModal } from "../researchers/tickets/components";

// --- Types ---

interface TicketData {
  id: string;
  type: string;
  status:
    | "Approved"
    | "Awaiting Review"
    | "Rejected"
    | "Under Review"
    | "Active";
  date: string;
}

// --- Mock Data ---

const chartData = [
  { month: "Jan", value: 4.2 },
  { month: "Feb", value: 5.8 },
  { month: "Mar", value: 4.5 },
  { month: "Apr", value: 5.5 },
  { month: "May", value: 7.2 },
  { month: "Jun", value: 6.1 },
  { month: "Jul", value: 7.3 },
  { month: "Aug", value: 5.2 },
  { month: "Sept", value: 6.5 },
  { month: "Oct", value: 7.8 },
  { month: "Nov", value: 7.0 },
  { month: "Dec", value: 5.5 },
];

const tickets: TicketData[] = [
  {
    id: "#289457",
    type: "Citation verification",
    status: "Approved",
    date: "15 Dec 2025",
  },
  {
    id: "#371952",
    type: "Author profile merge",
    status: "Awaiting Review",
    date: "08 Dec 2025",
  },
  {
    id: "#642871",
    type: "Department change",
    status: "Rejected",
    date: "22 Nov 2025",
  },
  {
    id: "#519384",
    type: "Account recovery",
    status: "Under Review",
    date: "05 Jan 2026",
  },
  {
    id: "#738291",
    type: "Citation verification",
    status: "Active",
    date: "12 Dec 2025",
  },
];

// --- Main Page Component ---

export default function ResearchersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main>
        {/* Mobile Search Bar */}
        <div className="md:hidden mb-4 flex items-center gap-3">
          <div className="relative flex-1 h-[40px]">
            <Search
              className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#525866]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search"
              className="pl-[38px] pr-3 py-[10px] w-full h-full bg-[#F2F5F8] border border-[#E1E4EA] rounded-[6px] text-[14px] font-normal leading-[120%] text-[#525866] placeholder-[#525866] focus:bg-white focus:border-[#E1E4EA] focus:outline-none transition-all"
            />
          </div>
          <button className="w-[40px] h-[40px] bg-[#FF7A00] rounded-[6px] flex items-center justify-center shrink-0">
            <Plus size={20} className="text-white" />
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA]">
          <div className="text-[14px] md:text-[16px] font-semibold leading-[120%] tracking-[-0.006em] text-[#0E121B]">
            Good Evening, Dr. Ashick Kumar!
          </div>
          <p className="text-[12px] md:text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mt-1">
            Welcome back to your Research Impact Portal
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-4 md:mb-6">
          <div
            className="
              rounded-lg h-[100px] border border-[#E1E4EA]
              grid grid-cols-2 lg:grid-cols-5
              bg-transparent overflow-hidden items-center
            "
          >
            <StatItem
              label="University Rank"
              value="01"
              change="6"
              isPositive
            />
            <StatItem label="World Rank" value="210" change="12" isPositive />
            <StatItem
              label="Country Rank"
              value="11"
              change="02"
              isPositive={false}
            />
            <StatItem label="H-Index" value="129" change="13" isPositive />
            <StatItem
              label="Publications"
              value="192"
              change=""
              isPositive
              isHighlight
              className="col-span-2 lg:col-span-1"
            />
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <HIndexChart data={chartData} />
          <div className="hidden lg:block lg:col-span-4">
            <ProfileCompleteness percentage={82} missingPublications={3} />
          </div>
        </div>

        {/* Tickets */}
        <TicketsTable
          tickets={tickets}
          openCount={3}
          reviewCount={2}
          approvedCount={12}
          rejectedCount={1}
        />

        {/* Mobile Profile Completeness */}
        <div className="mt-4 lg:hidden">
          <ProfileCompleteness percentage={82} missingPublications={3} />
        </div>
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
