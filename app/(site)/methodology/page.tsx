import React from "react";
import { Metadata as MetaType } from "next";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import ThreeBlocksSection from "../leaderboard/components/ThreeBlocksSection";
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
  big_card: {
    kicker: "Lorem ipsum",
    heading: "Lorem ipsum\ndolor self amet",
    paragraphs: [
      { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis." },
      { text: "Tempus leo eu aenean sed diam urna tempor, Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere." },
      { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis." },
    ],
    image: "",
  },
  narrative: {
    kicker: "How we Calculate",
    heading: "Lorem ipsum dolor\nSelf Amet",
    paragraphs: [
      { text: "Nationcite was born from a simple realization: businesses don't fail due to lack of ideas, they fail due to lack of execution-grade systems." },
      { text: "At our core, we are architects of digital ecosystems with strategy, design, engineering, and automation." },
      { text: "We partner with startups, enterprises, and innovators to power digital journeys with precision and accountability." },
    ],
  },
  resources: {
    heading: "Research Intelligence & Academic Insight",
    subheading:
      "Stay informed with data literacy, ranking methodology, and research visibility best practices.",
    cards: Array.from({ length: 3 }, () => ({
      title: "Lorem ipsum dolor slef amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "",
      link_label: "Learn More",
      link_url: "#",
    })),
    cta_label: "Explore All Resources",
    cta_url: "#",
  },
  faq: {
    kicker: "Know Nationcite",
    title: "Everything You Need to Know About Us",
    body:
      "This section answers the most common questions about Nationcite, who we are, how we operate, and what makes our company different in the digital ecosystem.",
    faq_items: [
      {
        question: "How does Nationcite ensure project quality?",
        answer:
          "We follow a documented and reproducible ranking methodology, combining automated processing with verification checkpoints.",
      },
      {
        question: "What industries do you specialize in?",
        answer:
          "Nationcite focuses on academic and research ecosystems, including researchers, institutions, and policy-support analytics.",
      },
      {
        question: "Can you handle enterprise-scale infrastructure?",
        answer:
          "Yes. The platform supports large-scale indexing with audit-ready updates and secure data handling.",
      },
      {
        question: "What is your engagement model?",
        answer:
          "We support self-serve and institutional workflows with verification, reporting, and support tiers.",
      },
      {
        question: "How do you handle data security?",
        answer:
          "We apply strict access controls and operational best practices to protect identity and publication-linked records.",
      },
    ],
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
      <Thebigcard cms={cms.big_card} />

      {/* Right Card Sections */}
      <RightCard cms={cms.narrative} />

      <ThreeBlocksSection cms={cms.resources} />

      <FAQSection
        cms={{
          ...cms.faq,
          faqItems: cms.faq.faq_items,
        }}
      />
      <FinalCTA cms={cms.final_cta} />
    </main>
  );
}
