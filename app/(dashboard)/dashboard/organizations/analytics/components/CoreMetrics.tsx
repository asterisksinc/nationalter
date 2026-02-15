"use client";

import React, { useEffect, useState } from "react";
import { analyticsData } from "../data";

export default function CoreMetrics() {
  const { coreMetrics } = analyticsData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="text-lg font-bold text-gray-900 mb-4">
        Core Metrics Breakdown
      </div>
      <div className="grid grid-cols-2 gap-4">
        {coreMetrics.slice(0, 4).map((metric, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-xl border border-gray-200 p-4 flex flex-col shadow-sm transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between w-full items-start mb-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                {metric.label}
              </span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${
                  metric.status === "High"
                    ? "bg-blue-50 text-blue-600 border-blue-100"
                    : "bg-emerald-50 text-emerald-600 border-emerald-100"
                }`}
              >
                {metric.status}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {metric.value}
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-auto">
              {metric.percentile} &bull; {metric.formula}
            </div>
          </div>
        ))}
        {/* ARIS Card - Full Width */}
        <div
          className={`col-span-2 bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between shadow-sm transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `400ms` }}
        >
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">
              ARIS
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">93</span>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                Elite
              </span>
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-1">
              92th percentile &bull; Hxln(P+1)xFW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
