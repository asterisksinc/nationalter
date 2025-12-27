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
      <section className="relative bg-linear-to-b from-[#FFF5EE] via-[#FFE4C8] to-[#FFD9B3] pt-16 pb-12 md:pt-32 md:pb-24 px-4 md:px-[120px] overflow-hidden page-bg">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full opacity-30 -ml-36 -mb-36"></div>

        <div className="w-full relative z-10">
          <div className="mb-8 mt-8 md:mb-12">
            <span className="text-[#FF7A00] font-medium mb-4 block text-sm  uppercase">
              Methodology
            </span>
            <h1 className="text-[#1E1E1E] mb-4 md:mb-6 text-3xl md:text-5xl leading-[1.0]">
              Built on Transparency,
              <br />
              Governed by Data Integrity{" "}
            </h1>
            <p className="p1 pt-4 text-[#5C5C5C] mb-6 md:mb-8">
              Nationcite follows a reproducible, evidence-backed methodology
              using global open <br /> and licensed bibliometric sources.
            </p>
            <div className="flex flex-wrap gap-4 mt-7">
              <button className="bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#e66e00] transition-colors w-auto">
                CTA Button
              </button>
              <button className="bg-transparent border border-[#1E1E1E] text-[#1E1E1E] px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors w-auto">
                CTA Button
              </button>
            </div>
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
