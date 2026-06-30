"use client";

import React from "react";
import { Check } from "lucide-react";
import SiteHero from "@/components/site/SiteHero";
import PricingSection from "@/components/site/PricingSection";
import FAQSection from "@/components/site/FAQSection";
import FinalCTA from "@/components/site/FinalCTA";
import "./pricing-style.css";
import Head from "next/head";
import { useCmsPage } from "@/lib/use-cms-page";

const DEFAULT_CMS = {
  hero: {
    desktop_background_image: "/Bg.jpg",
    mobile_background_image: "/Mobile_Responsive.jpg",
  },
  pricing: {
    badge_text: "Membership",
    heading: "Fair Plans for Serious Professionals",
  },
  tables: {
    overview_title: "Overview & Pricing",
    addons_title: "Add-ons (Optional for all)",
  },
  faq: {
    kicker: "Common Questions",
    title: "Why Nationcite",
    body:
      "Everything you need to know about NationCite, its purpose, and how it works.",
    faq_items: [
      {
        question: "What does NationCite actually do?",
        answer:
          "NationCite brings together public ranking, verified profiles, and institutional analytics so researchers and institutions can see and prove their research impact in one place, rather than piecing it together across disconnected citation tools.",
      },
      {
        question: "Is there a free way to get started?",
        answer:
          "Every researcher can claim a public, ranked profile at no cost, credibility-building starts before any payment is involved.",
      },
      {
        question: "What does the verified badge actually mean?",
        answer:
          "The Professional badge reflects an actual review and claim process, so a verified profile carries real signal for recruiters, collaborators, and funding bodies.",
      },
      {
        question: "How does institutional pricing scale?",
        answer:
          "Institutional plans get cheaper per researcher as more of your faculty or research body is onboarded, rather than charging a flat fee regardless of size.",
      },
      {
        question: "Is the data just for viewing, or can I use it?",
        answer:
          "Percentile insights, analytics reports, and quarterly impact briefs are designed to be used in promotion files, grant applications, and institutional reporting, not just dashboards to glance at.",
      },
      {
        question: "Does the platform work for both individuals and institutions?",
        answer:
          "The same underlying profile and ranking system works whether you're a single faculty member on Professional or a university onboarding hundreds of researchers on Institutional.",
      },
      {
        question: "What if my data is inaccurate?",
        answer:
          "From self-serve correction submissions on Free, to priority turnaround on Professional, to bulk corrections at the institutional level, every tier has a way to keep your data accurate.",
      },
    ],
  },
  final_cta: {
    kicker: "Get Verified",
    heading: "Your work deserves to be seen",
    body:
      "Don't let your hard-earned citations get lost in the noise. Join India's top researchers on the leaderboard today.",
    primary_cta_label: "Claim My Profile Now",
    banner_image: "/CTA Section Image - Nationcite.png",
    banner_alt: "Nationcite CTA Section",
  },
};

export default function PricingPage() {
  const cms = useCmsPage("pricing", DEFAULT_CMS);

  return (
    <> <Head>
      <title>NationCite Pricing | Research Analytics Plans</title>
      <meta
        name="description"
        content="Access verified researcher rankings, institutional dashboards, and cohort analytics with flexible subscription plans. View Pricing Options."
      />
      <meta
        name="keywords"
        content="research ranking subscription India, institutional analytics pricing, h-index dashboard India"
      />
      <meta property="og:title" content="NationCite Pricing | Research Analytics Plans" />
      <meta property="og:description" content="Flexible plans for researchers, universities, and enterprises." />
    </Head>
      <div className="bg-white  font-sans">
        {/* Hero / Pricing Section */}
        <SiteHero className="hero" cms={cms.hero}>
          <PricingSection className="bg-transparent pt-38 " isHero cms={cms.pricing} />
        </SiteHero>

        {/* Comparison Tables Section */}
        <section className="w-full section-padding py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="w-full mx-auto space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
            {/* Table 1: Overview & Pricing */}
            <div className="space-y-7">
              <h4 className="mb-6 sm:mb-8 md:mb-10 lg:mb-10 text-center sm:text-left">
                {cms.tables.overview_title}
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
                          "Free",
                          "₹0",
                          "Individual researchers",
                          "Anyone claiming a first profile",
                        ],
                        [
                          "Professional",
                          "₹1,999/year or ₹199/month",
                          "Individual researchers, faculty, authors",
                          "Researchers building credibility and visibility",
                        ],
                        [
                          "Institutional",
                          "From ₹642–₹1,399/person (volume-based, monthly or yearly)",
                          "Universities & research institutions",
                          "Institutions managing many researcher profiles",
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

            {/* Table 2: Profile & Visibility Features */}
            <ComparisonTable
              title="Profile & Visibility Features"
              headers={[
                "Feature",
                "Free",
                "Professional",
                "Institutional",
              ]}
              rows={[
                ["Public leaderboard ranking", true, true, true],
                ["Basic profile view", true, true, true],
                ["H-index by source", true, true, true],
                ["Claim profile", true, true, true],
                ["Submit corrections", "individual", "individual, priority", "individual + bulk"],
                ["Verified profile badge", false, true, true],
                ["Priority modification turnaround", false, true, true],
              ]}
            />

            {/* Table 3: Analytics & Insights */}
            <ComparisonTable
              title="Analytics & Insights"
              headers={[
                "Analytics Feature",
                "Free",
                "Professional",
                "Institutional",
              ]}
              rows={[
                ["Analytics reports", "—", true, true],
                ["Percentile insights", "—", true, true],
                ["Profile coach", "—", true, true],
                ["Cohort-level analytics", "—", false, true],
                ["Quarterly impact briefs", "—", false, true],
                ["Custom reports", "—", "— (Contact Sales)", "— (Contact Sales)"],
              ]}
            />

            {/* Table 4: Institution Workspace & Capacity */}
            <ComparisonTable
              title="Institution Workspace & Capacity"
              headers={[
                "Feature",
                "Free",
                "Professional",
                "Institutional",
              ]}
              rows={[
                ["Multiple researcher profiles under one plan", false, false, "(Volume-priced per seat)"],
                ["Bulk correction requests", false, false, true],
                ["Institutional data exports", "—", false, true],
                ["API access", false, false, true],
              ]}
            />

            {/* Table 5: Support & Service */}
            <ComparisonTable
              title="Support & Service"
              headers={[
                "Service",
                "Free",
                "Professional",
                "Institutional",
              ]}
              rows={[
                ["Standard support", true, true, true],
                ["Priority correction turnaround", false, true, true],
                ["Quarterly institutional reporting", "—", "—", true],
              ]}
            />

            {/* Table 6: Add-ons */}
            <div>
              <h4 className="mb-3 sm:mb-4 md:mb-5 lg:mb-6   text-center sm:text-left">
                {cms.tables.addons_title}
              </h4>
              <div className="border mt-6 border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden max-w-2xl">
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
          cms={{
            ...cms.faq,
            faqItems: cms.faq.faq_items,
          }}
        />

        {/* Bottom CTA */}
        <FinalCTA cms={cms.final_cta} />
      </div></>
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
    <>
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
      </div></>
  );
}
