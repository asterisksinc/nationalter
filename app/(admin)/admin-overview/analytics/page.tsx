"use client";

import { useState } from "react";
import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardSidebar } from "../component/dashboardsidebar";
import "./analytics-dashboard.css";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const trendData = [
  { label: "Oct 7", mau: 19, dau: 5 },
  { label: "", mau: 17, dau: 5.2 },
  { label: "Oct 15", mau: 11, dau: 6 },
  { label: "", mau: 14, dau: 7.8 },
  { label: "", mau: 10, dau: 10.5 },
  { label: "Oct 23", mau: 12, dau: 13.8 },
  { label: "", mau: 9, dau: 17.4 },
  { label: "", mau: 8, dau: 20 },
  { label: "Oct 31", mau: 5.5, dau: 21.4 },
  { label: "", mau: 4.2, dau: 21.8 },
  { label: "Nov 8", mau: 7.2, dau: 21.1 },
  { label: "", mau: 14.4, dau: 18.9 },
  { label: "Nov 16", mau: 16.8, dau: 17.6 },
  { label: "", mau: 24, dau: 16.1 },
  { label: "", mau: 18.3, dau: 14.6 },
  { label: "Nov 24", mau: 19.8, dau: 13.2 },
  { label: "", mau: 20.4, dau: 11.9 },
  { label: "", mau: 23, dau: 10.8 },
  { label: "Dec 2", mau: 18, dau: 9.6 },
  { label: "", mau: 16.3, dau: 8.8 },
  { label: "Dec 10", mau: 18.8, dau: 8.2 },
  { label: "", mau: 17.4, dau: 8 },
  { label: "Dec 18", mau: 30.5, dau: 8.7 },
  { label: "", mau: 23.8, dau: 9.8 },
  { label: "", mau: 27.6, dau: 11.1 },
  { label: "Dec 26", mau: 31.6, dau: 12.9 },
  { label: "", mau: 22.4, dau: 14.8 },
  { label: "", mau: 19.8, dau: 16.2 },
  { label: "Jan 3", mau: 21.2, dau: 17.3 },
];

const sparklineSets = {
  greenA: "5,17 12,12 19,13 26,10 33,14 40,12 47,16 54,8 61,11 68,9",
  greenB: "5,14 12,10 19,11 26,8 33,12 40,11 47,13 54,9 61,12 68,10",
  greenC: "5,16 12,11 19,12 26,9 33,12 40,10 47,14 54,8 61,12 68,9",
  redA: "5,10 12,15 19,12 26,16 33,13 40,17 47,14 54,19 61,14 68,11",
};

const stateRows = [
  { rank: "#1 Maharashtra", users: "847 Users", width: "82%" },
  { rank: "#2 Karnataka", users: "665 users", width: "66%" },
  { rank: "#3 Delhi", users: "544 users", width: "56%" },
  { rank: "#4 Tamil Nadu", users: "423 users", width: "44%" },
];

const stateInfo: Record<
  string,
  { users: number; fill: string; code: string; rank: string }
> = {
  Maharashtra: {
    users: 847,
    fill: "#ff7f10",
    code: "MH",
    rank: "#1",
  },
  Karnataka: {
    users: 665,
    fill: "#ff9621",
    code: "KA",
    rank: "#2",
  },
  Delhi: {
    users: 544,
    fill: "#ffb96a",
    code: "DL",
    rank: "#3",
  },
  "Tamil Nadu": {
    users: 423,
    fill: "#ffcc8b",
    code: "TN",
    rank: "#4",
  },
};

const indiaGeoUrl =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson";

const funnelStages = [
  {
    key: "signup",
    label: "Sign-ups",
    users: 847,
    percent: "100%",
    x: 86,
    yTag: 100,
    yNode: 267,
  },
  {
    key: "verify",
    label: "Email Verified",
    users: 738,
    percent: "87%",
    x: 181,
    yTag: 132,
    yNode: 244,
  },
  {
    key: "profile",
    label: "Profile Complete",
    users: 312,
    percent: "42%",
    x: 276,
    yTag: 164,
    yNode: 220,
  },
  {
    key: "premium",
    label: "Premium Subscribers",
    users: 184,
    percent: "24%",
    x: 371,
    yTag: 192,
    yNode: 196,
  },
  {
    key: "active",
    label: "Active Users",
    users: 80,
    percent: "10%",
    x: 466,
    yTag: 204,
    yNode: 184,
  },
];

const segmentCards = [
  {
    title: "Researchers",
    growth: "↑ + 12% MoM",
    signupsLabel: "New Sign-ups / Day",
    signupsValue: "27",
    conversion: "87%",
    average: "ARIS 78",
    distribution: "34% Medicine",
    retention: "89%",
    progress: "87%",
    tone: "purple",
  },
  {
    title: "Medical Professionals",
    growth: "↑ +18% growth",
    signupsLabel: "New Sign-ups / Day",
    signupsValue: "8",
    conversion: "91%",
    average: "Cardiology 22%",
    distribution: "34% Apollo",
    retention: "94%",
    progress: "91%",
    tone: "pink",
  },
  {
    title: "Organisations",
    growth: "↑ + 32% Growth",
    signupsLabel: "New Sign-ups / Month",
    signupsValue: "12",
    conversion: "68%",
    average: "Faculty 45",
    distribution: "40% IITs",
    retention: "96%",
    progress: "68%",
    tone: "blue",
  },
];

export default function AnalyticsDashboard() {
  const [hoveredState, setHoveredState] = useState<{
    name: string;
    users: number;
    code: string;
    rank: string;
  } | null>(null);
  const [mapTooltip, setMapTooltip] = useState({ x: 64, y: 148 });
  const [activeFunnelStage, setActiveFunnelStage] = useState<number>(0);

  const currentFunnel = funnelStages[activeFunnelStage] || funnelStages[0];

  return (
    <div className="zui-admin-layout min-h-screen">
      <div className="ao-desktop-sidebar">
        <DashboardSidebar activePage="analytics" />
      </div>
      <main className="kryx-main-content ao-main-shell">
        <div className="ao-header-shell">
          <DashboardHeader
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Analytics" },
            ]}
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

          <div className="ao-stats-container">
            <div className="ao-stat-card">
              <div className="ao-stat-label">Monthly Recurring Revenue</div>
              <div className="ao-stat-value">₹42.5L</div>
              <div className="ao-stat-positive">↗ +12% MoM</div>
            </div>
            <div className="ao-stat-card">
              <div className="ao-stat-label">Daily Active Users</div>
              <div className="ao-stat-value">2800</div>
              <div className="ao-stat-positive">↗ +18% vs Last Month</div>
            </div>
            <div className="ao-stat-card">
              <div className="ao-stat-label">Churn Rate</div>
              <div className="ao-stat-value">2.1%</div>
              <div className="ao-stat-negative">↗ 0.3 pp Movement</div>
            </div>
            <div className="ao-stat-card ao-stat-card-last">
              <div className="ao-stat-label">LTV : CAC Ratio</div>
              <div className="ao-stat-value">3.8 : 1</div>
              <div className="ao-stat-positive">✓ Above Target (3:1)</div>
            </div>
          </div>

          <div className="ao-card ao-chart-wrapper">
            <div className="ao-chart-title">User Growth Trend</div>
            <div className="ao-chart-subtitle">
              Daily Active Users (DAU) vs Monthly Active Users (MAU)
            </div>
            <div className="ao-chart-divider" />

            <div className="ao-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aoOrangeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff8a18" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#ff8a18" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e7eaef" vertical={true} horizontal={true} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#8b95a5", fontSize: 10 }} minTickGap={22} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 35]}
                    ticks={[0, 5, 10, 15, 20, 25, 30, 35]}
                    tickFormatter={(value) => (value === 0 ? "0" : `${value}k`)}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#8b95a5", fontSize: 10 }}
                  />
                  <Area
                    yAxisId="right"
                    type="linear"
                    dataKey="mau"
                    stroke="none"
                    fill="url(#aoOrangeFill)"
                  />
                  <Line
                    yAxisId="right"
                    type="linear"
                    dataKey="mau"
                    stroke="#ff8515"
                    strokeWidth={2}
                    dot={false}
                    strokeLinejoin="round" 
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="dau"
                    stroke="#2a66e7"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="ao-chart-legend">
              <span className="ao-legend-item">
                <span className="ao-legend-box ao-orange-box" />
                Monthly Active Users
              </span>
              <span className="ao-legend-item">
                <span className="ao-legend-box ao-blue-box" />
                Daily Active Users
              </span>
            </div>
          </div>

          <div className="ao-mid-grid">
            <div className="ao-card ao-donut-card">
              <div className="ao-card-title">MRR Breakdown by Persona</div>
              <div className="ao-card-big">842</div>
              <div className="ao-divider" />

              <div className="ao-donut-wrap">
                <div className="ao-donut" />
              </div>

              <div className="ao-donut-legend">
                <div className="ao-donut-row">
                  <span className="ao-dot ao-dot-pro" />
                  <span className="ao-donut-name">Researchers Pro</span>
                  <span className="ao-donut-value">₹28.0L (66%)</span>
                </div>
                <div className="ao-donut-row">
                  <span className="ao-dot ao-dot-org" />
                  <span className="ao-donut-name">Org Enterprise</span>
                  <span className="ao-donut-value">₹12.0L (28%)</span>
                </div>
                <div className="ao-donut-row">
                  <span className="ao-dot ao-dot-med" />
                  <span className="ao-donut-name">Medical Premium</span>
                  <span className="ao-donut-value">₹2.5L (6%)</span>
                </div>
              </div>
            </div>

            <div className="ao-card ao-metrics-card">
              <div className="ao-metrics-head">Lorem ipsum dolor sit amet</div>
              <div className="ao-metrics-sub">Inventore veritatis et quasi architecto beatae vita</div>

              <div className="ao-metrics-grid">
                <div className="ao-metric-cell">
                  <div className="ao-metric-top">
                    <div>
                      <div className="ao-metric-label">New Researchers</div>
                      <div className="ao-metric-value">27/day</div>
                      <div className="ao-up">↑ +25% vs last month</div>
                    </div>
                    <svg className="ao-spark" viewBox="0 0 70 22">
                      <polyline points={sparklineSets.greenA} />
                    </svg>
                  </div>
                </div>

                <div className="ao-metric-cell">
                  <div className="ao-metric-top">
                    <div>
                      <div className="ao-metric-label">Registration Conversion</div>
                      <div className="ao-metric-value">87%</div>
                      <div className="ao-up">↑ + 3%</div>
                    </div>
                    <svg className="ao-spark" viewBox="0 0 70 22">
                      <polyline points={sparklineSets.greenB} />
                    </svg>
                  </div>
                </div>

                <div className="ao-metric-cell">
                  <div className="ao-metric-top">
                    <div>
                      <div className="ao-metric-label">Premium Conversion</div>
                      <div className="ao-metric-value">23%</div>
                      <div className="ao-down">↓ - 5%</div>
                    </div>
                    <svg className="ao-spark ao-spark-red" viewBox="0 0 70 22">
                      <polyline points={sparklineSets.redA} />
                    </svg>
                  </div>
                </div>

                <div className="ao-metric-cell">
                  <div className="ao-metric-top">
                    <div>
                      <div className="ao-metric-label">Org Retention</div>
                      <div className="ao-metric-value">94%</div>
                      <div className="ao-up">↑ +2%</div>
                    </div>
                    <svg className="ao-spark" viewBox="0 0 70 22">
                      <polyline points={sparklineSets.greenA} />
                    </svg>
                  </div>
                </div>

                <div className="ao-metric-cell">
                  <div className="ao-metric-top">
                    <div>
                      <div className="ao-metric-label">ARIS Adoption</div>
                      <div className="ao-metric-value">78%</div>
                      <div className="ao-up">↑ +2%</div>
                    </div>
                    <svg className="ao-spark" viewBox="0 0 70 22">
                      <polyline points={sparklineSets.greenB} />
                    </svg>
                  </div>
                </div>

                <div className="ao-metric-cell">
                  <div className="ao-metric-top">
                    <div>
                      <div className="ao-metric-label">ORCID Connected</div>
                      <div className="ao-metric-value">72%</div>
                      <div className="ao-up">↑ +12%</div>
                    </div>
                    <svg className="ao-spark" viewBox="0 0 70 22">
                      <polyline points={sparklineSets.greenC} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ao-bottom-grid">
            <div className="ao-card ao-geo-card">
              <div className="ao-card-title">Geographic Distribution</div>
              <div className="ao-card-sub">Top performing states by user base</div>

              <div className="ao-india-wrap">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 1100, center: [82.5, 23] }}
                  className="ao-india-svg"
                >
                  <Geographies geography={indiaGeoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const stateName = String(
                          geo.properties.st_nm || geo.properties.NAME_1 || ""
                        );
                        const detail = stateInfo[stateName];
                        const isActive = hoveredState?.name === stateName;
                        const fill = detail?.fill || "#dfe3ea";

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className="ao-map-region"
                            onMouseEnter={(event) => {
                              if (!detail) {
                                return;
                              }

                              const svg = event.currentTarget.ownerSVGElement;
                              if (!svg) {
                                return;
                              }

                              const rect = svg.getBoundingClientRect();

                              setMapTooltip({
                                x: event.clientX - rect.left + 14,
                                y: event.clientY - rect.top - 6,
                              });

                              setHoveredState({
                                name: stateName,
                                users: detail.users,
                                code: detail.code,
                                rank: detail.rank,
                              });
                            }}
                            onMouseMove={(event) => {
                              if (!detail) {
                                return;
                              }

                              const svg = event.currentTarget.ownerSVGElement;
                              if (!svg) {
                                return;
                              }

                              const rect = svg.getBoundingClientRect();

                              setMapTooltip({
                                x: event.clientX - rect.left + 14,
                                y: event.clientY - rect.top - 6,
                              });
                            }}
                            onMouseLeave={() => setHoveredState(null)}
                            style={{
                              default: {
                                fill,
                                stroke: "#2f3a4b", 
                                strokeWidth: 1.2, 
                                outline: "none",
                                cursor: detail ? "pointer" : "default",
                              },
                              hover: {
                                fill,
                                stroke: "#000000",
                                strokeWidth: 1.5,
                                outline: "none",
                                cursor: detail ? "pointer" : "default",
                              },
                              pressed: {
                                fill,
                                stroke: "#000000",
                                strokeWidth: 1.5,
                                outline: "none",
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                  <Marker coordinates={[75.9, 19.7]}>
                    <circle r={2.5} fill="#2f3a4b" />
                  </Marker>
                </ComposableMap>

                <div
                  className="ao-map-tooltip"
                  style={{
                    left: `${mapTooltip.x}px`,
                    top: `${mapTooltip.y}px`,
                  }}
                >
                  {(hoveredState?.name || "Maharastra").replace("Maharashtra", "Maharastra")}
                  <br />
                  {(hoveredState?.users || 847).toLocaleString()} Users
                </div>
              </div>

              <div className="ao-state-list">
                {stateRows.map((state) => (
                  <div className="ao-state-card" key={state.rank}>
                    <div className="ao-state-top">
                      <span className="ao-state-rank">{state.rank}</span>
                      <span className="ao-state-users">{state.users}</span>
                    </div>
                    <div className="ao-progress-track">
                      <span className="ao-progress-fill" style={{ width: state.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ao-card ao-funnel-card">
              <div className="ao-funnel-head-row">
                <div>
                  <div className="ao-card-title">User Conversion Funnel</div>
                  <div className="ao-card-sub">User journey conversion metrics</div>
                </div>
                <div className="ao-badges">
                  <span className="ao-badge-green">Elite</span>
                  <span className="ao-badge-orange">92th Percentile</span>
                </div>
              </div>

              <div className="ao-funnel-metrics">
                <div>
                  <div className="ao-small-muted">Overall Conversion</div>
                  <div className="ao-green-value">21.7%</div>
                </div>
                <div>
                  <div className="ao-small-muted">Total Converted</div>
                  <div className="ao-dark-value">184</div>
                </div>
              </div>

              <div className="ao-funnel-graph">
                  <svg
                    className="ao-funnel-svg"
                    viewBox="0 0 800 450"
                    preserveAspectRatio="xMidYMid meet"
                    role="img"
                    aria-label="User conversion funnel"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <defs>
                      <linearGradient id="aoFunnelBack" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ffe6cc" />
                        <stop offset="100%" stopColor="#fff0e0" />
                      </linearGradient>
                      <linearGradient id="aoFunnelMid" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ffcc99" />
                        <stop offset="100%" stopColor="#ffdcb3" />
                      </linearGradient>
                      <linearGradient id="aoFunnelFront" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ff7f00" />
                        <stop offset="100%" stopColor="#ff9933" />
                      </linearGradient>
                      <filter id="shadowVal" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.1"/>
                      </filter>
                    </defs>

                    {/* Layer 1: Background (Lightest) */}
                    <path
                      d="
                        M 0,20 
                        C 150,20 200,80 300,110
                        C 400,140 500,165 600,180
                        C 700,195 750,200 800,205
                        L 800,245
                        C 750,250 700,255 600,270
                        C 500,285 400,310 300,340
                        C 200,370 150,430 0,430
                        Z
                      "
                      fill="url(#aoFunnelBack)"
                      opacity="0.6"
                    />

                    {/* Layer 2: Middle (Medium) */}
                    <path
                       d="
                        M 0,55
                        C 150,55 200,105 300,130
                        C 400,155 500,175 600,188
                        C 700,201 750,205 800,210
                        L 800,240
                        C 750,245 700,249 600,262
                        C 500,275 400,295 300,320
                        C 200,345 150,395 0,395
                        Z
                      "
                      fill="url(#aoFunnelMid)"
                      opacity="0.8"
                    />

                    {/* Layer 3: Main (Vibrant Orange) */}
                    <path
                      d="
                        M 0,90
                        C 150,90 200,130 300,150
                        C 400,170 500,185 600,196
                        C 700,207 750,210 800,215
                        L 800,235
                        C 750,240 700,243 600,254
                        C 500,265 400,280 300,300
                        C 200,320 150,360 0,360
                        Z
                      "
                      fill="url(#aoFunnelFront)"
                    />
                    
                    {/* Vertical Dividing Lines */}
                    {[200, 400, 600].map((x) => (
                      <line
                        key={`line-${x}`}
                        x1={x}
                        y1={20}
                        x2={x}
                        y2={430}
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                    ))}

                    {/* Funnel Stage Labels */}
                    {funnelStages.map((stage, idx) => {
                      // Adjust X positions to centers of the 5 zones
                      const xPositions = [100, 300, 500, 700, 850];
                      const yCenters = [225, 195, 230, 250, 270]; // Approx vertical center of flow
                      
                      const xPos = xPositions[idx] || 850;
                      const yCenter = yCenters[idx] || 250;

                      // Top Edge Y-coordinate reference for User Count
                      const yTopRef = [90, 130, 180, 205, 215][idx];
                      // Bottom Edge Y-coordinate reference for Label
                      const yBotRef = [360, 320, 290, 260, 240][idx];

                      return (
                        <g key={stage.key} transform={`translate(${xPos}, 0)`}>
                          
                          {/* Top: User Count Pill (Visible for first 4 stages) */}
                          {idx < 4 && (
                            <g transform={`translate(0, ${yTopRef - 40})`}> 
                               <rect 
                                 x="-55" y="0" width="110" height="30" rx="15" 
                                 fill="#ffeacc" opacity="0.95"
                               />
                               <text
                                 x="0" y="20"
                                 textAnchor="middle"
                                 fill="#1f2937"
                                 fontSize="13"
                                 fontWeight="600"
                               >
                                 {stage.users} User
                               </text>
                            </g>
                          )}

                          {/* Center: Percentage Pill (White) - Visible for all */}
                          <g transform={`translate(0, ${yCenter})`}>
                            <rect 
                               x="-40" y="-18" width="80" height="36" rx="18" 
                               fill="#fff"
                               filter="url(#shadowVal)"
                            />
                            <text
                              x="0" y="6"
                              textAnchor="middle"
                              fill="#ff7f00"
                              fontWeight="bold"
                              fontSize="16"
                            >
                              {stage.percent}
                            </text>
                          </g>

                          {/* Bottom: Stage Label Bubble - Visible for first 4 stages */}
                          {idx < 4 && (
                            <g transform={`translate(0, ${yBotRef + 20})`}>
                               {/* Connector bump from bottom path */}
                               <path d="M -15,-20 Q 0,-5 15,-20" fill="#fff" opacity="0.1" />
                               
                               <circle r="38" fill="#fff5eb" cy="32" />
                               <text
                                 x="0" y="28"
                                 textAnchor="middle"
                                 fill="#1f2937"
                                 fontSize="11"
                                 fontWeight="700"
                               >
                                 {stage.label.split(" ")[0]}
                               </text>
                               <text
                                 x="0" y="42"
                                 textAnchor="middle"
                                 fill="#1f2937"
                                 fontSize="11"
                                 fontWeight="700"
                               >
                                 {stage.label.split(" ").slice(1).join(" ")}
                               </text>
                            </g>
                          )}
                          
                          {/* Final Label for 5th item acting as simple text */}
                          {idx === 4 && (
                            <text
                              x="0" y={yTopRef - 20}
                              textAnchor="middle"
                              fill="#4b5563"
                              fontSize="12"
                              fontWeight="500"
                            >
                              184 User
                            </text>
                          )}

                        </g>
                      );
                    })}
                  </svg>
              </div>
            </div>
          </div>

          <div className="ao-segment-grid">
            {segmentCards.map((card) => (
              <div className="ao-card ao-segment-card" key={card.title}>
                <div className="ao-segment-header">
                  <div className={`ao-segment-icon ${card.tone}`} />
                  <div>
                    <div className="ao-segment-title">{card.title}</div>
                    <div className="ao-segment-growth">{card.growth}</div>
                  </div>
                </div>
                <div className="ao-divider" />
                <div className="ao-segment-row">
                  <div>
                    <div className="ao-small-muted">{card.signupsLabel}</div>
                    <div className="ao-segment-big">{card.signupsValue}</div>
                  </div>
                  <div>
                    <div className="ao-small-muted">Registration Conversion</div>
                    <div className="ao-segment-orange">{card.conversion}</div>
                    <div className="ao-small-muted">Above target</div>
                  </div>
                </div>
                <div className="ao-progress-track large">
                  <span className="ao-progress-fill" style={{ width: card.progress }} />
                </div>
                <div className="ao-average-pill">
                  <span>Average Metric</span>
                  <strong>{card.average}</strong>
                </div>
                <div className="ao-segment-foot">
                  <div>
                    <div className="ao-small-muted">Field Distribution</div>
                    <div className="ao-foot-value">{card.distribution}</div>
                  </div>
                  <div>
                    <div className="ao-small-muted">Retention Rate</div>
                    <div className="ao-segment-orange">{card.retention}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ao-footer-note">
            Real-time analytics powered by Natioignite Intelligence Engine
            <br />
            Last updated: 16/2/2026, 8:05:46 PM IST
          </div>
        </div>
      </main>
    </div>
  );
}
