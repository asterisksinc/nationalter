"use client";

import React from "react";
import { analyticsData } from "../data";
import { useInViewOnce } from "./useInViewOnce";

export default function OverallAssessment() {
  const { benchmarkRaw } = analyticsData;
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animateBars = inView;

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col"
    >
      <div className="relative p-6 pb-4">
        <div className="text-lg font-bold text-gray-900">
          Overall Assessment
        </div>
        <div className="text-sm text-gray-500">
          Elite Performance across all metrics
        </div>
        <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gray-300" />
      </div>

      <div className="p-6 pb-4">
        <div className="space-y-6 max-h-[520px] overflow-y-auto pr-3 [scrollbar-width:thin]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-orange-400 [&::-webkit-scrollbar-thumb]:transition-colors">
          {benchmarkRaw.map((item, idx) => (
            <div key={idx} className="pb-6 last:pb-0 relative">
              {/* Metric Name + Value */}
              <div className="flex justify-between items-baseline mb-2.5">
                <span className="text-[16px] font-bold text-gray-900">
                  {item.metric}
                </span>
                <span className="text-[16px] font-bold text-orange-500">
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
                          (item.you /
                            Math.max(item.you, item.field, item.national)) *
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
