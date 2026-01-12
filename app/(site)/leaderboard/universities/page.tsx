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
    name: "SRM University",
    institution: "Chennai",
    hIndex: 150,
    articles: 5000,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    rank: "02",
    name: "Stanford University",
    institution: "California",
    hIndex: 200,
    articles: 8000,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    rank: "03",
    name: "IIT Bombay",
    institution: "Mumbai",
    hIndex: 140,
    articles: 4500,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    rank: "04",
    name: "NIT Delhi",
    institution: "Delhi",
    hIndex: 110,
    articles: 3000,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    rank: "05",
    name: "BITS Pilani",
    institution: "Pilani",
    hIndex: 130,
    articles: 4000,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 6,
    rank: "06",
    name: "IISc Bangalore",
    institution: "Bangalore",
    hIndex: 180,
    articles: 6000,
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 7,
    rank: "07",
    name: "VIT Vellore",
    institution: "Vellore",
    hIndex: 125,
    articles: 3800,
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 8,
    rank: "08",
    name: "LPU Jalandhar",
    institution: "Jalandhar",
    hIndex: 100,
    articles: 2500,
    avatar: "https://i.pravatar.cc/150?img=42",
  },
  {
    id: 9,
    rank: "09",
    name: "Panjab University",
    institution: "Chandigarh",
    hIndex: 115,
    articles: 3200,
    avatar: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: 10,
    rank: "10",
    name: "Delhi University",
    institution: "Delhi",
    hIndex: 135,
    articles: 4200,
    avatar: "https://i.pravatar.cc/150?img=53",
  },
];

export default function UniversitiesLeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <SiteHero>
        {/* BADGE */}
        <Badge>Leaderboard</Badge>

        {/* Main Heading */}
        <h1 className="font-inter  md:max-w-[700px] mb-8 text-center">
          Top Universities & Institutions
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          Discover India&apos;s leading universities and research institutions
          excelling in research output and academic excellence. Ranked by
          H-Index and research contributions.
        </p>

        {/* CTA BUTTON */}
        <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6">
          Explore Universities
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
                    Universities Leaderboard
                  </h3>
                </div>

                <div className="relative group w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search universities..."
                    className="pl-10 pr-4 py-3 w-full md:w-[320px] bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-all shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <LeaderboardTable data={MOCK_DATA} type="Universities" />
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
