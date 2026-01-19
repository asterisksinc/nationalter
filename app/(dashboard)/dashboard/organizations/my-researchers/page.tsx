"use client";

import React, { useState } from "react";
import { Check, Download } from "lucide-react";
import { ResearchersTable } from "./components";

// --- Types ---

interface Researcher {
  id: string;
  name: string;
  avatar: string;
  department: string;
  hIndex: number;
  citations: number;
  contribution: string;
  status: string;
  isVerified: boolean;
}

// --- Mock Data ---

const mockResearchers: Researcher[] = [
  {
    id: "RES-001",
    name: "Dianne Russell",
    avatar: "/avatars/dianne.jpg",
    department: "Lorem ipsum",
    hIndex: 33,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-002",
    name: "Albert Flores",
    avatar: "/avatars/albert.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-003",
    name: "Courtney Henry",
    avatar: "/avatars/courtney.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-004",
    name: "Brooklyn Simmons",
    avatar: "/avatars/brooklyn.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-005",
    name: "Cameron Williamson",
    avatar: "/avatars/cameron.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-006",
    name: "Annette Black",
    avatar: "/avatars/annette.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-007",
    name: "Eleanor Pena",
    avatar: "/avatars/eleanor.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-008",
    name: "Jacob Jones",
    avatar: "/avatars/jacob.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-009",
    name: "Savannah Nguyen",
    avatar: "/avatars/savannah.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-010",
    name: "Marvin McKinney",
    avatar: "/avatars/marvin.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
];

// --- Main Component ---

export default function MyResearchersPage() {
  const [researchers, setResearchers] = useState<Researcher[]>(mockResearchers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleRemoveResearcher = (id: string) => {
    setResearchers((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleVerifySelected = () => {
    if (selectedIds.length === 0) return;
    setResearchers((prev) =>
      prev.map((r) =>
        selectedIds.includes(r.id) ? { ...r, isVerified: true } : r,
      ),
    );
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    // Export functionality placeholder
    console.log("Exporting CSV...");
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="text-[18px] md:text-base font-bold md:font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          My Researchers
        </div>
        <div className="text-[13px] md:text-sm font-normal leading-6 tracking-[-0.02em] text-[#525866]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={handleVerifySelected}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#22C55E] rounded-[6px] text-sm font-semibold text-white hover:bg-[#16A34A] transition-colors"
        >
          <Check size={16} strokeWidth={2.5} />
          Verify Selected ({selectedIds.length})
        </button>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5F5F5] border border-[#E1E4EA] rounded-[6px] text-sm font-medium text-[#525866] hover:bg-gray-100 transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Researchers Table */}
      <ResearchersTable
        researchers={researchers}
        selectedIds={selectedIds}
        onSelectionChange={handleSelectionChange}
        onRemoveResearcher={handleRemoveResearcher}
      />

      {/* No Results */}
      {researchers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E1E4EA]">
          <div className="text-[16px] font-medium text-[#0E121B] mb-2">
            No researchers found
          </div>
          <div className="text-[14px] text-[#525866]">
            Add researchers to your organization to get started.
          </div>
        </div>
      )}
    </>
  );
}
