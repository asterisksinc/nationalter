"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHero from "@/components/site/SiteHero";
import TrustedBy from "@/components/site/TrustedBy";
import UnderstandingHIndex from "@/components/site/UnderstandingHIndex";
import TransparencySection from "@/components/site/TransparencySection";
import PricingSection from "@/components/site/PricingSection";
import ResearchIntelligence from "@/components/site/ResearchIntelligence";
import FinalCTA from "@/components/site/FinalCTA";
import LeaderboardWidget from "@/components/site/LeaderboardWidget";
export default function HomePage() {
  return (
    <div className="min-h-screen  bg-white font-sans">
      {/* Hero Section */}
      <SiteHero>
        {/* Badge at top - with arrow */}
        <div
          className="
    inline-flex items-center justify-center
    flex-nowrap
    gap-2 sm:gap-3
    px-3 sm:px-4 py-2 mt-12
    rounded-md sm:rounded-lg
    bg-white border border-gray-200 shadow-none
    mb-10
  "
        >
          {/* Avatars */}
          <div className="flex -space-x-2 shrink-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
              >
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 20}`}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Text */}
          <span className="text-sm font-medium text-[#1E1E1E] whitespace-nowrap">
            1,928,384+ Indian Researchers
          </span>

          {/* Arrow */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#1E1E1E] shrink-0"
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
          Stop guessing your impact. We verify, rank, and showcase your academic
          performance so you get the funding, promotions, and recognition you
          actually deserve.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row mt-10 justify-center gap-4 w-full">
          <Link
            href="/leaderboard"
            className="flex-1 sm:flex-none font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200"
          >
            Claim My Profile
          </Link>
          <Link
            href="/methodology"
            className="flex-1 sm:flex-none font-inter bg-white text-[#1E1E1E]  border border-gray-300 px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-gray-50"
          >
            Search Directory
          </Link>
        </div>
      </SiteHero>

      {/* Leaderboard Widget Section */}
      <section className="w-full section-padding py-0 bg-white">
        <div className="w-full mx-auto">
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
