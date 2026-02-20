"use client";

import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useInViewOnce } from "./useInViewOnce";

export default function TrajectoryChart({ analyticsData }: { analyticsData: any }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  // Generate fallback trajectory data if empty
  const trajectory = analyticsData.trajectory && analyticsData.trajectory.length > 0
    ? analyticsData.trajectory
    : (() => {
        const currentYear = new Date().getFullYear();
        const baseH = analyticsData.aris?.score || 50;
        const data: { year: number; publications: number; score: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const year = currentYear - i;
          const yearProgress = (6 - i) / 6;
          data.push({
            year,
            publications: Math.round(5 + baseH * 0.4 * yearProgress),
            score: Math.round(20 + baseH * yearProgress),
          });
        }
        return data;
      })();

  // Calculate year range for header
  const startYear = trajectory[0]?.year || 2020;
  const endYear = trajectory[trajectory.length - 1]?.year || 2026;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col transition-all duration-1000 ease-in-out transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative p-4 sm:p-6 pt-5 pb-5 mb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h5 className="text-base sm:text-lg font-bold text-gray-900">
            Career Trajectory{" "}
            <span className="text-sm font-normal text-gray-400">
              ({startYear}–{endYear})
            </span>
          </h5>
          <select className="w-full sm:w-auto px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg outline-none hover:bg-gray-50 cursor-pointer">
            <option>Past 10 Years</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-gray-300" />
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-5 sm:mb-6 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-xs" />
            <span>Productivity (Pubs)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-xs" />
            <span>ARIS Score</span>
          </div>
        </div>

        <div className="w-full h-64 sm:h-80 relative">
          {/* Side axis tags */}
          <div
            className="hidden sm:block absolute left-0 top-1/2 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded"
            style={{
              writingMode: "vertical-rl",
              transform: "translate(-1rem, -50%) rotate(180deg)",
            }}
          >
            Productivity
          </div>
          <div
            className="hidden sm:block absolute right-0 top-1/2 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded"
            style={{
              writingMode: "vertical-rl",
              transform: "translate(1rem, -50%)",
            }}
          >
            ARIS Score
          </div>

          {inView ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <ComposedChart
                data={trajectory}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="arisGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EA580C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  vertical={true}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
                  minTickGap={16}
                  dy={10}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  domain={[0, "auto"]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  domain={[0, "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                  itemStyle={{ padding: 0 }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="score"
                  name="ARIS Score"
                  stroke="#F97316"
                  strokeWidth={2}
                  fill="url(#arisGradient)"
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={900}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="publications"
                  name="Productivity"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "#3B82F6",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={900}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
      </div>
    </div>
  );
}
