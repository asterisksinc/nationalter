"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GraduationCap, Building2, Stethoscope, Search } from "lucide-react";
import LeaderboardTable, { LeaderboardEntry } from "./LeaderboardTable";

const ITEMS_PER_PAGE = 10;

const LeaderboardWidget = ({
  title = "Researched H-Index Portal",
}: {
  title?: string;
}) => {
  const [activeTab, setActiveTab] = useState<
    "Scholars" | "Doctors" | "Universities" 
  >("Scholars");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<(LeaderboardEntry & { mainSubject?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/leaderboard");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const transformedData = result.data.map(
            (item: any, index: number) => ({
              id: item.id,
              rank: String(index + 1).padStart(2, "0"),
              name: item.scholarName,
              institution: item.orgName,
              hIndex: item.hIndexTotal,
              articles: item.hIndexLast5 * 3,
              avatar: `https://i.pravatar.cc/150?img=${(index % 60) + 1}`,
              mainSubject: item.mainSubject, // Used for tab filtering
            }),
          );
          setData(transformedData);
        } else {
          throw new Error("API response invalid");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Filter logic for Tabs and Search
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Tab Filtering Logic
      const isMedical = item.mainSubject === "Medical and Health Sciences";
      const matchesTab = 
        activeTab === "Doctors" ? isMedical : 
        activeTab === "Scholars" ? !isMedical : true; // Universities shows all or custom logic

      // Search Filtering Logic
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [data, activeTab, searchTerm]);

  // Pagination Logic: Slice the filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleTabChange = (tabId: "Scholars" | "Universities" | "Doctors") => {
    setActiveTab(tabId);
    setCurrentPage(1); // Reset pagination on tab switch
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination on search
  };

  const tabs = [
    { id: "Scholars", icon: GraduationCap, label: "Scholars" },
   
    { id: "Doctors", icon: Stethoscope, label: "Doctors" },
    { id: "Universities", icon: Building2, label: "Universities" },
  ] as const;

  if (loading) {
    return (
      <div className="bg-white rounded-md sm:rounded-lg shadow-xl shadow-slate-200/60 w-full max-w-none flex flex-col border border-slate-100 overflow-hidden min-h-[700px]">
        <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
          <h3 className="h3 flex items-center gap-3 justify-center md:justify-start">{title}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-500 animate-pulse">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md sm:rounded-lg shadow-xl shadow-slate-200/60 w-full max-w-none flex flex-col border border-slate-100 overflow-hidden min-h-[700px]">
      <div className="px-4 md:px-10 py-6 md:py-8 bg-white border-b border-slate-100 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="text-center md:text-left w-full md:w-auto">
            <h3 className="h3 flex items-center gap-3 justify-center md:justify-start">{title}</h3>
          </div>

          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#FF7A00] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search researchers, institutions..."
              className="pl-10 pr-4 py-3 w-full md:w-[320px] bg-slate-50 border border-slate-200 rounded-lg text-sm font-inter text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-all"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const mobileSpanClass = idx === 2 ? "col-span-2" : "";

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-inter font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-[#FF7A00] text-white border-[#FF7A00] shadow-lg shadow-orange-200 transform -translate-y-0.5"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                } ${mobileSpanClass}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {error ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="text-red-600 bg-red-50 p-6 rounded-lg border border-red-200 max-w-md">
            <div className="text-lg font-medium mb-2">Failed to load data</div>
            <div className="text-sm">{error}</div>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
              Retry
            </button>
          </div>
        </div>
      ) : (
        <LeaderboardTable
          data={paginatedData}
          type={activeTab}
          totalCount={filteredData.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};

export default LeaderboardWidget;