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
      <main className="pb-8">
        {/* Welcome */}
        <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
          <div className="text-[18px] md:text-[16px] font-semibold leading-[120%] tracking-[-0.006em] text-[#0E121B]">
            Good Evening, Dr. Ashok Kumar!
          </div>
          <p className="text-[13px] md:text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mt-1">
            Welcome back to your Research Impact Portal.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-4 md:mb-6">
          <div
            className="
              rounded-xl border border-[#E1E4EA] bg-white
              flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_minmax(100px,0.8fr)] lg:h-[100px] lg:items-center
              overflow-hidden
            "
          >
            {/* Mobile: 2x2 Grid for first 4 items */}
            <div className="grid grid-cols-2 lg:contents">
              <StatItem
                label="University Rank"
                value="01"
                change="8"
                isPositive={true}
                className="relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] lg:after:hidden"
              />
              <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>
              <StatItem
                label="World Rank"
                value="210"
                change="12"
                isPositive={true}
                className=""
              />
              <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>
              <StatItem
                label="Country Rank"
                value="11"
                change="02"
                isPositive={false}
                className="relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] lg:after:hidden"
              />
              <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>
              <StatItem
                label="H-Index"
                value="129"
                change="13"
                isPositive={true}
                className=""
              />
            </div>
            <div className="hidden lg:block w-[1px] h-[54px] bg-[#E1E4EA]"></div>

            {/* Mobile: Publications Full Width */}
            <div className="col-span-2 lg:col-span-1 lg:border-t-0 border-[#E1E4EA] lg:h-auto lg:self-center lg:max-w-[140px]">
              <StatItem
                label="Publications"
                value="192"
                change=""
                isPositive
                isHighlight
                className="h-full px-4 py-3 lg:px-5 lg:py-3"
              />
            </div>
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
        <div className="mt-6 lg:hidden">
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
