"use client";
import Image from 'next/image';
import { DashboardSidebar } from '../component/dashboardsidebar';
import { DashboardHeader } from '../component/DashboardHeader';
import './mstyle.css'
import { useState } from 'react';
export default function MonetizationPage() {
  interface Subscriber {
    name: string;
    id: string;
    plan: string;
    status: string;
    billing: string;
    ltv: string;
  }

  const [showManageModal, setShowManageModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showGrantAccess, setShowGrantAccess] = useState(false);
  const [accessDuration, setAccessDuration] = useState<"1m" | "3m" | "life">("1m");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOption, setCancelOption] = useState<"end" | "immediate">("end");

  return (
    <>      <div className="zui-admin-layout min-h-screen relative">
      <DashboardSidebar
        activePage="monetization"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="kryx-main-content flex-1 transition-all duration-300 ml-0 md:ml-[260px] bg-gray-50 w-full overflow-x-hidden"><DashboardHeader
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Monetization" },
        ]}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
        {/* Paste the full content section from previous response here */}




        <section className="admin-content" style={{ color: '#222530' }}>

          <div className="mz-header-bar">
            <div>
              <div className="mz-header-title">Monetization</div>
              <div className="mz-header-subtitle">Revenue Cockpit Dashboard Overview</div>
            </div>
            <div className="mz-header-actions">
              <button className="mz-btn">
                <div style={{ display: 'flex' }}>
                  <Image
                    src="/logos/export.png"
                    alt="Filter"
                    width={18}
                    height={18}
                    style={{ marginRight: '5px' }}
                  />
                  Export CSV</div></button>
              <button className="mz-btn">
                <div style={{ display: 'flex' }}>

                  <Image
                    src="/logos/set.png"
                    alt="Filter"
                    width={18}
                    height={18}
                    style={{ marginRight: '5px' }}

                  /> Billing Settings </div></button>
              <button className="mz-btn mz-btn-primary">+ Add Subscriber</button>
            </div>
          </div>

          <div className="mz-stats-grid" style={{ padding: '10px 32px' }}>
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
              <div className="mz-stat-value">2.4% <span className="mz-stat-highlight" style={{ color: '#E82222' }}>-0.3%</span></div>
              <div className="mz-stat-muted">Lowest in 6 Months</div>
            </div>

            <div className="mz-stat-card">
              <div className="mz-stat-label">Failed Payments</div>
              <div className="mz-stat-value">18 <span className="mz-stat-danger" style={{ color: '#FF7A00' }}>$3,240 at Risk</span></div>
              <div className="mz-stat-muted">4 Automatic Retries Pending</div>
            </div>
          </div>

          <div style={{ padding: '10px 32px' }}>
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
                  <tr className='bb'>
                    <td>
                      <div className="mz-user-cell">
                        <div className="mz-user-avatar"></div>
                        <div>
                          <div className='font-title'> Dianne Russell</div>
                          <div className='font-subtitle'> ID: SUB-4833</div></div>

                      </div>
                    </td>
                    <td><span className="mz-plan-badge mz-plan-researcher">Researcher Pro</span></td>
                    <td className="mz-status"><div className='active'>   <Image
                      src="/logos/TICK.png"
                      alt="Filter"
                      width={18}
                      height={18}
                      style={{ marginRight: '5px' }}

                    />Active</div></td>
                    <td className='ff1'>Monthly (Next: Oct 12)</td>
                    <td className='ff'>$1,450</td>
                    <td className="mz-action-link" onClick={() => {
                      setSelectedSubscriber({
                        name: 'Dianne Russell',
                        id: 'SUB-4833',
                        plan: 'Researcher Pro',
                        status: 'Active',
                        billing: 'Monthly (Next: Oct 12)',
                        ltv: '$1,450'
                      });
                      setShowManageModal(true);
                    }}>Manage</td>
                  </tr>
                  <tr className='bb'>
                    <td>
                      <div className="mz-user-cell">
                        <div className="mz-user-avatar"></div>
                        <div>
                          <div className='font-title'> Albert Flores</div>
                          <div className='font-subtitle'> ID: SUB-4835</div></div>


                      </div>
                    </td>
                    <td><span className="mz-plan-badge mz-plan-institution">Institution Gold</span></td>
                    <td className="mz-status"> <div className='active'>  <Image
                      src="/logos/clk.png"
                      alt="Filter"
                      width={18}
                      height={18}
                      style={{ marginRight: '5px' }}

                    />Past Due</div></td>
                    <td className='ff1'>Annual (Exp: Sept 01)</td>
                    <td className='ff'>$12,800</td>
                    <td className="mz-action-link" onClick={() => {
                      setSelectedSubscriber({
                        name: 'Dianne Russell',
                        id: 'SUB-4833',
                        plan: 'Researcher Pro',
                        status: 'Active',
                        billing: 'Monthly (Next: Oct 12)',
                        ltv: '$1,450'
                      });
                      setShowManageModal(true);
                    }}>Manage</td>
                  </tr>
                  <tr className='bb'>
                    <td>
                      <div className="mz-user-cell">
                        <div className="mz-user-avatar"></div>
                        <div>
                          <div className='font-title'> Albert Flores</div>
                          <div className='font-subtitle'> ID: SUB-4835</div></div>
                      </div>
                    </td>
                    <td><span className="mz-plan-badge mz-plan-researcher">Researcher Pro</span></td>
                    <td className="mz-status"><div className='active'>  <Image
                      src="/logos/TICK.png"
                      alt="Filter"
                      width={18}
                      height={18}
                      style={{ marginRight: '5px' }}

                    />Active</div></td>
                    <td className='ff1'>Monthly (Next: Oct 12)</td>
                    <td className='ff'>$1,450</td>
                    <td className="mz-action-link" onClick={() => {
                      setSelectedSubscriber({
                        name: 'Dianne Russell',
                        id: 'SUB-4833',
                        plan: 'Researcher Pro',
                        status: 'Active',
                        billing: 'Monthly (Next: Oct 12)',
                        ltv: '$1,450'
                      });
                      setShowManageModal(true);
                    }}>Manage</td>
                  </tr>
                  <tr className='bb'>
                    <td>
                      <div className="mz-user-cell">
                        <div className="mz-user-avatar"></div>
                        <div>
                          <div className='font-title'> Albert Flores</div>
                          <div className='font-subtitle'> ID: SUB-4835</div></div>
                      </div>
                    </td>
                    <td><span className="mz-plan-badge mz-plan-researcher">Researcher Pro</span></td>
                    <td className="mz-status"> <div className='active'>  <Image
                      src="/logos/TICK.png"
                      alt="Filter"
                      width={18}
                      height={18}
                      style={{ marginRight: '5px' }}

                    />Active</div></td>
                    <td className='ff1'>Monthly (Next: Oct 12)</td>
                    <td className='ff'>$1,450</td>
                    <td className="mz-action-link" onClick={() => {
                      setSelectedSubscriber({
                        name: 'Dianne Russell',
                        id: 'SUB-4833',
                        plan: 'Researcher Pro',
                        status: 'Active',
                        billing: 'Monthly (Next: Oct 12)',
                        ltv: '$1,450'
                      });
                      setShowManageModal(true);
                    }}>Manage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ padding: '24px 32px', marginTop: '10px' }}>

            <div className="mz-section-card" style={{ padding: '10px 32px' }} >
              <div className="mz-section-title">Revenue Recovery Funnel</div>
              <div className="mz-funnel-grid">
                <div style={{ borderRight: '1px solid #D0DCE7' }}>
                  <div className="mz-funnel-label">Failed</div>
                  <div className="mz-funnel-value">18</div>
                  <div className="mz-stat-muted">Payment Unsuccessful</div>
                </div>
                <div style={{ borderRight: '1px solid #D0DCE7' }}>
                  <div className="mz-funnel-label">Retrying</div>
                  <div className="mz-funnel-value">12</div>
                  <div className="mz-stat-muted" style={{ color: '#0048E9' }}>Auto-recovery active</div>
                </div>
                <div style={{ borderRight: '1px solid #D0DCE7' }}>
                  <div className="mz-funnel-label">Outreach</div>
                  <div className="mz-funnel-value">4</div>
                  <div className="mz-stat-muted" style={{ color: '#FF7A00' }}>Email Sequence Sent</div>
                </div>
                <div style={{ borderRight: '1px solid #D0DCE7' }}>
                  <div className="mz-funnel-label">Recovered</div>
                  <div className="mz-funnel-value mz-funnel-success" style={{ color: '#1FC16B' }}>142</div>
                  <div className="mz-stat-muted" style={{ color: '#1FC16B' }}>This Month</div>
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
      {showManageModal && (
        <>
          <div className="overlay"></div>

          <div className="drawer">
            <div className="drawer-header">
              <span>Manage Subscriber</span>
              <button className="mz-modal-close" onClick={() => setShowManageModal(false)}>×</button>
            </div>

            <div className="subscriber-box">
              <div className="avatar"></div>
              <div className="subscriber-info">
                <div className="name">Dianne Russell</div>
                <div className="id">ID: SUB-4833</div>
              </div>
              <span className="due-badge">⚠ Past Due : 3 Days</span>
            </div>

            <div className="section">
              <div className="section-title">Subscription Summary</div>

              <div className="row">
                <span>Plan</span>
                <strong>Institution Gold</strong>
              </div>

              <div className="row">
                <span>Billing</span>
                <strong>₹8,999 / Yearly</strong>
              </div>

              <div className="row">
                <span>Next Billing Date</span>
                <strong>Mar 14, 2016</strong>
              </div>

              <div className="row">
                <span>Lifetime Value</span>
                <strong>₹85,000</strong>
              </div>

              <div className="row">
                <span>Payment Method</span>
                <strong>Visa **** 4242</strong>
              </div>
            </div>

            <div className="actions">
              <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <button className="btn primary" style={{ padding: '10px 15px' }} onClick={() => setShowManualPayment(true)}
                >Record Manual Payment</button>
                <button className="btn secondary" style={{ padding: '10px 15px' }} onClick={() => setShowGrantAccess(true)}
                >Grant Access (Free Time)</button></div>
              <button className="btn cancel" onClick={() => setShowCancelModal(true)}
              >Cancel Subscription</button>
            </div>

            <div className="section">
              <div className="stitle">Activity Log</div>

              <div className="timeline">
                <div className="event">
                  <span className="dot"></span>
                  <div>
                    <strong className='meo'>Payment Failed</strong>
                    <div className="meta">Feb 10, 2026 · 10:45 AM</div>
                    <div className="meta">Automatic retry scheduled for Feb 13</div>
                  </div>
                </div>

                <div className="event">
                  <span className="dot"></span>
                  <div>
                    <strong className='meo'>Dunning Email Sent</strong>
                    <div className="meta">Feb 11, 2026 · 09:00 AM</div>
                  </div>
                </div>

                <div className="event">
                  <span className="dot"></span>
                  <div>
                    <strong className='meo'>Admin Viewed Subscription</strong>
                    <div className="meta">Today · 02:14 PM</div>
                    <div className="meta">By User: Admin_Sarah</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showManualPayment && (
        <>
          <div className="overlay" onClick={() => setShowManualPayment(false)} />

          <div className="payment-modal">
            {/* Header */}
            <div className="payment-header">
              <div>
                <div className="title">Record Manual Payment</div>
                <div className="subtitle">Dianne Russell | ID: SUB-4833</div>
              </div>
              <button
                className="mz-modal-close"
                onClick={() => setShowManualPayment(false)}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="payment-body">
              <div className="field">
                <label>Amount</label>
                <input type="text" value="₹8,999" />
              </div>

              <div className="field">
                <label>Payment Date</label>
                <input type="date" value="2026-10-27" />
              </div>

              <div className="field">
                <label>Payment Method</label>
                <select>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Cash</option>
                </select>
              </div>

              <div className="field">
                <label>Reference ID</label>
                <input placeholder="e.g. TXN12345678" />
              </div>

              <div className="field">
                <label>Internal Note</label>
                <textarea placeholder="Add details for internal records..." />
              </div>
            </div>

            {/* Footer */}
            <div className="payment-footer">
              <button className="btn secondary">Cancel</button>
              <button className="btn primary">Confirm Payment</button>
            </div>
          </div>
        </>
      )}
      {showGrantAccess && (
        <>
          <div className="overlay" onClick={() => setShowGrantAccess(false)} />

          <div className="grant-modal">
            {/* Header */}
            <div className="grant-header">
              <div>
                <div className="title">Grant Access</div>
                <div className="subtitle">
                  Dianne Russell | ID: SUB-4833
                </div>
              </div>
              <button
                className="mz-modal-close"
                onClick={() => setShowGrantAccess(false)}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="grant-body">
              {/* Duration */}
              <div className="field">
                <label>Access Duration</label>

                <div className="duration-tabs">
                  <button
                    className={`tab ${accessDuration === "1m" ? "active" : ""}`}
                    onClick={() => setAccessDuration("1m")}
                  >
                    1 Month
                  </button>

                  <button
                    className={`tab ${accessDuration === "3m" ? "active" : ""}`}
                    onClick={() => setAccessDuration("3m")}
                  >
                    3 Month
                  </button>

                  <button
                    className={`tab ${accessDuration === "life" ? "active" : ""}`}
                    onClick={() => setAccessDuration("life")}
                  >
                    Lifetime
                  </button>
                </div>
              </div>


              {/* Reason */}
              <div className="field">
                <label>Reason For Access</label>
                <select>
                  <option>Customer Support Recovery</option>
                  <option>Promotional Access</option>
                  <option>Retention</option>
                </select>
              </div>

              {/* Note */}
              <div className="field">
                <label>Internal Note</label>
                <textarea placeholder="Add details for internal records..." />
              </div>

              {/* Info Box */}
              <div className="info-box">
                <span className="info-icon">ℹ</span>
                Granting access will not trigger billing or send an automated
                invoice to the user.
              </div>
            </div>

            {/* Footer */}
            <div className="grant-footer">
              <button className="btn secondary">Cancel</button>
              <button className="btn primary">Grant Access</button>
            </div>
          </div>
        </>
      )}
      {showCancelModal && (
        <>
          <div className="overlay" onClick={() => setShowCancelModal(false)} />

          <div className="cancel-modal">
            {/* Header */}
            <div className="cancel-header">
              <div>
                <div className="title">Cancel Subscription</div>
                <div className="subtitle">
                  Dianne Russell | ID: SUB-4833
                </div>
              </div>

              <button
                className="mz-modal-close"
                onClick={() => setShowCancelModal(false)}
              >
                ×
              </button>
            </div>

            {/* Warning */}
            <div className="warning-box">
              <strong>⚠ Warning: Service Interruption</strong>
              <p>
                Canceling your subscription will result in the loss of access to
                all premium features and data exports.
              </p>
            </div>

            {/* Options */}
            <div className="cancel-options">
              <label className="option">
                <input
                  type="radio"
                  checked={cancelOption === "end"}
                  onChange={() => setCancelOption("end")}
                />
                <div>
                  <strong>Cancel at end of billing period (Recommended)</strong>
                  <p>
                    You will keep access to features until your current cycle
                    ends on Oct 24, 2023.
                  </p>
                </div>
              </label>

              <label className="option">
                <input
                  type="radio"
                  checked={cancelOption === "immediate"}
                  onChange={() => setCancelOption("immediate")}
                />
                <div>
                  <strong>Cancel Immediately</strong>
                  <p>
                    Access will be revoked immediately and no pro-rated refund
                    is provided.
                  </p>
                </div>
              </label>
            </div>

            {/* Footer */}
            <div className="cancel-footer">
              <button
                className="btn secondary"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Subscription
              </button>

              <button className="btn danger">
                Confirm Cancellation
              </button>
            </div>
          </div>
        </>
      )}


    </>
  );
}
