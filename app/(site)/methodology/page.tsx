import React from "react";
import { Metadata } from "next";
import "./methstyle.css";
import ThreeCardsSection from "../leaderboard/components/ThreeCardsSection";
import ConsultancySection from "../leaderboard/components/ConsultancySection";
import ThreeBlocksSection from "../leaderboard/components/ThreeBlocksSection";
import LeaderboardFinalCTA from "../leaderboard/components/LeaderboardFinalCTA";
import FAQSection from "@/components/site/FAQSection";
import TrustedBy from "@/components/site/TrustedBy";
import FinalCTA from "@/components/site/FinalCTA";
import Thebigcard from "../methodology/components/Thebigcard";
import RightCard from "../methodology/components/Rightcard";

export const metadata: Metadata = {
  title: "Methodology | Nationcite",
  description: "Nationcite's H-Index Methodology",
};

export default function MethodologyPage() {
  return (
    <main className="w-full bg-white font-sans text-black">
      {/* Hero Section */}
      <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-[120px] min-h-screen sm:h-screen flex flex-col items-center justify-center text-center page-bg py-8 sm:py-10 md:py-10 lg:py-10">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0  h-96  rounded-full opacity-20 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full opacity-30 -ml-36 -mb-36"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full">
          {/* BADGE */}
          <span className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-sm mt-4 sm:mt-5 md:mt-5 lg:mt-5 mb-2 sm:mb-4 md:mb-4 lg:mb-4">
            Methodology
          </span>

          {/* HEADING */}
          <h1 className="font-inter mb-8 text-center">
            Built on Transparency,
            <br className="hidden sm:block" />
            Governed by Data Integrity
          </h1>

          {/* DESCRIPTION */}
          <p className="p1 pt-4 mb-10 max-w-[500px] mx-auto text-center">
            Nationcite follows a reproducible, evidence-backed methodology using
            global open and licensed bibliometric sources.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row mt-10 justify-center items-center gap-4  sm:w-auto">
            <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 w-full sm:w-auto">
              Explore Methodology
            </button>
         
          </div>
        </div>
      </section>
      <TrustedBy />

      {/* Big Card Section */}
      <Thebigcard />

      {/* Right Card Sections */}
      <RightCard />

      <ThreeBlocksSection />

      <FAQSection />
      <FinalCTA />
    </main>
  );
}
