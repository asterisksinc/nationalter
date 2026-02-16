"use client";

import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { HIndexChart } from "../component/HIndexChart";
import { IndiaMap } from "@vishalvoid/react-india-map";
import Image from "next/image";
import "./analytics-dashboard.css";
import Example from "../component/map";
import FunnelStacked from "../component/funnle";
const chartData = [
  { month: "Jan", value: 4.2 },
  { month: "Feb", value: 5.8 },
  { month: "Mar", value: 4.5 },
  { month: "Apr", value: 5.5 },
  { month: "May", value: 7.2 },
  { month: "Jun", value: 6.1 },
  { month: "Jul", value: 7.3 },
  { month: "Aug", value: 5.2 },
  { month: "Sept", value: 6.5 },
  { month: "Oct", value: 7.8 },
  { month: "Nov", value: 7.0 },
  { month: "Dec", value: 5.5 },
];
export default function AnalyticsDashboard() {
  return (
        <>      <div className="zui-admin-layout min-h-screen">
            <DashboardSidebar activePage="analytics" />
            <main className="kryx-main-content flex-1 ml-[260px] min-w-[1000px] bg-gray-50"><DashboardHeader
              breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Analytics" },
              ]}
            />
    <div className="ad-wrapper-main">
      {/* Header */}
      {/* <div className="ad-header-row">
        <div>
          <h1 className="ad-title-main">Analytics Oversight</h1>
          <p className="ad-subtitle-text">
            Monitor platform health, engagement metrics, and search intent trends across the enterprise ecosystem.
          </p>
        </div>

        <div className="ad-header-actions">
          <select className="ad-select-filter">
            <option>Last 30 Days</option>
          </select>

          <button className="ad-btn-export">
            ⬇ Export Data
          </button>
        </div>
      </div> */}
      
          <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6" style={{display:'flex', justifyContent:'space-between'}}>
            <div>
          <div className="text-[18px] md:text-[16px] font-semibold leading-[120%] tracking-[-0.006em] text-[#0E121B]" style={{fontSize:'16px',fontWeight:'600',color:'#0E121B'}}>
            Analytics Oversight
          </div>
          <p className="text-[13px] md:text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866] mt-1" style={{fontSize:'12px',fontWeight:'400',color:'#525866'}}>
                       Monitor platform health, engagement metrics, and search intent trends across the enterprise ecosystem.

          </p></div>
            <div className="ad-header-actions">
          <select className="ad-select-filter">
            <option>Last 30 Days</option>
          </select>

          <button className="ad-btn-export">
            ⬇ Export Data
          </button>
        </div>
        </div>
       

      {/* Stats Cards */}
      <div className="ad-stats-container">
        <div className="ad-stat-card">
          <p className="ad-stat-label">Monthly Recurring Revenue</p>
          <h3 className="ad-stat-value">₹42.5L</h3>
          <p className="ad-stat-positive">↑ +12% MoM</p>
        </div>

        <div className="ad-stat-card">
          <p className="ad-stat-label">Daily Active Users</p>
          <h3 className="ad-stat-value">2800</h3>
          <p className="ad-stat-positive">↑ +18% vs Last Month</p>
        </div>

        <div className="ad-stat-card">
          <p className="ad-stat-label">Churn Rate</p>
          <h3 className="ad-stat-value">2.1%</h3>
          <p className="ad-stat-negative">↑ 0.3 pp Movement</p>
        </div>

        <div className="ad-stat-card" style={{borderRight:0}}>
          <p className="ad-stat-label">LTV : CAC Ratio</p>
          <h3 className="ad-stat-value">3.8 : 1</h3>
          <p className="ad-stat-positive">✔ Above Target (3:1)</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="ad-chart-wrapper">


        {/* <div className="ad-chart-area"> */}
          {/* Placeholder Chart */}
          <HIndexChart data={chartData} />
        {/* </div> */}

        <div className="ad-chart-legend">
          <span className="ad-legend-item">
            <span className="ad-legend-box orange-box"></span>
            Monthly Active Users
          </span>

          <span className="ad-legend-item">
            <span className="ad-legend-box blue-box"></span>
            Daily Active Users
          </span>
        </div>
      </div>
      {/* ======= NEXT ANALYTICS SECTION ======= */}

<div className="ad2-wrapper-main">

  {/* LEFT CARD */}
  <div className="ad2-left-card">
    <p className="ad2-left-title">MRR Breakdown by Persona</p>
    <h2 className="ad2-left-total">842</h2>

    <div className="ad2-divider-line"></div>

    {/* Donut Chart */}
    <div className="ad2-donut-wrapper">
      <div className="ad2-donut-chart"></div>
    </div>

    {/* Legend */}
    <div className="ad2-legend-list">

      <div className="ad2-legend-row">
        <span className="ad2-legend-color color-pro"></span>
        <span>Researchers Pro</span>
        <span className="ad2-legend-value">₹28.0L (66%)</span>
      </div>

      <div className="ad2-legend-row">
        <span className="ad2-legend-color color-enterprise"></span>
        <span>Org Enterprise</span>
        <span className="ad2-legend-value">$12.0L (28%)</span>
      </div>

      <div className="ad2-legend-row">
        <span className="ad2-legend-color color-medical"></span>
        <span>Medical Premium</span>
        <span className="ad2-legend-value">₹2.5L (6%)</span>
      </div>

    </div>
  </div>

  {/* RIGHT CARD */}
  <div className="ad2-right-card">

    <div className="ad2-right-header">
      <h3>Lorem ipsum dolor sit amet</h3>
      <p>Inventore veritatis et quasi architecto beatae vita</p>
    </div>

    <div className="ad2-metrics-grid">

      <div className="ad2-metric-box">
        <p className="ad2-metric-label">New Researchers</p>
        <h4>27/day</h4>
        <span className="ad2-positive">↑ +25% vs last month</span>
      </div>

      <div className="ad2-metric-box">
        <p className="ad2-metric-label">Registration Conversion</p>
        <h4>87%</h4>
        <span className="ad2-positive">↑ +3%</span>
      </div>

      <div className="ad2-metric-box">
        <p className="ad2-metric-label">Premium Conversion</p>
        <h4>23%</h4>
        <span className="ad2-negative">↓ -5%</span>
      </div>

      <div className="ad2-metric-box">
        <p className="ad2-metric-label">Org Retention</p>
        <h4>94%</h4>
        <span className="ad2-positive">↑ +2%</span>
      </div>

      <div className="ad2-metric-box">
        <p className="ad2-metric-label">ARIS Adoption</p>
        <h4>78%</h4>
        <span className="ad2-positive">↑ +2%</span>
      </div>

      <div className="ad2-metric-box">
        <p className="ad2-metric-label">ORCID Connected</p>
        <h4>72%</h4>
        <span className="ad2-positive">↑ +12%</span>
      </div>

    </div>
  </div>

</div>


{/* ================= THIRD SECTION ================= */}
 <div className="dg-dashboard-wrapper">
      {/* LEFT CARD */}
      <div className="dg-card">
        <div className="dg-card-header">
          <h2 className="dg-title">Geographic Distribution</h2>
          <p className="dg-subtitle">Top performing states by user base</p>
        </div>

  <div className="dg-map-container">
  <div className="dg-map-wrapper">
    <Example />
  </div>
</div>


        <div className="dg-state-list">
          <div className="dg-state-card">
            <div className="dg-state-top">
              <span className="dg-rank">#1 Maharashtra</span>
              <span className="dg-users">847 Users</span>
            </div>
            <div className="dg-progress">
              <div className="dg-progress-fill" style={{ width: "90%" }}></div>
            </div>
          </div>

          <div className="dg-state-card">
            <div className="dg-state-top">
              <span className="dg-rank">#2 Karnataka</span>
              <span className="dg-users">665 Users</span>
            </div>
            <div className="dg-progress">
              <div className="dg-progress-fill" style={{ width: "75%" }}></div>
            </div>
          </div>

          <div className="dg-state-card">
            <div className="dg-state-top">
              <span className="dg-rank">#3 Delhi</span>
              <span className="dg-users">544 Users</span>
            </div>
            <div className="dg-progress">
              <div className="dg-progress-fill" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="dg-state-card">
            <div className="dg-state-top">
              <span className="dg-rank">#4 Tamil Nadu</span>
              <span className="dg-users">423 Users</span>
            </div>
            <div className="dg-progress">
              <div className="dg-progress-fill" style={{ width: "50%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="dg-card">
        <div className="dg-funnel-header">
          <div>
            <h2 className="dg-title">User Conversion Funnel</h2>
            <p className="dg-subtitle">User journey conversion metrics</p>
          </div>

          <div className="dg-badges">
            <span className="dg-badge-green">Elite</span>
            <span className="dg-badge-orange">92th Percentile</span>
          </div>
        </div>

        <div className="dg-metrics">
          <div>
            <p className="dg-metric-label">Overall Conversion</p>
            <h1 className="dg-green-text">21.7%</h1>
          </div>

          <div>
            <p className="dg-metric-label">Total Converted</p>
            <h1>184</h1>
          </div>
        </div>

        <div className="dg-funnel-wrapper">
          <FunnelStacked />

        </div>
      </div>
    </div>

<div className="ad3-wrapper-main">

  {/* CARD 1 */}
  <div className="ad3-card-box">
    <div className="ad3-card-header">
      <div className="ad3-icon purple-bg">👥</div>
      <div>
        <h4>Researchers</h4>
        <span className="ad3-growth green-text">↑ +12% MoM</span>
      </div>
    </div>

    <div className="ad3-divider"></div>

    <div className="ad3-row">
      <div>
        <p className="ad3-label">New Sign-ups / Day</p>
        <h3>27</h3>
      </div>

      <div>
        <p className="ad3-label">Registration Conversion</p>
        <h3 className="orange-text">87%</h3>
        <span className="ad3-subtext">Above target</span>
      </div>
    </div>

    <div className="ad3-progress-bar">
      <div className="ad3-progress-fill" style={{ width: "87%" }}></div>
    </div>

    <div className="ad3-average-pill">
      <span>Average Metric</span>
      <strong>ARIS 78</strong>
    </div>

    <div className="ad3-bottom-grid">
      <div>
        <p className="ad3-label">Field Distribution</p>
        <h4>34% <span>Medicine</span></h4>
      </div>
      <div>
        <p className="ad3-label">Retention Rate</p>
        <h4 className="orange-text">89%</h4>
      </div>
    </div>
  </div>


  {/* CARD 2 */}
  <div className="ad3-card-box">
    <div className="ad3-card-header">
      <div className="ad3-icon pink-bg">🩺</div>
      <div>
        <h4>Medical Professionals</h4>
        <span className="ad3-growth green-text">↑ +18% growth</span>
      </div>
    </div>

    <div className="ad3-divider"></div>

    <div className="ad3-row">
      <div>
        <p className="ad3-label">New Sign-ups / Day</p>
        <h3>8</h3>
      </div>

      <div>
        <p className="ad3-label">Registration Conversion</p>
        <h3 className="orange-text">91%</h3>
        <span className="ad3-subtext">Above target</span>
      </div>
    </div>

    <div className="ad3-progress-bar">
      <div className="ad3-progress-fill" style={{ width: "91%" }}></div>
    </div>

    <div className="ad3-average-pill">
      <span>Average Metric</span>
      <strong>Cardiology 22%</strong>
    </div>

    <div className="ad3-bottom-grid">
      <div>
        <p className="ad3-label">Field Distribution</p>
        <h4>34% <span>Apollo</span></h4>
      </div>
      <div>
        <p className="ad3-label">Retention Rate</p>
        <h4 className="orange-text">94%</h4>
      </div>
    </div>
  </div>


  {/* CARD 3 */}
  <div className="ad3-card-box">
    <div className="ad3-card-header">
      <div className="ad3-icon blue-bg">🏢</div>
      <div>
        <h4>Organisations</h4>
        <span className="ad3-growth green-text">↑ +32% Growth</span>
      </div>
    </div>

    <div className="ad3-divider"></div>

    <div className="ad3-row">
      <div>
        <p className="ad3-label">New Sign-ups / Month</p>
        <h3>12</h3>
      </div>

      <div>
        <p className="ad3-label">Registration Conversion</p>
        <h3 className="orange-text">68%</h3>
        <span className="ad3-subtext">Above target</span>
      </div>
    </div>

    <div className="ad3-progress-bar">
      <div className="ad3-progress-fill" style={{ width: "68%" }}></div>
    </div>

    <div className="ad3-average-pill">
      <span>Average Metric</span>
      <strong>Faculty 45</strong>
    </div>

    <div className="ad3-bottom-grid">
      <div>
        <p className="ad3-label">Field Distribution</p>
        <h4>40% <span>IITs</span></h4>
      </div>
      <div>
        <p className="ad3-label">Retention Rate</p>
        <h4 className="orange-text">96%</h4>
      </div>
    </div>
  </div>

</div>


{/* FOOTER NOTE */}
<div className="ad3-footer-note">
  Real-time analytics powered by Natioignite Intelligence Engine <br />
  Last updated: 16/2/2026, 8:05:46 PM IST
</div>

    </div>
    
    </main> </div></>
  );
}
