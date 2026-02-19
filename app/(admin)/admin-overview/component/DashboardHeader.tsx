"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronRight } from "lucide-react";
import {
  AdminFunctionality,
  searchAdminFunctionalities,
} from "./adminSearchIndex";

interface DashboardHeaderProps {
  breadcrumbItems: { label: string; href?: string }[];
}

export const DashboardHeader = ({
  breadcrumbItems,
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
      if (suggestions.length === 0) {
        return;
      }

      const chosenSuggestion =
        activeSuggestionIndex >= 0
          ? suggestions[activeSuggestionIndex]
          : suggestions[0];
      selectSuggestion(chosenSuggestion);
    }
  };

  return (
    <header
      className="flex justify-between items-center mb-3"
      style={{ borderBottom: "1px solid #E1E4EA", padding: "18px 32px" }}
    >
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
            className="pl-9 px-6 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg text-sm focus:outline-none w-80 text-gray-700 placeholder:text-gray-400 transition-all"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className={`w-full text-left px-3 py-2 border-b border-gray-100 last:border-b-0 ${
                    index === activeSuggestionIndex
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
          <Bell size={25} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};
