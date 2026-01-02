"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./hero-style.css";
import TrustedBy from "@/components/site/TrustedBy";
import UnderstandingHIndex from "@/components/site/UnderstandingHIndex";
import TransparencySection from "@/components/site/TransparencySection";
import PricingSection from "@/components/site/PricingSection";
import ResearchIntelligence from "@/components/site/ResearchIntelligence";
import FinalCTA from "@/components/site/FinalCTA";
import LeaderboardWidget from "@/components/site/LeaderboardWidget";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="hero relative pt-32 pb-12 w-full overflow-visible bg-white">
        <div className="w-full px-4 md:px-[72px] z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Badge at top - with arrow */}
              <div className="flex items-center justify-center gap-3 px-4 py-2 mt-12 rounded-md sm:rounded-lg bg-white border border-gray-200 shadow-sm mb-10 flex-wrap md:flex-nowrap md:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 20}`}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#1E1E1E] whitespace-nowrap">
                  1,42,846+ Indian Researchers Indexed
                </span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[#1E1E1E]"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Main Heading */}
              <h1 className="mb-8">
                India's H-Index
                <br />
                Leaderboard Portal
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
                Nationcite is India's national research visibility and H-Index
                analytics platform
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row mt-10 justify-center gap-4 w-full">
                <Link
                  href="/leaderboard"
                  className="flex-1 sm:flex-none font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/methodology"
                  className="flex-1 sm:flex-none font-inter bg-white text-[#1E1E1E]  border border-gray-300 px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-gray-50"
                >
                  Methodology
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Widget Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[72px] py-8 sm:py-12 md:py-14 lg:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <LeaderboardWidget />
        </div>
      </section>

      <TrustedBy />
      <UnderstandingHIndex />
      <TransparencySection />
      <PricingSection />
      <ResearchIntelligence />
      <FinalCTA />
    </div>
  );
}
