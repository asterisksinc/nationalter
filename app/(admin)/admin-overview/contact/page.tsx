"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpDown, RefreshCw } from "lucide-react";
import { DashboardHeader } from "../component/DashboardHeader";
import { DashboardSidebar } from "../component/dashboardsidebar";

type ContactStatus = "PENDING" | "RESOLVED" | "CLOSED";

type ContactRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  org: string | null;
  inquiryType: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data: ContactRow[];
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    inquiryTypes: string[];
  };
};

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "email-asc", label: "Email A-Z" },
  { value: "status-asc", label: "Status" },
];

export default function AdminContactPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rows, setRows] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ContactStatus>("ALL");
  const [inquiryFilter, setInquiryFilter] = useState("ALL");
  const [sortValue, setSortValue] = useState("createdAt-desc");
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([]);

  const [sortBy, sortOrder] = useMemo(() => {
    const [field, order] = sortValue.split("-");
    return [field || "createdAt", order || "desc"];
  }, [sortValue]);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        search,
        status: statusFilter,
        inquiryType: inquiryFilter,
        sortBy,
        sortOrder,
        page: "1",
        pageSize: "200",
      });

      const res = await fetch(`/api/admin/contact-us?${query.toString()}`);
      const json: ApiResponse = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to fetch contact queries");
      }

      setRows(json.data || []);
      setInquiryTypes(json.meta?.inquiryTypes || []);
    } catch (fetchError: unknown) {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to load contact queries";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [inquiryFilter, search, sortBy, sortOrder, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateStatus = async (id: number, status: ContactStatus) => {
    const previous = rows;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

    try {
      const res = await fetch("/api/admin/contact-us", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update status");
      }
    } catch (patchError: unknown) {
      setRows(previous);
      const message = patchError instanceof Error ? patchError.message : "Failed to update status";
      alert(message);
    }
  };

  const statusStyle = (status: ContactStatus) => {
    if (status === "RESOLVED") return { color: "#047857", background: "#ecfdf5", border: "#a7f3d0" };
    if (status === "CLOSED") return { color: "#334155", background: "#f1f5f9", border: "#cbd5e1" };
    return { color: "#b45309", background: "#fffbeb", border: "#fcd34d" };
  };

  return (
    <div className="zui-admin-layout min-h-screen flex relative">
      <DashboardSidebar
        activePage="contact"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="kryx-main-content flex-1 transition-all duration-300 ml-0 md:ml-[260px] bg-gray-50 w-full overflow-x-hidden">
        <DashboardHeader
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-8">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <div className="text-2xl font-bold text-[#0E121B]">Contact Queries</div>
              <div className="text-sm text-[#525866] mt-1">Review all user-submitted contact form requests</div>
            </div>
            <button
              type="button"
              onClick={fetchContacts}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-[#334155] hover:bg-gray-50"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone, institution, message"
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm min-w-[260px] outline-none focus:border-[#FF7A00]"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "ALL" | ContactStatus)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#FF7A00]"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>

              <select
                value={inquiryFilter}
                onChange={(e) => setInquiryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#FF7A00]"
              >
                <option value="ALL">All Inquiry Types</option>
                {inquiryTypes.map((typeValue) => (
                  <option key={typeValue} value={typeValue}>
                    {typeValue}
                  </option>
                ))}
              </select>

              <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#FF7A00]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={fetchContacts}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFF1E7] text-[#FF7A00] text-sm"
              >
                <ArrowUpDown size={14} />
                <span>Apply</span>
              </button>
            </div>

            {error && (
              <div className="mx-4 my-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-gray-200 text-left text-[#475569]">
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                    <th className="px-4 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold">Inquiry</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td className="px-4 py-5 text-[#64748B]" colSpan={5}>
                        Loading contact queries...
                      </td>
                    </tr>
                  )}

                  {!loading && rows.length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-[#64748B]" colSpan={5}>
                        No contact queries found for the selected filters.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    rows.map((row) => {
                      const style = statusStyle(row.status);
                      return (
                        <tr key={row.id} className="border-b border-gray-100 align-top hover:bg-[#FCFCFD]">
                          <td className="px-4 py-3 whitespace-nowrap text-[#334155]">
                            {new Date(row.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 min-w-[240px]">
                            <div className="font-semibold text-[#0E121B]">{row.name}</div>
                            <div className="text-[#475569]">{row.email}</div>
                            <div className="text-[#475569]">{row.phone || "-"}</div>
                            <div className="text-[#64748B]">{row.org || "-"}</div>
                          </td>
                          <td className="px-4 py-3 text-[#334155] min-w-[170px]">
                            {row.inquiryType}
                          </td>
                          <td className="px-4 py-3 text-[#334155] min-w-[380px] max-w-[520px]">
                            <div className="line-clamp-4 whitespace-pre-wrap">{row.message}</div>
                          </td>
                          <td className="px-4 py-3 min-w-[170px]">
                            <div
                              className="inline-flex px-2 py-1 rounded-md border text-xs font-semibold mb-2"
                              style={{ color: style.color, background: style.background, borderColor: style.border }}
                            >
                              {row.status}
                            </div>
                            <select
                              value={row.status}
                              onChange={(e) => updateStatus(row.id, e.target.value as ContactStatus)}
                              className="block w-full px-2 py-1.5 rounded-md border border-gray-200 text-xs text-[#334155]"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="RESOLVED">Resolved</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
