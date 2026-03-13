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
import { getCmsPageServer } from "@/lib/cms-server";

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

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "Methodology",
    heading: "Built on Transparency Governed by Data Integrity",
    subheading:
      "Nationcite follows a reproducible, evidence-backed methodology using global open and licensed bibliometric sources.",
    cta_label: "Explore Methodology",
  },
  trusted_by: {
    heading: "Trusted by India&apos;s Top Institutions",
  },
  faq: {
    kicker: "Know Nationcite",
    title: "Everything You Need to Know About Us",
    body:
      "This section answers the most common questions about Nationcite, who we are, how we operate, and what makes our company different in the digital ecosystem.",
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

export default async function MethodologyPage() {
  const cms = await getCmsPageServer("methodology", DEFAULT_CMS);

  return (
    <main className="w-full bg-white font-sans text-black">
      {/* Hero Section */}
      <SiteHero cms={cms.hero}>
        {/* BADGE */}
        <Badge>{cms.hero.badge_text}</Badge>

        {/* HEADING */}
        <h1 className="font-inter mb-8 text-center leading-snug md:max-w-[800px]">
          <span className="block sm:inline">{cms.hero.heading}</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          {cms.hero.subheading}
        </p>

        {/* CTA */}
        <div className="flex justify-center w-full">
          <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 mt-10 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200">
            {cms.hero.cta_label}
          </button>
        </div>
      </SiteHero>
      <TrustedBy cms={cms.trusted_by} />

      {/* Big Card Section */}
      <Thebigcard />

      {/* Right Card Sections */}
      <RightCard />

      <ThreeBlocksSection />

      <FAQSection cms={cms.faq} />
      <FinalCTA cms={cms.final_cta} />
    </main>
  );
}
