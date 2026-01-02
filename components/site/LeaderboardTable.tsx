"use client";

import React from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

export interface LeaderboardEntry {
  id: number;
  rank: string;
  name: string;
  institution: string;
  hIndex: number;
  articles: number;
  avatar: string;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  type: "Scholars" | "Universities" | "Doctors";
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, type }) => {
  const headerTextStyle: React.CSSProperties = {
    fontFamily:
      "var(--font-inter), 'Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'Rounded Sans', sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "13.5px",
    lineHeight: "1.2",
    letterSpacing: "0.5px",
    background: "transparent",
    color: "#686464",
    padding: "6px 8px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
  };

  return (
    <div className="flex flex-col h-full">
      {/* TABLE CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="w-full">
          {/* Table Header - Hidden on Mobile */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-2 mb-2 uppercase tracking-wider">
            <p
              style={headerTextStyle}
              className="font-bold! col-span-1 justify-start"
            >
              #
            </p>

            <p
              style={headerTextStyle}
              className="font-bold! col-span-3 flex items-center gap-2 justify-start"
            >
              {type === "Universities" ? "Institution Name" : "Full Name"}
            </p>

            <p
              style={headerTextStyle}
              className="font-bold! col-span-3 flex items-center gap-2 justify-start"
            >
              {type === "Doctors"
                ? "Hospital/Clinic"
                : type === "Universities"
                ? "Location"
                : "Institution"}
            </p>

            <p
              style={headerTextStyle}
              className="font-bold! col-span-2 text-center justify-center"
            >
              H-Index Score
            </p>

            <p
              style={headerTextStyle}
              className="font-bold! col-span-3 text-right justify-end"
            >
              Total Articles Published
            </p>
          </div>

          {/* Table Body */}
          <div className="space-y-2">
            {data.map((row) => (
              <div
                key={row.id}
                className="group flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-3 items-start md:items-center p-4 md:px-6 md:py-3 bg-white rounded-lg sm:rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 relative"
              >
                {/* Rank */}
                <div className="md:col-span-1 absolute top-4 right-4 md:static">
                  <span
                    className="font-bold text-sm text-slate-400 bg-slate-50 px-2 py-1 rounded-md md:bg-transparent md:p-0"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    #{row.rank}
                  </span>
                </div>

                {/* Name */}
                <div className="w-full md:col-span-3 flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-12 h-12 md:w-9 md:h-9 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col md:block">
                    <p
                      className="text-sm md:text-xs font-bold md:font-medium text-slate-800 truncate group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {row.name}
                    </p>
                    {/* Mobile Institution shown below name */}
                    <div
                      className="flex md:hidden items-center gap-1.5 text-xs text-slate-500 mt-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <Building2 size={10} />
                      <span className="truncate max-w-[200px]">
                        {row.institution}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Institution - Desktop Only */}
                <div
                  className="hidden md:flex col-span-3 items-center gap-2 text-sm text-slate-600 font-medium truncate"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <div className="p-1 rounded-full bg-slate-100 text-slate-400 shrink-0">
                    <Building2 size={12} />
                  </div>
                  <span className="truncate">{row.institution}</span>
                </div>

                {/* H-Index Badge */}
                <div className="w-full md:col-span-2 flex justify-start md:justify-center mt-2 md:mt-0">
                  <div className="w-full md:w-auto flex items-center justify-between md:justify-center px-3 py-2 md:py-1 rounded-md sm:rounded-lg md:rounded-full bg-orange-50/50 border border-orange-100 group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00] transition-all duration-300">
                    <span
                      className="md:hidden text-xs font-medium text-slate-500 group-hover:text-orange-100"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      H-Index Score
                    </span>
                    <div className="flex items-center">
                      <span
                        className="text-sm font-bold text-[#FF7A00] group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {row.hIndex}
                      </span>
                      <span
                        className="ml-1.5 text-[10px] font-semibold text-orange-300 group-hover:text-orange-100 uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Articles & Action */}
                <div className="w-full md:col-span-3 flex items-center justify-between md:justify-end gap-3 md:pr-2 mt-1 md:mt-0 border-t border-slate-50 pt-3 md:border-0 md:pt-0">
                  <div className="flex items-center justify-between w-full md:w-auto md:block md:text-right">
                    <span
                      className="md:hidden text-xs font-medium text-slate-500"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Total Articles
                    </span>
                    <div className="flex items-center gap-2 md:block">
                      <span
                        className="block text-sm font-bold text-slate-700"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {row.articles}
                      </span>
                      <span
                        className="text-[10px] text-slate-400 font-medium uppercase"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        Pubs
                      </span>
                    </div>
                  </div>
                  <button className="hidden md:block text-slate-400 hover:text-orange-500 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER PAGINATION */}
      <div className="w-full border-t border-slate-100 bg-white z-10 py-4 md:py-0 h-auto md:h-20 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-md sm:rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-500 font-inter">
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center bg-slate-50 rounded-md sm:rounded-lg p-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm font-medium text-sm text-[#FF7A00] font-inter">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/50 font-medium text-sm text-slate-500 transition-colors font-inter">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/50 font-medium text-sm text-slate-500 transition-colors font-inter">
              3
            </button>
          </div>
          <span className="text-slate-300 px-1 font-medium font-inter">
            ...
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-md sm:rounded-lg hover:bg-slate-50 font-medium text-sm text-slate-500 transition-colors font-inter">
            100
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-md sm:rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-500 font-inter">
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          className="text-sm text-slate-400 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Showing <span className="text-slate-900 font-bold">1-10</span> of{" "}
          <span className="text-slate-900 font-bold">1,000</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;
