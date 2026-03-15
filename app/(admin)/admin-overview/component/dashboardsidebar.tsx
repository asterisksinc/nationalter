"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Ticket,
  UsersRound,
  ChartColumnIncreasing,
  Landmark,
  UserPlus,
  Newspaper,
  MessagesSquare,
  LogOut,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface DashboardSidebarProps {
  activePage?:
  | "overview"
  | "usermanagement"
  | "tickets"
  | "datasets"
  | "monetization"
  | "analytics"
  | "cms"
  | "blogs"
  | "registrations"
  | "contact";
}

/** Read admin email + role from the JWT stored in the 'nationciteId' cookie */
function getAdminFromCookie(): { email: string; role: string } {
  if (typeof document === "undefined") return { email: "", role: "ADMIN" };
  try {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("nationciteId="));
    if (!cookie) return { email: "", role: "ADMIN" };
    const token = cookie.split("=")[1];
    const base64 = token.split(".")[1];
    if (!base64) return { email: "", role: "ADMIN" };
    const payload = JSON.parse(atob(base64.replace(/-/g, "+").replace(/_/g, "/")));
    return { email: payload.email ?? "", role: payload.role ?? "ADMIN" };
  } catch {
    return { email: "", role: "ADMIN" };
  }
}

/** Turn "admin@nationcite.com" → "Admin" or trim to 18 chars */
function formatAdminName(email: string) {
  if (!email) return "Administrator";
  const local = email.split("@")[0];
  const nice = local.charAt(0).toUpperCase() + local.slice(1).replace(/[._-]/g, " ");
  return nice.length > 20 ? nice.slice(0, 18) + "…" : nice;
}

const FONT = "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const DashboardSidebar = ({
  activePage = "overview",
  isOpen = false,
  onClose,
}: DashboardSidebarProps & { isOpen?: boolean; onClose?: () => void }) => {
  const [admin] = useState(() => getAdminFromCookie());

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" } });
      const result = await res.json();
      if (result.success) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/admin";
      } else {
        alert("Logout failed: " + result.message);
      }
    } catch {
      alert("Something went wrong during logout.");
    }
  };

  /* ---- Avatar letters (e.g. "JD" from "john doe") ---- */
  const initials = formatAdminName(admin.email)
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "A";

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 40 }}
          className="md:hidden"
        />
      )}

      <aside
        className={`w-[260px] fixed h-full z-50 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#f6f6f6", borderRight: "1px solid #e5e5e5", display: "flex", flexDirection: "column", fontFamily: FONT }}
      >
        {/* Logo */}
        <div style={{ padding: "0 0 0 0", borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/logo.png" alt="NationCite" style={{ height: "112px", width: "auto" }} />
          <button onClick={onClose} className="md:hidden" style={{ padding: "8px", background: "transparent", border: "none", cursor: "pointer" }} />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activePage === "overview"} href="/admin-overview" />
          <SidebarItem icon={<UserPlus size={18} />} label="Registration Requests" active={activePage === "registrations"} href="/admin-overview/registration-requests" />
          <SidebarItem icon={<UsersRound size={18} />} label="User Management" active={activePage === "usermanagement"} href="/admin-overview/user-management" />
          <SidebarItem icon={<ChartColumnIncreasing size={18} />} label="Analytics" active={activePage === "analytics"} href="/admin-overview/analytics" />
          <SidebarItem icon={<Landmark size={18} />} label="Monetization" active={activePage === "monetization"} href="/admin-overview/monetization" />
          <SidebarItem icon={<Ticket size={18} />} label="Tickets" active={activePage === "tickets"} href="/admin-overview/tickets" />
          <SidebarItem icon={<MessagesSquare size={18} />} label="Contact" active={activePage === "contact"} href="/admin-overview/contact" />
          <SidebarItem icon={<Newspaper size={18} />} label="CMS" active={activePage === "cms"} href="/admin-overview/cms-planning" />
          <SidebarItem icon={<Newspaper size={18} />} label="Blogs" active={activePage === "blogs"} href="/admin-overview/blogs" />
        </nav>

        {/* Admin footer */}
        <div style={{ borderTop: "1px solid #e5e5e5", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Avatar circle with initials */}
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "linear-gradient(135deg, #ff7a00, #e06a00)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "13px", fontWeight: 700, fontFamily: FONT,
              flexShrink: 0,
            }}>
              {initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#0e121b", fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {formatAdminName(admin.email)}
              </div>
              <div style={{ fontSize: "11px", color: "#525866", fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {admin.email || "Administrator"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              style={{ padding: "4px", background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", flexShrink: 0, borderRadius: "4px" }}
              onMouseEnter={(e) => { (e.currentTarget.style.color = "#ef4444"); }}
              onMouseLeave={(e) => { (e.currentTarget.style.color = "#94a3b8"); }}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
