"use client";
import Image from 'next/image';
import { DashboardSidebar } from '../component/dashboardsidebar';
import { DashboardHeader } from '../component/DashboardHeader';
import './ticket.css'
import { useState } from 'react';
export default function TicketPage() {
  interface Subscriber {
    name: string;
    id: string;
    plan: string;
    status: string;
    billing: string;
    ltv: string;
  }

  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showGrantAccess, setShowGrantAccess] = useState(false);
  const [accessDuration, setAccessDuration] = useState<"1m" | "3m" | "life">("1m");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOption, setCancelOption] = useState<"end" | "immediate">("end");

  return (
    <>      <div className="zui-admin-layout min-h-screen">
      <DashboardSidebar activePage="tickets" />
      <main className="kryx-main-content flex-1 ml-[260px] min-w-[1000px] bg-gray-50"><DashboardHeader
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Tickets" },
        ]}
      />
        {/* Paste the full content section from previous response here */}




        <section className="admin-content" style={{ color: '#222530' }}>

          <div className="mz-header-bar">
            <div>
              <div className="mz-header-title">Tickets</div>
              <div className="mz-header-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            </div>
            {/* <div className="mz-header-actions">
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
            </div> */}
          </div>

          <div className="mz-stats-grid" style={{ padding: '10px 32px' }}>
            <div className="mz-stat-card">
              <div className="mz-stat-label">Tickets Today</div>
              <div className="mz-stat-value">342<span className="mz-stat-highlight"></span></div>
              <div className="mz-stat-muted"><span style={{ color: '#0BAC40' }}>5%</span> vs Last Month</div>
            </div>
            <div className="mz-stat-card">
              <div className="mz-stat-label">Resolved Today</div>
              <div className="mz-stat-value">342<span className="mz-stat-highlight"></span></div>
              <div className="mz-stat-muted"><span style={{ color: '#E82222' }}>-2%</span> vs Last Month</div>
            </div>
            <div className="mz-stat-card">
              <div className="mz-stat-label">SLA Compliance</div>
              <div className="mz-stat-value">96.2%<span className="mz-stat-highlight"></span></div>
              <div className="mz-stat-muted"><span style={{ color: '#0BAC40' }}>+0.5%</span> vs Last Month</div>
            </div>
            <div className="mz-stat-card">
              <div className="mz-stat-label">Avg. Resolution Time</div>
              <div className="mz-stat-value">18m<span className="mz-stat-highlight"></span></div>
              <div className="mz-stat-muted"><span style={{ color: '#E82222' }}>-1m</span> vs Last Month</div>
            </div>
            <div className="mz-stat-card">
              <div className="mz-stat-label">Overdue Tickets</div>
              <div className="mz-stat-value" style={{ color: '#E82222' }}>9<span className="mz-stat-highlight"></span></div>
              <div className="mz-stat-muted"><span style={{ color: '#E82222' }}>+2 Since 1h</span> </div>
            </div>
          </div>

          <div style={{ padding: '10px 32px' }}>
            <div className="mz-section-card" >
              <div className="mz-section-title">Priority Tickets <span className="mz-plan-badge mz-plan-researcher" style={{ color: '#E82222', backgroundColor: '#E822221A' }}>4 Action Required</span></div>
              <div className="users-filters" >
                <input
                  type="text"
                  placeholder="Search by tickets"
                  className="users-search"
                />
                <button className="filter-btn">
                  <Image
                    src="/logos/filter.png"
                    alt="Filter"
                    width={18}
                    height={18}
                  />
                  <span>Filter</span>
                </button>
                <button className="filter-btn">
                  <Image
                    src="/logos/export.png"
                    alt="Filter"
                    width={18}
                    height={18}
                  />
                  <span>Export Users</span>
                </button>
              </div>
              <table className="mz-table">
                <thead className="mz-table-head">
                  <tr>
                    <th>Ticket ID</th>
                    <th>Plan</th>
                    <th>SLA Countdown</th>
                    <th>Urgency</th>

                  </tr>
                </thead>
                <tbody>
                  <tr className='bb'>
                    <td>

                      <div className='font-title'> #TK-1024</div>

                    </td>
                    <td> <div className='font-title'> Server Downtime - Faculty Portal</div>
                      <div className='font-subtitle'>IT Infrastructure . Faculty User</div>
                    </td>
                    <td ><div className='active' style={{ color: '#E82222' }}>   <Image
                      src="/logos/rtime.svg"
                      alt="Filter"
                      width={18}
                      height={18}
                      style={{ marginRight: '5px' }}

                    />00:15:22</div></td>
                    <td className='ff1'><span className="mz-plan-badge mz-plan-researcher" style={{ color: '#E82222', backgroundColor: '#E822221A' }}>Critical</span></td>

                  </tr>
                  <tr className='bb'>
                    <td>

                      <div className='font-title'> #TK-1028</div>

                    </td>
                    <td> <div className='font-title'> Server Downtime - Faculty Portal</div>
                      <div className='font-subtitle'>IT Infrastructure . Faculty User</div>
                    </td>
                    <td><div className='active' style={{ color: '#FF7A00' }}>   <Image
                      src="/logos/otime.svg"
                      alt="Filter"
                      width={18}
                      height={18}
                      style={{ marginRight: '5px' }}

                    />00:48:10</div></td>
                    <td className='ff1'><span className="mz-plan-badge mz-plan-researcher" style={{ color: '#FF7A00', backgroundColor: '#FF7A001A' }}>High</span></td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            <div style={{ padding: '10px 32px' }}>
            <div className="mz-section-card" >
              <div className="mz-section-title">Standard Queue</div>
              <div className="users-filters" >
                <input
                  type="text"
                  placeholder="Search by tickets"
                  className="users-search"
                />
                <button className="filter-btn">
                  <Image
                    src="/logos/filter.png"
                    alt="Filter"
                    width={18}
                    height={18}
                  />
                  <span>Filter</span>
                </button>
                <button className="filter-btn">
                  <Image
                    src="/logos/export.png"
                    alt="Filter"
                    width={18}
                    height={18}
                  />
                  <span>Export Users</span>
                </button>
              </div>
              <table className="mz-table">
                <thead className="mz-table-head">
                  <tr>
                    <th>Requester</th>
                    <th>Subject & Category</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  <tr className='bb'>
                        <td className="user-cell" style={{display:'flex'}}>
                                          <Image
                                            src="/logos/user.png"
                                            alt="user"
                                            width={36}
                                            height={36}
                                            className="user-avatar mr-2"
                                          />
                                          <div>
                                          <div className="user-name">Jane Smith</div>
                                                                <div className='font-subtitle'>Student . Registrar</div>
</div>
                                        </td>
                    <td> <div className='font-title'> Transcript Request Error</div>
                      <div className='font-subtitle'>Administrative Services</div>
                    </td>
                     <td> 
                      <div className='font-subtitle'>2 Hours Ago</div>
                    </td>
                    <td className='ff1'><span className="mz-plan-badge mz-plan-researcher" style={{ color: '#0048E9', backgroundColor: '#0048E91A' }}>In Progress</span></td>


                    <td ><div>
                      <button>  <Image
                                            src="/logos/resetb.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar mr-2"
                                          /></button>
                                            <button>  <Image
                                            src="/logos/gt.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar mr-2"
                                          /></button>
                                            <button>  <Image
                                            src="/logos/more.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar "
                                          /></button></div></td>
                  </tr>
                     <tr className='bb'>
                        <td className="user-cell" style={{display:'flex'}}>
                                          <Image
                                            src="/logos/user.png"
                                            alt="user"
                                            width={36}
                                            height={36}
                                            className="user-avatar mr-2"
                                          />
                                          <div>
                                          <div className="user-name">Robert Wilson</div>
                                                                <div className='font-subtitle'>Staff . Admissions</div>
</div>
                                        </td>
                    <td> <div className='font-title'> Office 365 License Renewal</div>
                      <div className='font-subtitle'>Software Licensing</div>
                    </td>
                     <td> 
                      <div className='font-subtitle'>5 Hours Ago</div>
                    </td>
                    <td className='ff1'><span className="mz-plan-badge mz-plan-researcher" style={{ color: '#525866', backgroundColor: '#5258661A' }}>Pending Info</span></td>

                    <td ><div>
                      <button>  <Image
                                            src="/logos/resetb.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar mr-2"
                                          /></button>
                                            <button>  <Image
                                            src="/logos/gt.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar mr-2"
                                          /></button>
                                            <button>  <Image
                                            src="/logos/more.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar"
                                          /></button></div></td>

                  </tr>
                      <tr className='bb'>
                        <td className="user-cell" style={{display:'flex'}}>
                                          <Image
                                            src="/logos/user.png"
                                            alt="user"
                                            width={36}
                                            height={36}
                                            className="user-avatar mr-2"
                                          />
                                          <div>
                                          <div className="user-name">Anna Lee</div>
                                                                <div className='font-subtitle'>Faculty . Biology</div>
</div>
                                        </td>
                    <td> <div className='font-title'> New Lab Printer Setup</div>
                      <div className='font-subtitle'>Hardware Support</div>
                    </td>
                     <td> 
                      <div className='font-subtitle'>Yesterday</div>
                    </td>
                    <td className='ff1'><span className="mz-plan-badge mz-plan-researcher" style={{ color: '#FF7A00', backgroundColor: '#FF7A001A' }}>Open</span></td>

                    <td ><div>
                      <button>  <Image
                                            src="/logos/resetb.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar mr-2"
                                          /></button>
                                            <button>  <Image
                                            src="/logos/gt.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar mr-2"
                                          /></button>
                                            <button>  <Image
                                            src="/logos/more.svg"
                                            alt="user"
                                            width={20}
                                            height={20}
                                            className="user-avatar"
                                          /></button></div></td>

                  </tr>
                </tbody>
              </table>
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
