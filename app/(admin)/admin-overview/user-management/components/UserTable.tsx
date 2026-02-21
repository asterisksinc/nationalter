"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export interface UserRow {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    plan: string;
    lastLogin: string;
    avatar: string;
    nationciteId: string | null;
    registrationType: string | null;
}

interface UserTableProps {
    users: UserRow[];
    loading: boolean;
    error: string | null;
    onEdit: (user: UserRow) => void;
    onDelete: (user: UserRow) => void;
    onRefresh: () => void;
}

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const rolePillStyle = (role: string): React.CSSProperties => {
    const map: Record<string, React.CSSProperties> = {
        ADMIN: { backgroundColor: "#f3e8ff", color: "#6b21a8" },
        SCHOLAR: { backgroundColor: "#dbeafe", color: "#1d4ed8" },
        ORG: { backgroundColor: "#fef3c7", color: "#b45309" },
    };
    return {
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        fontFamily: FONT,
        ...(map[role] ?? { backgroundColor: "#f1f5f9", color: "#475569" }),
    };
};

const statusPillStyle = (status: string): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    fontFamily: FONT,
    backgroundColor: status === "Active" ? "#dcfce7" : "#fee2e2",
    color: status === "Active" ? "#15803d" : "#b91c1c",
});

export const UserTable: React.FC<UserTableProps> = ({
    users, loading, error, onEdit, onDelete, onRefresh,
}) => {
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ role: "", status: "", plan: "" });

    const uniqueRoles = useMemo(() => [...new Set(users.map((u) => u.role))], [users]);
    const uniqueStatuses = useMemo(() => [...new Set(users.map((u) => u.status))], [users]);
    const uniquePlans = useMemo(() => [...new Set(users.map((u) => u.plan))], [users]);

    const filtered = useMemo(() => users.filter((u) => {
        const q = search.toLowerCase();
        const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.nationciteId ?? "").toLowerCase().includes(q);
        return matchesSearch
            && (!filters.role || u.role === filters.role)
            && (!filters.status || u.status === filters.status)
            && (!filters.plan || u.plan === filters.plan);
    }), [users, search, filters]);

    const activeFilterCount = [filters.role, filters.status, filters.plan].filter(Boolean).length;

    const handleExport = () => {
        const header = ["Name", "Email", "Role", "Status", "Plan", "NationCite ID", "Last Login"].join(",");
        const rows = filtered.map((u) => [u.name, u.email, u.role, u.status, u.plan, u.nationciteId ?? "", u.lastLogin].join(","));
        const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    /* ---- styles ---- */
    const wrapStyle: React.CSSProperties = {
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
        overflow: "hidden",
        fontFamily: FONT,
    };

    const toolbarStyle: React.CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid #e2e8f0",
    };

    const searchInputStyle: React.CSSProperties = {
        flex: 1,
        minWidth: "180px",
        padding: "8px 12px 8px 34px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        fontSize: "13px",
        fontFamily: FONT,
        color: "#0e121b",
        outline: "none",
        background: "#f8fafc",
    };

    const btnStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "7px 14px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        background: "#fff",
        fontSize: "13px",
        fontFamily: FONT,
        color: "#525866",
        cursor: "pointer",
        whiteSpace: "nowrap",
    };

    const thStyle: React.CSSProperties = {
        padding: "10px 16px",
        textAlign: "left",
        fontSize: "11px",
        fontWeight: 600,
        fontFamily: FONT,
        color: "#525866",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        background: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
        whiteSpace: "nowrap",
    };

    const tdStyle: React.CSSProperties = {
        padding: "12px 16px",
        fontSize: "13px",
        fontFamily: FONT,
        color: "#0e121b",
        borderBottom: "1px solid #f1f5f9",
        verticalAlign: "middle",
    };

    const selectStyle: React.CSSProperties = {
        padding: "7px 10px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        fontSize: "13px",
        fontFamily: FONT,
        color: "#0e121b",
        background: "#fff",
        cursor: "pointer",
    };

    return (
        <div style={wrapStyle}>
            {/* Toolbar */}
            <div style={toolbarStyle}>
                {/* Search box */}
                <div style={{ position: "relative", flex: 1, minWidth: "180px" }}>
                    <svg style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <input
                        type="text"
                        placeholder="Search by name, email, or NationCite ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInputStyle}
                    />
                </div>

                {/* Toolbar buttons */}
                <button style={{ ...btnStyle, position: "relative" }} onClick={() => setShowFilters(!showFilters)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                    Filters
                    {activeFilterCount > 0 && (
                        <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#ff7a00", color: "#fff", borderRadius: "999px", width: "17px", height: "17px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700 }}>
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                <button style={btnStyle} onClick={handleExport}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Export
                </button>

                <button style={btnStyle} onClick={onRefresh}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                    Refresh
                </button>
            </div>

            {/* Filter row */}
            {showFilters && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "12px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                    {[
                        { label: "All Roles", key: "role", opts: uniqueRoles },
                        { label: "All Statuses", key: "status", opts: uniqueStatuses },
                        { label: "All Plans", key: "plan", opts: uniquePlans },
                    ].map(({ label, key, opts }) => (
                        <select
                            key={key}
                            style={selectStyle}
                            value={filters[key as keyof typeof filters]}
                            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                        >
                            <option value="">{label}</option>
                            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                    ))}
                    {activeFilterCount > 0 && (
                        <button
                            onClick={() => { setSearch(""); setFilters({ role: "", status: "", plan: "" }); }}
                            style={{ ...btnStyle, color: "#ff7a00", borderColor: "#ff7a00" }}
                        >
                            Clear
                        </button>
                    )}
                </div>
            )}

            {/* Result count */}
            {(search || activeFilterCount > 0) && !loading && (
                <div style={{ padding: "8px 20px", fontSize: "12px", color: "#525866", fontFamily: FONT }}>
                    Showing {filtered.length} of {users.length} users
                </div>
            )}

            {/* Error */}
            {error && (
                <div style={{ padding: "32px", textAlign: "center", color: "#dc2626", fontSize: "13px", fontFamily: FONT }}>
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div style={{ padding: "48px", textAlign: "center", color: "#525866", fontSize: "13px", fontFamily: FONT }}>
                    Loading users…
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>User</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Role</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Plan</th>
                                <th style={thStyle}>NationCite ID</th>
                                <th style={thStyle}>Last Login</th>
                                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ ...tdStyle, textAlign: "center", padding: "40px", color: "#64748b" }}>
                                        No users match your search or filters.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((user) => (
                                    <tr key={user.id} style={{ transition: "background 0.15s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                        {/* User */}
                                        <td style={tdStyle}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <Image
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    width={32}
                                                    height={32}
                                                    style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid #e2e8f0" }}
                                                    onError={(e) => { (e.target as HTMLImageElement).src = "/logos/user.png"; }}
                                                />
                                                <span style={{ fontWeight: 500, fontSize: "13px", fontFamily: FONT, color: "#0e121b" }}>
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td style={{ ...tdStyle, color: "#525866", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {user.email}
                                        </td>

                                        {/* Role */}
                                        <td style={tdStyle}>
                                            <span style={rolePillStyle(user.role)}>{user.role}</span>
                                        </td>

                                        {/* Status */}
                                        <td style={tdStyle}>
                                            <span style={statusPillStyle(user.status)}>
                                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: user.status === "Active" ? "#16a34a" : "#ef4444", display: "inline-block" }} />
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* Plan */}
                                        <td style={{ ...tdStyle, color: "#525866" }}>{user.plan}</td>

                                        {/* NationCite ID */}
                                        <td style={tdStyle}>
                                            <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: "11px", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", color: "#525866" }}>
                                                {user.nationciteId ?? "—"}
                                            </span>
                                        </td>

                                        {/* Last login */}
                                        <td style={{ ...tdStyle, color: "#525866", fontSize: "12px" }}>{user.lastLogin}</td>

                                        {/* Actions */}
                                        <td style={{ ...tdStyle, textAlign: "right" }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                                                <button
                                                    onClick={() => onEdit(user)}
                                                    disabled={!user.nationciteId}
                                                    title={user.nationciteId ? "Edit user" : "No nationciteId"}
                                                    style={{ padding: "5px", border: "none", background: "transparent", cursor: user.nationciteId ? "pointer" : "not-allowed", color: "#64748b", borderRadius: "6px", opacity: user.nationciteId ? 1 : 0.3, display: "flex", alignItems: "center" }}
                                                    onMouseEnter={(e) => { if (user.nationciteId) (e.currentTarget.style.background = "#e0f2fe"); (e.currentTarget.style.color = "#0369a1"); }}
                                                    onMouseLeave={(e) => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.style.color = "#64748b"); }}
                                                >
                                                    <Pencil size={14} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(user)}
                                                    title="Delete user"
                                                    style={{ padding: "5px", border: "none", background: "transparent", cursor: "pointer", color: "#64748b", borderRadius: "6px", display: "flex", alignItems: "center" }}
                                                    onMouseEnter={(e) => { (e.currentTarget.style.background = "#fee2e2"); (e.currentTarget.style.color = "#b91c1c"); }}
                                                    onMouseLeave={(e) => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.style.color = "#64748b"); }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer */}
            {!loading && !error && filtered.length > 0 && (
                <div style={{ padding: "10px 20px", borderTop: "1px solid #f1f5f9", fontSize: "12px", color: "#94a3b8", fontFamily: FONT }}>
                    {filtered.length} user{filtered.length !== 1 ? "s" : ""}
                </div>
            )}
        </div>
    );
};
