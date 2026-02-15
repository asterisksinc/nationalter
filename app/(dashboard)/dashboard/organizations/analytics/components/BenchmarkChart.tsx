"use client";

import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { analyticsData } from "../data";

export default function BenchmarkChart() {
  const { benchmark } = analyticsData;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const chartData = benchmark.map((item) => ({
    subject: item.subject,
    A: (item.A / item.fullMark) * 100,
    B: (item.B / item.fullMark) * 100,
    C: (item.C / item.fullMark) * 100,
    fullMark: 100,
  }));

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col transition-all duration-1000 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-lg font-bold text-gray-900 mb-1">
        Peer Benchmark Comparison
      </div>
      <div className="text-sm text-gray-500 mb-4">
        5-axis normalized comparison across all metrics
      </div>

      {/* Top Legend */}
      <div className="flex items-center justify-center gap-8 mb-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-orange-500 rounded-[2px]"></div>
          <span>You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-gray-500 rounded-[2px]"></div>
          <span>Field Average</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded-[2px]"></div>
          <span>National Average</span>
        </div>
      </div>

      {/* Radar Chart - Full Width */}
      <div className="w-full h-[550px] -mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="95%"
            data={chartData}
            margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
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
            <Radar
              name="You"
              dataKey="A"
              stroke="#F97316"
              strokeWidth={3}
              fill="#F97316"
              fillOpacity={0.3}
            />
            <Radar
              name="Field Average"
              dataKey="B"
              stroke="#6B7280"
              strokeWidth={2}
              fill="#9CA3AF"
              fillOpacity={0.2}
            />
            <Radar
              name="National Average"
              dataKey="C"
              stroke="#9CA3AF"
              strokeWidth={2}
              fill="transparent"
              fillOpacity={0}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
