"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import "../hero-style.css";
import LeaderboardTable, {
  LeaderboardEntry,
} from "@/components/site/LeaderboardTable";
import ThreeCardsSection from "../components/ThreeCardsSection";
import ConsultancySection from "../components/ConsultancySection";
import TabContentToggle from "../components/TabContentToggle";
import ThreeBlocksSection from "../components/ThreeBlocksSection";
import FAQSection from "@/components/site/FAQSection";
import LeaderboardFinalCTA from "../components/LeaderboardFinalCTA";

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

export default function ScholarsLeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="hero relative pt-48 pb-12 w-full overflow-visible">
        <div className="w-full px-4 md:px-[72px] z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mx-auto">
              {/* Main Heading */}
              <h1 className="font-inter z-10 max-w-sm md:max-w-2xl  lg:max-w-4xl mb-8 text-center  text-slate-700">
                Top Researchers & Scholars
              </h1>

              {/* Subheading */}
              <p className="p1 pt-4 mb-10 max-w-xs sm:max-w-sm z-20 md:max-w-md lg:max-w-2xl mx-auto text-center text-slate-600">
                Explore India's leading researchers and scholars who are
                advancing knowledge and contributing to global research. Ranked
                by H-Index and research impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[72px] py-8 sm:py-12 md:py-14 lg:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* HEADER SECTION: Title and Search */}
            <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3
                    className="h3-bento text-slate-900 flex items-center gap-3"
                    style={{
                      fontFamily:
                        "'Helvetica Rounded', 'Helvetica', sans-serif",
                    }}
                  >
                    <div className="p-2 bg-orange-50 rounded-lg text-[#FF7A00]">
                      <Sparkles size={20} />
                    </div>
                    Scholars Leaderboard
                  </h3>
                </div>

                <div className="relative group w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search scholars..."
                    className="pl-10 pr-4 py-3 w-full md:w-[320px] bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <LeaderboardTable data={MOCK_DATA} type="Scholars" />
          </div>
        </div>
      </section>

      <ThreeCardsSection />


      <TabContentToggle
        title="Custom Consultancy Calls"
        description="Powered by Industry Experts"
        ctaText="Explore All Resources"
        tabs={[
          {
            id: "feature1",
            label: "Feature 1",
            content: (
              <div className="text-center text-slate-600">
                Placeholder content for feature 1
              </div>
            ),
          },
          {
            id: "feature2",
            label: "Feature 2",
            content: (
              <div className="text-center text-slate-600">
                Placeholder content for feature 2
              </div>
            ),
          },
          {
            id: "feature3",
            label: "Feature 3",
            content: (
              <div className="text-center text-slate-600">
                Placeholder content for feature 3
              </div>
            ),
          },
        ]}
      />

      <ThreeBlocksSection />

      <FAQSection />

      <LeaderboardFinalCTA />
    </div>
  );
}
