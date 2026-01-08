"use client";

import React from "react";
import { Check } from "lucide-react";
import {
  DashboardSidebar,
  DashboardHeader,
  StatItem,
  HIndexChart,
  ProfileCompleteness,
  TicketsTable,
} from "./components";

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
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
      {/* Sidebar */}
      <DashboardSidebar activePage="overview" />

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-8 min-w-[1000px]">
        {/* Header */}
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]}
        />

        {/* Welcome */}
        <div className="mb-6">
          <div className="text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-[#0E121B]">
            Good Evening, Dr. Sarah Mitchell!
          </div>
          <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
            Welcome back to your Research Impact Portal.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 mb-6">
          {/* Main Metrics Group */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex divide-x divide-gray-100">
            <div className="flex-1">
              <StatItem
                label="University Rank"
                value="03"
                change="5"
                isPositive={true}
              />
            </div>
            <div className="flex-1">
              <StatItem
                label="World Rank"
                value="187"
                change="9"
                isPositive={true}
              />
            </div>
            <div className="flex-1">
              <StatItem
                label="Country Rank"
                value="08"
                change="01"
                isPositive={false}
              />
            </div>
            <div className="flex-1">
              <StatItem
                label="H-Index"
                value="145"
                change="17"
                isPositive={true}
              />
            </div>
          </div>

          {/* Publications Card */}
          <div className="w-[200px] bg-orange-50 rounded-xl border border-orange-100 p-4 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-2">
              <div className="bg-orange-100 rounded-full p-1">
                <Check size={12} className="text-[#f76a23]" strokeWidth={3} />
              </div>
            </div>
            <span className="text-[14px] font-medium leading-[20px] text-[#525866] mb-1">
              Publications
            </span>
            <span className="text-[32px] font-semibold leading-tight text-[#f76a23]">
              234
            </span>
            {/* Decorative gradient overlay */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-200 to-transparent rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>

        {/* Middle Section: Chart + Profile */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Chart */}
          <HIndexChart data={chartData} />

          {/* Profile Completeness */}
          <ProfileCompleteness percentage={76} missingPublications={5} />
        </div>

        {/* Tickets Section */}
        <TicketsTable
          tickets={tickets}
          openCount={4}
          reviewCount={2}
          approvedCount={18}
          rejectedCount={1}
        />
      </main>
    </div>
  );
}
