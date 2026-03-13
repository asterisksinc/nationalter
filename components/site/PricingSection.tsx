import React, { useState } from "react";
import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";

type PricingPlan = {
  title: string;
  price: string;
  description: string;
  btnText: string;
  btnStyle: string;
  highlight: boolean;
  features: string[];
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
    title: "Verified Professional",
    price: "₹999",
    description: "Build credibility. Track your research impact.",
    btnText: "Get Verified",
    btnStyle:
      "bg-white border border-gray-200 text-[#FF7A00] hover:bg-gray-50",
    highlight: false,
    features: [
      "Citation & rank trend tracking",
      "Downloadable profile report",
      "Verified profile badge",
      "Priority & personalized support",
      "Monthly auto-refresh",
      "Premium Profile Coach access",
    ],
  },
  {
    title: "Verified Professional",
    price: "₹999",
    description: "Build credibility. Track your research impact.",
    btnText: "Request Access",
    btnStyle:
      "bg-[#FF9534] border border-[#FF9534] text-white hover:bg-[#E6862D] shadow-md",
    highlight: true,
    features: [
      "Citation & rank trend tracking",
      "Verified profile badge",
      "Priority & personalized support",
      "Monthly auto-refresh",
      "Downloadable profile report",
      "Premium Profile Coach access",
    ],
  },
  {
    title: "Verified Professional",
    price: "₹999",
    description: "Build credibility. Track your research impact.",
    btnText: "Contact Sales",
    btnStyle:
      "bg-white border border-gray-200 text-[#FF7A00] hover:bg-gray-50",
    highlight: false,
    features: [
      "Citation & rank trend tracking",
      "Verified profile badge",
      "Priority & personalized support",
      "Monthly auto-refresh",
      "Downloadable profile report",
      "Premium Profile Coach access",
    ],
  },
];

export default function PricingSection({
  className,
  isHero = false,
  cms,
}: {
  className?: string;
  isHero?: boolean;
  cms?: PricingCms;
}) {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const plans = cms?.plans && cms.plans.length > 0 ? cms.plans : DEFAULT_PLANS;

  return (
    <section
      className={`w-full ${
        isHero
          ? "section-padding pt-8 pb-12"
          : "section-padding pt-24 sm:pt-32 pb-10 sm:pb-16 md:pb-20 lg:pb-24"
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
                {cms?.billing_cycle_labels?.alternate || "Switch"}
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
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
                <h4 className="font-inter text-base sm:text-base md:text-lg font-semibold text-[#111111] mb-4 md:mb-5">
                  {plan.title}
                </h4>

                <div className="flex items-baseline gap-1 mb-4 md:mb-5">
                  <span className="font-inter text-xl sm:text-2xl md:text-4xl font-bold text-[#111111]">
                    {plan.price}
                  </span>
                  <span className="font-inter text-gray-500 font-normal text-xs sm:text-xs md:text-sm">
                    / year
                  </span>
                </div>
                <p className="font-inter text-sm sm:text-sm md:text-base text-[#5C5C5C] mb-4 sm:mb-5 md:mb-6 leading-relaxed">
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
                  <span className="font-inter text-sm sm:text-base font-semibold text-[#111111] block mb-3 md:mb-4">
                    {cms?.includes_label || "What&apos;s Included"}
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
                        <span className="font-inter text-sm md:text-base text-[#111111] leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-3">
                  <p className="font-inter text-sm sm:text-sm font-semibold text-[#111111] mb-1">
                    {cms?.audience_note || "For Individual researchers, faculty, authors"}
                  </p>
                  <p className="font-inter text-sm text-[#FF9534] italic font-medium">
                    {cms?.footer_note || "Note: Best value for professionals"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
