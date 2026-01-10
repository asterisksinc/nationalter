import React from "react";
import { Check, AlertTriangle, ArrowRight } from "lucide-react";
import { ProfileGauge } from "./ProfileGauge";

interface ProfileCompletenessProps {
  percentage: number;
  missingPublications?: number;
}

export const ProfileCompleteness = ({
  percentage,
  missingPublications = 0,
}: ProfileCompletenessProps) => {
  return (
    <div className="w-full bg-white rounded-xl border border-[#E1E4EA] p-6 flex flex-col box-border font-sans">
      {/* Title Section */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="text-[16px] font-semibold leading-[120%] text-[#0E121B]">
          Profile Completeness
        </div>
        <div className="h-px w-full bg-[#E1E4EA]" />
      </div>

      {/* Gauge Section */}
      <div className="mb-6 flex justify-center">
        <ProfileGauge percentage={percentage} />
      </div>

      {/* Status Breakdown Section */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="text-[12px] font-semibold leading-[120%] text-[#0E121B] mb-2">
          Status Breakdown
        </div>

        <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
          <div className="w-[18px] h-[18px] bg-[#09940D] rounded-full flex items-center justify-center shrink-0">
            <Check size={12} color="white" strokeWidth={3} />
          </div>
          <span className="text-[14px] font-medium leading-[120%] text-[#09940D]">
            ORCID Linked
          </span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
          <div className="w-[18px] h-[18px] bg-[#09940D] rounded-full flex items-center justify-center shrink-0">
            <Check size={12} color="white" strokeWidth={3} />
          </div>
          <span className="text-[14px] font-medium leading-[120%] text-[#09940D]">
            Affiliation Verified
          </span>
        </div>

        {missingPublications > 0 && (
          <div className="flex items-start gap-2 p-2 rounded bg-transparent">
            <div className="mt-0.5 shrink-0">
              <AlertTriangle
                size={16}
                className="text-[#FF7A00] fill-white"
                strokeWidth={2}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] font-medium leading-[120%] text-[#FF7A00]">
                Missing publications detected
              </span>
              <span className="text-[12px] font-normal leading-[120%] text-[#525866]">
                {missingPublications} potential matches found
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
          <div className="w-[18px] h-[18px] bg-[#09940D] rounded-full flex items-center justify-center shrink-0">
            <Check size={12} color="white" strokeWidth={3} />
          </div>
          <span className="text-[14px] font-medium leading-[120%] text-[#09940D]">
            No Duplicate Profiles Found
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-auto w-full h-10 flex items-center justify-center gap-2 rounded-md border border-[#FF8D28] bg-white text-[#FF7A00] hover:bg-orange-50 transition-colors cursor-pointer">
        <span className="text-[14px] font-semibold leading-[120%]">
          Complete Your Profile
        </span>
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
};
