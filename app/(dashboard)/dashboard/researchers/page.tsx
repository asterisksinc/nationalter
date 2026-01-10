"use client";

import React, { useState } from "react";
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
        {/* Welcome */}
        <div className="mb-6 pb-4 border-b border-[#E1E4EA]">
          <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B]">
            Good Evening, Dr. Sarah Mitchell!
          </div>
          <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mt-1">
            Welcome back to your Research Impact Portal
          </p>
        </div>

        {/* Stats Row */}
       <div className="mb-6">
  <div
    className="
      bg-white rounded-lg border border-[#E1E4EA]
      grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
      divide-x divide-y divide-[#E1E4EA]
    "
  >
    <StatItem label="University Rank" value="03" change="5" isPositive />
    <StatItem label="World Rank" value="187" change="9" isPositive />
    <StatItem label="Country Rank" value="08" change="01" isPositive={false} />
    <StatItem label="H-Index" value="145" change="17" isPositive />
    <StatItem
      label="Publications"
      value="234"
      change=""
      isPositive
      isHighlight
    />
  </div>
</div>


        {/* Middle Section */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <HIndexChart data={chartData} />
          <div className="col-span-4">
            <ProfileCompleteness percentage={76} missingPublications={5} />
          </div>
        </div>

        {/* Tickets */}
        <TicketsTable
          tickets={tickets}
          openCount={4}
          reviewCount={2}
          approvedCount={18}
          rejectedCount={1}
        />
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
