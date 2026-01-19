"use client";

import React from "react";
import { X, Mail, Building2, BookOpen, Quote } from "lucide-react";

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E1E4EA] px-6 py-4 flex items-center justify-between rounded-t-2xl">
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
        <div className="p-6">
          {/* Name and Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: getAvatarColor(researcher.name) }}
            >
              {getInitials(researcher.name)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[20px] font-semibold text-[#0E121B]">
                  {researcher.name}
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
              <div className="text-[14px] text-[#525866]">
                {researcher.department}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mb-6">
            <div className="text-[15px] font-semibold text-[#0E121B] mb-3">
              Details
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 size={18} className="text-[#525866]" />
                <div>
                  <div className="text-[12px] text-[#525866]">Department</div>
                  <div className="text-[14px] text-[#0E121B]">
                    {researcher.department}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BookOpen size={18} className="text-[#525866]" />
                <div>
                  <div className="text-[12px] text-[#525866]">Contribution</div>
                  <div className="text-[14px] text-[#0E121B]">
                    {researcher.contribution}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail size={18} className="text-[#525866]" />
                <div>
                  <div className="text-[12px] text-[#525866]">Status</div>
                  <div className="text-[14px] text-[#0E121B]">
                    {researcher.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Metrics */}
          <div className="mb-6">
            <div className="text-[15px] font-semibold text-[#0E121B] mb-3">
              Research Metrics
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-[14px] font-bold">H</div>
                  </div>
                  <div className="text-[13px] font-medium text-[#525866]">
                    H-Index
                  </div>
                </div>
                <div className="text-[24px] font-bold text-[#0E121B]">
                  {researcher.hIndex}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Quote size={16} className="text-white" />
                  </div>
                  <div className="text-[13px] font-medium text-[#525866]">
                    Citations
                  </div>
                </div>
                <div className="text-[24px] font-bold text-[#0E121B]">
                  {researcher.citations}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-[#E1E4EA] px-6 py-4 rounded-b-2xl">
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
