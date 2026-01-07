"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Plus, ChevronRight } from "lucide-react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Column, TicketCardData } from "./components";

// --- Mock Data ---

const pendingTickets: TicketCardData[] = [
  {
    id: "#5829471",
    title: "Profile Verification Issue",
    status: "Pending",
    time: "14:32:15",
    date: "06/01/2026",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "#6194738",
    title: "Research Metrics Update",
    status: "Pending",
    time: "09:45:22",
    date: "07/01/2026",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const inProgressTickets: TicketCardData[] = [
  {
    id: "#4721893",
    title: "Citation Count Verification",
    status: "In-Progress",
    time: "11:18:45",
    date: "05/01/2026",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "#3851927",
    title: "Institution Affiliation Change",
    status: "In-Progress",
    time: "16:27:33",
    date: "04/01/2026",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "#2947561",
    title: "ORCID Integration Request",
    status: "In-Progress",
    time: "13:52:08",
    date: "03/01/2026",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const completedTickets: TicketCardData[] = [
  {
    id: "#8471925",
    title: "Name Spelling Correction",
    status: "Completed",
    time: "10:15:42",
    date: "02/01/2026",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "#7362894",
    title: "Password Reset Assistance",
    status: "Completed",
    time: "08:33:19",
    date: "30/12/2025",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "#6285173",
    title: "Co-author Verification",
    status: "Completed",
    time: "15:47:56",
    date: "28/12/2025",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "#5194826",
    title: "Document Upload Request",
    status: "Completed",
    time: "12:05:31",
    date: "27/12/2025",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

// --- Main Page Component ---

export default function TicketsPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
      {/* Sidebar */}
      <DashboardSidebar activePage="tickets" />

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-8 min-w-[1000px]">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link
              href="/dashboard/researchers"
              className="hover:text-gray-900 cursor-pointer"
            >
              Home
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-[#1e1e1e] font-medium">Tickets Center</span>
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
                className="pl-9 pr-4 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg text-sm focus:outline-none w-64 text-gray-700 placeholder:text-gray-400 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 relative shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="flex items-center gap-2 bg-[#f76a23] hover:bg-[#e05a1a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              Raise Ticket <Plus size={16} />
            </button>
          </div>
        </header>

        {/* Page Title */}
        <div className="mb-6">
          <h4 className="mb-1">Tickets Center</h4>
          <p className="text-sm text-gray-500">Manage your Tickets</p>
        </div>

        {/* Search Bar Big */}
        <div className="mb-8 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Tickets"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#f76a23] text-gray-700"
          />
        </div>

        {/* Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          <Column
            title="Pending"
            count={pendingTickets.length}
            tickets={pendingTickets}
            status="Pending"
          />
          <Column
            title="In-Progress"
            count={inProgressTickets.length}
            tickets={inProgressTickets}
            status="In-Progress"
          />
          <Column
            title="Completed"
            count={completedTickets.length}
            tickets={completedTickets}
            status="Completed"
          />
        </div>
      </main>
    </div>
  );
}
