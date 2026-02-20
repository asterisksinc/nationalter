"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import "../adminstyle.css";
import "../monetization/mstyle.css";

interface RegistrationRequest {
  id: number;
  nationciteId: string;
  type: string;
  status: string;
  ticketId: string | null;
  createdAt: string | null;
  name: string;
  email: string;
}

export default function RegistrationRequestsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<RegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("PENDING");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, [filterType, filterStatus]);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filterType !== "ALL") params.append("type", filterType);
      if (filterStatus !== "ALL") params.append("status", filterStatus);

      const response = await fetch(`/api/registration/requests?${params}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }

      const data = await response.json();
      setRegistrations(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      reg.name.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      reg.ticketId?.toLowerCase().includes(query)
    );
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "MEDICAL":
        return "bg-blue-100 text-blue-800";
      case "RESEARCHER":
        return "bg-purple-100 text-purple-800";
      case "ORG":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="admin-layout">
      <DashboardSidebar activePage="registrations" />

      <main
        className="flex-1 ml-[260px] p-8 min-w-[1000px]"
        style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
      >
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Registration Requests" },
          ]}
        />

        <section className="admin-content">
          <div className="content-header">
            <div>
              <h3 className="main-ct">Registration Requests</h3>
              <p className="breadcrumb-current sub-ct">
                Review and manage new registration submissions
              </p>
            </div>
            <div className="content-header-right">
              <div className="frxd">
                <div
                  className="system-pill"
                  style={{
                    backgroundColor:
                      filteredRegistrations.length > 0 ? "#fff3cd" : "#d4edda",
                    color:
                      filteredRegistrations.length > 0 ? "#856404" : "#155724",
                  }}
                >
                  {filteredRegistrations.length} Pending
                </div>
              </div>
              <button
                className="primary-btn"
                onClick={fetchRegistrations}
                style={{ borderRadius: "6px" }}
              >
                Refresh
              </button>
            </div>
          </div>

          <div style={{ padding: "10px 32px" }}>
            <div className="mz-section-card">
              <div className="mz-section-title text-black">
                All Registration Requests
              </div>

              <div
                className="users-filters"
                style={{ marginBottom: "16px", gap: "12px" }}
              >
                <input
                  type="text"
                  placeholder="Search by name, email, or ticket ID"
                  className="users-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ maxWidth: "300px" }}
                />

                <select
                  className="filter-btn"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e5e5e5",
                  }}
                >
                  <option value="ALL">All Types</option>
                  <option value="MEDICAL">Medical</option>
                  <option value="RESEARCHER">Researcher</option>
                  <option value="ORG">Organization</option>
                </select>

                <select
                  className="filter-btn"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #e5e5e5",
                  }}
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              {loading ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Loading registrations...
                </div>
              ) : error ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#dc3545",
                  }}
                >
                  {error}
                </div>
              ) : filteredRegistrations.length === 0 ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  No registration requests found
                </div>
              ) : (
                <table className="mz-table">
                  <thead className="mz-table-head">
                    <tr>
                      <th>Ticket ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="bb">
                        <td>
                          <div
                            className="font-title"
                            style={{ color: "#1a1a1a" }}
                          >
                            {reg.ticketId || "N/A"}
                          </div>
                        </td>
                        <td>
                          <div
                            className="font-title"
                            style={{ color: "#1a1a1a" }}
                          >
                            {reg.name}
                          </div>
                        </td>
                        <td>
                          <div
                            className="font-subtitle"
                            style={{ color: "#333333" }}
                          >
                            {reg.email}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`mz-plan-badge ${getTypeBadgeClass(
                              reg.type,
                            )}`}
                            style={{ fontSize: "11px", padding: "4px 8px" }}
                          >
                            {reg.type}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`mz-plan-badge ${getStatusBadgeClass(
                              reg.status,
                            )}`}
                            style={{ fontSize: "11px", padding: "4px 8px" }}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td>
                          <div
                            className="font-subtitle"
                            style={{ color: "#333333" }}
                          >
                            {formatDate(reg.createdAt)}
                          </div>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              router.push(
                                `/admin-overview/registration-requests/${reg.ticketId}`,
                              )
                            }
                            disabled={!reg.ticketId}
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "1px solid #e5e5e5",
                              background: "#fff",
                              cursor: reg.ticketId ? "pointer" : "not-allowed",
                              opacity: reg.ticketId ? 1 : 0.5,
                              color: "#1a1a1a",
                            }}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}