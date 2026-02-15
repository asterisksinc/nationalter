"use client";

import React from "react";
import { analyticsData } from "../data";

export default function OverallAssessment() {
  const { benchmarkRaw } = analyticsData;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <div className="text-lg font-bold text-gray-900">Overall Assesment</div>
        <div className="text-sm text-gray-500">
          Elite Performance across all metrics
        </div>
      </div>

      <div className="space-y-5">
        {benchmarkRaw.map((item, idx) => (
          <div key={idx}>
            {/* Metric Name + Value */}
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-sm font-bold text-gray-900">
                {item.metric}
              </span>
              <span className="text-sm font-bold text-orange-500">
                {item.you}
              </span>
            </div>

            {/* Field Average */}
            <div className="flex justify-between items-center text-[11px] text-gray-500 mb-0.5">
              <span>Field Average</span>
              <span className="text-gray-600">{item.field}</span>
            </div>

            {/* National Average */}
            <div className="flex justify-between items-center text-[11px] text-gray-500 mb-2">
              <span>National Average</span>
              <span className="text-gray-600">{item.national}</span>
            </div>

            {/* Orange Progress Bar */}
            <div className="w-full bg-orange-50 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((item.you / Math.max(item.you, item.field, item.national)) * 85, 100)}%`,
                }}
              ></div>
            </div>

            {idx !== benchmarkRaw.length - 1 && (
              <div className="h-px bg-gray-100 mt-5"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
