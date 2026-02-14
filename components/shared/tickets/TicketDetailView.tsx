"use client";

import React from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  AlertCircle,
  Link as LinkIcon,
  Paperclip,
  Target,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

interface Publication {
  id: number;
  title: string;
  journalName: string;
  datePublished: string;
  citationsTotal?: number;
  citationsLast5Years?: number;
}

interface Ticket {
  id: number;
  ticketId: string;
  nationciteId: string;
  name: string;
  type: string;
  issueType: string;
  description: string;
  status: string;
  priority?: string;
  createdAt: string;
  updatedAt: string;
  issueReason?: string;
  links?: string[];
  attachments?: string[];
  impactLevel?: string;
  preferredOutcome?: string;
  relatedPublicationId?: number;
}

interface TicketDetailViewProps {
  ticket: Ticket;
  relatedPublication?: Publication | null;
  isAdmin?: boolean;
  onBack?: () => void;
  children?: React.ReactNode; // For admin actions or user actions
}

export function TicketDetailView({
  ticket,
  relatedPublication,
  isAdmin = false,
  onBack,
  children,
}: TicketDetailViewProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getImpactColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <div className="text-xl font-bold text-[#0E121B]">
              {ticket.ticketId}
            </div>
            <p className="text-sm text-[#525866]">{ticket.issueType}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={ticket.status} />
          {ticket.priority && <PriorityBadge priority={ticket.priority} />}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl border border-[#E1E4EA] p-6">
            <div className="text-base font-semibold text-[#0E121B] mb-4">
              Ticket Information
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#525866] block mb-1">
                  Category
                </label>
                <p className="text-base text-[#0E121B]">{ticket.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#525866] block mb-1">
                  Issue Type
                </label>
                <p className="text-base text-[#0E121B]">{ticket.issueType}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#525866] block mb-1">
                  Description
                </label>
                <p className="text-base text-[#0E121B] whitespace-pre-wrap">
                  {ticket.description}
                </p>
              </div>

              {ticket.issueReason && (
                <div>
                  <label className="text-sm font-medium text-[#525866] block mb-1">
                    Issue Reason
                  </label>
                  <p className="text-base text-[#0E121B] capitalize">
                    {ticket.issueReason.replace(/-/g, " ")}
                  </p>
                </div>
              )}

              {ticket.preferredOutcome && (
                <div>
                  <label className="text-sm font-medium text-[#525866] block mb-1 flex items-center gap-2">
                    <Target size={16} />
                    Preferred Outcome
                  </label>
                  <p className="text-base text-[#0E121B] whitespace-pre-wrap">
                    {ticket.preferredOutcome}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Publication Card */}
          {relatedPublication && (
            <div className="bg-white rounded-xl border border-[#E1E4EA] p-6">
              <div className="text-base font-semibold text-[#0E121B] mb-4">
                Related Publication
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-[#0E121B]">
                    {relatedPublication.title}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-[#525866]">
                  <div>
                    <span className="font-medium">Journal:</span>{" "}
                    {relatedPublication.journalName}
                  </div>
                  <div>
                    <span className="font-medium">Published:</span>{" "}
                    {new Date(relatedPublication.datePublished).getFullYear()}
                  </div>
                  {relatedPublication.citationsTotal !== undefined && (
                    <div>
                      <span className="font-medium">Citations:</span>{" "}
                      {relatedPublication.citationsTotal}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Links & Attachments */}
          {((ticket.links && ticket.links.length > 0) ||
            (ticket.attachments && ticket.attachments.length > 0)) && (
            <div className="bg-white rounded-xl border border-[#E1E4EA] p-6">
              <div className="text-base font-semibold text-[#0E121B] mb-4">
                Supporting Materials
              </div>

              {ticket.links && ticket.links.length > 0 && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-[#525866] block mb-2 flex items-center gap-2">
                    <LinkIcon size={16} />
                    Links
                  </label>
                  <div className="space-y-2">
                    {ticket.links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {ticket.attachments && ticket.attachments.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-[#525866] block mb-2 flex items-center gap-2">
                    <Paperclip size={16} />
                    Attachments
                  </label>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline p-2 bg-gray-50 rounded-lg"
                      >
                        <Paperclip size={14} />
                        <span className="break-all">
                          {attachment.split("/").pop() ||
                            `Attachment ${index + 1}`}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Children slot for comments section */}
          {children}
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          {/* Impact Level */}
          {ticket.impactLevel && (
            <div className="bg-white rounded-xl border border-[#E1E4EA] p-6">
              <div className="text-xs font-semibold text-[#525866] mb-3 flex items-center gap-2">
                <AlertCircle size={16} />
                Impact Level
              </div>
              <div
                className={`px-3 py-2 rounded-lg border text-sm font-medium inline-block capitalize ${getImpactColor(ticket.impactLevel)}`}
              >
                {ticket.impactLevel}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white rounded-xl border border-[#E1E4EA] p-6">
            <div className="text-xs font-semibold text-[#525866] mb-4">
              Details
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-[#525866] mb-1">
                  <User size={14} />
                  <span>Submitted By</span>
                </div>
                <p className="text-sm font-medium text-[#0E121B]">
                  {ticket.name}
                </p>
                {isAdmin && (
                  <p className="text-xs text-[#525866] mt-1">
                    {ticket.nationciteId}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[#525866] mb-1">
                  <Calendar size={14} />
                  <span>Created</span>
                </div>
                <p className="text-sm font-medium text-[#0E121B]">
                  {formatDate(ticket.createdAt)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[#525866] mb-1">
                  <Calendar size={14} />
                  <span>Last Updated</span>
                </div>
                <p className="text-sm font-medium text-[#0E121B]">
                  {formatDate(ticket.updatedAt)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-[#525866] mb-1">
                  <Tag size={14} />
                  <span>Type</span>
                </div>
                <p className="text-sm font-medium text-[#0E121B] capitalize">
                  {ticket.type.replace(/-/g, " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
