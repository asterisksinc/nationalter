import React from "react";
import { Circle, AlertTriangle, ArrowRight } from "lucide-react";
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
    <div className="col-span-4 bg-white rounded-lg border border-[#E1E4EA] p-4 flex flex-col">
      <div className="text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-[#0E121B] mb-3">
        Profile Completeness
      </div>

      <div className="mb-4 -mt-1">
        <ProfileGauge percentage={percentage} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-[14px] font-medium leading-[20px] tracking-[-0.006em] text-[#333333] mb-2">
          Status Breakdown
        </div>

        <div className="bg-[#E8F5EC] rounded-md p-2 flex items-center gap-2">
          <Circle
            size={8}
            className="fill-[#27B973] text-[#27B973]"
            strokeWidth={0}
          />
          <span className="text-[14px] font-normal leading-[120%] text-[#0E121B]">
            ORCID Linked
          </span>
        </div>

        <div className="bg-[#E8F5EC] rounded-md p-2 flex items-center gap-2">
          <Circle
            size={8}
            className="fill-[#27B973] text-[#27B973]"
            strokeWidth={0}
          />
          <span className="text-[14px] font-normal leading-[120%] text-[#0E121B]">
            Affiliation Verified
          </span>
        </div>

        {missingPublications > 0 && (
          <div className="bg-[#FFF4ED] rounded-md p-2 flex items-start gap-2">
            <AlertTriangle
              size={14}
              className="text-[#FF7A00] mt-0.5 shrink-0"
              strokeWidth={2}
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-medium leading-[120%] text-[#0E121B]">
                Missing publications detected
              </span>
              <span className="text-[12px] font-normal leading-[120%] text-[#525866]">
                {missingPublications} potential matches found
              </span>
            </div>
          </div>
        )}

        <div className="bg-[#E8F5EC] rounded-md p-2 flex items-center gap-2">
          <Circle
            size={8}
            className="fill-[#27B973] text-[#27B973]"
            strokeWidth={0}
          />
          <span className="text-[14px] font-normal leading-[120%] text-[#0E121B]">
            No Duplicate Profiles Found
          </span>
        </div>
      </div>

      <button className="mt-auto w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white text-[14px] font-semibold leading-[120%] tracking-[-0.04em] py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 h-[36px]">
        Complete Your Profile <ArrowRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
};
