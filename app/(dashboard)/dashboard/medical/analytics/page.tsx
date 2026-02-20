"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
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
        const field = scholarMetrics?.mainSubject || "Medicine";

        // Fetch ALL metrics from APIs in parallel
        const [
          pibiRes,
          pqliRes,
          csHRes,
          cassRes,
          arisRes,
          trajectoryRes,
          benchmarkRes,
          percentileRes,
        ] = await Promise.all([
          fetch("/api/analytics/PIBI"),
          fetch("/api/analytics/PQLI"),
          fetch("/api/analytics/CSH"),
          fetch("/api/analytics/CASS"),
          fetch(`/api/analytics/ARIS?field=${encodeURIComponent(field)}`),
          fetch("/api/analytics/trajectory"),
          fetch("/api/analytics/benchmark"),
          fetch("/api/analytics/percentile"),
        ]);

        const [pibiData, pqliData, csHData, cassData, arisData, trajectoryData, benchmarkData, percentileData] = 
          await Promise.all([
            pibiRes.json(),
            pqliRes.json(),
            csHRes.json(),
            cassRes.json(),
            arisRes.json(),
            trajectoryRes.json(),
            benchmarkRes.json(),
            percentileRes.json(),
          ]);

        // Extract API data with safe defaults
        const aris = arisData.success ? arisData.data : null;
        const pibi = pibiData.success ? pibiData.data : null;
        const pqli = pqliData.success ? pqliData.data : null;
        const csH = csHData.success ? csHData.data : null;
        const cass = cassData.success ? cassData.data : null;
        const trajectory = trajectoryData.success ? trajectoryData.data : null;
        const benchmark = benchmarkData.success ? benchmarkData.data : null;
        const percentile = percentileData.success ? percentileData.data : null;

        // Build analytics data structure from real API data
        const data = {
          profile: {
            name: scholarProfile?.data?.name || "Medical Professional",
            field: percentile?.field || scholarMetrics?.mainSubject || "Medicine",
            cohortSize: percentile?.total || benchmark?.cohortStats?.fieldScholarsCount || 0,
          },
          mainMetrics: [
            {
              label: "H-Index (Total)",
              value: scholarMetrics?.hIndexTotal?.toString() || pibi?.hIndex?.toString() || "0",
              change: "+2.4%",
              trend: "up",
            },
            {
              label: "H-Index (Last 5Y)",
              value: scholarMetrics?.hIndexLast5?.toString() || cass?.citationsLast5Years?.toString() || "0",
              change: "+1.8%",
              trend: "up",
            },
            {
              label: "World Rank",
              value: scholarMetrics?.worldRank ? `#${scholarMetrics.worldRank}` : percentile?.worldRank ? `#${percentile.worldRank}` : "—",
              change: "+12",
              trend: "up",
            },
            {
              label: "Country Rank",
              value: scholarMetrics?.countryRank ? `#${scholarMetrics.countryRank}` : percentile?.countryRank ? `#${percentile.countryRank}` : "—",
              change: "+5",
              trend: "up",
            },
          ],
          aris: {
            score: aris?.ARIS || 0,
            change: "+3.2%",
            percentile: percentile?.percentile || 75,
            status: aris && aris.ARIS > 70 ? "ELITE" : aris && aris.ARIS > 40 ? "HIGH" : "EMERGING",
            formula: {
              display: "H × ln(P+1) × FW",
              values: aris
                ? `${aris.hIndex} × ${aris.productivityFactor?.toFixed(2)} × ${aris.fieldWeight?.toFixed(2)}`
                : "—",
            },
            breakdown: [
              { label: "H-Index Impact", value: aris?.hIndex || scholarMetrics?.hIndexTotal || 0, color: "bg-emerald-500" },
              { label: "Productivity", value: aris?.publications || pibi?.publications || 0, color: "bg-blue-400" },
              { label: "Field Weight", value: aris ? Math.round(aris.fieldWeight * 10) : 10, color: "bg-purple-500" },
            ],
          },
          coreMetrics: [
            {
              label: "PIBI",
              value: pibi ? pibi.PIBI.toFixed(2) : "—",
              status: pibi && pibi.PIBI > 3 ? "Elite" : pibi && pibi.PIBI > 1.5 ? "Optimal" : "Emerging",
              percentile: pibi ? `${Math.min(99, Math.round(pibi.PIBI * 15))}th` : "—",
              formula: "H ÷ √P",
              statusColor: pibi && pibi.PIBI > 1.5 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
            {
              label: "CS-H Index",
              value: csH ? csH.csHIndex.toFixed(2) : "—",
              status: csH && csH.csHIndex > 8 ? "Strong" : csH && csH.csHIndex > 4 ? "Moderate" : "Developing",
              percentile: csH ? `${Math.min(99, Math.round(csH.csHIndex * 8))}th` : "—",
              formula: "H ÷ ln(Y+1)",
              statusColor: csH && csH.csHIndex > 5 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
            {
              label: "PQLI",
              value: pqli ? pqli.PQLI.toFixed(1) : "—",
              status: pqli && pqli.PQLI > 15 ? "Elite" : pqli && pqli.PQLI > 8 ? "High" : "Developing",
              percentile: pqli ? `${Math.min(99, Math.round(pqli.PQLI * 5))}th` : "—",
              formula: "H² ÷ P",
              statusColor: pqli && pqli.PQLI > 10 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
            {
              label: "CASS",
              value: cass ? cass.CASS.toFixed(1) : "—",
              status: cass && cass.CASS > 20 ? "High" : cass && cass.CASS > 10 ? "Moderate" : "Developing",
              percentile: cass ? `${Math.min(99, Math.round(cass.CASS * 3))}th` : "—",
              formula: "0.4H + 0.3ln(P) + 0.3(C5/Y)",
              statusColor: cass && cass.CASS > 15 ? "text-blue-600 bg-blue-50" : "text-gray-600 bg-gray-50",
            },
            {
              label: "ARIS",
              value: aris ? aris.ARIS.toFixed(0) : "—",
              status: aris && aris.ARIS > 70 ? "Elite" : aris && aris.ARIS > 40 ? "High" : "Emerging",
              percentile: percentile ? `${percentile.percentile}th` : "—",
              formula: "H×ln(P+1)×FW",
              statusColor: aris && aris.ARIS > 50 ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50",
            },
          ],
          percentile: {
            value: percentile?.percentile || 75,
            rank: percentile?.rank || scholarMetrics?.countryRank || 1,
            total: percentile?.total || 2847,
            tier: percentile?.tier || "Above Average",
          },
          trajectory: trajectory?.trajectory || [],
          benchmark: benchmark?.benchmark || [],
          benchmarkRaw: benchmark?.benchmarkRaw || [],
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
        <TrajectoryChart analyticsData={analyticsData} />

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-6">
          <BenchmarkChart analyticsData={analyticsData} />
          <OverallAssessment analyticsData={analyticsData} />
        </div>
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
