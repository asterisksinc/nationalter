"use client";

import React from "react";
import { analyticsData } from "../data";
import { ArrowUp } from "lucide-react";

export default function ScientometricCard() {
  const { mainMetrics } = analyticsData;

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="relative p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <div className="text-base sm:text-lg font-bold text-gray-900">
              Scientometric Performance Dashboard
            </div>
            <div className="text-[11px] sm:text-xs text-gray-500 mt-1">
              Comprehensive metrics for {analyticsData.profile.name} •{" "}
              {analyticsData.profile.field}
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-bold">
            <ArrowUp className="w-3 h-3" />
            2.1%
          </div>
        </div>

        <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gray-300" />
      </div>

      {/* MOBILE: 2-column grid with boxes */}
      <div className="sm:hidden p-4">
        <div className="grid grid-cols-2 gap-3">
          {mainMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-3 bg-white"
            >
              <div className="text-[10px] font-medium text-gray-500 mb-2 uppercase">
                {metric.label}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-none mb-1.5">
                  {metric.value}
                </span>
                <span
                  className={`text-[10px] font-bold flex items-center gap-0.5 ${
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

      {/* DESKTOP: Horizontal layout with separator lines */}
      <div className="hidden sm:block p-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {mainMetrics.map((metric, idx) => (
            <div key={idx} className="relative pr-8 last:pr-0">
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

              {/* Vertical Line (only on large screens between columns) */}
              {idx < 3 && (
                <div className="hidden lg:block absolute right-0 top-1 bottom-1 w-px bg-gray-300 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
