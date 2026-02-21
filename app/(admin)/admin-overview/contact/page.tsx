"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Eye, Mail, RefreshCw, X } from "lucide-react";
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

type ReplyTemplateKey = "acknowledgement" | "need_more_info" | "resolved";

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "email-asc", label: "Email A-Z" },
  { value: "status-asc", label: "Status" },
];

const REPLY_TEMPLATES: Array<{ key: ReplyTemplateKey; label: string; hint: string }> = [
  {
    key: "acknowledgement",
    label: "Acknowledgement",
    hint: "Confirms receipt and follow-up.",
  },
  {
    key: "need_more_info",
    label: "Need More Information",
    hint: "Requests additional details from user.",
  },
  {
    key: "resolved",
    label: "Resolved",
    hint: "Confirms the issue is resolved.",
  },
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

  const [selected, setSelected] = useState<ContactRow | null>(null);
  const [replyTemplateKey, setReplyTemplateKey] = useState<ReplyTemplateKey>("acknowledgement");
  const [replyNotes, setReplyNotes] = useState("");
  const [markResolvedOnReply, setMarkResolvedOnReply] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);

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

  const sendReply = async () => {
    if (!selected) return;

    try {
      setSendingReply(true);
      const res = await fetch("/api/admin/contact-us", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          id: selected.id,
          templateKey: replyTemplateKey,
          customMessage: replyNotes,
          markResolved: markResolvedOnReply,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to send reply");
      }

      if (json.data?.id) {
        setRows((prev) =>
          prev.map((row) => (row.id === json.data.id ? { ...row, status: json.data.status } : row))
        );
      }

      alert("Reply mail sent successfully");
      setSelected(null);
      setReplyNotes("");
      setReplyTemplateKey("acknowledgement");
      setMarkResolvedOnReply(true);
    } catch (sendError: unknown) {
      const message = sendError instanceof Error ? sendError.message : "Failed to send reply";
      alert(message);
    } finally {
      setSendingReply(false);
    }
  };

  const statusStyle = (status: ContactStatus) => {
    if (status === "RESOLVED") return { color: "#065f46", background: "#d1fae5", border: "#34d399" };
    if (status === "CLOSED") return { color: "#1f2937", background: "#e5e7eb", border: "#9ca3af" };
    return { color: "#92400e", background: "#fef3c7", border: "#f59e0b" };
  };

  return (
    <div className="zui-admin-layout min-h-screen flex relative">
      <DashboardSidebar
        activePage="contact"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="kryx-main-content flex-1 transition-all duration-300 ml-0 md:ml-[260px] bg-[#f1f5f9] w-full overflow-x-hidden">
        <DashboardHeader
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-8">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <div className="text-2xl font-bold text-[#0b1220]">Contact Queries</div>
              <div className="text-sm text-[#1f2937] mt-1">Review and reply to all user-submitted contact requests</div>
            </div>
            <button
              type="button"
              onClick={fetchContacts}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#cbd5e1] text-sm text-[#0f172a] hover:bg-[#e2e8f0]"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#cbd5e1] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#cbd5e1] flex flex-wrap gap-3 bg-[#f8fafc]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone, institution, message"
                className="px-3 py-2 rounded-lg border border-[#94a3b8] text-sm min-w-[260px] text-[#0f172a] bg-white outline-none focus:border-[#FF7A00]"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "ALL" | ContactStatus)}
                className="px-3 py-2 rounded-lg border border-[#94a3b8] text-sm text-[#0f172a] bg-white outline-none focus:border-[#FF7A00]"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>

              <select
                value={inquiryFilter}
                onChange={(e) => setInquiryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[#94a3b8] text-sm text-[#0f172a] bg-white outline-none focus:border-[#FF7A00]"
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
                className="px-3 py-2 rounded-lg border border-[#94a3b8] text-sm text-[#0f172a] bg-white outline-none focus:border-[#FF7A00]"
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
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ffedd5] text-[#9a3412] border border-[#fdba74] text-sm font-medium"
              >
                <ArrowUpDown size={14} />
                <span>Apply</span>
              </button>
            </div>

            {error && (
              <div className="mx-4 my-3 rounded-lg border border-[#fca5a5] bg-[#fef2f2] px-3 py-2 text-sm text-[#991b1b]">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#e2e8f0] border-b border-[#cbd5e1] text-left text-[#0f172a]">
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                    <th className="px-4 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold">Inquiry</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td className="px-4 py-5 text-[#334155]" colSpan={6}>
                        Loading contact queries...
                      </td>
                    </tr>
                  )}

                  {!loading && rows.length === 0 && (
                    <tr>
                      <td className="px-4 py-6 text-[#334155]" colSpan={6}>
                        No contact queries found for the selected filters.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    rows.map((row) => {
                      const style = statusStyle(row.status);
                      return (
                        <tr key={row.id} className="border-b border-[#e2e8f0] align-top hover:bg-[#f8fafc]">
                          <td className="px-4 py-3 whitespace-nowrap text-[#0f172a]">
                            {new Date(row.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 min-w-[250px]">
                            <div className="font-semibold text-[#0b1220]">{row.name}</div>
                            <div className="text-[#0f172a]">{row.email}</div>
                            <div className="text-[#0f172a]">{row.phone || "-"}</div>
                            <div className="text-[#334155]">{row.org || "-"}</div>
                          </td>
                          <td className="px-4 py-3 text-[#0f172a] min-w-[170px]">
                            {row.inquiryType}
                          </td>
                          <td className="px-4 py-3 text-[#111827] min-w-[360px] max-w-[500px]">
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
                              className="block w-full px-2 py-1.5 rounded-md border border-[#94a3b8] text-xs text-[#0f172a]"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="RESOLVED">Resolved</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 min-w-[130px]">
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(row);
                                setReplyTemplateKey("acknowledgement");
                                setReplyNotes("");
                                setMarkResolvedOnReply(row.status !== "PENDING");
                              }}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#fdba74] bg-[#fff7ed] text-[#9a3412] text-xs font-semibold hover:bg-[#ffedd5]"
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selected && (
          <div className="fixed inset-0 z-[70] bg-black/45 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl rounded-xl border border-[#94a3b8] bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#cbd5e1] bg-[#f8fafc]">
                <div>
                  <div className="text-lg font-bold text-[#0b1220]">Contact Query Details</div>
                  <div className="text-sm text-[#334155] mt-1">{selected.name} - {selected.email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-md text-[#334155] hover:bg-[#e2e8f0]"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#cbd5e1] bg-[#f8fafc] p-3">
                  <div className="text-xs uppercase tracking-wide text-[#475569]">Inquiry Type</div>
                  <div className="text-sm font-semibold text-[#0f172a] mt-1">{selected.inquiryType}</div>
                </div>
                <div className="rounded-lg border border-[#cbd5e1] bg-[#f8fafc] p-3">
                  <div className="text-xs uppercase tracking-wide text-[#475569]">Submitted</div>
                  <div className="text-sm font-semibold text-[#0f172a] mt-1">{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <div className="rounded-lg border border-[#cbd5e1] bg-[#f8fafc] p-3 md:col-span-2">
                  <div className="text-xs uppercase tracking-wide text-[#475569]">Message</div>
                  <div className="text-sm text-[#111827] mt-1 whitespace-pre-wrap">{selected.message}</div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="text-sm font-semibold text-[#0f172a] mb-2">Reply Through Mail</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-[#334155] mb-1">Template</div>
                    <select
                      value={replyTemplateKey}
                      onChange={(e) => setReplyTemplateKey(e.target.value as ReplyTemplateKey)}
                      className="w-full px-3 py-2 rounded-lg border border-[#94a3b8] text-sm text-[#0f172a]"
                    >
                      {REPLY_TEMPLATES.map((tpl) => (
                        <option key={tpl.key} value={tpl.key}>
                          {tpl.label}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-[#475569] mt-1">
                      {REPLY_TEMPLATES.find((tpl) => tpl.key === replyTemplateKey)?.hint}
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm text-[#0f172a] mt-6 md:mt-0">
                    <input
                      type="checkbox"
                      checked={markResolvedOnReply}
                      onChange={(e) => setMarkResolvedOnReply(e.target.checked)}
                    />
                    <span>Mark as resolved after sending</span>
                  </label>
                </div>

                <div>
                  <div className="text-xs text-[#334155] mb-1">Additional Notes</div>
                  <textarea
                    value={replyNotes}
                    onChange={(e) => setReplyNotes(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 rounded-lg border border-[#94a3b8] text-sm text-[#0f172a]"
                    placeholder="Add optional context before sending the template response"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 rounded-lg border border-[#94a3b8] text-sm text-[#0f172a] bg-white hover:bg-[#f1f5f9]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={sendReply}
                    disabled={sendingReply}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff7a00] text-white text-sm font-semibold hover:bg-[#ea6c00] disabled:opacity-60"
                  >
                    <Mail size={14} />
                    <span>{sendingReply ? "Sending..." : "Send Reply"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
