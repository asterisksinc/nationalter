"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Search, Plus, Filter, Loader2 } from "lucide-react";
import {
  CreateTicketModal,
  TicketTable,
  TicketData,
} from "@/components/shared/tickets";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// --- Main Page Component ---

function TicketsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/org/me");
      const json = await res.json();
      if (json.success && json.data) {
        setUserData(json.data);
        if (json.data.tickets) {
          setTickets(json.data.tickets);
        }
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (searchParams?.get("openCreate") === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setIsModalOpen(false);
    // Remove query param if present
    if (searchParams?.get("openCreate") === "true") {
      router.replace(pathname);
    }
  };

  const handleTicketClick = (ticket: TicketData) => {
    router.push(`/dashboard/organizations/tickets/${ticket.ticketId}`);
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

  // Filter out registration tickets
  const filteredTickets = tickets.filter(
    (t) => t.issueType !== "NEW_REGISTRATION",
  );

  const openCount = filteredTickets.filter(
    (t) =>
      t.status?.toUpperCase() === "OPEN" ||
      t.status?.toUpperCase() === "PENDING",
  ).length;
  const reviewCount = filteredTickets.filter(
    (t) =>
      t.status?.toUpperCase() === "IN_PROGRESS" ||
      t.status?.toUpperCase() === "UNDER_REVIEW",
  ).length;
  const approvedCount = filteredTickets.filter(
    (t) =>
      t.status?.toUpperCase() === "RESOLVED" ||
      t.status?.toUpperCase() === "APPROVED" ||
      t.status?.toUpperCase() === "CLOSED",
  ).length;
  const rejectedCount = filteredTickets.filter(
    (t) => t.status?.toUpperCase() === "REJECTED",
  ).length;

  return (
    <>
      {/* Page Title */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="text-[18px] md:text-base font-bold md:font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          Ticket Center
        </div>
        <p className="text-[13px] md:text-sm font-normal leading-6 tracking-[-0.02em] text-[#525866]">
          Manage your Tickets
        </p>
      </div>

      {/* Stats Cards - Responsive */}
      <div className="mb-6">
        <div className="rounded-xl border border-[#E1E4EA] bg-white md:flex md:flex-row md:items-center md:h-[102px] overflow-hidden">
          {/* Mobile: 2x2 Grid for all 4 items */}
          <div className="grid grid-cols-2 md:flex md:flex-1">
            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8 relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] md:after:hidden">
              <span className="text-[13px] md:text-sm text-[#525866]">
                Open Tickets
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                {openCount}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8">
              <span className="text-[13px] md:text-sm text-[#525866]">
                In Review Tickets
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                {reviewCount}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8 relative after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#E1E4EA] md:after:hidden">
              <span className="text-[13px] md:text-sm text-[#525866]">
                Approved Tickets
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                {approvedCount}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 md:p-0 md:flex-1 md:justify-center md:px-8">
              <span className="text-[13px] md:text-sm text-[#525866]">
                Rejected
              </span>
              <span className="text-[24px] md:text-2xl font-bold md:font-semibold text-[#0E121B]">
                {rejectedCount}
              </span>
            </div>
          </div>

          {/* Desktop: Vertical dividers */}
          <div className="hidden md:block w-px h-[54px] bg-[#D9D9D9]" />
          <div className="hidden md:block w-px h-[54px] bg-[#D9D9D9]" />
          <div className="hidden md:block w-px h-[54px] bg-[#D9D9D9]" />
        </div>
      </div>

      {/* Tickets Table */}
      <TicketTable
        tickets={filteredTickets}
        loading={loading}
        onTicketClick={handleTicketClick}
      />

      {/* Create Ticket Modal */}
      {userData && (
        <CreateTicketModal
          isOpen={isModalOpen}
          onClose={closeModal}
          userType="Organization"
          nationciteId={userData.registration?.nationciteId || ""}
          userName={userData.organizationProfile?.name || "Organization"}
          onSuccess={fetchTickets}
        />
      )}
    </>
  );
}

export default function TicketsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <TicketsPageContent />
    </Suspense>
  );
}
