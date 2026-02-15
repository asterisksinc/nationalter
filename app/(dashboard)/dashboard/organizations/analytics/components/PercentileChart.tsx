"use client";

import React, { useEffect, useState } from "react";
import { analyticsData } from "../data";

export default function PercentileChart() {
  const { percentile, profile } = analyticsData;
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setPosition(percentile.value);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentile.value]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6 relative">
      <div className="mb-6">
        <div className="text-lg font-bold text-gray-900 mb-1">
          Field-Normalized Percentile
        </div>
        <div className="text-sm text-gray-500">
          {profile.field} Cohort • Your rank #{percentile.rank} of{" "}
          {percentile.total.toLocaleString()} researchers
        </div>
      </div>

      <div className="relative h-8 w-full rounded-md overflow-hidden flex text-[10px] md:text-xs font-bold text-white uppercase tracking-wider mb-2">
        <div className="h-full bg-rose-500 w-[25%] flex items-center justify-center">
          Developing
        </div>
        <div className="h-full bg-orange-500 w-[25%] flex items-center justify-center">
          ARIS Average
        </div>
        <div className="h-full bg-blue-600 w-[25%] flex items-center justify-center">
          Above Average
        </div>
        <div className="h-full bg-emerald-500 w-[15%] flex items-center justify-center">
          High
        </div>
        <div className="h-full bg-emerald-700 w-[10%] flex items-center justify-center relative">
          <span className="z-10 text-[9px] md:text-xs">Elite</span>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

      {/* Ticks */}
      <div className="relative h-6 text-[10px] text-gray-400 font-mono mb-4 w-full">
        <span className="absolute left-0">0%</span>
        <span className="absolute left-[25%] -translate-x-1/2">25%</span>
        <span className="absolute left-[50%] -translate-x-1/2">50%</span>
        <span className="absolute left-[75%] -translate-x-1/2">75%</span>
        <span className="absolute left-[90%] -translate-x-1/2">90%</span>
        <span className="absolute right-0">100%</span>
      </div>

      {/* Marker - positioned absolutely based on percentile */}
      {/* Since the bar represents 0-100%, we position with left: percentile% */}
      <div
        className="absolute top-[88px] transform -translate-x-1/2 flex flex-col items-center z-20 transition-all duration-1000 ease-out"
        style={{ left: `${position}%` }}
      >
        <div className="w-0.5 h-10 bg-gray-800 opacity-50 absolute bottom-4"></div>
        <div className="bg-white border-4 border-orange-500 rounded-full w-4 h-4 shadow-sm z-30 ring-2 ring-white"></div>

        {/* Tooltip-like label */}
        <div className="absolute bottom-14 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap shadow-xl">
          You: {percentile.value}%
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm text-gray-600">
          Outperforms{" "}
          <span className="text-orange-500 font-medium">
            {percentile.value}%
          </span>{" "}
          of peers in {profile.field}
        </div>
      </div>
    </div>
  );
}
