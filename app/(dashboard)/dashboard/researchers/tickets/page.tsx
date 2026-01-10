"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Ticket,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronRight,
  LogOut,
  Filter,
} from "lucide-react";
import {
  SidebarItem,
  StatCard,
  TicketTable,
  CreateTicketModal,
} from "./components";

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

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="NationCite Logo"
              className="h-[90px] w-auto"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            href="/dashboard/researchers"
          />
          <SidebarItem
            icon={<FileText size={18} />}
            label="My Publications"
            href="/dashboard/researchers/publications"
          />
          <SidebarItem icon={<BarChart2 size={18} />} label="Analytics" />
          <SidebarItem
            icon={<Ticket size={18} />}
            label="Tickets Center"
            active
            href="/dashboard/researchers/tickets"
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings & Privacy"
          />
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[14px] font-semibold leading-[120%] text-[#181B25] truncate">
                John Doe
              </span>
              <span className="text-[12px] font-normal leading-[120%] text-[#525866] truncate">
                example@gmail.com
              </span>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center text-[12px] font-normal leading-[120%] text-[#525866]">
            <Link
              href="/dashboard/researchers"
              className="hover:text-[#0E121B] cursor-pointer"
            >
              Home
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-[#0E121B] font-medium">Tickets Center</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-4 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg text-[14px] font-normal leading-[150%] tracking-[-0.02em] focus:outline-none w-64 text-[#333333] placeholder-[#8E8E93] transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#f76a23] hover:bg-[#e05a1a] text-white px-4 py-2 rounded-[8px] text-[14px] font-semibold leading-[120%] transition-colors w-[142px] h-[40px] justify-center"
            >
              Raise Ticket <Plus size={16} />
            </button>
          </div>
        </header>

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
        <div className="grid grid-cols-5 gap-4 mb-6">
          <StatCard label="Open Tickets" value="01" />
          <StatCard label="In Review Tickets" value="04" />
          <StatCard label="Approved Tickets" value="03" />
          <StatCard label="Active Tickets" value="02" />
          <StatCard label="Rejected" value="00" />
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
        <CreateTicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}
