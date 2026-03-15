"use client";

import React from "react";
import Link from "next/link";
import SiteHero from "@/components/site/SiteHero";
import TrustedBy from "@/components/site/TrustedBy";
import UnderstandingHIndex from "@/components/site/UnderstandingHIndex";
import TransparencySection from "@/components/site/TransparencySection";
import PricingSection from "@/components/site/PricingSection";
import ResearchIntelligence from "@/components/site/ResearchIntelligence";
import FinalCTA from "@/components/site/FinalCTA";
import LeaderboardWidget from "@/components/site/LeaderboardWidget";
import Head from "next/head";
import { useCmsPage } from "@/lib/use-cms-page";

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    top_message: "1,928,384+ Indian Researchers",
    heading_line_1: "India's H-Index",
    heading_line_2: "Leaderboard Portal",
    subheading:
      "Stop guessing your impact. We verify, rank, and showcase your academic performance so you get the funding, promotions, and recognition you actually deserve.",
    primary_cta_label: "Claim My Profile",
    secondary_cta_label: "Search Directory",
  },
  trusted_by: {
    heading: "Trusted by India&apos;s Top Institutions",
  },
  h_index: {
    heading: "The Number That Defines Your Career",
    subheading:
      "Your H-index is more than just a statistic. In modern academia, it is your currency. Here is why it matters.",
  },
  transparency: {
    heading: "Built on Transparency.\nGoverned by Data Integrity.",
    subheading:
      "NationCite follows a reproducible, evidence-backed methodology using global open and licensed bibliometric sources. Every metric is source-labeled and continuously updated.",
    cta_label: "View Full Methodology",
    cta_url: "/methodology",
  },
  pricing: {
    badge_text: "Membership",
    heading: "Fair Plans for Serious Professionals",
  },
  research_intelligence: {
    kicker: "Intelligence",
    heading: "The Research Playbook",
    subheading:
      "Strategies to increase your citations, win grants, and publish in Q1 journals.",
    cta_label: "Read All Guides",
  },
  final_cta: {
    kicker: "Get Verified",
    heading: "Your work deserves to be seen",
    body:
      "Don't let your hard-earned citations get lost in the noise. Join India's top researchers on the leaderboard today.",
    primary_cta_label: "Claim My Profile Now",
    banner_image: "/CTA Section Image - Nationcite.png",
    banner_alt: "Nationcite CTA Section",
  },
};

export default function HomePage() {
  const cms = useCmsPage("home", DEFAULT_CMS);

  return (
    <>      <Head>
        <title>India H-Index Rankings 2026 | Verified Research Data</title>
        <meta
          name="description"
          content="Explore India h-index rankings across researchers, universities, and states with transparent, verified metrics and daily updates. View Leaderboard."
        />
        <meta name="keywords" content="India h-index ranking, Indian researcher rankings, h-index India 2026, research rankings India" />
        <meta property="og:title" content="India H-Index Rankings 2026 | Verified Research Data" />
        <meta property="og:description" content="Explore India h-index rankings across researchers, universities, and states." />
      </Head>
    <div className="min-h-screen  bg-white font-sans">
      {/* Hero Section */}
      <SiteHero cms={cms.hero}>
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
          <Link href="/leaderboard/scholars">
            <span className="text-sm font-medium text-[#1E1E1E] whitespace-nowrap cursor-pointer">
              {cms.hero.top_message}
            </span>
          </Link>

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
          {cms.hero.heading_line_1}
          <br />
          {cms.hero.heading_line_2}
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
          {cms.hero.subheading}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row mt-10 justify-center gap-4 w-full">
          <Link
            href="/leaderboard/scholars"
            className="flex-1 sm:flex-none font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200"
          >
            {cms.hero.primary_cta_label}
          </Link>
          <Link
            href="/methodology"
            className="flex-1 sm:flex-none font-inter bg-white text-[#1E1E1E]  border border-gray-300 px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-gray-50"
          >
            {cms.hero.secondary_cta_label}
          </Link>
        </div>
      </SiteHero>

      {/* Leaderboard Widget Section */}
      <section className="w-full section-padding py-0 bg-white">
        <div className="w-full mx-auto">
          <LeaderboardWidget />
        </div>
      </section>

      <TrustedBy cms={cms.trusted_by} />
      <UnderstandingHIndex cms={cms.h_index} />
      <TransparencySection cms={cms.transparency} />
      <PricingSection cms={cms.pricing} />
      <ResearchIntelligence cms={cms.research_intelligence} />
      <FinalCTA cms={cms.final_cta} />
    </div></>
  );
}
