"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Bell, X, Check, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  recipientId: string;
  type: string;
  title: string;
  message: string;
  redirectUrl: string;
  referenceId: string | null;
  isRead: boolean;
  createdAt: string;
}

const POLL_INTERVAL = 20_000; // 20 seconds

export function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastFetchRef = useRef<string | null>(null);

  const fetchNotifications = useCallback(async (incremental = false) => {
    try {
      const params = new URLSearchParams({ limit: "30" });
      if (incremental && lastFetchRef.current) {
        params.set("after", lastFetchRef.current);
      }

      console.log(`[NotificationBell] Fetching notifications: ${incremental ? 'incremental' : 'full'} - ${new Date().toISOString()}`);
      const res = await fetch(`/api/notifications?${params.toString()}`, {
        credentials: 'include', // Include cookies for authentication
      });
      
      console.log(`[NotificationBell] Response status: ${res.status}`);
      if (!res.ok) {
        console.error(`[NotificationBell] API error: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();
      console.log(`[NotificationBell] API response:`, data);
      if (!data.success) {
        console.error(`[NotificationBell] API returned success=false:`, data);
        return;
      }

      if (incremental && lastFetchRef.current) {
        // Merge new notifications at the top, avoiding duplicates
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.id));
          const newOnes = (data.data as Notification[]).filter((n) => !existingIds.has(n.id));
          console.log(`[NotificationBell] Incremental update: ${newOnes.length} new notifications`);
          return [...newOnes, ...prev].slice(0, 50);
        });
      } else {
        console.log(`[NotificationBell] Full update: ${data.data?.length || 0} total notifications`);
        setNotifications(data.data || []);
      }

      setUnreadCount(data.unreadCount || 0);
      lastFetchRef.current = new Date().toISOString();
    } catch (error) {
      console.error('[NotificationBell] Fetch error:', error);
      // Silently fail — polling will retry
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchNotifications(false);

    pollRef.current = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchNotifications(true);
      }
    }, POLL_INTERVAL);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchNotifications(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchNotifications]);

  // Close panel on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const markAsRead = async (ids: number[]) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n.id) ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - ids.length));
    } catch {
      // silent
    }
  };

  const markAllRead = async () => {
    try {
      setLoading(true);
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead([notification.id]);
    }
    setOpen(false);
    router.push(notification.redirectUrl);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "TICKET_CREATED":
        return "🎫";
      case "REGISTRATION_REQUEST":
        return "📋";
      case "TICKET_RESOLVED":
        return "✅";
      case "TICKET_COMMENT":
        return "💬";
      case "TICKET_UPDATED":
        return "🔄";
      default:
        return "🔔";
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 md:p-2.5 bg-white border border-[#E1E4EA] rounded-md text-[#525866] hover:text-[#0E121B] hover:bg-[#F5F7FA] relative flex items-center justify-center transition-colors"
        style={{ borderRadius: "6px" }}
        aria-label="Notifications"
      >
        <Bell size={20} strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#DF120B] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[360px] max-h-[480px] bg-white border border-[#E1E4EA] rounded-xl shadow-lg z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E1E4EA]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#0E121B]">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-[#FFF0E0] text-[#FF7A00] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  disabled={loading}
                  className="text-xs text-[#525866] hover:text-[#0E121B] flex items-center gap-1 px-2 py-1 rounded hover:bg-[#F5F7FA] transition-colors"
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-[#525866] hover:text-[#0E121B] rounded hover:bg-[#F5F7FA] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#8b95a5]">
                <Bell size={32} strokeWidth={1} className="mb-2 opacity-40" />
                <span className="text-sm">No notifications yet</span>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left px-4 py-3 border-b border-[#F0F1F3] last:border-b-0 flex gap-3 items-start transition-colors ${
                    notification.isRead
                      ? "bg-white hover:bg-[#FAFBFC]"
                      : "bg-[#FFF8F0] hover:bg-[#FFF0E0]"
                  }`}
                >
                  {/* Icon */}
                  <span className="text-base mt-0.5 flex-shrink-0">
                    {getTypeIcon(notification.type)}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-[13px] leading-[1.4] ${
                          notification.isRead
                            ? "text-[#525866] font-normal"
                            : "text-[#0E121B] font-medium"
                        }`}
                      >
                        {notification.title}
                      </span>
                      {!notification.isRead && (
                        <span className="flex-shrink-0 w-2 h-2 bg-[#FF7A00] rounded-full mt-1.5" />
                      )}
                    </div>
                    <p className="text-[12px] text-[#8b95a5] mt-0.5 line-clamp-2 leading-[1.4]">
                      {notification.message}
                    </p>
                    <span className="text-[11px] text-[#b0b5bf] mt-1 block">
                      {timeAgo(notification.createdAt)}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
