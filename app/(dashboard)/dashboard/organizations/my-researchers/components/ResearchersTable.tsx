"use client";

import React, { useState } from "react";
import { BadgeCheck, Info, UserMinus } from "lucide-react";
import ViewResearcherModal from "./ViewResearcherModal";

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

interface ResearchersTableProps {
  researchers: Researcher[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onRemoveResearcher?: (id: string) => void;
}

export default function ResearchersTable({
  researchers,
  selectedIds,
  onSelectionChange,
  onRemoveResearcher,
}: ResearchersTableProps) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedResearcher, setSelectedResearcher] =
    useState<Researcher | null>(null);

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const handleViewClick = (researcher: Researcher) => {
    setSelectedResearcher(researcher);
    setViewModalOpen(true);
  };

  const handleRemoveClick = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this researcher from your organization?",
      )
    ) {
      onRemoveResearcher?.(id);
    }
  };

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  };

  // Generate a color based on name for avatar background
  const getAvatarColor = (name: string) => {
    const colors = [
      "#FF7A00",
      "#22C55E",
      "#3B82F6",
      "#8B5CF6",
      "#EC4899",
      "#F59E0B",
      "#06B6D4",
      "#EF4444",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-[#E1E4EA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "900px" }}>
            <thead>
              <tr className="border-b border-[#E1E4EA] bg-[#F5F5F5]">
                <th className="w-12 px-4 py-4"></th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  Researcher Name
                </th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  H-index
                </th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  Citations
                </th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  Department
                </th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  Contribution
                </th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  Status
                </th>
                <th className="text-left px-4 py-4 text-[13px] font-semibold text-[#525866]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {researchers.map((researcher) => {
                const isSelected = selectedIds.includes(researcher.id);
                return (
                  <tr
                    key={researcher.id}
                    className={`border-b border-[#E1E4EA] last:border-b-0 transition-colors ${isSelected ? "bg-[#E8F5E9]" : "hover:bg-gray-50"
                      }`}
                  >
                    <td className="px-4 py-4">
                      <div
                        onClick={() => handleCheckboxChange(researcher.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${isSelected
                            ? "bg-[#22C55E] border-[#22C55E]"
                            : "border-[#D1D5DB] bg-white"
                          }`}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.5 6L5 8.5L9.5 4"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                          style={{
                            backgroundColor: getAvatarColor(researcher.name),
                          }}
                        >
                          {getInitials(researcher.name)}
                        </div>
                        <div className="text-[14px] font-medium text-[#0E121B]">
                          {researcher.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[14px] text-[#525866]">
                      {researcher.hIndex}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-[#525866]">
                      {researcher.citations}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-[#525866]">
                      {researcher.department}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-[#525866]">
                      {researcher.contribution}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-[#525866]">
                      {researcher.status}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewClick(researcher)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                          aria-label="View Details"
                        >
                          <Info
                            className="h-5 w-5 text-[#525866]"
                            strokeWidth={1.8}
                          />
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title={
                            researcher.isVerified ? "Verified" : "Not verified"
                          }
                          aria-label="Verified Status"
                        >
                          <BadgeCheck
                            className={`h-5 w-5 ${researcher.isVerified ? "text-[#FF7A00]" : "text-[#A0A7B5]"}`}
                            strokeWidth={1.8}
                          />
                        </button>
                        <button
                          onClick={() => handleRemoveClick(researcher.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Researcher"
                          aria-label="Remove Researcher"
                        >
                          <UserMinus
                            className="h-5 w-5 text-[#525866]"
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Researcher Modal */}
      {selectedResearcher && (
        <ViewResearcherModal
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedResearcher(null);
          }}
          researcher={selectedResearcher}
        />
      )}
    </>
  );
}
