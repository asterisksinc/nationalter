"use client";

import React, { useEffect, useState } from "react";
import { analyticsData } from "../data";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

export default function ArisScoreCard() {
  const { aris } = analyticsData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Colors to match Figma screenshot: Dark brown-orange, Orange, Amber-yellow
  const COLORS = ["#B76A2E", "#EA580C", "#F59E0B"];

  // Prepare data for RadialBarChart
  // Outermost to innermost corresponds to the order in the data array
  // We want H-Index (83%) to be outermost
  const chartData = [
    { name: "H-Index Impact", value: 83, fill: COLORS[0] },
    { name: "Productivity", value: 13, fill: COLORS[1] },
    { name: "Field Weight", value: 4, fill: COLORS[2] },
  ].reverse(); // RadialBarChart often maps last item to outermost depending on config, but lets check.
  // Actually, for RadialBarChart, default is innerRadius to outerRadius.
  // We want the most significant one to be outermost.

  if (!mounted)
    return (
      <div className="h-[400px] bg-white rounded-xl border border-gray-200 animate-pulse" />
    );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-4 flex justify-between items-start">
        <div>
          <h5 className="text-xl font-bold text-gray-900">
            Adjusted Research Impact Score
          </h5>
          <p className="text-sm text-gray-500 mt-0.5">
            {analyticsData.profile.field} Cohort • 2,847 researchers
          </p>
        </div>
        <div className="flex gap-2">
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
      </div>

      {/* Score & Formula Row */}
      <div className="grid grid-cols-2 border-y border-gray-100">
        <div className="p-4 px-6 border-r border-gray-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            ARIS Score
          </div>
          <div className="text-4xl font-bold text-gray-900 leading-none">
            {aris.score}
          </div>
        </div>
        <div className="p-4 px-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Formula
          </div>
          <div className="text-sm font-bold text-gray-800 font-mono">
            H × ln(P+1) × FW
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-0.5">
            {aris.formula.values}
          </div>
        </div>
      </div>

      {/* Chart & Legend Section */}
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Center: Radial Chart */}
        <div className="relative w-64 h-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="75%"
              barSize={8}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                background={{ fill: "transparent" }}
                dataKey="value"
                cornerRadius={10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Background Dashed Rings - Manual SVG */}
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
              <circle
                cx="50"
                cy="50"
                r="10"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            </svg>
          </div>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-900 leading-none">
              {aris.score}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              ARIS Score
            </span>
          </div>
        </div>

        {/* Right: Legend */}
        <div className="flex-1 space-y-4 w-full max-w-[240px]">
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
                ></div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-gray-900 transition-colors">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
