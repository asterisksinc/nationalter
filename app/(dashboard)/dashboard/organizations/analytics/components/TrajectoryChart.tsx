"use client";

import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { analyticsData } from "../data";

export default function TrajectoryChart() {
  const { trajectory } = analyticsData;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col transition-all duration-1000 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-bold text-gray-900">
          Career Trajectory{" "}
          <span className="text-sm font-normal text-gray-400">(2018–2025)</span>
        </h5>
        <select className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg outline-none hover:bg-gray-50 cursor-pointer">
          <option>Past 10 Years</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="flex items-center gap-6 mb-6 text-xs font-medium text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-[2px]" />
          <span>Productivity (Pubs)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-[2px]" />
          <span>ARIS Score</span>
        </div>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={trajectory}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
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
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="publications"
              name="Productivity"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
