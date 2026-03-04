"use client";

import React from "react";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import ThreeCardsSection from "./components/ThreeCardsSection";
import ConsultancySection from "./components/ConsultancySection";
import ThreeBlocksSection from "./components/ThreeBlocksSection";
import FAQSection from "@/components/site/FAQSection";
import LeaderboardFinalCTA from "./components/LeaderboardFinalCTA";
import LeaderboardWidget from "@/components/site/LeaderboardWidget";
import Head from "next/head";

export default function LeaderboardPage() {
  return (
    <> <Head>
        <title>Top Indian Researchers by H-Index | 2026 Rankings</title>
        <meta
          name="description"
          content="View India's leading researchers ranked by verified h-index, citations, and disciplines. Filter by state, IITs, NITs, and institutions. Explore Rankings."
        />
        <meta 
          name="keywords" 
          content="Indian researcher rankings, India scientist h-index list, top researchers India" 
        />
        <meta property="og:title" content="Top Indian Researchers by H-Index | 2026 Rankings" />
        <meta property="og:description" content="India's verified researcher rankings by h-index, citations, and discipline." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <SiteHero>
        {/* BADGE */}
        <Badge>Leaderboard</Badge>

        {/* HEADING */}
        <h1 className="font-inter mb-8 text-center">
          Top Researchers & <span className="text-[#FF7A00]">Institutions</span>
          <br />
          Shaping the Future
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          Discover the top researchers and institutions driving innovation and
          making an impact in their fields. Our comprehensive rankings highlight
          the leaders in academic research and scholarly achievement
        </p>
      </SiteHero>

      {/* LeaderboardWidget Section */}
      <section className="w-full section-padding py-8 sm:py-12 md:py-14 lg:py-16 bg-white">
        <div className="w-full mx-auto">
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
    </div></>
  );
}
