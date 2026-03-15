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
import Head from "next/head";
import { useCmsPage } from "@/lib/use-cms-page";

const ITEMS_PER_PAGE = 10;

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
    badge_text: "Leaderboard",
    heading: "Top Universities & Institutions",
    subheading:
      "Discover India's leading universities and research institutions excelling in research output and academic excellence. Ranked by H-Index and research contributions.",
    cta_label: "Explore Universities",
  },
  table: {
    title: "Universities Leaderboard",
    search_placeholder: "Search universities...",
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
    badge_text: "Powered by Industry Experts",
    title: "Custom Consultancy Calls",
    cta_label: "Explore All Resources",
    cta_url: "#",
    tabs: [
      { label: "Feature 1", title: "Feature 1", body: "Placeholder content for feature 1", image: "", icon: "" },
      { label: "Feature 2", title: "Feature 2", body: "Placeholder content for feature 2", image: "", icon: "" },
      { label: "Feature 3", title: "Feature 3", body: "Placeholder content for feature 3", image: "", icon: "" },
    ],
  },
  three_blocks: {
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
      { question: "What drives university ranking order?", answer: "University ranking considers publication-linked impact and normalized citation metrics." },
      { question: "Can universities update metadata?", answer: "Yes. Verified correction flows support updates to institutional profile data." },
      { question: "Is this list limited to top metros?", answer: "No. Rankings include institutions across regions based on data quality and impact measures." },
      { question: "How frequently is data updated?", answer: "Data ingestion and recomputation run in scheduled refresh cycles." },
      { question: "Can this help accreditation reporting?", answer: "Yes. The ranking framework is designed to support institutional transparency and reporting needs." },
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

export default function UniversitiesLeaderboardPage() {
  const cms = useCmsPage("leaderboard-universities", DEFAULT_CMS);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

const fetchUniversitiesData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();

    if (debouncedSearchTerm.trim()) {
      params.append("orgName", debouncedSearchTerm.trim());
    }

    const response = await fetch(`/api/orgs?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      setTotalCount(result.data.length);

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const paginatedData: LeaderboardEntry[] = result.data
        .slice(startIndex, endIndex)
        .map((item: any, index: number) => ({
          id: item.id,
          rank: String(startIndex + index + 1).padStart(2, "0"),
          name: item.orgName,
          institution: item.nationciteId,
          hIndex: item.hIndexTotal,
          articles: item.hIndexLast5,
          avatar: `https://i.pravatar.cc/150?img=${(item.id % 60) + 1}`,
        }));

      setData(paginatedData);
    } else {
      throw new Error("Invalid API response");
    }
  } catch (err) {
    console.error("Failed to fetch universities data:", err);
    setError(err instanceof Error ? err.message : "Failed to load universities data");
    setData([]);
    setTotalCount(0);
  } finally {
    setLoading(false);
  }
}, [currentPage, debouncedSearchTerm]);


useEffect(() => {
  fetchUniversitiesData();
}, [fetchUniversitiesData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading && data.length === 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <SiteHero cms={cms.hero}>
          <Badge>{cms.hero.badge_text}</Badge>
          <h1 className="font-inter md:max-w-[700px] mb-8 text-center">
            {cms.hero.heading}
          </h1>
        </SiteHero>
        <section className="w-full section-padding py-0 bg-white">
          <div className="w-full mx-auto">
            <div className="bg-white rounded-md sm:rounded-lg shadow-lg overflow-hidden min-h-[600px] flex items-center justify-center">
              <div className="text-center text-slate-500 animate-pulse">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#FF7A00]" />
                <div>Loading universities leaderboard...</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>     <Head>
        <title>India University Rankings by H-Index | 2026 Data</title>
        <meta
          name="description"
          content="Compare IITs, NITs, and Indian universities by verified h-index performance, citation impact, and faculty cohorts. View Institutional Rankings."
        />
        <meta 
          name="keywords" 
          content="India university research ranking, IIT research ranking, university h-index India" 
        />
        <meta property="og:title" content="India University Rankings by H-Index | 2026 Data" />
        <meta property="og:description" content="Compare IITs, NITs, and universities by verified h-index and citations." />
      </Head>
    <div className="min-h-screen bg-white font-sans">
      <SiteHero cms={cms.hero}>
        <Badge>{cms.hero.badge_text}</Badge>
        <h1 className="font-inter md:max-w-[700px] mb-8 text-center">
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
                    className="h3-bento text-slate-900 flex items-center gap-3 justify-center md:justify-start"
                    style={{
                      fontFamily: "'Helvetica Rounded', 'Helvetica', sans-serif",
                    }}
                  >
                    <div className="p-2 bg-orange-50 rounded-md sm:rounded-lg text-[#FF7A00]">
                      <Sparkles size={20} />
                    </div>
                    {cms.table.title}
                  </h3>
                  {debouncedSearchTerm && (
                    <p className="text-xs text-slate-500 mt-2 font-inter">
                      ({data.length} of {totalCount})
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
                data={data} 
                type="Universities" 
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
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
    </div></>
  );
}
