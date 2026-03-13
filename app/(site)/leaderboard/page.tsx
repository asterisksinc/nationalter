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
import { useCmsPage } from "@/lib/use-cms-page";

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "Leaderboard",
    heading_prefix: "Top Researchers & ",
    heading_highlight: "Institutions",
    heading_line_2: "Shaping the Future",
    subheading:
      "Discover the top researchers and institutions driving innovation and making an impact in their fields. Our comprehensive rankings highlight the leaders in academic research and scholarly achievement",
  },
  widget: {
    title: "Researched H-Index Portal",
  },
  faq: {
    kicker: "Know Nationcite",
    title: "Everything You Need to Know About Us",
    body:
      "This section answers the most common questions about Nationcite, who we are, how we operate, and what makes our company different in the digital ecosystem.",
  },
};

export default function LeaderboardPage() {
  const cms = useCmsPage("leaderboard", DEFAULT_CMS);

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
      <SiteHero cms={cms.hero}>
        {/* BADGE */}
        <Badge>{cms.hero.badge_text}</Badge>

        {/* HEADING */}
        <h1 className="font-inter mb-8 text-center">
          {cms.hero.heading_prefix}
          <span className="text-[#FF7A00]">{cms.hero.heading_highlight}</span>
          <br />
          {cms.hero.heading_line_2}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          {cms.hero.subheading}
        </p>
      </SiteHero>

      {/* LeaderboardWidget Section */}
      <section className="w-full section-padding py-8 sm:py-12 md:py-14 lg:py-16 bg-white">
        <div className="w-full mx-auto">
          <div className="w-full bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden">
            <LeaderboardWidget title={cms.widget.title} />
          </div>
        </div>
      </section>

      <ThreeCardsSection />

      <ConsultancySection />

      <ThreeBlocksSection />

      <FAQSection cms={cms.faq} />

      <LeaderboardFinalCTA />
    </div></>
  );
}
