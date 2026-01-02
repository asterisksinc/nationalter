"use client";

import React from "react";
import "./hero-style.css";
import ThreeCardsSection from "./components/ThreeCardsSection";
import ConsultancySection from "./components/ConsultancySection";
import ThreeBlocksSection from "./components/ThreeBlocksSection";
import FAQSection from "@/components/site/FAQSection";
import LeaderboardFinalCTA from "./components/LeaderboardFinalCTA";
import LeaderboardWidget from "@/components/site/LeaderboardWidget";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-[120px] min-h-screen sm:h-screen flex flex-col items-center justify-center text-center page-bg py-8 sm:py-10 md:py-10 lg:py-10">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full opacity-30 -ml-36 -mb-36"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full">
          {/* BADGE */}
          <span className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-sm mt-4 sm:mt-5 md:mt-5 lg:mt-5 mb-2 sm:mb-4 md:mb-4 lg:mb-4">
            Leaderboard
          </span>

          {/* HEADING */}
          <h1 className="font-inter mb-8 text-center">
            Top Researchers &{" "}
            <span className="text-[#FF7A00]">Institutions</span>
            <br />
            Shaping the Future
          </h1>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
            Discover the top researchers and institutions driving innovation and
            making an impact in their fields. Our comprehensive rankings
            highlight the leaders in academic research and scholarly achievement
          </p>
        </div>
      </section>

      {/* LeaderboardWidget Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-8 sm:py-12 md:py-14 lg:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden">
            <LeaderboardWidget />
          </div>
        </div>
      </section>

      <ThreeCardsSection />

      <ConsultancySection />

      <ThreeBlocksSection />

      <FAQSection />

      <LeaderboardFinalCTA />
    </div>
  );
}
