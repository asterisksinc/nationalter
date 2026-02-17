"use client";

import React, { useState } from "react";
import { Send, Loader2, MessageSquare, User } from "lucide-react";

interface Comment {
  id: number;
  ticketId: string;
  comments: string;
  createdAt: string;
}

interface TicketCommentsProps {
  ticketId: string;
  comments: Comment[];
  isAdmin?: boolean;
  onCommentAdded?: () => void;
}

export function TicketComments({
  ticketId,
  comments,
  isAdmin = false,
  onCommentAdded,
}: TicketCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (newComment.length > 5000) {
      setError("Comment is too long (max 5000 characters)");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/tickets/tickets-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId,
          comment: newComment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to add comment");
      }

      setNewComment("");
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err: any) {
      setError(err.message || "Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E1E4EA] p-6">
      <div className="text-base font-semibold text-[#0E121B] mb-4 flex items-center gap-2">
        <MessageSquare size={20} />
        Comments & Updates
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-[#525866]">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No comments yet</p>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => {
            // Check if comment was written by admin
            const isAdminComment = comment.comments.startsWith("[ADMIN] ");
            const displayComment = isAdminComment 
              ? comment.comments.replace("[ADMIN] ", "") 
              : comment.comments;
            
            return (
              <div
                key={comment.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#FF7A00] flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#525866]">
                        {isAdminComment ? "Support Team" : "You"}
                      </span>
                      <span className="text-xs text-[#525866]">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-[#0E121B] whitespace-pre-wrap break-words">
                      {displayComment}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              isAdmin
                ? "Add a response to this ticket..."
                : "Add a comment or provide additional information..."
            }
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-normal leading-6 tracking-[-0.02em] focus:outline-none focus:border-[#f76a23] text-[#333333] placeholder-[#8E8E93] resize-none"
            disabled={isSubmitting}
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          <p className="text-xs text-[#525866] mt-2">
            {newComment.length}/5000 characters
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#FF7A00] rounded-lg text-sm font-semibold text-white hover:bg-[#FF8A1A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                {isAdmin ? "Send Response" : "Add Comment"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
