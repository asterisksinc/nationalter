"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { DashboardSidebar } from "../../component/dashboardsidebar";
import { TicketDetailView, TicketComments } from "@/components/shared/tickets";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminTicketDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [ticketId, setTicketId] = useState<string>("");
  const [ticket, setTicket] = useState<any>(null);
  const [relatedPublication, setRelatedPublication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    params.then((p) => setTicketId(p.id));
  }, [params]);

  const fetchTicketDetails = async () => {
    if (!ticketId) return;

    setLoading(true);
    setError("");

    try {
      // Fetch ticket details
      const ticketRes = await fetch(`/api/tickets/${ticketId}`);
      const ticketData = await ticketRes.json();

      if (!ticketRes.ok || !ticketData.success) {
        throw new Error(ticketData.message || "Failed to fetch ticket");
      }

      setTicket(ticketData.data);

      // Fetch related publication if exists
      if (ticketData.data.relatedPublicationId) {
        try {
          const pubRes = await fetch(
            `/api/publications?id=${ticketData.data.relatedPublicationId}`,
          );
          const pubData = await pubRes.json();
          if (pubData.success && pubData.data) {
            setRelatedPublication(pubData.data);
          }
        } catch (pubError) {
          console.error("Failed to fetch publication:", pubError);
        }
      }
    } catch (err: any) {
      console.error("Error fetching ticket:", err);
      setError(err.message || "Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  const handleBack = () => {
    router.push("/admin-overview/tickets");
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/tickets/tickets-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket.ticketId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      // Refresh ticket details
      await fetchTicketDetails();
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!ticket) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/tickets/tickets-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket.ticketId,
          priority: newPriority,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update priority");
      }

      // Refresh ticket details
      await fetchTicketDetails();
    } catch (err: any) {
      alert(err.message || "Failed to update priority");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2
          className="animate-spin text-[var(--color-primary)]"
          size={32}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-base font-semibold text-red-900 mb-2">Error</div>
        <p className="text-red-700">{error}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-base font-semibold text-gray-900 mb-2">
          Ticket Not Found
        </div>
        <p className="text-gray-700">
          The ticket you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar activePage="tickets" />
      <main className="flex-1 ml-[260px] min-w-[1000px] bg-gray-50">
        <div className="pb-8 p-8">
          <TicketDetailView
            ticket={ticket}
            relatedPublication={relatedPublication}
            isAdmin={true}
            onBack={handleBack}
          >
            {/* Admin Actions */}
            <div className="bg-white rounded-xl border border-[#E1E4EA] p-6 mb-6">
              <div className="text-base font-semibold text-[#0E121B] mb-4">
                Admin Actions
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Dropdown */}
                <div>
                  <label className="text-sm font-medium text-[#525866] block mb-2">
                    Change Status
                  </label>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updating}
                    className="w-full px-4 py-2 text-black bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f76a23] disabled:opacity-50"
                  >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                {/* Priority Dropdown */}
                <div>
                  <label className="text-sm font-medium text-[#525866] block mb-2">
                    Change Priority
                  </label>
                  <select
                    value={ticket.priority || "normal"}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    disabled={updating}
                    className="w-full px-4 py-2 text-black bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f76a23] disabled:opacity-50"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {updating && (
                <div className="mt-4 flex items-center gap-2 text-sm text-[#525866]">
                  <Loader2 size={14} className="animate-spin" />
                  Updating...
                </div>
              )}
            </div>

            {/* Comments Section */}
            <TicketComments
              ticketId={ticket.ticketId}
              comments={ticket.comments || []}
              isAdmin={true}
              onCommentAdded={fetchTicketDetails}
            />
          </TicketDetailView>
        </div>
      </main>
    </div>
  );
}
