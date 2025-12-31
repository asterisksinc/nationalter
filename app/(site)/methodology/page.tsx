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
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full opacity-30 -ml-36 -mb-36"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* BADGE */}
          <span className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-sm mt-4 sm:mt-5 md:mt-5 lg:mt-5 mb-2 sm:mb-4 md:mb-4 lg:mb-4">
            Methodology
          </span>

          {/* HEADING */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 md:mb-6 lg:mb-6">
            Built on Transparency,
            <br className="hidden sm:block" />
            Governed by Data Integrity
          </h1>

          {/* DESCRIPTION */}
          <div className="px-4 sm:p-4 md:p-5 lg:p-6 rounded-2xl inline-block mx-auto mb-6 sm:mb-8 md:mb-8 lg:mb-8">
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C]">
              <span className="block max-w-3xl mx-auto">
                Nationcite follows a reproducible, evidence-backed methodology
                using global open and licensed bibliometric sources.
              </span>
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4 lg:gap-4 justify-center items-center w-full px-4 sm:px-0">
            <button className="bg-[#FF7A00] text-white px-4 sm:px-6 md:px-6 lg:px-6 py-2 sm:py-3 md:py-3 lg:py-3 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-xl text-sm sm:text-base md:text-base lg:text-base font-medium hover:bg-[#ff8d28] active:bg-[#ff6d00] transition duration-200 shadow-lg shadow-orange-200 hover:shadow-md focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 w-full sm:w-auto">
              Get Started
            </button>
            <button className="bg-white text-[#1E1E1E] border border-gray-300 px-4 sm:px-6 md:px-6 lg:px-6 py-2 sm:py-3 md:py-3 lg:py-3 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-xl text-sm sm:text-base md:text-base lg:text-base font-medium hover:bg-gray-50 transition duration-200 w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>
      <TrustedBy />

      {/* Big Card Section */}
      <Thebigcard />

      {/* Right Card Sections */}
      <RightCard />
      <ConsultancySection />
      <RightCard />

      <ThreeBlocksSection />

      <FAQSection />
      <FinalCTA />
    </main>
  );
}
