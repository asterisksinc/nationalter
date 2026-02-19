"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
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
    name: "Dr. John Doe",
    institution: "Apollo Hospital",
    hIndex: 60,
    articles: 80,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    rank: "02",
    name: "Dr. Sarah Jenkins",
    institution: "AIIMS Delhi",
    hIndex: 75,
    articles: 110,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    rank: "03",
    name: "Dr. Aarav Mehta",
    institution: "Fortis Healthcare",
    hIndex: 55,
    articles: 70,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    rank: "04",
    name: "Dr. Sanya Gupta",
    institution: "Max Super Speciality",
    hIndex: 65,
    articles: 90,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    rank: "05",
    name: "Dr. Rohan Sharma",
    institution: "Medanta",
    hIndex: 58,
    articles: 85,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 6,
    rank: "06",
    name: "Dr. Meera Suresh",
    institution: "Manipal Hospital",
    hIndex: 70,
    articles: 100,
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 7,
    rank: "07",
    name: "Dr. Anika Reddy",
    institution: "Narayana Health",
    hIndex: 62,
    articles: 88,
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 8,
    rank: "08",
    name: "Dr. Karan Singh",
    institution: "Sir Ganga Ram Hospital",
    hIndex: 68,
    articles: 95,
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: 9,
    rank: "09",
    name: "Dr. Simran Kaur",
    institution: "Lilavati Hospital",
    hIndex: 50,
    articles: 60,
    avatar: "https://i.pravatar.cc/150?img=42",
  },
  {
    id: 10,
    rank: "10",
    name: "Dr. Nikhil Verma",
    institution: "Kokilaben Hospital",
    hIndex: 52,
    articles: 65,
    avatar: "https://i.pravatar.cc/150?img=60",
  },
];

export default function DoctorsLeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = MOCK_DATA.length;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <SiteHero>
        {/* BADGE */}
        <Badge>Leaderboard</Badge>

        {/* Main Heading */}
        <h1 className="font-inter md:max-w-[700px] mb-8 text-center">
          Top Doctors & Medical Researchers
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          Discover the top doctors and medical researchers driving innovation
          and making an impact in healthcare. Our comprehensive rankings
          highlight the leaders in medical research.
        </p>

        {/* CTA BUTTON */}
        <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6">
          Explore Doctors
        </button>
      </SiteHero>

      {/* Leaderboard Section */}
      <section className="w-full section-padding py-0 bg-white">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden">
            {/* HEADER SECTION: Title and Search */}
            <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                  <h3
                    className="h3-bento text-slate-900 flex items-center gap-3 justify-center md:justify-start"
                    style={{
                      fontFamily:
                        "'Helvetica Rounded', 'Helvetica', sans-serif",
                    }}
                  >
                    <div className="p-2 bg-orange-50 rounded-md sm:rounded-lg text-[#FF7A00]">
                      <Sparkles size={20} />
                    </div>
                    Doctors Leaderboard
                  </h3>
                </div>

                <div className="relative group w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    className="pl-10 pr-4 py-3 w-full md:w-[320px] bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-all shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <LeaderboardTable
              data={MOCK_DATA}
              type="Doctors"
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              itemsPerPage={10}
            />
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
