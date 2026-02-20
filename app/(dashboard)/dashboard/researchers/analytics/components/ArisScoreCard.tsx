"use client";

import React from "react";
import { useInViewOnce } from "./useInViewOnce";

// Colors to match Figma screenshot: Dark brown-orange, Orange, Amber-yellow
const COLORS = ["#B76A2E", "#EA580C", "#F59E0B"] as const;

const ARC_RADII = [72, 58, 44] as const;
const ARC_STROKE = 6;

function arcStrokeDash(value: number, radius: number) {
  const clamped = Math.max(0, Math.min(value, 100));
  const circumference = 2 * Math.PI * radius;
  return `${(clamped / 100) * circumference} ${circumference}`;
}

export default function ArisScoreCard({ analyticsData }: { analyticsData: any }) {
  const { aris } = analyticsData;
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  const chartData = [
    { name: "H-Index Impact", value: 83, arcValue: 83, fill: COLORS[0] },
    { name: "Productivity", value: 13, arcValue: 62, fill: COLORS[1] },
    { name: "Field Weight", value: 4, arcValue: 48, fill: COLORS[2] },
  ];

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden"
    >
      {/* Card Header */}
      <div className="relative p-4 sm:p-5 pb-3.5 flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <h5 className="text-base sm:text-xl leading-tight font-semibold text-gray-900">
            Adjusted Research Impact Score
          </h5>
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
            {analyticsData.profile.field} Cohort • 2,847 researchers
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
            Elite
          </span>
          <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100 flex items-center gap-1">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            92th Percentile
          </span>
        </div>

        <div className="pointer-events-none absolute left-5 right-5 bottom-0 h-px bg-gray-300" />
      </div>

      {/* Score & Formula Row */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2">
        <div className="p-3.5 px-4 sm:px-5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            ARIS Score
          </div>
          <div className="text-[34px] sm:text-[40px] md:text-[38px] font-semibold text-gray-900 leading-none">
            {aris.score}
          </div>
        </div>
        <div className="p-3.5 px-4 sm:px-5 border-t border-gray-300 sm:border-t-0">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Formula
          </div>
          <div className="text-base sm:text-xl font-semibold text-gray-900 leading-tight">
            H × ln(P+1) × FW
          </div>
          <div className="text-sm text-gray-500 mt-0.5">
            {aris.formula.values}
          </div>
        </div>

        <div className="pointer-events-none absolute left-5 right-5 bottom-0 h-px bg-gray-300" />
        <div className="hidden sm:block pointer-events-none absolute top-3 bottom-3 left-1/2 w-px -translate-x-1/2 bg-gray-300" />
      </div>

      {/* Chart & Legend Section */}
      <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-8">
        <div className="relative w-full max-w-[260px] h-[190px] shrink-0 mx-auto lg:mx-0">
          <svg viewBox="0 0 220 180" className="w-full h-full">
            {/* Background dotted guides */}
            {[72, 58, 44, 30].map((r) => (
              <circle
                key={r}
                cx="92"
                cy="90"
                r={r}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="1.25"
                strokeDasharray="2 8"
                opacity="0.65"
              />
            ))}

            {chartData.map((item, idx) => (
              <circle
                key={item.name}
                cx="92"
                cy="90"
                r={ARC_RADII[idx]}
                fill="none"
                stroke={item.fill}
                strokeWidth={ARC_STROKE}
                strokeLinecap="round"
                strokeDasharray={arcStrokeDash(
                  inView ? item.arcValue : 0,
                  ARC_RADII[idx],
                )}
                transform="rotate(-145 92 90)"
                style={{
                  transition: `stroke-dasharray 900ms ease-out ${idx * 90}ms`,
                }}
              />
            ))}
          </svg>

          <div className="absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[24px] leading-none font-normal text-gray-900">
              {aris.score}
            </span>
            <span className="text-[8px] text-slate-500 mt-1 uppercase tracking-wider">
              ARIS SCORE
            </span>
          </div>
        </div>

        {/* Right: Legend */}
        <div className="flex-1 space-y-4 sm:space-y-5 w-full max-w-none sm:max-w-[300px] pr-0 sm:pr-1">
          {[
            { label: "H-Index Impact", value: 83, color: COLORS[0] },
            { label: "Productivity", value: 13, color: COLORS[1] },
            { label: "Field Weight", value: 4, color: COLORS[2] },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center group cursor-default"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-gray-900 transition-colors">
                  {item.label}
                </span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
