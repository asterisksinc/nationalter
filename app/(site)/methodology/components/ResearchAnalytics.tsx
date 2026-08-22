"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

type ResearchAnalyticsItem = {
  kicker: string;
  title: string;
  description: string;
};

type ResearchAnalyticsCms = {
  heading?: string;
  image?: string;
  description?: string;
  analytics?: ResearchAnalyticsItem[];
};

const DEFAULT_ANALYTICS: ResearchAnalyticsItem[] = [
  {
    kicker: "ARIS",
    title: "Adjusted Research Impact Score",
    description:
      "Balances publication output, citation impact, and field normalization to provide a comprehensive measure of overall research strength while reducing disciplinary bias.",
  },
  {
    kicker: "PIBI",
    title: "Productivity–Impact Balance Index",
    description:
      "Measures how efficiently publication volume translates into meaningful scholarly influence, rewarding balanced research rather than excessive low-impact publishing.",
  },
  {
    kicker: "CWIE",
    title: "Citation-Weighted Impact Efficiency",
    description:
      "Evaluates how effectively citations contribute to overall academic influence by combining citation depth, H-index strength, and publication volume into a unified efficiency metric.",
  },
  {
    kicker: "PQLI",
    title: "Publication Quality Load Index",
    description:
      "Measures the concentration of research quality across publications by identifying how consistently published work contributes to long-term scholarly impact.",
  },
  {
    kicker: "CMSS",
    title: "Citation Momentum Strength Score",
    description:
      "Captures sustained research momentum by combining structural citation strength with portfolio-wide citation intensity to identify enduring academic influence.",
  },
];

const DEFAULT_IMAGE = "/methodology-analytics-dashboard.png";

export default function ResearchAnalytics({ cms }: { cms?: ResearchAnalyticsCms }) {
  const analytics = useMemo(
    () => (cms?.analytics && cms.analytics.length > 0 ? cms.analytics : DEFAULT_ANALYTICS),
    [cms?.analytics],
  );

  const [activeTab, setActiveTab] = useState(analytics[0]?.kicker || DEFAULT_ANALYTICS[0].kicker);

  useEffect(() => {
    setActiveTab(analytics[0]?.kicker || DEFAULT_ANALYTICS[0].kicker);
  }, [analytics]);

  const activeItem = analytics.find((item) => item.kicker === activeTab) || analytics[0];
  const imageSrc = cms?.image && cms.image.length > 0 ? cms.image : DEFAULT_IMAGE;
  const heading = cms?.heading || "Five Dimensions of Research Excellence";
  const headingLines =
    heading === "Five Dimensions of Research Excellence"
      ? ["Five Dimensions of", "Research Excellence"]
      : [heading];

  return (
    <section className="w-full py-10 md:py-16 bg-white section-padding">
      <div className="mx-auto grid w-full grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 items-stretch">
        <div className="relative order-2 aspect-[3644/3772] self-start overflow-hidden rounded-xl border border-[#F0E3D7] bg-[#FFDFC4] shadow-[0_20px_60px_rgba(247,106,35,0.12)] lg:order-1">
          <Image
            src={imageSrc}
            alt={cms?.heading || activeItem?.title || "Research analytics"}
            fill
            priority={false}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain object-center"
          />
        </div>

        <div className="order-1 flex h-full flex-col justify-center rounded-xl bg-white px-6 py-8 text-center sm:px-8 sm:py-10 lg:order-2 lg:px-12 lg:py-14 lg:text-left">
          <Badge>Core Analytics</Badge>

          <h3 className="mt-5 max-w-none text-3xl font-semibold leading-tight text-[#1E1E1E] sm:text-4xl xl:text-5xl">
            {headingLines.map((line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h3>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5C5C5C] sm:text-base">
            {cms?.description ||
              "Rather than relying on a single indicator, NationCite evaluates every researcher across five complementary scientometric dimensions that collectively measure productivity, efficiency, research quality, citation influence, and sustained scholarly impact."}
          </p>

          <div className="mt-8 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex min-w-max items-center gap-2 border-b border-[#ECE5DE]">
              {analytics.map((item) => {
                const isActive = item.kicker === activeTab;

                return (
                  <button
                    key={item.kicker}
                    type="button"
                    onClick={() => setActiveTab(item.kicker)}
                    className={`relative -mb-px whitespace-nowrap border-b-2 px-1 pb-4 text-sm cursor-pointer font-medium transition-colors duration-200 sm:text-base ${
                      isActive
                        ? "border-[#FF7A00] text-[#1E1E1E]"
                        : "border-transparent text-[#6B6B6B] hover:border-[#FF7A00]/35 hover:text-[#FF7A00]"
                    }`}
                    aria-pressed={isActive}
                  >
                    {item.kicker}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-[#EFE6DC] bg-[#FFFDF9] p-5 shadow-[0_10px_30px_rgba(247,106,35,0.06)] transition-all duration-300 sm:p-6 lg:p-7">
            <Badge className="mb-0">
              {activeItem?.kicker}
            </Badge>

            <h4 className="mt-4 text-lg font-medium leading-tight text-[#1E1E1E] sm:text-2xl lg:text-[2rem]">
              {activeItem?.title}
            </h4>

            <p className="mt-4 text-sm leading-7 text-[#5C5C5C] sm:text-base">
              {activeItem?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
