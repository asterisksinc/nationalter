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
import ResearchAnalytics from "./components/ResearchAnalytics";
import Framework from "./components/Framework";
import PracticalApplications from "./components/PracticalApplications";

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
    badge_text: "Scientometric Framework",
    heading: "Transparent Research Intelligence.\nScientifically Measured.",
    subheading:
      "NationCite combines trusted bibliometric indicators with advanced research analytics\nto deliver fair, transparent, and evidence-based evaluation.",
    cta_label: "Explore the Methodology",
  },
  trusted_by: {
    heading: "Built for Researchers. Trusted by Institutions. Designed for Responsible Research Assessment.",
  },
  big_card: {
    kicker: "Framework Overview",
    heading: "Built on Transparency.\n Powered by Research Analytics.",
    paragraphs: [
      { text: "NationCite employs a structured scientometric framework that evaluates academic performance using verified publication and citation data from recognized indexing databases." },
      { text: "Rather than relying solely on publication volume or citation counts, the framework combines traditional bibliometric indicators with advanced analytical metrics that measure research quality, productivity efficiency, citation influence, and scholarly momentum." },
      { text: "Every researcher is evaluated within their respective discipline using field-normalized percentile rankings to eliminate structural differences between research domains. This ensures fair comparisons across varying citation cultures, publication practices, and career stages while rewarding sustained academic excellence rather than inflated publication counts." },
      { text: "The result is a transparent, reproducible, and academically defensible evaluation system designed to support researchers, institutions, funders, and policymakers with meaningful research intelligence." },
    ],
    image: "",
  },
  narrative: {
    kicker: "Verified Data Sources",
    heading: "Every Evaluation Begins With Trusted Research Data",
    paragraphs: [
      { text: "NationCite exclusively analyzes verified bibliographic records from internationally recognized academic indexing databases such as Scopus, Web of Science, and other validated repositories." },
      { text: "Only peer-reviewed indexed publications, authenticated researcher profiles, and verified citation records are considered during evaluation. Self-reported metrics, duplicate records, and unverifiable publications are excluded to preserve methodological integrity." },
      // { text: "We partner with startups, enterprises, and innovators to power digital journeys with precision and accountability." },
    ],
  },
  research_analytics: {
    heading: "Five Dimensions of Research Excellence",
    image: "",
    description: "Rather than relying on a single indicator, NationCite evaluates every researcher across five complementary scientometric dimensions that collectively measure productivity, efficiency, research quality, citation influence, and sustained scholarly impact.",
    analytics: [
      {
        kicker: "ARIS",
        title: "Adjusted Research Impact Score",
        description: "Balances publication output, citation impact, and field normalization to provide a comprehensive measure of overall research strength while reducing disciplinary bias."
      },
      {
        kicker: "PIBI",
        title: "Productivity–Impact Balance Index",
        description: "Measures how efficiently publication volume translates into meaningful scholarly influence, rewarding balanced research rather than excessive low-impact publishing."
      },
      {
        kicker: "CWIE",
        title: "Citation-Weighted Impact Efficiency",
        description: "Evaluates how effectively citations contribute to overall academic influence by combining citation depth, H-index strength, and publication volume into a unified efficiency metric."
      },
      {
        kicker: "PQLI",
        title: "Publication Quality Load Index",
        description: "Measures the concentration of research quality across publications by identifying how consistently published work contributes to long-term scholarly impact."
      },
      {
        kicker: "CMSS",
        title: "Citation Momentum Strength Score",
        description: "Captures sustained research momentum by combining structural citation strength with portfolio-wide citation intensity to identify enduring academic influence."
      },
    ]
  },
  evaluation: {
    kicker: "Fair Evaluation",
    heading: "Compare Researchers Within Their Discipline Not Across Different Worlds.",
    description: "Citation cultures differ significantly across research fields. NationCite removes this structural bias by evaluating researchers exclusively within their primary discipline. Every analytical metric is converted into a field-normalized percentile, ensuring fair, meaningful, and academically responsible comparisons regardless of subject area or publication practices."
  },
  performance: {
    heading: "Performance Categories",
    categories: [
      {
        icon: "",
        title: "Elite",
        description: "Top 10% within the discipline."
      },
      {
        icon: "",
        title: "High",
        description: "Among the strongest researchers in the field."
      },
      {
        icon: "",
        title: "Above Average",
        description: "Consistently outperforming the majority of peers."
      },
      {
        icon: "",
        title: "Average",
        description: "Demonstrating steady scholarly contribution."
      }
    ]
  },
  framework: {
    badge_text: "Responsible Research Assessment",
    heading: "Designed for Accuracy. Built for Academic Trust",
    description: "The NationCite framework is designed around internationally accepted principles of responsible research assessment. Every calculation is transparent, every methodology is documented, and every ranking emphasizes balanced scholarly contribution rather than isolated metrics or publication volume.",
    cards: [
      {
        icon: "",
        title: "Reduce Disciplinary Bias",
        description: "Ensures fair comparisons through field-normalized evaluation."
      },
      {
        icon: "",
        title: "Reward Meaningful Impact",
        description: "Recognizes sustained scholarly influence rather than publication quantity."
      },
      {
        icon: "",
        title: "Transparent Methodology",
        description: "Every analytical framework and calculation is publicly documented."
      },
      {
        icon: "",
        title: "Difficult to Manipulate",
        description: "Verified data sources and structured evaluation reduce opportunities for metric inflation."
      },
      {
        icon: "",
        title: "Reproducible Results",
        description: "Version-controlled methodologies ensure long-term consistency and auditability."
      },
      {
        icon: "",
        title: "Supports Better Decisions",
        description: "Provides valuable insights for researchers, institutions, funding agencies, and policymakers."
      }
    ]
  },
  practical_applications: {
    badge_text: "Who Benefits",
    heading: "Research Intelligence That Supports Better Academic Decisions",
    applications: [
      {
        image: "",
        title: "Researchers",
        description: "Benchmark performance, strengthen promotion dossiers, and monitor long-term scholarly growth."
      },
      {
        image: "",
        title: "Universities",
        description: "Support faculty evaluation, recruitment, institutional benchmarking, and strategic planning."
      },
      {
        image: "",
        title: "Funding Agencies",
        description: "Compare research performance fairly across disciplines using normalized analytics."
      },
      {
        image: "",
        title: "Policymakers",
        description: "Access evidence-based national and regional research intelligence for informed policy development."
      },
    ]
  },
  resources: {
    badge_text: "Knowledge Centre",
    heading: "Understand Research Metrics Beyond Traditional Bibliometrics",
    subheading:
      "Explore expert guides that explain modern scientometric evaluation, responsible research assessment, field normalization, and advanced academic analytics through practical, evidence-based learning.",
    cards: [
      {
        title: "Understanding ARIS",
        description:
          "Discover how NationCite measures balanced research impact beyond publication counts.",
        image: "",
        link_label: "Learn More",
        link_url: "#",
      },
      {
        title: "Why Field Normalization Matters",
        description:
          "Learn how percentile benchmarking eliminates structural bias between research disciplines.",
        image: "",
        link_label: "Learn More",
        link_url: "#",
      },
      {
        title: "Five Metrics. One Complete Picture.",
        description:
          "Understand how ARIS, PIBI, CWIE, PQLI, and CMSS work together to evaluate research excellence.",
        image: "",
        link_label: "Learn More",
        link_url: "#",
      },
    ],
    cta_label: "Explore Knowledge Centre",
    cta_url: "#",
  },
  faq: {
    kicker: "Methodology FAQs",
    title: "Everything You Need to Know About NationCite Evaluation",
    body:
      "Answers to common questions about data integrity, scientometric calculations, field normalization, and responsible research assessment.",
    faq_items: [
      {
        question: "Where does NationCite obtain its research data?",
        answer:
          "NationCite uses verified publication and citation records from recognized academic indexing databases such as Scopus, Web of Science, and other validated repositories.",
      },
      {
        question: "Why doesn't NationCite rely on publication count alone?",
        answer:
          "Research quality cannot be measured by publication volume alone. NationCite combines productivity, citation influence, quality concentration, efficiency, and scholarly momentum for balanced evaluation.",
      },
      {
        question: "What makes NationCite different from traditional rankings?",
        answer:
          "Traditional rankings often rely on isolated metrics. NationCite integrates five complementary scientometric indicators with field-normalized percentiles for a more complete assessment of research performance.",
      },
      {
        question: "How does field normalization improve fairness?",
        answer:
          "Researchers are evaluated only against peers within the same discipline, eliminating bias caused by differences in citation practices and publication cultures across fields.",
      },
      {
        question: "Can these metrics replace peer review?",
        answer:
          "No. NationCite is designed to complement expert peer review by providing transparent, quantitative research intelligence that supports evidence-based academic decision-making.",
      },
    ],
  },
  final_cta: {
    kicker: "Join the Framework",
    heading: "Measure Research with Transparency. Build Credibility with Evidence.",
    body:
      "Join India's next-generation scientometric platform built on transparent analytics, verified research data, and field-normalized evaluation. Claim your profile, understand your research performance, and benchmark your academic journey with confidence.",
    primary_cta_label: "Claim Your Research Profile",
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
        <h1 className="font-inter mb-8 max-w-none text-center leading-snug lg:max-w-[1400px]">
          {cms.hero.heading.split("\n").map((line: string) => (
            <span key={line} className="block lg:whitespace-nowrap">
              {line}
            </span>
          ))}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[760px] mx-auto text-center">
          {cms.hero.subheading.split("\n").map((line: string) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
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

      <ResearchAnalytics cms={cms.research_analytics} />

      <RightCard cms={cms.evaluation} />

      <Framework cms={cms.framework} />

      <PracticalApplications cms={cms.practical_applications} />

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
