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
      <h5 className=" text-gray-900 mb-4">Profile Completeness</h5>

      <div className="mb-6 -mt-2">
        <ProfileGauge percentage={percentage} />
      </div>

      <div className="space-y-3 mb-6">
        <h5 className="  tracking-wide mb-6">Status Breakdown</h5>

        <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <CheckCircle2 size={14} />
          </div>
          <span className="text-sm font-medium text-green-800">
            ORCID Linked
          </span>
        </div>

        <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <CheckCircle2 size={14} />
          </div>
          <span className="text-sm font-medium text-green-800">
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
              <span className="text-sm font-semibold text-orange-700">
                Missing publications detected
              </span>
              <span className="text-xs text-orange-600/80">
                {missingPublications} potential matches found
              </span>
            </div>
          </div>
        )}

        <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="bg-green-100 text-green-600 rounded-full p-0.5">
            <CheckCircle2 size={14} />
          </div>
          <span className="text-sm font-medium text-green-800">
            No Duplicate Profiles Found
          </span>
        </div>
      </div>

      <button className="mt-auto w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm shadow-orange-200">
        Complete Your Profile <ArrowRight size={16} />
      </button>
    </div>
  );
};
