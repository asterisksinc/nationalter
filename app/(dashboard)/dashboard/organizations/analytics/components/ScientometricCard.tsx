"use client";

import React from "react";
import { analyticsData } from "../data";
import { ArrowUp } from "lucide-react";

export default function ScientometricCard() {
  const { mainMetrics } = analyticsData;

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-lg font-bold text-gray-900">
            Scientometric Performance Dashboard
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Comprehensive metrics for {analyticsData.profile.name} •{" "}
            {analyticsData.profile.field}
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-bold">
          <ArrowUp className="w-3 h-3" />
          2.1%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {mainMetrics.map((metric, idx) => (
          <div
            key={idx}
            className={`pt-4 sm:pt-0 ${idx !== 0 ? "sm:pl-8" : ""}`}
          >
            <div className="text-xs font-medium text-gray-500 mb-1">
              {metric.label}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 leading-none mb-2">
                {metric.value}
              </span>
              <span
                className={`text-[11px] font-bold flex items-center gap-1 ${
                  metric.trend === "up" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
