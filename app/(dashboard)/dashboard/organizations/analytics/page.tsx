"use client";

import React from "react";
import { Download, Crown } from "lucide-react";
import ScientometricCard from "./components/ScientometricCard";
import CoreMetrics from "./components/CoreMetrics";
import PercentileChart from "./components/PercentileChart";
import TrajectoryChart from "./components/TrajectoryChart";
import BenchmarkChart from "./components/BenchmarkChart";

import ArisScoreCard from "./components/ArisScoreCard";
import OverallAssessment from "./components/OverallAssessment";

export default function AnalyticsPage() {
  return (
    <div className="p-0 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-2">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            Analytics Oversight
          </div>
          <div className="text-sm text-gray-500 mt-1 max-w-2xl">
            Monitor platform health, engagement metrics, and search intent
            trends across the enterprise ecosystem.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">
            <span>Last 30 Days</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A00] hover:bg-[#E66E00] text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 flex-1">
        {/* Top Card */}
        <ScientometricCard />

        {/* Percentile Chart - Full Width */}
        <PercentileChart />

        {/* Middle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArisScoreCard />
          <CoreMetrics />
        </div>

        {/* Trajectory */}
        <TrajectoryChart />

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BenchmarkChart />
          <OverallAssessment />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Field:</span>
            <input
              type="text"
              value="Clinical Medicine"
              readOnly
              className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-gray-700 w-40"
            />
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">Period:</span>
            <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button className="px-3 py-1 bg-white shadow-sm rounded text-orange-600 font-bold text-xs">
                Career
              </button>
              <button className="px-3 py-1 text-gray-500 hover:text-gray-900 text-xs font-medium">
                5 Years
              </button>
              <button className="px-3 py-1 text-gray-500 hover:text-gray-900 text-xs font-medium">
                1 Year
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex-1 md:flex-none">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-bold shadow-md shadow-orange-200 flex-1 md:flex-none">
            <Crown className="w-4 h-4" />
            Upgrade Premium
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400 space-y-1 pb-8">
        <div>
          All bibliometric indicators were normalized within discipline-specific
          cohorts using percentile ranking
        </div>
        <div>
          Nationcite 2026 • Built on accepted scientometrics • Transparent
          methodology
        </div>
      </div>
    </div>
  );
}
