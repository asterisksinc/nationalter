"use client";
import Image from 'next/image';
import { DashboardSidebar } from '../component/dashboardsidebar';
import { DashboardHeader } from '../component/DashboardHeader';
import './mstyle.css'
export default function MonetizationPage() {
  return (
    <div className="zui-admin-layout min-h-screen">
      <DashboardSidebar activePage="monetization" />
      <main className="kryx-main-content flex-1 ml-[260px] min-w-[1000px] bg-gray-50">
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Monetization" },
          ]}
        />
        {/* Paste the full content section from previous response here */}


 

        <section className="admin-content" style={{color:'#222530'}}>

    <div className="mz-header-bar">
      <div>
        <div className="mz-header-title">Monetization</div>
        <div className="mz-header-subtitle">Revenue Cockpit Dashboard Overview</div>
      </div>
      <div className="mz-header-actions">
        <button className="mz-btn">
            <div style={{display:'flex'}}>
          <Image
                         src="/logos/export.png"
                         alt="Filter"
                         width={18}
                         height={18}
                         style={{marginRight:'5px'}}
                       />   
            Export CSV</div></button>
        <button className="mz-btn">
                        <div style={{display:'flex'}}>

                <Image
                         src="/logos/set.png"
                         alt="Filter"
                         width={18}
                         height={18}
                                                  style={{marginRight:'5px'}}

                       /> Billing Settings </div></button>
        <button className="mz-btn mz-btn-primary">+ Add Subscriber</button>
      </div>
    </div>

    <div className="mz-stats-grid" style={{padding:'10px 32px'}}>
      <div className="mz-stat-card">
        <div className="mz-stat-label">MRR</div>
        <div className="mz-stat-value">$124,500 <span className="mz-stat-highlight">+5.2%</span></div>
        <div className="mz-stat-muted">vs Last Month ($118K)</div>
      </div>

      <div className="mz-stat-card">
        <div className="mz-stat-label">Active Subscribers</div>
        <div className="mz-stat-value">1,240 <span className="mz-stat-muted">980 Ind / 260 Inst</span></div>
        <div className="mz-progress-track">
          <div className="mz-progress-fill"></div>
        </div>
      </div>

      <div className="mz-stat-card">
        <div className="mz-stat-label">Churn Rate</div>
        <div className="mz-stat-value">2.4% <span className="mz-stat-highlight">-0.3%</span></div>
        <div className="mz-stat-muted">Lowest in 6 Months</div>
      </div>

      <div className="mz-stat-card">
        <div className="mz-stat-label">Failed Payments</div>
        <div className="mz-stat-value">18 <span className="mz-stat-danger">$3,240 at Risk</span></div>
        <div className="mz-stat-muted">4 Automatic Retries Pending</div>
      </div>
    </div>

<div style={{padding:'10px 32px'}}>
    <div className="mz-section-card" >
      <div className="mz-section-title">Subscribers</div>
      <table className="mz-table">
        <thead className="mz-table-head">
          <tr>
            <th>Subscribers Name</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Billing Cycle</th>
            <th>LTV</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="mz-user-cell">
                <div className="mz-user-avatar"></div>
                Dianne Russell
              </div>
            </td>
            <td><span className="mz-plan-badge mz-plan-researcher">Researcher Pro</span></td>
            <td className="mz-status"><span className="mz-status-dot"></span>Active</td>
            <td>Monthly (Next: Oct 12)</td>
            <td>$1,450</td>
            <td className="mz-action-link">Manage</td>
          </tr>
          <tr>
            <td>
              <div className="mz-user-cell">
                <div className="mz-user-avatar"></div>
                Albert Flores
              </div>
            </td>
            <td><span className="mz-plan-badge mz-plan-institution">Institution Gold</span></td>
            <td className="mz-status"><span className="mz-status-dot mz-status-dot-warning"></span>Past Due</td>
            <td>Annual (Exp: Sept 01)</td>
            <td>$12,800</td>
            <td className="mz-action-link">Manage</td>
          </tr>
           <tr>
            <td>
              <div className="mz-user-cell">
                <div className="mz-user-avatar"></div>
                Dianne Russell
              </div>
            </td>
            <td><span className="mz-plan-badge mz-plan-researcher">Researcher Pro</span></td>
            <td className="mz-status"><span className="mz-status-dot"></span>Active</td>
            <td>Monthly (Next: Oct 12)</td>
            <td>$1,450</td>
            <td className="mz-action-link">Manage</td>
          </tr>
           <tr>
            <td>
              <div className="mz-user-cell">
                <div className="mz-user-avatar"></div>
                Dianne Russell
              </div>
            </td>
            <td><span className="mz-plan-badge mz-plan-researcher">Researcher Pro</span></td>
            <td className="mz-status"><span className="mz-status-dot"></span>Active</td>
            <td>Monthly (Next: Oct 12)</td>
            <td>$1,450</td>
            <td className="mz-action-link">Manage</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
<div style={{padding:'10px 32px'}}>

    <div className="mz-section-card" style={{padding:'10px 32px'}} >
      <div className="mz-section-title">Revenue Recovery Funnel</div>
      <div className="mz-funnel-grid">
        <div>
          <div className="mz-funnel-label">Failed</div>
          <div className="mz-funnel-value">18</div>
          <div className="mz-stat-muted">Payment Unsuccessful</div>
        </div>
        <div>
          <div className="mz-funnel-label">Retrying</div>
          <div className="mz-funnel-value">12</div>
          <div className="mz-stat-muted">Auto-recovery active</div>
        </div>
        <div>
          <div className="mz-funnel-label">Outreach</div>
          <div className="mz-funnel-value">4</div>
          <div className="mz-stat-muted">Email Sequence Sent</div>
        </div>
        <div>
          <div className="mz-funnel-label">Recovered</div>
          <div className="mz-funnel-value mz-funnel-success">142</div>
          <div className="mz-stat-muted">This Month</div>
        </div>
        <div>
          <div className="mz-funnel-label">Lost</div>
          <div className="mz-funnel-value">2</div>
          <div className="mz-stat-muted">Churned from Dunning</div>
        </div>
      </div>
    </div>
    </div>

  </section>



      </main>
    </div>
  );
}
