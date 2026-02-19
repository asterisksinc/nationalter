"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronRight, Menu } from "lucide-react";
import {
  AdminFunctionality,
  searchAdminFunctionalities,
} from "./adminSearchIndex";

interface DashboardHeaderProps {
  breadcrumbItems: { label: string; href?: string }[];
  onMenuClick?: () => void;
}

export const DashboardHeader = ({
  breadcrumbItems,
  onMenuClick,
}: DashboardHeaderProps) => {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const suggestions = useMemo(
    () => searchAdminFunctionalities(searchQuery, 8),
    [searchQuery],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectSuggestion = (suggestion: AdminFunctionality) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    router.push(suggestion.route);
  };

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setShowSuggestions(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev >= suggestions.length - 1 ? 0 : prev + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1,
      );
      return;
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (suggestions.length === 0) return;

      const chosenSuggestion =
        activeSuggestionIndex >= 0
          ? suggestions[activeSuggestionIndex]
          : suggestions[0];
      selectSuggestion(chosenSuggestion);
    }
  };

  return (
    <>
      {/* ===== MOBILE HEADER (visible only on mobile) ===== */}
      <div className="md:hidden flex flex-col w-full border-b border-[#E1E4EA] bg-white">
        {/* Top bar: Hamburger | Logo | Bell */}
        <div className="flex items-center justify-between px-4 h-[56px]">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-1.5 rounded-md text-[#0E121B] hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <img
              src="/logo.png"
              alt="NationCite"
              className="h-[38px] w-auto object-contain"
            />
          </div>

          <button
            className="relative p-2 rounded-md text-[#525866] hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DF120B] rounded-full border border-white" />
          </button>
        </div>

        {/* Breadcrumb row */}
        <div className="flex items-center px-4 pb-3 text-[12px] text-[#525866] flex-wrap gap-y-1">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link href={item.href} className="text-[#9ea3ae] hover:text-[#0E121B]">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#0E121B] font-medium">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight size={12} className="mx-1.5 text-[#9ea3ae]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ===== DESKTOP HEADER (hidden on mobile) ===== */}
      <header
        className="hidden md:flex justify-between items-center mb-3"
        style={{ borderBottom: "1px solid #E1E4EA", padding: "18px 32px" }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 cursor-pointer"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    index === breadcrumbItems.length - 1
                      ? "text-[#1e1e1e] font-medium"
                      : ""
                  }
                >
                  {item.label}
                </span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight size={14} className="mx-2 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right side: search + bell */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={searchContainerRef}>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search admin actions"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowSuggestions(true);
                setActiveSuggestionIndex(-1);
              }}
              onFocus={() => {
                setShowSuggestions(true);
              }}
              onKeyDown={onSearchKeyDown}
              className="pl-9 px-6 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg text-sm focus:outline-none w-64 text-gray-700 placeholder:text-gray-400 transition-all"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className={`w-full text-left px-3 py-2 border-b border-gray-100 last:border-b-0 ${index === activeSuggestionIndex
                      ? "bg-orange-50"
                      : "hover:bg-gray-50"
                      }`}
                  >
                    <div className="text-sm text-[#1e1e1e] font-medium">
                      {suggestion.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {suggestion.section} • {suggestion.route}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 relative shadow-none"
            style={{ borderRadius: "6px" }}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </header>
    </>
  );
};
