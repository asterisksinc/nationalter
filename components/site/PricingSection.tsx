import React, { useState } from "react";
import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";

type PricingPlan = {
  title: string;
  description: string;
  btnText: string;
  btnStyle: string;
  highlight: boolean;
  features: string[];
  monthly: {
    price: string;
    strikePrices?: string[];
    note?: string;
    tiers?: { label: string; perPerson: string; total: string; additional?: string }[];
  };
  yearly: {
    price: string;
    strikePrices?: string[];
    note?: string;
    tiers?: { label: string; perPerson: string; total: string; additional?: string }[];
  };
  includesNote?: string;
  audience_note?: string;
  footer_note?: string;
};

type PricingCms = {
  badge_text?: string;
  heading?: string;
  billing_cycle_labels?: {
    monthly?: string;
    alternate?: string;
  };
  plans?: PricingPlan[];
  includes_label?: string;
  audience_note?: string;
  footer_note?: string;
};

const DEFAULT_PLANS: PricingPlan[] = [
  {
    title: "Free",
    description: "For every researcher who wants visibility on the platform.",
    btnText: "Get Verified",
    btnStyle:
      "bg-white border border-gray-200 text-[#FF7A00] hover:bg-gray-50",
    highlight: false,
    features: [
      "Public rankings",
      "Basic profile view",
      "H-index by source",
      "Submit corrections",
      "Claim profile",
    ],
    monthly: { price: "₹0" },
    yearly: { price: "₹0" },
    audience_note: "For individual researchers",
    footer_note: "Note: Free forever, no card required",
  },
  {
    title: "Professional",
    description: "For researchers who want control over their public presence.",
    btnText: "Request Access",
    btnStyle:
      "bg-[#FF9534] border border-[#FF9534] text-white hover:bg-[#E6862D] shadow-md",
    highlight: true,
    features: [
      "Verified badge",
      "Priority modification (faster correction turnaround)",
      "Profile coach",
      "Analytics reports",
      "Percentile insights",
    ],
    includesNote: "Includes everything in Free.",
    monthly: {
      price: "₹199/month",
      strikePrices: ["₹449", "₹299"],
      note: "incl. GST",
    },
    yearly: {
      price: "₹1,999/year",
      strikePrices: ["₹4,999", "₹2,999"],
      note: "incl. GST",
    },
    audience_note: "For individual researchers, faculty, authors",
    footer_note: "Note: Best value for professionals",
  },
  {
    title: "Institutional",
    description:
      "For universities and research institutions managing many researcher profiles.",
    btnText: "Contact Sales",
    btnStyle:
      "bg-white border border-gray-200 text-[#FF7A00] hover:bg-gray-50",
    highlight: false,
    features: [
      "Cohort analytics",
      "Bulk corrections",
      "Institutional exports",
      "API access",
      "Quarterly impact briefs",
    ],
    includesNote: "Includes everything in Professional.",
    monthly: {
      price: "₹1,399/person/month",
      note: "All prices incl. GST.",
      tiers: [
        { label: "Under 30 users", perPerson: "₹1,399/person/month", total: "₹41,970 total for 30 users", additional: "Additionally ₹1,099/person/month" },
      ],
    },
    yearly: {
      price: "₹899/person/year",
      note: "All prices incl. GST.",
      tiers: [
        { label: "Under 30 users", perPerson: "₹899/person/year", total: "₹26,970 total for 30 users", additional: "Additionally ₹642/person/year" },
      ],
    },
    audience_note: "For universities & research institutions",
    footer_note: "Note: Custom plans available for large cohorts",
  },
];

function splitPrice(price: string): { main: string; suffix: string } {
  const match = price.match(/^(.*?)(\/[a-zA-Z\/]+)?$/);
  if (!match) return { main: price, suffix: "" };
  return { main: match[1] || price, suffix: match[2] || "" };
}

export default function PricingSection({
  className,
  isHero = false,
  cms,
}: {
  className?: string;
  isHero?: boolean;
  cms?: PricingCms;
}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "switch">("monthly");
  const plans = cms?.plans && cms.plans.length > 0 ? cms.plans : DEFAULT_PLANS;

  return (
    <section
      className={`w-full ${
        isHero
          ? "pt-8 pb-12"
          : "pt-24 sm:pt-32 pb-10 sm:pb-16 md:pb-20 lg:pb-24"
      } ${className || "bg-white"}`}
    >
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div
          className={`text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 ${
            isHero ? "" : ""
          }`}
        >
          <Badge>{cms?.badge_text || "Membership"}</Badge>

          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug mb-4 sm:mb-6 md:mb-6 lg:mb-8 text-[#111111] text-center">
            {cms?.heading || "Fair Plans for Serious Professionals"}
          </h3>

          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="bg-[#F3F4F6] p-1 rounded-md sm:rounded-lg inline-flex items-center gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-medium font-inter transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-white text-black shadow-none"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cms?.billing_cycle_labels?.monthly || "Monthly"}
              </button>
              <button
                onClick={() => setBillingCycle("switch")}
                className={`px-6 py-2 rounded-md text-sm font-medium font-inter transition-all duration-200 ${
                  billingCycle === "switch"
                    ? "bg-white text-black shadow-none"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cms?.billing_cycle_labels?.alternate || "Yearly"}
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => {
            const tier = billingCycle === "monthly" ? plan.monthly : plan.yearly;

            return (
              <div
                key={i}
                className={`rounded-md sm:rounded-lg overflow-hidden transition-all duration-300 flex flex-col ${
                  plan.highlight
                    ? "border border-[#FF9534] shadow-[0_0_40px_-5px_rgba(255,149,52,0.3)] scale-100 z-10"
                    : "border border-gray-200 shadow-none hover:shadow-md"
                }`}
              >
                {/* Top Section (Colored Background) */}
                <div
                  className={`p-4 sm:p-5 md:p-6 lg:p-8 pb-5 sm:pb-6 md:pb-8 lg:pb-10 flex flex-col h-full ${
                    plan.highlight ? "bg-[#FFF5EB]" : "bg-[#F9FAFB]"
                  }`}
                >
                  <h4 className="font-inter text-base sm:text-base md:text-lg font-semibold text-[#111111] mb-4 md:mb-5 text-left">
                    {plan.title}
                  </h4>

                  <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                    {tier.strikePrices?.map((sp, k) => (
                      <span
                        key={k}
                        className="font-inter text-sm md:text-base text-gray-400 line-through"
                      >
                        {sp}
                      </span>
                    ))}
                    <span className="font-inter text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] wrap-break-words">
                      {splitPrice(tier.price).main}
                      {splitPrice(tier.price).suffix && (
                        <span className="text-xs sm:text-sm md:text-base font-normal text-gray-500">
                          {" "}{splitPrice(tier.price).suffix}
                        </span>
                      )}
                    </span>
                  </div>

                  {tier.tiers ? (
                    <div className="mb-4 md:mb-5 space-y-2">
                      {tier.tiers.map((t, k) => (
                        <div
                          key={k}
                          className="rounded-md border border-gray-200 bg-white px-3 py-2"
                        >
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <span className="font-inter text-xs font-semibold text-[#111111] text-left">
                              {t.label}
                            </span>
                            <span className="font-inter text-xs sm:text-sm font-semibold text-[#FF7A00] text-right">
                              {splitPrice(t.perPerson).main}
                              {splitPrice(t.perPerson).suffix && (
                                <span className="font-normal text-gray-400">
                                  {" "}{splitPrice(t.perPerson).suffix}
                                </span>
                              )}
                            </span>
                          </div>
                          <p className="font-inter text-xs text-gray-500 mt-0.5 text-left">
                            {t.total}
                          </p>
                          {t.additional && (() => {
                            const m = t.additional.match(/^(.*?)(₹[\d,]+)(\/[a-zA-Z\/]+)?$/);
                            if (!m) {
                              return (
                                <p className="font-inter text-xs text-[#FF7A00] mt-1 text-left">
                                  {t.additional}
                                </p>
                              );
                            }
                            const [, prefix, amount, suffix] = m;
                            return (
                              <p className="font-inter text-xs mt-1 text-left">
                                <span className="text-[#FF7A00] font-semibold">
                                  {prefix}{amount}
                                </span>
                                {suffix && (
                                  <span className="text-gray-400 text-[14px]">{suffix}</span>
                                )}
                              </p>
                            );
                          })()}
                        </div>
                      ))}
                      {tier.note && (
                        <p className="font-inter text-[11px] text-gray-400 pt-1 text-left">
                          {tier.note}
                        </p>
                      )}
                    </div>
                  ) : tier.note ? (
                    <p className="font-inter text-xs text-gray-500 mb-4 md:mb-5 leading-relaxed text-left">
                      {tier.note}
                    </p>
                  ) : (
                    <div className="mb-4 md:mb-5" />
                  )}

                  <p className="font-inter text-sm sm:text-sm md:text-base text-[#5C5C5C] mb-4 sm:mb-5 md:mb-6 leading-relaxed text-left">
                    {plan.description}
                  </p>

                  <div className="mt-4 flex justify-center">
                    <button
                      className={`w-full md:w-full border py-3 md:py-3.5 rounded-[7px]  text-sm md:text-base font-inter transition-colors duration-200 ${plan.btnStyle}`}
                    >
                      {plan.btnText}
                    </button>
                  </div>
                </div>

                {/* Bottom Section (White Background) */}
                <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white flex-1 flex flex-col">
                  <div className="mb-5">
                    <span className="font-inter text-sm sm:text-base font-semibold text-[#111111] block mb-3 md:mb-4 text-left">
                      {cms?.includes_label || "What's Included"}
                    </span>
                    <div className="space-y-3 sm:space-y-3 md:space-y-4">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-[#FFF0E0] flex items-center justify-center">
                              <Check
                                className="w-3.5 h-3.5 text-[#FF7A00]"
                                strokeWidth={3}
                              />
                            </div>
                          </div>
                          <span className="font-inter text-sm md:text-base text-[#111111] leading-tight text-left">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    {plan.includesNote && (
                      <p className="font-inter text-sm text-[#5C5C5C] italic mt-4 text-left">
                        {plan.includesNote}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto pt-3">
                    <p className="font-inter text-sm sm:text-sm font-semibold text-[#111111] mb-1 text-left">
                      {plan.audience_note || cms?.audience_note || "For Individual researchers, faculty, authors"}
                    </p>
                    <p className="font-inter text-sm text-[#FF9534] italic font-medium text-left">
                      {plan.footer_note || cms?.footer_note || "Note: Best value for professionals"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}