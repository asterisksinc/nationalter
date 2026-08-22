"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import LeaderboardTable, {
  LeaderboardEntry,
} from "@/components/site/LeaderboardTable";
import ThreeCardsSection from "../components/ThreeCardsSection";
import TabContentToggle from "../components/TabContentToggle";
import ThreeBlocksSection from "../components/ThreeBlocksSection";
import FAQSection from "@/components/site/FAQSection";
import LeaderboardFinalCTA from "../components/LeaderboardFinalCTA";
import Head from "next/head";
import { useCmsPage } from "@/lib/use-cms-page";

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "Clinical Impact Rankings",
    heading: "Recognizing India’s Leading Medical Researchers",
    subheading:
      "Compare impact within your specialty using discipline-aware percentiles and verified citation metrics.",
    cta_label: "Check Specialty Rank →",
  },
  table: {
    title: "Doctors Leaderboard",
    search_placeholder: "Search doctors...",
  },
  three_cards: {
    badge_text: "Evaluation Framework",
    heading: "Standardized. Transparent. Defensible.",
    subheading:
      "All rankings are derived from documented bibliometric methodologies, verified academic data sources, and discipline-sensitive normalization principles to ensure credibility and fairness.",
    cards: [
      { title: "Discipline-Normalized Assessment", description: "Researchers and institutions are evaluated within subject-specific cohorts to ensure equitable comparison across diverse academic domains.", image: "" },
      { title: "Verified Data Governance", description: "All metrics are sourced from recognized scholarly databases and processed under strict validation protocols to maintain data integrity.", image: "" },
      { title: "Standard H-Index Computation", description: "H-index values are calculated in accordance with established Hirsch methodology, ensuring methodological consistency and international comparability.", image: "" },
    ],
  },
  tab_toggle: {
    badge_text: "Premium Advantage",
    title: "Turn Rankings Into Results",
    cta_label: "Unlock Premium Insights →",
    cta_url: "#",
    tabs: [
      { label: "Custom Impact Report", title: "Custom Impact Report", body: "A personalized breakdown of your percentile position, growth trend, citation hygiene gaps, and strategic improvement roadmap.", video_url: "/creatives/custom impact _2.mp4", icon: "" },
      { label: "1-on-1 Consultancy Call", title: "1-on-1 Consultancy Call", body: "A structured advisory session analyzing your profile, identifying missing opportunities, and guiding measurable impact growth.", video_url: "/creatives/one-0-one_1.mp4", icon: "" },
      { label: "Strategic Profile Optimization", title: "Strategic Profile Optimization", body: "Actionable recommendations to improve metadata accuracy, affiliation alignment, subject tagging, and long-term citation momentum.", video_url: "/creatives/Strategic Profile Optimisation_1.mp4", icon: "" },
    ],
  },
  three_blocks: {
    badge_text: "Research Intelligence",
    heading: "Learn the Science Behind the Score",
    subheading:
      "Access expert guides, impact breakdowns, and early-career research frameworks to strengthen your academic trajectory.",
    cards: [
      {
        title: "Understanding Field-Normalized Percentiles",
        description:
          "A complete breakdown of how percentile ranking removes cross-disciplinary bias and improves evaluation fairness.",
        image: "",
        link_label: "Read Now",
        link_url: "#",
      },
      {
        title: "How to Improve Your H-Index Responsibly",
        description:
          "Practical, ethical strategies to strengthen citation impact without manipulation or gaming.",
        image: "",
        link_label: "Learn More",
        link_url: "#",
      },
      {
        title: "Top 10 Academic Decisions Early Researchers Must Make",
        description:
          "A strategic guide for PhD scholars and early-career academics planning long-term research visibility.",
        image: "",
        link_label: "Explore Guide",
        link_url: "#",
      },
    ],
    cta_label: "Visit Resource Center →",
    cta_url: "#",
  },
  faq: {
    kicker: "Common Questions",
    title: "Everything You Should Know About Rankings",
    body:
      "Clear answers on indexing, methodology, and profile optimization.",
    faq_items: [
      { question: "How are leaderboard rankings calculated?", answer: "Rankings are based on documented formulas integrating H-index, productivity balance, career normalization, and recent citation momentum." },
      { question: "How do I get indexed on NationCite?", answer: "Researchers are indexed automatically through verified bibliometric data sources covering Indian-affiliated authors." },
      { question: "Can I register manually?", answer: "If your profile exists, you can claim it via ORCID authentication. If missing, you may submit a request for review." },
      { question: "What if my H-index is incorrect?", answer: "You can submit an evidence-backed correction ticket, which is reviewed through our moderation workflow." },
      { question: "Are rankings updated regularly?", answer: "Yes. Data refresh cycles ensure metrics reflect updated citation records." },
      { question: "Does NationCite use self-reported data?", answer: "No. All metrics are sourced from recognized academic databases and clearly labeled." },
      { question: "What are consultancy calls included in premium plans?", answer: "Premium subscribers receive structured advisory sessions reviewing their custom impact report and strategic profile optimization steps." },
      { question: "Do rankings replace peer review?", answer: "No. NationCite provides analytical benchmarking tools to support not replace qualitative academic evaluation." },
    ],
  },
  final_cta: {
    heading: "Lorem ipsum dolor self amet consectetur",
    primary_cta_label: "CTA Button",
    primary_cta_url: "#",
    secondary_cta_label: "CTA Button",
    secondary_cta_url: "#",
    background_image: "",
  },
};

const MOCK_DATA: LeaderboardEntry[] = [
  {
    id: 1,
    rank: "01",
    name: "Dr. John Doe",
    institution: "Apollo Hospital",
    hIndex: 60,
    articles: 80,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    rank: "02",
    name: "Dr. Sarah Jenkins",
    institution: "AIIMS Delhi",
    hIndex: 75,
    articles: 110,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    rank: "03",
    name: "Dr. Aarav Mehta",
    institution: "Fortis Healthcare",
    hIndex: 55,
    articles: 70,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    rank: "04",
    name: "Dr. Sanya Gupta",
    institution: "Max Super Speciality",
    hIndex: 65,
    articles: 90,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    rank: "05",
    name: "Dr. Rohan Sharma",
    institution: "Medanta",
    hIndex: 58,
    articles: 85,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 6,
    rank: "06",
    name: "Dr. Meera Suresh",
    institution: "Manipal Hospital",
    hIndex: 70,
    articles: 100,
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 7,
    rank: "07",
    name: "Dr. Anika Reddy",
    institution: "Narayana Health",
    hIndex: 62,
    articles: 88,
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: 8,
    rank: "08",
    name: "Dr. Karan Singh",
    institution: "Sir Ganga Ram Hospital",
    hIndex: 68,
    articles: 95,
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: 9,
    rank: "09",
    name: "Dr. Simran Kaur",
    institution: "Lilavati Hospital",
    hIndex: 50,
    articles: 60,
    avatar: "https://i.pravatar.cc/150?img=42",
  },
  {
    id: 10,
    rank: "10",
    name: "Dr. Nikhil Verma",
    institution: "Kokilaben Hospital",
    hIndex: 52,
    articles: 65,
    avatar: "https://i.pravatar.cc/150?img=60",
  },
];

export default function DoctorsLeaderboardPage() {
  const cms = useCmsPage("leaderboard-doctors", DEFAULT_CMS);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = MOCK_DATA.length;

  return (
    <> <Head>
        <title>Top Medical Researchers India | H-Index Ranking</title>
        <meta
          name="description"
          content="Discover India's top medical professionals ranked by verified h-index and citation impact. Benchmark specialties, states, and institutions. Explore Now."
        />
        <meta 
          name="keywords" 
          content="Indian medical researcher rankings, doctor h-index India, medical research leaderboard" 
        />
        <meta property="og:title" content="Top Medical Researchers India | H-Index Ranking" />
        <meta property="og:description" content="India's top doctors ranked by verified h-index and citations." />
      </Head>
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <SiteHero cms={cms.hero}>
        {/* BADGE */}
        <Badge>{cms.hero.badge_text}</Badge>

        {/* Main Heading */}
        <h1 className="font-inter md:max-w-[700px] mb-8 text-center">
          {cms.hero.heading}
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          {cms.hero.subheading}
        </p>

        {/* CTA BUTTON */}
        <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6">
          {cms.hero.cta_label}
        </button>
      </SiteHero>

      {/* Leaderboard Section */}
      <section className="w-full section-padding py-0 bg-white">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden">
            {/* HEADER SECTION: Title and Search */}
            <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                  <h3
                    className="h3-bento text-slate-900 flex items-center gap-3 justify-center md:justify-start"
                    style={{
                      fontFamily:
                        "'Helvetica Rounded', 'Helvetica', sans-serif",
                    }}
                  >
                    <div className="p-2 bg-orange-50 rounded-md sm:rounded-lg text-[#FF7A00]">
                      <Sparkles size={20} />
                    </div>
                    {cms.table.title}
                  </h3>
                </div>

                <div className="relative group w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder={cms.table.search_placeholder}
                    className="pl-10 pr-4 py-3 w-full md:w-[320px] bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-all shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <LeaderboardTable
              data={MOCK_DATA}
              type="Doctors"
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              itemsPerPage={10}
            />
          </div>
        </div>
      </section>

      <ThreeCardsSection cms={cms.three_cards} />

      <TabContentToggle
        title={cms.tab_toggle.title}
        description={cms.tab_toggle.badge_text}
        ctaText={cms.tab_toggle.cta_label}
        ctaLink={cms.tab_toggle.cta_url}
        tabs={(cms.tab_toggle.tabs || []).map((tab: any, index: number) => ({
          id: `feature${index + 1}`,
          label: tab.label || `Feature ${index + 1}`,
          content: (
            <div className="max-w-3xl mx-auto text-center text-slate-700 pb-2">
              {tab.video_url ? (
                <video src={tab.video_url} loop autoPlay muted className="w-full h-full object-cover rounded-md sm:rounded-lg mb-4" />
              ) : null}
              <h4 className="text-lg font-semibold mb-2">{tab.title || tab.label}</h4>
              <p className="w-full mx-auto text-center">{tab.body}</p>
            </div>
          ),
        }))}
      />

      <ThreeBlocksSection cms={cms.three_blocks} />

      <FAQSection cms={{ ...cms.faq, faqItems: cms.faq.faq_items }} />

      <LeaderboardFinalCTA cms={cms.final_cta} />
    </div></>
  );
}
