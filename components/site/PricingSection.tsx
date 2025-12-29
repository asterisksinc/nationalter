import React, { useState } from "react";
import { Check } from "lucide-react";

export default function PricingSection({ className }: { className?: string }) {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
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

  return (
    <section
      className={`w-full py-12 md:py-16 min-h-screen font-sans px-4 md:px-[72px] ${
        className || "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-[#111111] mb-6 md:mb-8 text-2xl md:text-3xl">
            Free Access for Discovery & <br /> Premium Tools for Power Users
          </h3>

          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="bg-[#F3F4F6] p-1 rounded-lg inline-flex items-center gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("switch")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingCycle === "switch"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Switch
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-lg md:rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                plan.highlight
                  ? "border border-[#FF9534] shadow-[0_0_40px_-5px_rgba(255,149,52,0.3)] scale-100 z-10"
                  : "border border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Top Section (Colored Background) */}
              <div
                className={`p-5 md:p-8 pb-6 md:pb-10 flex flex-col h-full ${
                  plan.highlight ? "bg-[#FFF5EB]" : "bg-[#F9FAFB]"
                }`}
              >
                <h4 className="text-sm md:text-base font-semibold text-[#111111] mb-3 md:mb-4">
                  {plan.title}
                </h4>

                <div className="flex items-baseline gap-1 mb-3 md:mb-4">
                  <span className="text-2xl md:text-4xl font-bold text-[#111111]">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 font-normal text-xs md:text-lg">
                    / year
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#5C5C5C] mb-4 md:mb-8">
                  {plan.description}
                </p>

                <button
                  className={`w-full py-3 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition-colors duration-200 ${plan.btnStyle}`}
                >
                  {plan.btnText}
                </button>
              </div>

              {/* Bottom Section (White Background) */}
              <div className="p-6 md:p-8 bg-white flex-1 flex flex-col">
                <div className="mb-6">
                  <span className="text-base font-bold text-[#111111] block mb-4 md:mb-5">
                    What's Included
                  </span>
                  <div className="space-y-3 md:space-y-4">
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
                        <span className="text-sm md:text-[15px] text-[#111111] leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    For Individual researchers, faculty, authors
                  </p>
                  <p className="text-xs text-[#FF9534] italic font-medium">
                    Note: Best value for professionals
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
