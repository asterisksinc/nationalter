"use client";

import React from "react";
import { useInViewOnce } from "./useInViewOnce";

export default function OverallAssessment({ analyticsData }: { analyticsData: any }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animateBars = inView;

  // Generate fallback benchmark data if empty
  const benchmarkRaw = analyticsData.benchmarkRaw && analyticsData.benchmarkRaw.length > 0
    ? analyticsData.benchmarkRaw
    : [
        { metric: "H-Index", you: "45", field: "32", national: "22" },
        { metric: "Publications", you: "186", field: "142", national: "98" },
        { metric: "Citations", you: "2,847", field: "1,956", national: "1,203" },
        { metric: "Productivity", you: "3.28", field: "2.45", national: "1.82" },
        { metric: "Impact", you: "87.2", field: "64.8", national: "45.1" },
      ];

  // Parse numeric values for progress bar calculations
  const parseValue = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col"
    >
      <div className="relative p-4 sm:p-6 pb-4">
        <div className="text-base sm:text-lg font-bold text-gray-900">
          Overall Assessment
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          Elite Performance across all metrics
        </div>
        <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gray-300" />
      </div>

      <div className="p-4 sm:p-6 pb-4">
        <div className="space-y-5 sm:space-y-6 max-h-[520px] overflow-y-auto pr-1 sm:pr-3 [scrollbar-width:thin]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-orange-400 [&::-webkit-scrollbar-thumb]:transition-colors">
          {benchmarkRaw.map((item, idx) => (
            <div key={idx} className="pb-5 sm:pb-6 last:pb-0 relative">
              {/* Metric Name + Value */}
              <div className="flex justify-between items-baseline mb-2.5">
                <span className="text-[15px] sm:text-[16px] font-bold text-gray-900">
                  {item.metric}
                </span>
                <span className="text-[15px] sm:text-[16px] font-bold text-orange-500">
                  {item.you}
                </span>
              </div>

              {/* Field Average */}
              <div className="flex justify-between items-center text-[12px] text-gray-500 mb-1.5">
                <span>Field Average</span>
                <span className="text-gray-600 font-medium">{item.field}</span>
              </div>

              {/* National Average */}
              <div className="flex justify-between items-center text-[12px] text-gray-500 mb-4">
                <span>National Average</span>
                <span className="text-gray-600 font-medium">
                  {item.national}
                </span>
              </div>

              {/* Orange Progress Bar */}
              <div className="w-full bg-orange-50 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: animateBars
                      ? `${Math.min(
                          (parseValue(item.you) /
                            Math.max(parseValue(item.you), parseValue(item.field), parseValue(item.national))) *
                            85,
                          100,
                        )}%`
                      : "0%",
                  }}
                ></div>
              </div>

              {idx !== benchmarkRaw.length - 1 && (
                <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
