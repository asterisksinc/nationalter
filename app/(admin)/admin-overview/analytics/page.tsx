"use client";

import { useState } from "react";

import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardSidebar } from "../component/dashboardsidebar";
import "./analytics-dashboard.css";
import { StatsSummary } from "./components/StatsSummary";
import { UserGrowthTrend } from "./components/UserGrowthTrend";
import { MrrAndMetricsRow } from "./components/MrrAndMetricsRow";
import { GeoDistributionCard } from "./components/GeoDistributionCard";
import { ConversionFunnelCard } from "./components/ConversionFunnelCard";
import { PersonaSegmentGrid } from "./components/PersonaSegmentGrid";
import { AnalyticsFooterNote } from "./components/AnalyticsFooterNote";
import {
  indiaGeoUrl,
  indiaStates28,
  segmentCards,
  sparklineSets,
  stateInfo,
  trendData,
} from "./components/analyticsData";

export default function AnalyticsDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="zui-admin-layout min-h-screen relative">
      <DashboardSidebar
        activePage="analytics"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="kryx-main-content ao-main-shell ml-0 md:ml-[260px] overflow-x-hidden">
        <div className="ao-header-shell">
          <DashboardHeader
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Analytics" },
            ]}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        </div>

        <div className="ao-wrapper-main">
          <div className="ao-header-row">
            <div>
              <div className="ao-title-main">Analytics Oversight</div>
              <p className="ao-subtitle-text">
                Monitor platform health, engagement metrics, and search intent
                trends across the enterprise ecosystem.
              </p>
            </div>

            <div className="ao-header-actions">
              <button type="button" className="ao-select-filter">
                Last 30 Days ▾
              </button>
              <button type="button" className="ao-btn-export">
                ↧ Export Data
              </button>
            </div>
          </div>

          <StatsSummary
            cards={[
              {
                label: "Monthly Recurring Revenue",
                value: "₹42.5L",
                deltaLabel: "↗ +12% MoM",
                deltaTone: "positive",
              },
              {
                label: "Daily Active Users",
                value: "2800",
                deltaLabel: "↗ +18% vs Last Month",
                deltaTone: "positive",
              },
              {
                label: "Churn Rate",
                value: "2.1%",
                deltaLabel: "↗ 0.3 pp Movement",
                deltaTone: "negative",
              },
              {
                label: "LTV : CAC Ratio",
                value: "3.8 : 1",
                deltaLabel: "✓ Above Target (3:1)",
                deltaTone: "positive",
              },
            ]}
          />

          <UserGrowthTrend data={trendData} />

          <MrrAndMetricsRow sparklines={sparklineSets} />

          <div className="ao-bottom-grid">
            <GeoDistributionCard
              geoUrl={indiaGeoUrl}
              states28={indiaStates28}
              stateInfo={stateInfo}
            />
            <ConversionFunnelCard />
          </div>

          <PersonaSegmentGrid cards={segmentCards} />

          <AnalyticsFooterNote>
            Real-time analytics powered by Natioignite Intelligence Engine
            <br />
            Last updated: 16/2/2026, 8:05:46 PM IST
          </AnalyticsFooterNote>
        </div>
      </main>
    </div>
  );
}
