"use client";

import React, { useEffect, useState } from "react";
import { Download, Crown } from "lucide-react";
import ScientometricCard from "./components/ScientometricCard";
import CoreMetrics from "./components/CoreMetrics";
import PercentileChart from "./components/PercentileChart";
import TrajectoryChart from "./components/TrajectoryChart";
import BenchmarkChart from "./components/BenchmarkChart";

import ArisScoreCard from "./components/ArisScoreCard";
import OverallAssessment from "./components/OverallAssessment";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard data to get profile info
        const dashboardRes = await fetch("/api/dashboard/scholar/me");
        const dashboardData = await dashboardRes.json();

        if (!dashboardData.success) {
          throw new Error(dashboardData.message || "Failed to fetch dashboard data");
        }

        const { scholarProfile, scholarMetrics } = dashboardData.data;

        // Fetch metrics from all available APIs (in parallel)
        // Note: ARIS requires a field parameter, so we'll need to handle that
        // For now, we'll fetch the others and handle ARIS specially
        const [
          pibiRes,
          pqliRes,
          csHRes,
          cassRes,
        ] = await Promise.all([
          fetch("/api/analytics/PIBI"),
          fetch("/api/analytics/PQLI"),
          fetch("/api/analytics/CSH"),
          fetch("/api/analytics/CASS"),
        ]);

        const pibiData = await pibiRes.json();
        const pqliData = await pqliRes.json();
        const csHData = await csHRes.json();
        const cassData = await cassRes.json();

        // Try to fetch ARIS with a default field (we'll use the org's field if available)
        // For orgs, this might not apply, so we'll handle gracefully
        let arisData = { success: false, data: null };
        try {
          const arisRes = await fetch("/api/analytics/ARIS?field=Medicine");
          arisData = await arisRes.json();
        } catch (err) {
          console.warn("ARIS API failed, using fallback", err);
        }

        // Build analytics data structure
        const data = {
          profile: {
            name: scholarProfile?.data?.name || "Scholar",
            field: scholarMetrics?.mainSubject || "Multi-disciplinarykey",
            cohortSize: 0,
          },
          mainMetrics: [
            {
              label: "H-Index (Total)",
              value: scholarMetrics?.hIndexTotal?.toString() || "0",
              change: "+0%",
              trend: "up",
            },
            {
              label: "H-Index (Last 5Y)",
              value: scholarMetrics?.hIndexLast5?.toString() || "0",
              change: "+0%",
              trend: "up",
            },
            {
              label: "World Rank",
              value: scholarMetrics?.worldRank ? `#${scholarMetrics.worldRank}` : "—",
              change: "",
              trend: "up",
            },
            {
              label: "Country Rank",
              value: scholarMetrics?.countryRank ? `#${scholarMetrics.countryRank}` : "—",
              change: "",
              trend: "up",
            },
          ],
          aris: {
            score: arisData.success ? arisData.data.ARIS : 0,
            change: "+0%",
            percentile: 0,
            status: arisData.success && arisData.data.ARIS > 70 ? "ELITE" : "EMERGING",
            formula: {
              display: "H × ln(P+1) × FW",
              values: arisData.success
                ? `${arisData.data.hIndex} × ${arisData.data.productivityFactor} × ${arisData.data.fieldWeight}`
                : "—",
            },
            breakdown: [
              { label: "H-Index Impact", value: scholarMetrics?.hIndexTotal || 0, color: "bg-emerald-500" },
              { label: "Productivity", value: arisData.success ? arisData.data.publications : 0, color: "bg-blue-400" },
              { label: "Field Weight", value: arisData.success ? Math.round(arisData.data.fieldWeight * 10) : 0, color: "bg-purple-500" },
            ],
          },
          coreMetrics: [
            {
              label: "PIBI",
              value: pibiData.success ? pibiData.data.PIBI.toFixed(2) : "—",
              status: pibiData.success && pibiData.data.PIBI > 0.5 ? "Optimal" : "Emerging",
              percentile: "—",
              formula: "H ÷ √P",
              statusColor: pibiData.success && pibiData.data.PIBI > 0.5 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
            {
              label: "CS-H Index",
              value: csHData.success ? csHData.data.CSH.toFixed(2) : "—",
              status: csHData.success && csHData.data.CSH > 5 ? "Strong" : "Moderate",
              percentile: "—",
              formula: "H ÷ ln(Y+1)",
              statusColor: csHData.success && csHData.data.CSH > 5 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
            {
              label: "PQLI",
              value: pqliData.success ? pqliData.data.PQLI.toFixed(1) : "—",
              status: pqliData.success && pqliData.data.PQLI > 10 ? "Elite" : "Developing",
              percentile: "—",
              formula: "H² ÷ P",
              statusColor: pqliData.success && pqliData.data.PQLI > 10 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
            {
              label: "CASS",
              value: cassData.success ? cassData.data.CASS.toFixed(0) : "—",
              status: cassData.success && cassData.data.CASS > 100 ? "High" : "Moderate",
              percentile: "—",
              formula: "Complex",
              statusColor: cassData.success && cassData.data.CASS > 100 ? "text-blue-600 bg-blue-50" : "text-gray-600 bg-gray-50",
            },
            {
              label: "ARIS",
              value: arisData.success ? arisData.data.ARIS.toFixed(0) : "—",
              status: arisData.success && arisData.data.ARIS > 70 ? "Elite" : "Emerging",
              percentile: "—",
              formula: "H×ln(P+1)×FW",
              statusColor: arisData.success && arisData.data.ARIS > 70 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
          ],
          percentile: {
            value: 0,
            rank: scholarMetrics?.countryRank || 0,
            total: 0,
          },
          trajectory: [],
          benchmark: [],
          benchmarkRaw: [],
        };

        setAnalyticsData(data);
      } catch (err: any) {
        console.error("Failed to fetch analytics:", err);
        setError(err.message || "Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="px-2 sm:px-0 md:pr-4 py-2 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-600">Loading analytics...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-2 sm:px-0 md:pr-4 py-2 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-lg font-medium text-red-600">Error loading analytics</div>
            <div className="text-sm text-gray-500 mt-2">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0 md:pr-4 py-2 max-w-[1600px] mx-auto overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 md:mb-8 gap-3 md:gap-4 mt-2 pb-5 md:pb-6 border-b border-gray-200">
        <div>
          <div className="text-2xl md:text-2xl font-bold text-gray-900">
            Analytics Oversight
          </div>
          <div className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            Monitor platform health, engagement metrics, and search intent
            trends across the enterprise ecosystem.
          </div>
        </div>

        <div className="flex w-full sm:w-auto flex-wrap md:flex-nowrap items-center gap-2">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">
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
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors">
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
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#FF7A00] hover:bg-[#E66E00] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 flex-1">
        {/* Top Card */}
        <ScientometricCard analyticsData={analyticsData} />

        {/* Percentile Chart - Full Width */}
        <PercentileChart analyticsData={analyticsData} />

        {/* Middle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArisScoreCard analyticsData={analyticsData} />
          <CoreMetrics analyticsData={analyticsData} />
        </div>

        {/* Trajectory */}
        {analyticsData.trajectory && analyticsData.trajectory.length > 0 && (
          <TrajectoryChart analyticsData={analyticsData} />
        )}

        {/* Bottom Charts Grid */}
        {analyticsData.benchmark && analyticsData.benchmark.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-6">
            <BenchmarkChart analyticsData={analyticsData} />
            <OverallAssessment analyticsData={analyticsData} />
          </div>
        )}
      </div>

      {/* Footer Controls */}

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
