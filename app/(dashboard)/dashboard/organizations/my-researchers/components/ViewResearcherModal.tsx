"use client";

import React from "react";
import { X, Building2, BookOpen, Quote, Hash, Globe } from "lucide-react";

interface Researcher {
  id: string; // nationciteId
  nationciteId: string;
  scholarName: string;
  orgName: string;
  mainSubject?: string | null;
  subField?: string | null;
  worldRank?: number | null;
  countryRank?: number | null;
  universityRank?: number | null;
  hIndexTotal: number;
  hIndexLast5: number;
  hIndexRatio: number;
  isVerified: boolean;
}

interface ViewResearcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  researcher: Researcher;
}

export default function ViewResearcherModal({
  isOpen,
  onClose,
  researcher,
}: ViewResearcherModalProps) {
  if (!isOpen) return null;

  // Generate initials for avatar fallback
  const getInitials = (fullName: string) => {
    const parts = (fullName || "").trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  };

  // Generate a color based on name for avatar background
  const getAvatarColor = (fullName: string) => {
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
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const displayWorldRank =
    typeof researcher.worldRank === "number" ? `#${researcher.worldRank}` : "—";
  const displayCountryRank =
    typeof researcher.countryRank === "number"
      ? `#${researcher.countryRank}`
      : "—";
  const displayUniversityRank =
    typeof researcher.universityRank === "number"
      ? `#${researcher.universityRank}`
      : "—";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full h-[min(720px,calc(100vh-1.5rem))] sm:h-[min(760px,calc(100vh-2rem))] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white border-b border-[#E1E4EA] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl">
          <div className="text-[18px] font-semibold text-[#0E121B]">
            Researcher Details
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-[#525866]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 min-h-0">
          {/* Name and Avatar */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shrink-0"
              style={{ backgroundColor: getAvatarColor(researcher.scholarName) }}
            >
              {getInitials(researcher.scholarName)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[20px] font-semibold text-[#0E121B]">
                  {researcher.scholarName}
                </div>
                {researcher.isVerified && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FFF4E6] rounded-lg">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF7A00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <div className="text-[12px] font-medium text-[#FF7A00]">
                      Verified
                    </div>
                  </div>
                )}
              </div>
              <div className="text-[13px] sm:text-[14px] text-[#525866] truncate">
                {researcher.orgName}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mb-4 sm:mb-6">
            <div className="text-[15px] font-semibold text-[#0E121B] mb-3">
              Details
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 size={18} className="text-[#525866]" />
                <div>
                  <div className="text-[12px] text-[#525866]">Organization</div>
                  <div className="text-[14px] text-[#0E121B] truncate">
                    {researcher.orgName}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BookOpen size={18} className="text-[#525866]" />
                <div>
                  <div className="text-[12px] text-[#525866]">Main Subject</div>
                  <div className="text-[14px] text-[#0E121B]">
                    {researcher.mainSubject || "—"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Hash size={18} className="text-[#525866]" />
                <div>
                  <div className="text-[12px] text-[#525866]">NationCite ID</div>
                  <div className="text-[14px] text-[#0E121B]">
                    {researcher.nationciteId}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Metrics */}
          <div className="mb-4 sm:mb-6">
            <div className="text-[15px] font-semibold text-[#0E121B] mb-3">
              Research Metrics
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-[14px] font-bold">H</div>
                  </div>
                  <div className="text-[13px] font-medium text-[#525866]">
                    H-index Total
                  </div>
                </div>
                <div className="text-[24px] font-bold text-[#0E121B]">
                  {researcher.hIndexTotal}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Quote size={16} className="text-white" />
                  </div>
                  <div className="text-[13px] font-medium text-[#525866]">
                    H-index Last 5
                  </div>
                </div>
                <div className="text-[24px] font-bold text-[#0E121B]">
                  {researcher.hIndexLast5}
                </div>
              </div>
            </div>

            <div className="mt-2 text-[12px] text-[#525866]">
              Ratio (Total / Last 5):{" "}
              <span className="font-semibold text-[#0E121B]">
                {Number.isFinite(researcher.hIndexRatio)
                  ? researcher.hIndexRatio.toFixed(2)
                  : "—"}
              </span>
            </div>
          </div>

          {/* Rankings */}
          <div>
            <div className="text-[15px] font-semibold text-[#0E121B] mb-3">
              Rankings
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-[12px] text-[#525866] mb-1">World</div>
                <div className="text-[14px] font-semibold text-[#0E121B]">
                  {displayWorldRank}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-[12px] text-[#525866] mb-1">Country</div>
                <div className="text-[14px] font-semibold text-[#0E121B]">
                  {displayCountryRank}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="text-[12px] text-[#525866] mb-1">University</div>
                <div className="text-[14px] font-semibold text-[#0E121B]">
                  {displayUniversityRank}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-[12px] text-[#525866]">
              <Globe size={14} className="shrink-0" />
              <div className="truncate">Sub field: {researcher.subField || "—"}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-[#E1E4EA] px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#FF7A00] rounded-lg text-[14px] font-semibold text-white hover:bg-[#FF8A1A] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
