"use client";

import React from "react";
import { Check } from "lucide-react";
import "../hero-style.css";
import PricingSection from "@/components/site/PricingSection";
import FAQSection from "@/components/site/FAQSection";
import FinalCTA from "@/components/site/FinalCTA";

export default function PricingPage() {
  return (
    <div className="bg-white font-sans">
      {/* Hero / Pricing Section */}
      <section className="hero relative w-full">
        <PricingSection className="bg-transparent" />
      </section>

      {/* Comparison Tables Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
          {/* Table 1: Overview & Pricing */}
          <div className="space-y-7">
            <h4 className="mb-6 sm:mb-8 md:mb-10 lg:mb-10 text-center sm:text-left">
              Overview & Pricing
            </h4>
            <div className="mt-4 sm:mt-6 border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-4 bg-gray-50 px-4 sm:px-5 md:px-6 py-3 border-b border-gray-200">
                    <h5 className="sticky left-0 bg-gray-50 z-10 text-left">
                      Plan
                    </h5>
                    <h5 className="text-center">Price</h5>
                    <h5 className="text-center">Audience</h5>
                    <h5 className="text-center">Ideal For</h5>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      [
                        "Verified Professional",
                        "₹999/year",
                        "Individual researchers",
                        "Professionals seeking advanced visibility",
                      ],
                      [
                        "Institution Professional",
                        "₹75,000/year",
                        "Universities & research centers",
                        "Medium to large institutions",
                      ],
                      [
                        "Institutional Enterprise",
                        "₹1,50,000+/year (custom)",
                        "Large institutions, govt bodies",
                        "Medium to large institutions",
                      ],
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 items-start"
                      >
                        <p className="sticky left-0 bg-white z-10 pr-3">
                          {row[0]}
                        </p>
                        <p className="text-center">{row[1]}</p>
                        <p className="text-center">{row[2]}</p>
                        <p className="text-center">{row[3]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table 2: Researcher Features */}
          <ComparisonTable
            title="Researcher Features"
            headers={[
              "Feature",
              "Verified Professional",
              "Institution Professional",
              "Institutional Enterprise",
            ]}
            rows={[
              ["Verified badge", true, true, true],
              ["Priority support", true, true, "(dedicated)"],
              ["Monthly auto-refresh", true, true, true],
              ["Downloadable profile report", true, true, "(white-labeled)"],
              ["Citation trend charts", true, true, true],
              ["Rank trend analytics", true, true, true],
              ["Premium Profile Coach", true, true, "(advanced)"],
              ["Personalized support", true, true, "(priority, 1:1)"],
            ]}
          />

          {/* Table 3: Institution Workspace & Capacity */}
          <ComparisonTable
            title="Institution Workspace & Capacity"
            headers={[
              "Feature",
              "Verified Professional",
              "Institution Professional",
              "Institutional Enterprise",
            ]}
            rows={[
              ["Number of profiles", "—", "Up to 250 profiles", "Unlimited"],
              ["Institution dashboard", "—", true, "(advanced/customizable)"],
              ["Shared & team library", "—", true, true],
              ["Bulk correction requests", "—", true, true],
              ["CSV/Excel export", "—", true, true],
              ["API access", "—", true, "(advanced/custom endpoints)"],
              ["Quarterly reports", "—", true, "(white-labeled & custom)"],
              ["Dedicated admin panel", "—", "—", true],
              ["Custom onboarding", "—", "—", true],
            ]}
          />

          {/* Table 4: Analytics & Insights */}
          <ComparisonTable
            title="Analytics & Insights"
            headers={[
              "Analytics Feature",
              "Verified Professional",
              "Institution Professional",
              "Institutional Enterprise",
            ]}
            rows={[
              ["Insights dashboard", true, true, true],
              ["Subject mix analytics", true, true, "(advanced/customizable)"],
              ["Institution research trends", "—", true, true],
              ["Advanced filtering", true, true, true],
              ["Duplicate detection", "—", true, "(enhanced)"],
              ["Custom analytics modules", "—", "—", "(custom-developed)"],
              [
                "Annual research impact reports",
                "—",
                "(standard)",
                "(custom white-labeled)",
              ],
            ]}
          />

          {/* Table 5: Support & Service */}
          <ComparisonTable
            title="Support & Service"
            headers={[
              "Service",
              "Verified Professional",
              "Institution Professional",
              "Institutional Enterprise",
            ]}
            rows={[
              ["General support", true, true, true],
              ["Priority SLA", true, true, true],
              ["Dedicated account manager", "—", "—", true],
              ["Custom integrations", "—", "—", true],
              ["Premium onboarding", "—", "—", true],
            ]}
          />

          {/* Table 6: Add-ons */}
          <div>
            <h4 className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center sm:text-left">
              Add-ons (Optional for all)
            </h4>
            <div className="border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden max-w-2xl">
              <div className="overflow-x-auto">
                <div className="w-full min-w-[300px]">
                  <div className="grid grid-cols-2 bg-gray-50 px-4 sm:px-5 md:px-6 py-3 border-b border-gray-200">
                    <h5 className="text-left">Add-On</h5>
                    <h5 className="text-center">Price</h5>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      ["Custom reports", "₹4,999/report"],
                      ["Sponsored collections", "₹15,000/page"],
                      ["Recruitment posts", "₹5,000/post"],
                      ["Premium API access", "₹1,499/year"],
                      ["White-labeled analytics", "Enterprise only"],
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 px-4 sm:px-5 md:px-6 py-3 sm:py-4 items-start"
                      >
                        <p className="text-left">{row[0]}</p>
                        <p className="text-center">{row[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        kicker="Lorem ipsum"
        title="Lorem ipsum dolor self amet consectetyr alit"
        questions={[
          "Lorem ipsum dolor self amet, consectetur",
          "Lorem ipsum dolor self amet, consectetur",
          "Lorem ipsum dolor self amet, consectetur",
          "Lorem ipsum dolor self amet, consectetur",
          "Lorem ipsum dolor self amet, consectetur",
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </FAQSection>

      {/* Bottom CTA */}
      <FinalCTA />
    </div>
  );
}

function ComparisonTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | boolean)[][];
}) {
  return (
    <div className=" ">
      <h4 className="mb-6 sm:mb-8 md:mb-10 lg:mb-10 text-center sm:text-left">
        {title}
      </h4>
      <div className="mt-4 sm:mt-6 border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 bg-gray-50 px-4 sm:px-5 md:px-6 py-3 border-b border-gray-200">
              {headers.map((header, i) => (
                <h5
                  key={i}
                  className={
                    i === 0
                      ? "sticky left-0 bg-gray-50 mb- z-10 text-left"
                      : "text-center"
                  }
                >
                  {header}
                </h5>
              ))}
            </div>

            <div className="divide-y divide-gray-200">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4 items-center"
                >
                  <p className="sticky left-0 bg-white z-10 pr-3">{row[0]}</p>
                  {row.slice(1).map((cell, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-center text-center"
                    >
                      {cell === true ? (
                        <div className="w-5 h-5 rounded-full bg-[#FF7A00] flex items-center justify-center">
                          <Check
                            className="w-3.5 h-3.5 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      ) : cell === "—" || cell === false ? (
                        <p className="text-gray-300 text-center">—</p>
                      ) : (
                        <p className="text-center">{cell}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
