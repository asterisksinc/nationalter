import React from "react";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
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
    <div className="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
      <div className="text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-[#0E121B] mb-4">
        Profile Completeness
      </div>

      <div className="mb-6 -mt-2">
        <ProfileGauge percentage={percentage} />
      </div>

      <div className="space-y-3 mb-6">
        <div className="text-[14px] font-medium leading-[20px] tracking-[-0.006em] text-[#333333] mb-6">
          Status Breakdown
        </div>

        <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <CheckCircle2 size={14} />
          </div>
          <span className="text-[14px] font-medium leading-[120%] text-green-800">
            ORCID Linked
          </span>
        </div>

        <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <CheckCircle2 size={14} />
          </div>
          <span className="text-[14px] font-medium leading-[120%] text-green-800">
            Affiliation Verified
          </span>
        </div>

        {missingPublications > 0 && (
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start gap-3">
            <AlertTriangle
              size={16}
              className="text-orange-500 mt-0.5 shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold leading-[120%] text-orange-700">
                Missing publications detected
              </span>
              <span className="text-[12px] font-normal leading-[120%] text-orange-600/80">
                {missingPublications} potential matches found
              </span>
            </div>
          </div>
        )}

        <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <CheckCircle2 size={14} />
          </div>
          <span className="text-[14px] font-medium leading-[120%] text-green-800">
            No Duplicate Profiles Found
          </span>
        </div>
      </div>

      <button className="mt-auto w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-orange-200">
        Complete Your Profile <ArrowRight size={16} />
      </button>
    </div>
  );
};
