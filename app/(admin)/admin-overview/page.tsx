// app/page.tsx
'use client';  // ← This line is already there
import Image from 'next/image';
import './adminstyle.css';
import { useState } from 'react';
import { DashboardSidebar } from './component/dashboardsidebar';
import { DashboardHeader } from './component/DashboardHeader';
const menuItems = [
  { label: 'Dashboard', icon: 'one', key: 'dashboard' },
  { label: 'User Management', icon: '2', key: 'users' },
  { label: 'Analytics', icon: '3', key: 'analytics' },
  { label: 'Monetization', icon: '4', key: 'monetization' },
  { label: 'Compliance', icon: '5', key: 'compliance' },
];
const users = [
  { name: 'Danielle Rose', email: 'danielle@example.com', status: 'Active', plan: 'Enterprise', lastActive: '2 min ago' },
  { name: 'Albert Henry', email: 'albert@example.com', status: 'Inactive', plan: 'Basic', lastActive: '1 week ago' },
  { name: 'Brooke Sims', email: 'brooke@example.com', status: 'Active', plan: 'Enterprise', lastActive: '5 hours ago' },
  { name: 'Janie Willis', email: 'janie@example.com', status: 'Inactive', plan: 'Basic', lastActive: '7 hours ago' },
  { name: 'Eduardo Perez', email: 'eduardo@example.com', status: 'Active', plan: 'Enterprise', lastActive: '8 hours ago' },
  { name: 'Tessa Norris', email: 'tessa@example.com', status: 'Inactive', plan: 'Basic', lastActive: '2 days ago' },
  { name: 'Martin Murphy', email: 'martin@example.com', status: 'Active', plan: 'Enterprise', lastActive: '2 weeks ago' },
];
export default function HomePage() {
    const [activePage, setActivePage] = useState('dashboard');
  return (
    <div className="admin-layout">
      {/* Sidebar */}
         <DashboardSidebar activePage="overview" />
   

      {/* Main content */}
      <main className="flex-1 ml-[260px] p-8 min-w-[1000px]" style={{paddingLeft:'0px',paddingTop:'0px', paddingRight:'0px'}}>
        {/* Top bar */}
      <DashboardHeader
               breadcrumbItems={[
                 { label: "Home", href: "/" },
                 { label: "Dashboard" },
               ]}
             />

        {/* Content area */}
   <section className="admin-content" >
     {activePage === 'dashboard' && (
            <>
  {/* Breadcrumb + title row */}
  <div className="content-header">
    <div>
   <h3 className='main-ct'>Command Center</h3>
      <p className="breadcrumb-current sub-ct">Real-time visibility into the NationCite data ecosystem. Monitor entity status and system health.</p>
      </div>
<div className="content-header-right">
  <div className='frxd'>
    <div className="system-pill">
      <span className='dot'></span> SYSTEM ONLINE
    </div>
    <div className="last-sync">Last synced: Oct 24, 2023 · 14:02 UTC</div>
  </div>
  <button className="primary-btn" aria-label="Upload new dataset" style={{borderRadius:'6px'}}>
    <Image
      src="/logos/upload.png"
      alt="Upload icon"
      width={20}
      height={20}
      priority
    />
    Upload New Dataset
  </button>
</div>

  </div>

  {/* Command center summary cards */}
<div className="cards-row" style={{paddingLeft:'32px', paddingRight:'32px'}}>
                <div className="summary-card summary-card-compact">
                  <div className="card-top-section">
                    <div className="left-section">
                      <Image
                        src="/logos/R1.png"
                        alt="Researchers icon"
                        width={55}
                        height={55}
                        style={{borderRadius:'6px'}}
                        priority
                      />

                      <div className="title-value-column">
                        <div className="card-title">Researchers</div>
                        <div className="card-main-value">45,000</div>
                      </div>
                    </div>

                   <div style={{ display: 'flex' }}>
                      <div className="status-badge">
                        <span className="status-dot"></span>
                        Live
                      </div>
                      <div style={{ marginLeft: '17px', marginTop: '7px' }}>
                        <Image
                          src="/arrow.png"
                          alt="Researchers icon"
                          width={13}
                          height={13}
                          priority
                        /></div></div>
                  </div>
                  <div className='line'></div>
                  <div className="card-meta-row meow" style={{ marginTop: '30px' }}>
                    <span className="meta-label">Last update</span>
                    <span className="meta-value">Today, 09:58 AM</span>
                  </div>

                  <div className="card-meta-row">
                    <span className="meta-label">Source</span>
                    <span className="meta-value">researchers_v4_2025.csv</span>
                  </div>
                </div>

   <div className="summary-card summary-card-compact">
                  <div className="card-top-section">
                    <div className="left-section">
                      <Image
                        src="/logos/M.png"
                        alt="Researchers icon"
                        width={55}
                        height={55}
                        priority
                      style={{borderRadius:'6px'}}

                      />

                      <div className="title-value-column">
                        <div className="card-title">Universities</div>
                        <div className="card-main-value">850</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div className="status-badge">
                        <span className="status-dot"></span>
                        Live
                      </div>
                      <div style={{ marginLeft: '17px', marginTop: '7px' }}>
                        <Image
                          src="/arrow.png"
                          alt="Researchers icon"
                          width={13}
                          height={13}
                          priority
                        /></div></div>
                  </div>
                  <div className='line'></div>
                  <div className="card-meta-row meow" style={{ marginTop: '30px' }}>
                    <span className="meta-label">Last update</span>
                    <span className="meta-value">Yesterday, 11:42 PM</span>
                  </div>

                  <div className="card-meta-row">
                    <span className="meta-label">Source</span>
                    <span className="meta-value">institutions_rankings_q2.csv</span>
                  </div>
                </div>
   <div className="summary-card summary-card-compact">
                  <div className="card-top-section">
                    <div className="left-section">
                      <Image
                        src="/logos/U.png"
                        alt="Researchers icon"
                        width={55}
                        height={55}
                        priority
                        style={{borderRadius:'6px'}}

                      />

                      <div className="title-value-column">
                        <div className="card-title">Medical Pros</div>
                        <div className="card-main-value">12,050</div>
                      </div>
                    </div>

                   
                    <div style={{ display: 'flex' }}>
                      <div className="status-badge1">
                      <span className="dot1"></span>
                      Pending
                    </div>
                      <div style={{ marginLeft: '17px', marginTop: '7px' }}>
                        <Image
                          src="/arrow.png"
                          alt="Researchers icon"
                          width={13}
                          height={13}
                          priority
                        /></div></div>
                  </div>
                  <div className='line'></div>
                  <div className="card-meta-row meow" style={{ marginTop: '30px' }}>
                    <span className="meta-label">Last update</span>
                    <span className="meta-value">Draft saved</span>
                  </div>

                  <div className="card-meta-row">
                    <span className="meta-label" style={{color:'#FF7A00'}}>Awaiting publish approval</span>
                    <span className="meta-value"></span>
                  </div>
                </div>
</div>


  {/* Ecosystem metrics row */}
  <div className='fle' style={{paddingLeft:'32px', paddingRight:'32px'}}>
            <div className="panel-title">Ecosystem Metrics</div>
            <div className="panel-title1">View All Reports</div>
</div>
 <div className="cards-row1" style={{paddingLeft:'32px', paddingRight:'32px'}}>
  {/* Left card */}
  <div className="panel-card">
    <div className="panel-header">
      <div className="panel-header-left">
        <div className="panel-subtitle">Total Records</div>
      </div>
      <div className="system-pill">
        <span className="panel-badge">↑ 2.1%</span>
      </div>
    </div>
<div>
    <div className="panel-value">14.5M</div></div>

    <div className="fake-bar-chart">
      <div className="bar bar-1" />
      <div className="bar bar-2" />
      <div className="bar bar-3" />
      <div className="bar bar-4" />
      <div className="bar bar-5" />
      <div className="bar bar-6" />
      <div className="bar bar-7" />

    </div>

    <div className="panel-footer">Data Growth Over Last 7 Days</div>
  </div>

  {/* Right card */}
  <div className="panel-card">
    <div className="panel-header">
      <div>
        <div className="panel-subtitle">Active Subscribers</div>
      </div>
      <div className="panel-header-right">
        <span className="system-pill">↑ 2.1%</span>
      </div>
    </div>

    <div className="panel-value">842</div>

    <div className="donut-row">
      <div className="fake-donut" />
      <div className="donut-legend">
        <div className="legend-item">
          <div className="legend-left">
            <span className="legend-dot legend-orange" />
           <span className='ms-2'> Enterprise</span>
          </div>
          <span className="legend-count">280</span>
        </div>
        <div className="legend-item">
          <div className="legend-left">
            <span className="legend-dot legend-gold" />
          <span className='ms-2'>  Standard</span>
          </div>
          <span className="legend-count">280</span>
        </div>
        <div className="legend-item">
          <div className="legend-left">
            <span className="legend-dot legend-yellow" />
           <span className='ms-2'> Free</span>
          </div>
          <span className="legend-count">290</span>
        </div>
      </div>
    </div>
  </div>
</div>


  {/* Bottom row: alerts + activity + right metrics */}
  <div className="cards-row cards-row--stretch" style={{paddingLeft:'32px', paddingRight:'32px'}}>
    {/* System alerts */}
    <div className="panel-card">
      <div className="panel-header3">
        <div className="panel-title">System Alerts</div>
        <span className="chip chip-soft-orange">3 Active</span>
      </div>
      <div className="alert-list">
        <div className="alert-item">
          <span className="chip chip-critical">CRITICAL</span>
          <div className="fgg"> <div className="alert-text">API Latency Spike (EU-West)</div>
          <div className="alert-meta">2m ago</div></div>
         
        </div>
        <div className="alert-item">
          <span className="chip chip-warning">WARNING</span>
           <div className="fgg">
          <div className="alert-text">Data Sync Delayed: Universities</div>
          <div className="alert-meta">45m ago</div></div>
        </div>
        <div className="alert-item">
          <span className="chip chip-info">INFO</span>
          <div className="fgg"><div className="alert-text">Scheduled Maintenance: Tomorrow</div>
          <div className="alert-meta">2h ago</div></div>
        </div>
      </div>
    </div>

    {/* Recent admin activity */}
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
        {/* add more li items as needed */}
      </ul>
    </div>

    {/* Right column – two stacked cards */}
   <div className="metrics-column">
  {/* Data Processing */}
  <div className="metric-card">
    <div className="metric-header">
        
      <div className="metric-icon purple-icon">   <Image
                        src="/logos/db.png"
                        alt="Researchers icon"
                        width={24}
                        height={24}
                        priority
                      /></div>
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

  {/* Search Usage */}
  <div className="metric-card">
    <div className="metric-header">
      <div className="metric-icon violet-icon"> <Image
                        src="/logos/s.png"
                        alt="Researchers icon"
                        width={24}
                        height={24}
                        priority
                      /></div>
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
  </>     )}
  {activePage === 'users' && (
            <>
              <div className="content-header">
                <div>
                  <h3>User Management</h3>
                  <p>Manage users, monitor activity, and control access across the platform.</p>
                </div>
                <div className="content-header-right">
                  <button className="primary-btn">Export Users</button>
                </div>
              </div>

              {/* Search and filters */}
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

              {/* Users table */}
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
