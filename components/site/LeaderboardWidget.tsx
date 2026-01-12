"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Building2,
  Stethoscope,
  Search,
  Sparkles,
} from "lucide-react";
import LeaderboardTable, { LeaderboardEntry } from "./LeaderboardTable";

// --- Mock Data ---
const MOCK_DATA: LeaderboardEntry[] = [
  {
    id: 1,
    rank: "01",
    name: "John doe",
    institution: "SRM University, Chennai",
    hIndex: 83,
    articles: 129,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    rank: "02",
    name: "Sarah Jenkins",
    institution: "Stanford University",
    hIndex: 92,
    articles: 145,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    rank: "03",
    name: "Aarav Mehta",
    institution: "IIT Bombay",
    hIndex: 78,
    articles: 112,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    rank: "04",
    name: "Sanya Gupta",
    institution: "NIT Delhi",
    hIndex: 81,
    articles: 132,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    rank: "05",
    name: "Rohan Sharma",
    institution: "BITS Pilani",
    hIndex: 75,
    articles: 150,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 6,
    rank: "06",
    name: "Meera Suresh",
    institution: "IISc Bangalore",
    hIndex: 88,
    articles: 148,
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 7,
    rank: "07",
    name: "Anika Reddy",
    institution: "VIT Vellore",
    hIndex: 79,
    articles: 135,
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 8,
    rank: "08",
    name: "Karan Singh",
    institution: "SRM University",
    hIndex: 80,
    articles: 142,
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: 9,
    rank: "09",
    name: "Simran Kaur",
    institution: "LPU Jalandhar",
    hIndex: 76,
    articles: 138,
    avatar: "https://i.pravatar.cc/150?img=42",
  },
  {
    id: 10,
    rank: "10",
    name: "Nikhil Verma",
    institution: "Panjab University",
    hIndex: 77,
    articles: 136,
    avatar: "https://i.pravatar.cc/150?img=60",
  },
];

const LeaderboardWidget = ({
  title = "Researched H-Index Portal",
}: {
  title?: string;
}) => {
  const [activeTab, setActiveTab] = useState<
    "Scholars" | "Universities" | "Doctors"
  >("Scholars");
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    // helpful for debugging mounting issues in devtools console
    console.log("LeaderboardWidget mounted", { activeTab });
  }, []);

  const tabs = [
    { id: "Scholars", icon: GraduationCap, label: "Scholars" },
    { id: "Universities", icon: Building2, label: "Universities" },
    { id: "Doctors", icon: Stethoscope, label: "Doctors" },
  ] as const;

  return (
    // allow the widget to stretch full width inside the 72px gutters
    <div className="bg-white rounded-md sm:rounded-lg shadow-xl shadow-slate-200/60 w-full max-w-none flex flex-col border border-slate-100 overflow-hidden min-h-[700px]">
      {/* HEADER SECTION: Title, Search, and Tabs on Top */}
      <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="text-center md:text-left w-full md:w-auto">
            <h3 className="h3 flex items-center gap-3 justify-center md:justify-start">
              {title}
            </h3>
          </div>

          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search researchers, institutions..."
              className="pl-10 pr-4 py-3 w-full md:w-[320px] bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm font-inter text-slate-700 placeholder:text-slate-400 placeholder:font-inter focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-all shadow-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Bottom Row: Tabs Selection
            Mobile: grid with 2 columns, third tab spans both columns and is centered.
            Desktop: keep existing inline pill buttons. */}
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            // make the third tab span both columns on small screens
            const mobileSpanClass = idx === 2 ? "col-span-2" : "";

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-inter font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-[#FF7A00] text-white border-[#FF7A00] shadow-lg shadow-orange-200 transform -translate-y-0.5"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                } ${mobileSpanClass}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <LeaderboardTable data={MOCK_DATA} type={activeTab} />
    </div>
  );
};

export default LeaderboardWidget;
