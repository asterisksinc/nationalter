"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { UserTable, EditUserModal } from "./components";
import type { UserRow } from "./components";
import "../adminstyle.css";

export default function UserManagementPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<UserRow | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch users");
      setUsers(json.data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleDelete = async (user: UserRow) => {
    if (!confirm(`Delete ${user.name} (${user.email})? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/delete-user?id=${user.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Delete failed");
      }
      await fetchUsers();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <DashboardSidebar
        activePage="usermanagement"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main style={{ flex: 1, marginLeft: "260px", overflowX: "hidden", background: "#f8fafc" }}
        className="ml-0 md:ml-[260px]">
        <DashboardHeader
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "User Management" }]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Page heading */}
        <div style={{ padding: "24px 32px 16px", borderBottom: "1px solid #e2e8f0", marginBottom: "24px", background: "#f8fafc" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#0e121b", fontFamily: FONT, marginBottom: "4px" }}>
            User Management
          </div>
          <div style={{ fontSize: "13px", color: "#525866", fontFamily: FONT }}>
            Manage users, monitor activity, and control access across the platform.
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: "0 32px 32px" }}>
          <UserTable
            users={users}
            loading={loading}
            error={error}
            onEdit={(user) => setEditUser(user)}
            onDelete={handleDelete}
            onRefresh={fetchUsers}
          />
        </div>
      </main>

      {editUser && editUser.nationciteId && editUser.registrationType && (
        <EditUserModal
          nationciteId={editUser.nationciteId}
          registrationType={editUser.registrationType}
          onClose={() => setEditUser(null)}
          onSaved={() => fetchUsers()}
        />
      )}
    </div>
  );
}