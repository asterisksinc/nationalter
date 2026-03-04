import React from "react";
import { Metadata as MetaType } from "next";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import ThreeCardsSection from "../leaderboard/components/ThreeCardsSection";
import ConsultancySection from "../leaderboard/components/ConsultancySection";
import ThreeBlocksSection from "../leaderboard/components/ThreeBlocksSection";
import LeaderboardFinalCTA from "../leaderboard/components/LeaderboardFinalCTA";
import FAQSection from "@/components/site/FAQSection";
import TrustedBy from "@/components/site/TrustedBy";
import FinalCTA from "@/components/site/FinalCTA";
import Thebigcard from "../methodology/components/Thebigcard";
import RightCard from "../methodology/components/Rightcard";

export const metadata: MetaType = {
  title: "H-Index Methodology India | Transparent Ranking Model",
  description: "Understand how NationCite calculates h-index rankings using verified citation datasets, audit logs, and anti-gaming safeguards. Review Methodology.",
  keywords: "h-index calculation India, research ranking methodology India, citation metrics India",
  openGraph: {
    title: "H-Index Methodology India | Transparent Ranking Model",
    description: "NationCite's verified h-index calculation methodology with anti-gaming safeguards.",
    type: "article",
  },
};

export default function MethodologyPage() {
  return (
    <main className="w-full bg-white font-sans text-black">
      {/* Hero Section */}
      <SiteHero>
        {/* BADGE */}
        <Badge>Methodology</Badge>

        {/* HEADING */}
        <h1 className="font-inter mb-8 text-center leading-snug md:max-w-[800px]">
          <span className="block sm:inline">Built on Transparency&nbsp; Governed&nbsp; by Data Integrity</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          Nationcite follows a reproducible, evidence-backed methodology using
          global open and licensed bibliometric sources.
        </p>

        {/* CTA */}
        <div className="flex justify-center w-full">
          <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 mt-10 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200">
            Explore Methodology
          </button>
        </div>
      </SiteHero>
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
