"use client";

import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { analyticsData } from "../data";
import { useInViewOnce } from "./useInViewOnce";

export default function BenchmarkChart() {
  const { benchmark, benchmarkRaw } = analyticsData;
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const chartData = benchmark.map((item) => ({
    subject: item.subject,
    A: (item.A / item.fullMark) * 100,
    B: (item.B / item.fullMark) * 100,
    C: (item.C / item.fullMark) * 100,
    fullMark: 100,
  }));

  // Get the corresponding raw value for the hovered metric
  const hoveredData = hoveredMetric
    ? benchmarkRaw.find((item) => item.metric === hoveredMetric)
    : null;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col transition-all duration-1000 ease-in-out transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative p-6 pb-4">
        <div className="text-lg font-bold text-gray-900 mb-1">
          Peer Benchmark Comparison
        </div>
        <div className="text-sm text-gray-500">
          5-axis normalized comparison across all metrics
        </div>
        <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gray-300" />
      </div>

      {/* Top Legend */}
      <div className="p-6 pt-6">
        <div className="flex items-center justify-center gap-8 mb-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-orange-500 rounded-xs"></div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-gray-500 rounded-xs"></div>
            <span>Field Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-xs"></div>
            <span>National Average</span>
          </div>
        </div>

        {/* Radar Chart - Full Width */}
        <div className="w-full h-[550px] -mt-4 relative">
          {inView ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="95%"
                data={chartData}
                margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
                onMouseMove={(state: any) => {
                  if (state.isTooltipActive && state.activeLabel) {
                    setHoveredMetric(state.activeLabel);
                  } else {
                    setHoveredMetric(null);
                  }
                }}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <PolarGrid stroke="#E5E7EB" gridType="polygon" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#111827", fontSize: 12, fontWeight: 700 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                  }}
                  content={({ active, payload }) => {
                    if (
                      active &&
                      payload &&
                      payload.length > 0 &&
                      hoveredData
                    ) {
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
                          <div className="font-bold text-gray-900 mb-1">
                            {hoveredData.metric}
                          </div>
                          <div className="text-orange-600 font-bold text-sm">
                            {hoveredData.you}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Radar
                  name="You"
                  dataKey="A"
                  stroke="#F97316"
                  strokeWidth={3}
                  fill="#F97316"
                  fillOpacity={0.3}
                  isAnimationActive={true}
                  animationDuration={900}
                />
                <Radar
                  name="Field Average"
                  dataKey="B"
                  stroke="#6B7280"
                  strokeWidth={2}
                  fill="#9CA3AF"
                  fillOpacity={0.2}
                  isAnimationActive={true}
                  animationDuration={900}
                />
                <Radar
                  name="National Average"
                  dataKey="C"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  fill="transparent"
                  fillOpacity={0}
                  isAnimationActive={true}
                  animationDuration={900}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full" />
          )}

          {/* Side Stat Display */}
          {hoveredData && (
            <div className="absolute top-6 right-6 bg-white border border-orange-200 rounded-lg p-4 shadow-md min-w-[140px]">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">
                {hoveredData.metric}
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {hoveredData.you}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
