"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { useCmsPage } from "@/lib/use-cms-page";

const ITEMS_PER_PAGE = 10;

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "National Rankings",
    heading: "India’s Verified Research Impact Rankings",
    subheading:
      "Explore field-normalized, source-labeled rankings built on transparent methodology and defensible bibliometric standards.",
    cta_label: "View My Rank →",
  },
  table: {
    title: "Scholars Leaderboard",
    search_placeholder: "Search scholars, IISc Bangalore, Physics...",
  },
  three_cards: {
    heading: "Lorem Ipsum",
    subheading:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cards: Array.from({ length: 3 }, () => ({
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "",
    })),
  },
  tab_toggle: {
    badge_text: "Premium Advantage",
    title: "Turn Rankings Into Results",
    cta_label: "Unlock Premium Insights →",
    cta_url: "#",
    tabs: [
      { label: "Custom Impact Report", title: "Custom Impact Report", body: "A personalized breakdown of your percentile position, growth trend, citation hygiene gaps, and strategic improvement roadmap.", image: "", icon: "" },
      { label: "1-on-1 Consultancy Call", title: "1-on-1 Consultancy Call", body: "A structured advisory session analyzing your profile, identifying missing opportunities, and guiding measurable impact growth.", image: "", icon: "" },
      { label: "Strategic Profile Optimization", title: "Strategic Profile Optimization", body: "Actionable recommendations to improve metadata accuracy, affiliation alignment, subject tagging, and long-term citation momentum.", image: "", icon: "" },
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

export default function ScholarsLeaderboardPage() {
  const cms = useCmsPage("leaderboard-scholars", DEFAULT_CMS);

  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- FETCH DATA (NO page/top) ---------------- */
  const fetchScholarsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.append("scholarName", searchTerm.trim());
      }

      const response = await fetch(`/api/scholars?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Invalid API response");
      }

      const transformed: LeaderboardEntry[] = result.data.map(
        (item: any, index: number) => ({
          id: item.id,
          rank: String(index + 1).padStart(2, "0"),
          name: item.scholarName,
          institution: item.orgName,
          hIndex: item.hIndexTotal,
          articles: Math.round(item.hIndexLast5 * 3.5),
          avatar: `https://i.pravatar.cc/150?img=${(item.id % 60) + 1}`,
        })
      );

      setAllData(transformed);
      setTotalCount(transformed.length);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load data");
      setAllData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  /* ---------------- SEARCH DEBOUNCE ---------------- */
  useEffect(() => {
    const timeout = setTimeout(fetchScholarsData, 300);
    return () => clearTimeout(timeout);
  }, [fetchScholarsData]);

  /* ---------------- PAGINATION (FRONTEND) ---------------- */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = allData.slice(startIndex, endIndex).map(
    (item, index) => ({
      ...item,
      rank: String(startIndex + index + 1).padStart(2, "0"),
    })
  );

  /* ---------------- LOADING STATE ---------------- */
  if (loading && allData.length === 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <SiteHero cms={cms.hero}>
          <Badge>{cms.hero.badge_text}</Badge>
          <h1 className="font-inter mb-8 md:max-w-[700px] text-center">
            {cms.hero.heading}
          </h1>
        </SiteHero>
        <section className="w-full section-padding py-0 bg-white">
          <div className="w-full mx-auto">
            <div className="bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden min-h-[600px] flex items-center justify-center">
              <div className="text-center text-slate-500 animate-pulse">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#FF7A00]" />
                <div>Loading scholars leaderboard...</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHero cms={cms.hero}>
        <Badge>{cms.hero.badge_text}</Badge>
        <h1 className="font-inter mb-8 md:max-w-[700px] text-center">
          {cms.hero.heading}
        </h1>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          {cms.hero.subheading}
        </p>
        <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6">
          {cms.hero.cta_label}
        </button>
      </SiteHero>

      <section className="w-full section-padding py-0 bg-white">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                  <h3
                    className="h3-bento text-slate-900 flex gap-3 justify-start md:justify-start"
                    style={{
                      fontFamily: "'Helvetica Rounded', 'Helvetica', sans-serif",
                    }}
                  >
                    <div className="p-2 bg-orange-50 rounded-md sm:rounded-lg text-[#FF7A00]">
                      <Sparkles size={20} />
                    </div>
                    {cms.table.title}
                  </h3>
                  {searchTerm && (
                    <p className="text-xs text-slate-500 mt-2 font-inter">
                      ({allData.length} of {totalCount})
                    </p>
                  )}
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

            {error ? (
              <div className="p-12 text-center">
                <div className="text-red-600 bg-red-50 p-8 rounded-lg border border-red-200 max-w-2xl mx-auto">
                  <div className="text-xl font-medium mb-4">Failed to load leaderboard</div>
                  <div className="text-slate-600 mb-6">{error}</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Retry Loading Data
                  </button>
                </div>
              </div>
            ) : (
              <LeaderboardTable
                data={paginatedData}
                type="Scholars"
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                itemsPerPage={10}
              />
            )}
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
            <div className="max-w-2xl mx-auto text-center text-slate-700">
              {tab.image ? (
                <img src={tab.image} alt={tab.title || tab.label || "Feature"} className="w-full h-56 object-cover rounded-md sm:rounded-lg mb-4" />
              ) : null}
              <h4 className="text-lg font-semibold mb-2">{tab.title || tab.label}</h4>
              <p>{tab.body}</p>
            </div>
          ),
        }))}
      />
      <ThreeBlocksSection cms={cms.three_blocks} />
      <FAQSection cms={{ ...cms.faq, faqItems: cms.faq.faq_items }} />
      <LeaderboardFinalCTA cms={cms.final_cta} />
    </div>
  );
}
