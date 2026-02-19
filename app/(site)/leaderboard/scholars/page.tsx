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

const ITEMS_PER_PAGE = 10;

export default function ScholarsLeaderboardPage() {
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

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  /* ---------------- LOADING STATE ---------------- */
  if (loading && allData.length === 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <SiteHero>
          <Badge>Leaderboard</Badge>
          <h1 className="font-inter mb-8 md:max-w-[700px] text-center">
            Top Researchers & Scholars
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
      <SiteHero>
        <Badge>Leaderboard</Badge>
        <h1 className="font-inter mb-8 md:max-w-[700px] text-center">
          Top Researchers & Scholars
        </h1>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto text-center">
          Explore India's leading researchers and scholars who are
          advancing knowledge and global research.
        </p>
        <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6">
          Explore Scholars
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
                    Scholars Leaderboard
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
                    placeholder="Search scholars, IISc Bangalore, Physics..."
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

      <ThreeCardsSection />
      <TabContentToggle
        title="Custom Consultancy Calls"
        description="Powered by Industry Experts"
        ctaText="Explore All Resources"
        tabs={[
          {
            id: "feature1",
            label: "Feature 1",
            content: (
              <div className="text-center text-slate-600">
                Placeholder content for feature 1
              </div>
            ),
          },
          {
            id: "feature2",
            label: "Feature 2",
            content: (
              <div className="text-center text-slate-600">
                Placeholder content for feature 2
              </div>
            ),
          },
          {
            id: "feature3",
            label: "Feature 3",
            content: (
              <div className="text-center text-slate-600">
                Placeholder content for feature 3
              </div>
            ),
          },
        ]}
      />
      <ThreeBlocksSection />
      <FAQSection />
      <LeaderboardFinalCTA />
    </div>
  );
}
