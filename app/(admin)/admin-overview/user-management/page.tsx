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

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
                alt="Export"
                width={18}
                height={18}
              />
              <span>Export Users</span>
            </button>
          </div>

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
