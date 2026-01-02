"use client";

import React, { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabContentToggleProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  tabs: TabItem[];
  defaultTabId?: string;
}

export default function TabContentToggle({
  title,
  description,
  ctaText,
  ctaLink,
  tabs,
  defaultTabId,
}: TabContentToggleProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id || "");

  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-[72px] bg-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-14 gap-6">
          <div className="flex-1">
            <h3 className="h3 mb-3 md:mb-4 text-[#1E1E1E]">{title}</h3>
            <p className="p2 text-gray-600 max-w-[700px]">{description}</p>
          </div>
          {ctaText && (
            <a
              href={ctaLink || "#"}
              className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 bg-[#FF7A00] text-white font-medium text-sm rounded-[7px] hover:bg-[#ff8c1a] transition-colors shadow-md hover:shadow-lg"
            >
              {ctaText}
            </a>
          )}
        </div>

        {/* Content Container with Tabs */}
        <div className="relative">
          {/* Main Content Area */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex items-center justify-center p-6 md:p-8 lg:p-12">
            {activeTabContent ? (
              <div className="w-full">{activeTabContent.content}</div>
            ) : (
              <div className="text-center text-gray-400">
                <p className="text-sm">Select a tab to view content</p>
              </div>
            )}
          </div>

          {/* Tab Controls - Desktop (Full Width Bottom) */}
          <div className="hidden sm:grid absolute -bottom-0 left-0 right-0 translate-y-1/2 grid-cols-3 gap-4 md:gap-6 z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start text-left px-3 py-3 bg-white border-t-4 transition-all ${
                  activeTab === tab.id
                    ? "border-t-[#FF7A00]"
                    : "border-t-gray-300"
                }`}
              >
                {tab.icon && (
                  <span className="text-2xl mb-3 text-[#FF7A00]">
                    {tab.icon}
                  </span>
                )}
                <h5 className="text-xs sm:text-sm font-semibold text-[#1E1E1E] mb-2">
                  {tab.label}
                </h5>
                <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                  Build credibility. Track your research impact.
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Controls - Mobile (Below Content) */}
        <div className="sm:hidden mt-16 md:mt-20 flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[7px] text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#FF7A00] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 active:bg-gray-200"
              }`}
            >
              {tab.icon && <span className="text-base">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
