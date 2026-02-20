// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./adminstyle.css";
import { DashboardSidebar } from "./component/dashboardsidebar";
import { DashboardHeader } from "./component/DashboardHeader";

type MetricView = "all" | "researcher" | "organization" | "medical";

type PublicDatasetResponse = {
  success?: boolean;
  count?: number;
  totalCount?: number;
};

type RegistrationApiDay = {
  total?: number;
  medical?: number;
  researcher?: number;
  org?: number;
};

type RegistrationSeriesPoint = {
  date: string;
  label: string;
  all: number;
  researcher: number;
  organization: number;
  medical: number;
};

type OverviewApiResponse = {
  success?: boolean;
  data?: {
    summary?: {
      totalApprovedMedicalProfessionals?: number;
      totalApprovedResearchers?: number;
      totalApprovedOrganizations?: number;
      totalApprovedOverall?: number;
      totalRegistrationsAllTime?: number;
    };
  };
};

const users = [
  {
    name: "Danielle Rose",
    email: "danielle@example.com",
    status: "Active",
    plan: "Enterprise",
    lastActive: "2 min ago",
  },
  {
    name: "Albert Henry",
    email: "albert@example.com",
    status: "Inactive",
    plan: "Basic",
    lastActive: "1 week ago",
  },
  {
    name: "Brooke Sims",
    email: "brooke@example.com",
    status: "Active",
    plan: "Enterprise",
    lastActive: "5 hours ago",
  },
  {
    name: "Janie Willis",
    email: "janie@example.com",
    status: "Inactive",
    plan: "Basic",
    lastActive: "7 hours ago",
  },
  {
    name: "Eduardo Perez",
    email: "eduardo@example.com",
    status: "Active",
    plan: "Enterprise",
    lastActive: "8 hours ago",
  },
  {
    name: "Tessa Norris",
    email: "tessa@example.com",
    status: "Inactive",
    plan: "Basic",
    lastActive: "2 days ago",
  },
  {
    name: "Martin Murphy",
    email: "martin@example.com",
    status: "Active",
    plan: "Enterprise",
    lastActive: "2 weeks ago",
  },
];

const numberFormatter = new Intl.NumberFormat("en-IN");

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function toLabel(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function sumByView(view: MetricView, rows: RegistrationSeriesPoint[]) {
  return rows.reduce((sum, row) => {
    if (view === "all") return sum + row.all;
    if (view === "researcher") return sum + row.researcher;
    if (view === "organization") return sum + row.organization;
    return sum + row.medical;
  }, 0);
}

function growthPercent(current: number, previous: number) {
  if (previous <= 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export default function HomePage() {
  const [activePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [metricView, setMetricView] = useState<MetricView>("all");

  const [scholarsPublicCount, setScholarsPublicCount] = useState(0);
  const [orgsPublicCount, setOrgsPublicCount] = useState(0);

  const [approvedMedical, setApprovedMedical] = useState(0);
  const [approvedResearchers, setApprovedResearchers] = useState(0);
  const [approvedOrganizations, setApprovedOrganizations] = useState(0);
  const [approvedOverall, setApprovedOverall] = useState(0);
  const [totalRegistrationsAllTime, setTotalRegistrationsAllTime] = useState(0);

  const [registrationSeries, setRegistrationSeries] = useState<RegistrationSeriesPoint[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);

        const [scholarsRes, orgsRes, overviewRes, registrationsRes] = await Promise.all([
          fetch("/api/scholars?top=1"),
          fetch("/api/orgs?top=1"),
          fetch("/api/analytics/overview"),
          fetch("/api/analytics/registrations"),
        ]);

        const scholarsData = (await scholarsRes.json()) as PublicDatasetResponse;
        const orgsData = (await orgsRes.json()) as PublicDatasetResponse;
        const overviewData = (await overviewRes.json()) as OverviewApiResponse;
        const registrationsData = await registrationsRes.json();

        setScholarsPublicCount(
          Number(scholarsData?.totalCount ?? scholarsData?.count ?? 0)
        );
        setOrgsPublicCount(Number(orgsData?.totalCount ?? orgsData?.count ?? 0));

        const summary = overviewData?.data?.summary;
        setApprovedMedical(Number(summary?.totalApprovedMedicalProfessionals ?? 0));
        setApprovedResearchers(Number(summary?.totalApprovedResearchers ?? 0));
        setApprovedOrganizations(Number(summary?.totalApprovedOrganizations ?? 0));
        setApprovedOverall(Number(summary?.totalApprovedOverall ?? 0));
        setTotalRegistrationsAllTime(Number(summary?.totalRegistrationsAllTime ?? 0));

        const daily = registrationsData?.data ?? {};
        const rows = Object.entries(daily)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, rawPoint]) => {
            const point = (rawPoint || {}) as RegistrationApiDay;
            return {
              date,
              label: toLabel(date),
              all: Number(point.total ?? 0),
              researcher: Number(point.researcher ?? 0),
              organization: Number(point.org ?? 0),
              medical: Number(point.medical ?? 0),
            };
          });

        setRegistrationSeries(rows);
      } catch (error) {
        console.error("Failed to fetch admin overview data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const viewLabel = useMemo(() => {
    if (metricView === "all") return "All Users";
    if (metricView === "researcher") return "Researchers";
    if (metricView === "organization") return "Organizations";
    return "Medical Professionals";
  }, [metricView]);

  const last7Rows = useMemo(() => registrationSeries.slice(-7), [registrationSeries]);
  const previous7Rows = useMemo(
    () => registrationSeries.slice(-14, -7),
    [registrationSeries]
  );

  const chartData = useMemo(
    () =>
      last7Rows.map((row) => ({
        ...row,
        value:
          metricView === "all"
            ? row.all
            : metricView === "researcher"
              ? row.researcher
              : metricView === "organization"
                ? row.organization
                : row.medical,
      })),
    [last7Rows, metricView]
  );

  const currentWindow = useMemo(
    () => sumByView(metricView, last7Rows),
    [last7Rows, metricView]
  );
  const previousWindow = useMemo(
    () => sumByView(metricView, previous7Rows),
    [previous7Rows, metricView]
  );

  const growth = useMemo(
    () => growthPercent(currentWindow, previousWindow),
    [currentWindow, previousWindow]
  );

  const totalRecords = useMemo(() => {
    if (metricView === "all") return scholarsPublicCount + orgsPublicCount;
    if (metricView === "researcher") return scholarsPublicCount;
    if (metricView === "organization") return orgsPublicCount;
    return approvedMedical;
  }, [metricView, scholarsPublicCount, orgsPublicCount, approvedMedical]);

  const approvalRate = useMemo(() => {
    if (totalRegistrationsAllTime <= 0) return 0;
    return Math.min(
      100,
      Math.round((approvedOverall / totalRegistrationsAllTime) * 100)
    );
  }, [approvedOverall, totalRegistrationsAllTime]);

  const circleCircumference = 2 * Math.PI * 52;
  const circleOffset = circleCircumference * (1 - approvalRate / 100);

  return (
    <div className="admin-layout relative">
      <DashboardSidebar
        activePage="overview"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main
        className="flex-1 transition-all duration-300 ml-0 md:ml-[260px] p-4 md:p-8 w-full overflow-x-hidden"
        style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
      >
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <section className="admin-content">
          {activePage === "dashboard" && (
            <>
              <div className="content-header">
                <div>
                  <h3 className="main-ct">Command Center</h3>
                  <p className="breadcrumb-current sub-ct">
                    Real-time visibility into the NationCite data ecosystem.
                    Monitor entity status and system health.
                  </p>
                </div>
                <div className="content-header-right">
                  <div className="frxd">
                    <div className="system-pill">
                      <span className="dot" /> SYSTEM ONLINE
                    </div>
                    <div className="last-sync">
                      Last synced: {new Date().toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Kolkata",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="cards-row1"
                style={{ paddingLeft: "32px", paddingRight: "32px" }}
              >
                <div className="summary-card summary-card-compact">
                  <div className="card-top-section">
                    <div className="left-section">
                      <Image
                        src="/logos/R1.png"
                        alt="Scholars icon"
                        width={55}
                        height={55}
                        style={{ borderRadius: "6px" }}
                        priority
                      />

                      <div className="title-value-column">
                        <div className="card-title">Scholar Public Data</div>
                        <div className="card-main-value">
                          {isLoading ? "--" : formatNumber(scholarsPublicCount)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div className="status-badge">
                        <span className="status-dot" />
                        Live
                      </div>
                    </div>
                  </div>
                  <div className="line" />
                  <div className="card-meta-row meow" style={{ marginTop: "30px" }}>
                    <span className="meta-label">Last update</span>
                    <span className="meta-value">Now</span>
                  </div>

                  <div className="card-meta-row">
                    <span className="meta-label">Source</span>
                    <span className="meta-value">/api/scholars</span>
                  </div>
                </div>

                <div className="summary-card summary-card-compact">
                  <div className="card-top-section">
                    <div className="left-section">
                      <Image
                        src="/logos/M.png"
                        alt="Organizations icon"
                        width={55}
                        height={55}
                        priority
                        style={{ borderRadius: "6px" }}
                      />

                      <div className="title-value-column">
                        <div className="card-title">Organization Public Data</div>
                        <div className="card-main-value">
                          {isLoading ? "--" : formatNumber(orgsPublicCount)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="status-badge">
                        <span className="status-dot" />
                        Live
                      </div>
                    </div>
                  </div>
                  <div className="line" />
                  <div className="card-meta-row meow" style={{ marginTop: "30px" }}>
                    <span className="meta-label">Last update</span>
                    <span className="meta-value">Now</span>
                  </div>

                  <div className="card-meta-row">
                    <span className="meta-label">Source</span>
                    <span className="meta-value">/api/orgs</span>
                  </div>
                </div>
              </div>

              <div className="fle" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
                <div className="panel-title">Ecosystem Metrics</div>
                <Link href="/admin-overview/analytics" className="panel-title1">
                  View All Reports
                </Link>
              </div>

              <div className="cards-row1" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
                <div className="panel-card">
                  <div className="panel-header">
                    <div className="panel-header-left">
                      <div className="panel-subtitle">Total Records</div>
                      <div className="panel-subtitle">{viewLabel}</div>
                    </div>
                    <div className="overview-panel-controls">
                      <span
                        className={`panel-badge-change ${growth >= 0 ? "positive" : "negative"}`}
                      >
                        {growth >= 0 ? "?" : "?"} {Math.abs(growth)}%
                      </span>
                      <select
                        className="overview-toggle"
                        value={metricView}
                        onChange={(event) =>
                          setMetricView(event.target.value as MetricView)
                        }
                      >
                        <option value="all">All Users</option>
                        <option value="researcher">Researchers</option>
                        <option value="organization">Organizations</option>
                        <option value="medical">Medical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="panel-value">
                      {isLoading ? "--" : formatNumber(totalRecords)}
                    </div>
                  </div>

                  <div className="overview-line-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="overviewAreaFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff7a00" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#ff7a00" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#eceff4" strokeDasharray="4 4" vertical={false} />
                        <XAxis
                          dataKey="label"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#7d8798", fontSize: 11 }}
                        />
                        <YAxis
                          allowDecimals={false}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#7d8798", fontSize: 11 }}
                          width={30}
                        />
                        <Tooltip
                          formatter={(value) => [formatNumber(value as number), viewLabel]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#ff7a00"
                          strokeWidth={2}
                          fill="url(#overviewAreaFill)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="panel-footer">Data Growth Over Last 7 Days</div>
                </div>

                <div className="panel-card">
                  <div className="panel-header">
                    <div>
                      <div className="panel-subtitle">Active Subscribers</div>
                    </div>
                    <div className="panel-header-right">
                      <span className="panel-badge-change positive">Admin Approved</span>
                    </div>
                  </div>

                  <div className="panel-value">
                    {isLoading ? "--" : formatNumber(approvedOverall)}
                  </div>

                  <div className="active-subscribers-wrap">
                    <div className="active-subscribers-circle">
                      <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
                        <circle
                          cx="66"
                          cy="66"
                          r="52"
                          stroke="#eceff4"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="66"
                          cy="66"
                          r="52"
                          stroke="#ff7a00"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={circleCircumference}
                          strokeDashoffset={circleOffset}
                          transform="rotate(-90 66 66)"
                        />
                      </svg>
                      <div className="active-subscribers-center">
                        <div className="active-subscribers-percent">{approvalRate}%</div>
                        <div className="active-subscribers-caption">approved</div>
                      </div>
                    </div>

                    <div className="active-subscribers-stats">
                      <div className="legend-item">
                        <div className="legend-left">Researchers</div>
                        <span className="legend-count">{formatNumber(approvedResearchers)}</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-left">Organizations</div>
                        <span className="legend-count">{formatNumber(approvedOrganizations)}</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-left">Medical</div>
                        <span className="legend-count">{formatNumber(approvedMedical)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cards-row cards-row--stretch" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
                <div className="panel-card">
                  <div className="panel-header3">
                    <div className="panel-title">System Alerts</div>
                    <span className="chip chip-soft-orange">3 Active</span>
                  </div>
                  <div className="alert-list">
                    <div className="alert-item">
                      <span className="chip chip-critical">CRITICAL</span>
                      <div className="fgg">
                        <div className="alert-text">API Latency Spike (EU-West)</div>
                        <div className="alert-meta">2m ago</div>
                      </div>
                    </div>
                    <div className="alert-item">
                      <span className="chip chip-warning">WARNING</span>
                      <div className="fgg">
                        <div className="alert-text">Data Sync Delayed: Universities</div>
                        <div className="alert-meta">45m ago</div>
                      </div>
                    </div>
                    <div className="alert-item">
                      <span className="chip chip-info">INFO</span>
                      <div className="fgg">
                        <div className="alert-text">Scheduled Maintenance: Tomorrow</div>
                        <div className="alert-meta">2h ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="panel-card">
                  <div className="panel-header3">
                    <div className="panel-title">Recent Admin Activity</div>
                  </div>
                  <ul className="timeline-list">
                    <li className="timeline-item">
                      <span className="timeline-dot" />
                      <div>
                        <div className="timeline-text">Uploaded researchers_v4_2025.csv</div>
                        <div className="timeline-meta">Today at 09:55 AM</div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <span className="timeline-dot" />
                      <div>
                        <div className="timeline-text">System auto-fixed 48 invalid rows</div>
                        <div className="timeline-meta">Today at 09:56 AM</div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <span className="timeline-dot" />
                      <div>
                        <div className="timeline-text">Dataset published (Overwrite mode)</div>
                        <div className="timeline-meta">Today at 09:55 AM</div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <span className="timeline-dot" />
                      <div>
                        <div className="timeline-text">Dataset published (Overwrite mode)</div>
                        <div className="timeline-meta">Today at 09:55 AM</div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <span className="timeline-dot" />
                      <div>
                        <div className="timeline-text">Dataset published (Overwrite mode)</div>
                        <div className="timeline-meta">Today at 09:55 AM</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="metrics-column">
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon purple-icon">
                        <Image
                          src="/logos/db.png"
                          alt="Researchers icon"
                          width={24}
                          height={24}
                          priority
                        />
                      </div>
                      <div className="metric-title-group">
                        <div className="metric-title">Data Processing</div>
                        <div className="metric-value">12.4s</div>
                      </div>
                    </div>

                    <div className="metric-description">Avg CSV validation time</div>

                    <div className="metric-footer">
                      <span>Publish Time</span>
                      <span className="metric-footer-value">18.9s</span>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon violet-icon">
                        <Image
                          src="/logos/s.png"
                          alt="Researchers icon"
                          width={24}
                          height={24}
                          priority
                        />
                      </div>
                      <div className="metric-title-group">
                        <div className="metric-title">Search Usage (24h)</div>
                        <div className="metric-value">9,482</div>
                      </div>
                    </div>

                    <ul className="metric-list">
                      <li>Oncology H-index</li>
                      <li>Top AI universities India</li>
                      <li>Cardiology citation score</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === "users" && (
            <>
              <div className="content-header">
                <div>
                  <h3>User Management</h3>
                  <p>
                    Manage users, monitor activity, and control access across the
                    platform.
                  </p>
                </div>
                <div className="content-header-right">
                  <button className="primary-btn">Export Users</button>
                </div>
              </div>

              <div className="users-filters">
                <input
                  type="text"
                  placeholder="Search by name, email or ID"
                  className="users-search"
                />
                <select className="users-filter">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <select className="users-filter">
                  <option>All Plans</option>
                  <option>Enterprise</option>
                  <option>Basic</option>
                  <option>Free</option>
                </select>
                <span className="users-count">127 Active Users</span>
                <button className="users-add-btn">+ Add User</button>
              </div>

              <div className="users-table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Plan</th>
                      <th>Last Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="user-name">{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>{user.plan}</td>
                        <td>{user.lastActive}</td>
                        <td>
                          <button className="table-action edit">Edit</button>
                          <button className="table-action delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
