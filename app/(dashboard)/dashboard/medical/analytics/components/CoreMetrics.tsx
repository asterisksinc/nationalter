"use client";

import React from "react";
import { useInViewOnce } from "./useInViewOnce";

export default function CoreMetrics({ analyticsData }: { analyticsData: any }) {
  const { coreMetrics } = analyticsData;
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const topMetrics = coreMetrics.slice(0, 4);
  const arisMetric = coreMetrics.find((m) => m.label === "ARIS");

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="relative p-4 sm:p-6 pb-4">
        <div className="text-base sm:text-lg font-bold text-gray-900">
          Core Metrics Breakdown
        </div>

        <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gray-300" />
      </div>

      <div className="p-3 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {topMetrics.map((metric, idx) => {
            const isLeft = idx % 2 === 0;
            const isTopRow = idx < 2;
            return (
              <div
                key={metric.label}
                className={`relative p-4 border-b border-gray-200 sm:border-b-0 transition-all duration-700 ease-out ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div
                  className={`pointer-events-none absolute inset-0 ${
                    isLeft
                      ? "sm:after:content-[''] sm:after:absolute sm:after:top-3 sm:after:bottom-3 sm:after:right-0 sm:after:w-px sm:after:bg-gray-300"
                      : ""
                  } ${
                    isTopRow
                      ? "sm:before:content-[''] sm:before:absolute sm:before:left-3 sm:before:right-3 sm:before:bottom-0 sm:before:h-px sm:before:bg-gray-300"
                      : ""
                  }`}
                />
                <div className="flex justify-between w-full items-start mb-1">
                  <span className="text-xs text-gray-600 uppercase font-semibold tracking-[0.12em]">
                    {metric.label}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide ${
                      metric.status === "High"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-emerald-50 text-emerald-600 border-emerald-200"
                    }`}
                  >
                    {metric.status}
                  </span>
                </div>
                <div className="text-[24px] leading-none font-semibold text-gray-900 mb-1.5">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-500">
                  {metric.percentile} • {metric.formula}
                </div>
              </div>
            );
          })}

          {arisMetric && (
            <div
              className={`col-span-1 sm:col-span-2 relative p-4 transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `320ms` }}
            >
              <div className="pointer-events-none absolute left-3 right-3 top-0 h-px bg-gray-300" />
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-gray-600 uppercase font-semibold tracking-[0.12em]">
                  {arisMetric.label}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide bg-emerald-50 text-emerald-600 border-emerald-200">
                  {arisMetric.status}
                </span>
              </div>
              <div className="text-[24px] leading-none font-semibold text-gray-900 mb-1.5">
                {arisMetric.value}
              </div>
              <div className="text-sm text-gray-500">
                {arisMetric.percentile} • {arisMetric.formula}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
