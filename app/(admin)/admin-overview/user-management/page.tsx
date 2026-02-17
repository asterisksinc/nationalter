"use client";

import Image from "next/image";
import { Pencil, Trash2, X } from "lucide-react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { useState, useEffect } from "react";
import EditUserModal from "../component/EditUserModal";
import "../adminstyle.css";

function AddUserDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="drawer-panel">
        <div className="drawer-header">
          <h3 style={{ fontSize: "16px" }}>Add New User</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="e.g. John Doe" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input placeholder="jane@company.com" />
            <p className="helper-text">
              User will receive an invitation at this address.
            </p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>Select Role</option>
                <option>ADMIN</option>
                <option>SCHOLAR</option>
                <option>ORG</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="drawer-footer" style={{ marginBottom: "5px" }}>
          <button className="filter-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn">Create User</button>
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    plan: "",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get unique values for filter options
  const uniqueRoles = [...new Set(users.map((u) => u.role))];
  const uniqueStatuses = [...new Set(users.map((u) => u.status))];
  const uniquePlans = [...new Set(users.map((u) => u.plan))];

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filters.role === "" || user.role === filters.role;
    const matchesStatus =
      filters.status === "" || user.status === filters.status;
    const matchesPlan = filters.plan === "" || user.plan === filters.plan;

    return matchesSearch && matchesRole && matchesStatus && matchesPlan;
  });

  const activeFilterCount = [filters.role, filters.status, filters.plan].filter(
    (f) => f !== "",
  ).length;

  const clearFilters = () => {
    setFilters({ role: "", status: "", plan: "" });
    setSearchTerm("");
  };

  const handleExport = () => {
    // Export users as CSV
    const headers = [
      "Name",
      "Email",
      "Role",
      "Status",
      "Plan",
      "Last Login",
    ].join(",");
    const rows = filteredUsers.map((user) =>
      [
        user.name,
        user.email,
        user.role,
        user.status,
        user.plan,
        user.lastLogin,
      ].join(","),
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <DashboardSidebar activePage="usermanagement" />

      {/* Main content */}
      <main
        className="flex-1 ml-[260px] p-8 min-w-[1000px]"
        style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
      >
        {/* Top bar */}
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "User Management" },
          ]}
        />

        {/* Content area */}
        <section className="admin-content">
          <div className="content-header">
            <div>
              <h3 className="main-ct">User Management</h3>
              <p className="breadcrumb-current sub-ct">
                Manage users, monitor activity, and control access across the
                platform.
              </p>
            </div>
            <div className="content-header-right">
              <button
                className="primary-btn"
                onClick={() => setShowAddUser(true)}
                style={{ borderRadius: "6px" }}
              >
                + Add New User
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div
            className="users-filters"
            style={{ paddingLeft: "32px", paddingRight: "32px" }}
          >
            <input
              type="text"
              placeholder="Search by name, email or ID"
              className="users-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              style={{ position: "relative" }}
            >
              <Image
                src="/logos/filter.png"
                alt="Filter"
                width={18}
                height={18}
              />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#FF7A00",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button className="filter-btn" onClick={handleExport}>
              <Image
                src="/logos/export.png"
                alt="Export"
                width={18}
                height={18}
              />
              <span>Export Users</span>
            </button>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div
              style={{
                padding: "0 32px 16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "12px",
              }}
            >
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value })
                }
                className="filter-btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                }}
              >
                <option value="">All Roles</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="filter-btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                }}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={filters.plan}
                onChange={(e) =>
                  setFilters({ ...filters, plan: e.target.value })
                }
                className="filter-btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                }}
              >
                <option value="">All Plans</option>
                {uniquePlans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "transparent",
                    color: "#FF7A00",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          {(searchTerm || activeFilterCount > 0) && !loading && !error && (
            <div
              style={{
                padding: "0 32px 8px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              Showing {filteredUsers.length} of {users.length} users
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#666",
                marginLeft: "32px",
                marginRight: "32px",
              }}
            >
              Loading users...
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#dc3545",
                marginLeft: "32px",
                marginRight: "32px",
              }}
            >
              Error: {error}
            </div>
          )}

          {/* Users table */}
          {!loading && !error && (
            <div
              className="users-table-wrapper"
              style={{ marginLeft: "32px", marginRight: "32px" }}
            >
              {filteredUsers.length === 0 ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  No users found
                </div>
              ) : (
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Plan</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="user-cell">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={36}
                            height={36}
                            className="user-avatar"
                          />
                          <span className="user-name">{user.name}</span>
                        </td>

                        <td className="user-email">{user.email}</td>

                        <td>
                          <span
                            className={`role-pill ${user.role.toLowerCase()}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-pill ${user.status.toLowerCase()}`}
                          >
                            <span className="status-dot" />
                            {user.status}
                          </span>
                        </td>

                        <td>{user.plan}</td>
                        <td className="last-login">{user.lastLogin}</td>

                        <td className="actions">
                          <button
                            className="icon-btn edit"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditOpen(true);
                            }}
                          >
                            <Pencil size={16} />
                          </button>
                          <button className="icon-btn delete">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {isEditOpen && (
                <EditUserModal
                  user={selectedUser}
                  onClose={() => setIsEditOpen(false)}
                />
              )}
            </div>
          )}
        </section>
      </main>

      {showAddUser && <AddUserDrawer onClose={() => setShowAddUser(false)} />}
    </div>
  );
}
