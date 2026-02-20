"use client";

import { useState, useEffect } from "react";

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
import { AnimatedSection } from "./components/AnimatedSection";
import {
  indiaGeoUrl,
  indiaStates28,
  sparklineSets,
} from "./components/analyticsData";
import type { TrendPoint, StateDetail } from "./components/analyticsData";

export default function AnalyticsDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);
  const [stateInfo, setStateInfo] = useState<Record<string, StateDetail>>({});
  const [overview, setOverview] = useState<any>(null);
  const [segmentCards, setSegmentCards] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);

        // Fetch all analytics data in parallel
        const [overviewRes, activeUserRes, registrationsRes, mapRes] = await Promise.all([
          fetch("/api/analytics/overview"),
          fetch("/api/analytics/active-user"),
          fetch("/api/analytics/registrations"),
          fetch("/api/analytics/map"),
        ]);

        const overviewData = await overviewRes.json();
        const activeUserData = await activeUserRes.json();
        const registrationsData = await registrationsRes.json();
        const mapData = await mapRes.json();

        // Store overview for stats
        if (overviewData.success && overviewData.data) {
          setOverview(overviewData.data);

          // Build segment cards from overview data
          const { medicalProfessional, researcher, organization } = overviewData.data;
          const cards = [
            {
              label: "Medical Professionals",
              value: medicalProfessional.approvedCount.toLocaleString(),
              subtext: `${medicalProfessional.approvalRate}% approval rate`,
              color: "#4CAF50" as const,
            },
            {
              label: "Researchers",
              value: researcher.approvedCount.toLocaleString(),
              subtext: `${researcher.approvalRate}% approval rate`,
              color: "#2196F3" as const,
            },
            {
              label: "Organizations",
              value: organization.approvedCount.toLocaleString(),
              subtext: `${organization.approvalRate}% approval rate`,
              color: "#FF9800" as const,
            },
          ];
          setSegmentCards(cards);
        }

        // Transform active user + registrations data for chart
        if (activeUserData.success && registrationsData.success) {
          const activeUsers = activeUserData.data || {};
          const registrations = registrationsData.data || {};

          // Get all dates from both datasets
          const allDates = new Set([
            ...Object.keys(activeUsers),
            ...Object.keys(registrations),
          ]);

          // Sort dates chronologically
          const sortedDates = Array.from(allDates).sort();

          // Build trend data
          const trend: TrendPoint[] = sortedDates.map((date) => {
            const dateObj = new Date(date);
            const label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

            return {
              date,
              label,
              registrations: registrations[date]?.total || 0,
              logins: activeUsers[date]?.total || 0,
            };
          });

          setTrendData(trend);
        }

        // Transform map data for geographic distribution
        if (mapData.success && mapData.data) {
          const stateData: Record<string, StateDetail> = {};
          const stateCounts = mapData.data;

          // Find max for gradient calculation
          const counts = Object.values(stateCounts) as number[];
          const maxUsers = Math.max(...counts, 1);

          // Build stateInfo with color gradient
          Object.entries(stateCounts).forEach(([stateName, users]) => {
            const userCount = users as number;
            if (userCount > 0) {
              // Calculate percentage for width
              const widthPct = Math.round((userCount / maxUsers) * 100);

              // Calculate color intensity (darker for more users)
              const intensity = userCount / maxUsers;
              const baseColor = { r: 255, g: 133, b: 21 }; // #ff8515
              const lightColor = { r: 255, g: 220, b: 180 }; // lighter orange
              
              const r = Math.round(lightColor.r + (baseColor.r - lightColor.r) * intensity);
              const g = Math.round(lightColor.g + (baseColor.g - lightColor.g) * intensity);
              const b = Math.round(lightColor.b + (baseColor.b - lightColor.b) * intensity);

              stateData[stateName] = {
                code: stateName.substring(0, 2).toUpperCase(),
                users: userCount,
                width: `${widthPct}%`,
                rank: "—",
                fill: `rgb(${r}, ${g}, ${b})`,
              };
            }
          });

          setStateInfo(stateData);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
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
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-600">Loading analytics...</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Calculate stats from overview
  const totalApproved = overview?.summary?.totalApproved || 0;
  const avgActiveUsers = overview?.summary?.avgActiveUsersPerDay || 0;

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

          <AnimatedSection delayMs={0}>
            <StatsSummary
              cards={[
                {
                  label: "Total Approved Users",
                  value: totalApproved.toLocaleString(),
                  deltaLabel: `${overview?.summary?.totalRegistrationsLast7Days || 0} new last 7 days`,
                  deltaTone: "positive",
                },
                {
                  label: "Daily Active Users (Avg)",
                  value: avgActiveUsers.toLocaleString(),
                  deltaLabel: `${overview?.summary?.totalLoginsLast7Days || 0} logins last 7 days`,
                  deltaTone: "positive",
                },
                {
                  label: "Medical Professionals",
                  value: (overview?.medicalProfessional?.approvedCount || 0).toLocaleString(),
                  deltaLabel: `${overview?.medicalProfessional?.approvalRate || 0}% approval rate`,
                  deltaTone: "positive",
                },
                {
                  label: "Researchers",
                  value: (overview?.researcher?.approvedCount || 0).toLocaleString(),
                  deltaLabel: `${overview?.researcher?.approvalRate || 0}% approval rate`,
                  deltaTone: "positive",
                },
              ]}
            />
          </AnimatedSection>

          <AnimatedSection delayMs={60}>
            <UserGrowthTrend data={trendData} />
          </AnimatedSection>

          <AnimatedSection delayMs={120}>
            <MrrAndMetricsRow sparklines={sparklineSets} />
          </AnimatedSection>

          <div className="ao-bottom-grid">
            <AnimatedSection delayMs={0}>
              <GeoDistributionCard
                geoUrl={indiaGeoUrl}
                states28={indiaStates28}
                stateInfo={stateInfo}
              />
            </AnimatedSection>

            <AnimatedSection delayMs={90}>
              <ConversionFunnelCard />
            </AnimatedSection>
          </div>

          <AnimatedSection delayMs={180}>
            <PersonaSegmentGrid cards={segmentCards} />
          </AnimatedSection>

          <AnimatedSection delayMs={240}>
            <AnalyticsFooterNote>
              Real-time analytics powered by NationCite Intelligence Engine
              <br />
              Last updated: {new Date().toLocaleString('en-IN', { 
                dateStyle: 'short', 
                timeStyle: 'medium',
                timeZone: 'Asia/Kolkata'
              })} IST
            </AnalyticsFooterNote>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
