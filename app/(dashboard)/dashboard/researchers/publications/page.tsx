"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Filter, Loader2 } from "lucide-react";
import { AddPublicationModal, PublicationsTable } from "./components";
import type { PublicationData } from "./components";

export default function PublicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- INTEGRATION STATES ---
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // --- FETCH FUNCTION ---
  const fetchPublications = async (titleQuery = "") => {
    setLoading(true);
    try {
      // Constructs the URL: supports filtering by title as per your docs
      const url = titleQuery 
        ? `/api/publications?title=${encodeURIComponent(titleQuery)}` 
        : "/api/publications";
        
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        // Map backend Prisma fields to match your frontend PublicationData interface
        const mappedData = result.publications.map((pub: any) => ({
          id: pub.id,
          title: pub.title,
          author: "Researcher", // Fallback as backend doesn't provide author string yet
          authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", 
          citations: pub.citationsTotal,
          publicationType: "Journal", 
          year: new Date(pub.datePublished).getFullYear(),
          publisher: pub.journalName,
          doi: pub.nationciteId,
        }));
        setPublications(mappedData);
      }
    } catch (error) {
      console.error("Fetch publications error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPublications();
  }, []);

  // Search handler (Triggers on 'Enter')
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchPublications(searchQuery);
    }
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="text-[18px] md:text-[16px] font-bold md:font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          My Publications
        </div>
        <p className="text-[13px] md:text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
          View and manage your research output directly from the database
        </p>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
        <div className="relative flex-1 md:max-w-2xl">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#525866]" size={20} />
          <input
            type="text"
            placeholder="Search by title and press Enter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-3 md:py-2.5 bg-white border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF8D28] text-[#333333] placeholder-[#525866]"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-2.5 py-3 md:py-2.5 border border-[#E1E4EA] rounded-lg bg-white text-[14px] font-medium text-[#222530] hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2.5 border border-[#FF8D28] rounded-lg bg-white text-[14px] font-semibold text-[#FF8D28] hover:bg-orange-50 transition-colors whitespace-nowrap"
          >
            <Plus size={18} /> Add Publication
          </button>
        </div>
      </div>

      {/* Dynamic Content: Loader or Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#525866]">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF8D28] mb-2" />
          <p className="text-sm">Loading publications...</p>
        </div>
      ) : (
        <PublicationsTable publications={publications} />
      )}

      {/* Add Publication Modal */}
      <AddPublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchPublications()} // Pass refresh function to modal
      />
    </>
  );
}