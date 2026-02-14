"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { TicketDetailView, TicketComments } from "@/components/shared/tickets";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ResearcherTicketDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [ticketId, setTicketId] = useState<string>("");
  const [ticket, setTicket] = useState<any>(null);
  const [relatedPublication, setRelatedPublication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserNationCiteId, setCurrentUserNationCiteId] = useState("");

  useEffect(() => {
    params.then((p) => setTicketId(p.id));
  }, [params]);

  const fetchTicketDetails = async () => {
    if (!ticketId) return;

    setLoading(true);
    setError("");

    try {
      // Fetch current user data to verify ownership
      const userRes = await fetch("/api/dashboard/scholar/me");
      const userData = await userRes.json();

      if (!userData.success || !userData.data) {
        throw new Error("Failed to fetch user data");
      }

      setCurrentUserNationCiteId(userData.data.nationciteId);

      // Fetch ticket details
      const ticketRes = await fetch(`/api/tickets/${ticketId}`);
      const ticketData = await ticketRes.json();

      if (!ticketRes.ok || !ticketData.success) {
        throw new Error(ticketData.message || "Failed to fetch ticket");
      }

      const ticketDetails = ticketData.data;

      // Verify ownership
      if (ticketDetails.nationciteId !== userData.data.nationciteId) {
        throw new Error("Unauthorized: You can only view your own tickets");
      }

      setTicket(ticketDetails);

      // Fetch related publication if exists
      if (ticketDetails.relatedPublicationId) {
        try {
          const pubRes = await fetch(
            `/api/publications?id=${ticketDetails.relatedPublicationId}`,
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
    router.push("/dashboard/researchers/tickets");
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
        <h2 className="text-lg font-semibold text-red-900 mb-2">Error</h2>
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
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Ticket Not Found
        </h2>
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
    <div className="pb-8">
      <TicketDetailView
        ticket={ticket}
        relatedPublication={relatedPublication}
        isAdmin={false}
        onBack={handleBack}
      >
        {/* Comments Section */}
        <TicketComments
          ticketId={ticket.ticketId}
          comments={ticket.comments || []}
          isAdmin={false}
          onCommentAdded={fetchTicketDetails}
        />
      </TicketDetailView>
    </div>
  );
}
