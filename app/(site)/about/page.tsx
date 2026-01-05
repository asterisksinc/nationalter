"use client";

import React from "react";
import SiteHero from "@/components/site/SiteHero";
import Badge from "@/components/ui/Badge";
import TrustedBy from "@/components/site/TrustedBy";
import FAQSection from "@/components/site/FAQSection";
import FinalCTA from "@/components/site/FinalCTA";
import { Check } from "lucide-react";

export default function AboutPage() {
  const scrollToNextSection = () => {
    const heroSection = document.querySelector("section");
    const nextSection = heroSection?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <SiteHero>
        {/* BADGE */}
        <Badge>About Nationcite</Badge>

        {/* HEADING */}
        <h1 className="mb-8 text-center">
          <span className="block sm:inline">
            The Digital Backbone of&nbsp; India&apos;s Research&nbsp; Ecosystem
          </span>
          <span className="block sm:inline"></span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
          Nationcite is not just an index; we are the intelligence layer for
          Indian academia.
        </p>

        {/* CTA */}
        <div className="flex justify-center w-full">
          <button
            onClick={scrollToNextSection}
            className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-base transition-colors hover:bg-[#ff8c1a] shadow-lg shadow-orange-200 mt-6"
          >
            Explore Our Vision
          </button>
        </div>
      </SiteHero>

      {/* two img placehodlers blocks.. one block with 70% width and other with 30% width..section padding 120px on left and right.. */}
      <section className="px-4 sm:px-8 lg:px-[120px] w-full py-8 sm:py-10 md:py-12 lg:py-12">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
          {/* 70% block */}
          <div className="w-full md:w-[65%] h-[320px] sm:h-[420px] md:h-[350px] lg:h-[600px] bg-neutral-200 rounded-md sm:rounded-lg flex items-center justify-center">
            <span className="text-neutral-500 text-sm sm:text-base md:text-base lg:text-base">
              Image 1{" "}
            </span>
          </div>

          {/* 30% block */}
          <div className="w-full md:w-[35%] h-[280px] sm:h-[320px] md:h-[350px] lg:h-[600px] bg-neutral-300 rounded-md sm:rounded-lg flex items-center justify-center">
            <span className="text-neutral-600 text-sm sm:text-base md:text-base lg:text-base">
              Image 2{" "}
            </span>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full px-4 sm:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
        <div className="text-center md:text-left">
          <span
            className="
  inline-block
  bg-white
  text-[#F76A23]
  border border-[#F76A23]/30
  px-2 sm:px-3 md:px-3 lg:px-3 py-1
  rounded-[7px]
  font-medium text-xs sm:text-sm md:text-sm lg:text-sm
  tracking-wide uppercase
  shadow-sm mb-3 sm:mb-4 md:mb-4 lg:mb-4  
"
          >
            Who we are
          </span>
          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug">
            Where Scientific Rigor Meets Digital Precision
          </h3>
        </div>
        <div className="space-y-3 sm:space-y-6 md:space-y-6 lg:space-y-8 text-[#5C5C5C] text-center md:text-left">
          <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            Nationcite was born from a critical gap in the academic landscape:
            while Indian researchers were producing world-class work, their
            impact was often lost in fragmented, unverified databases. We exist
            to solve this visibility crisis by building a unified,
            high-integrity infrastructure that validates every citation and
            every scholar.
          </p>
          <br />
          <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            At our core, we are data architects. We don&apos;t just "list"
            researchers; we benchmark them. By blending verified manual curation
            with advanced analytics, we create the single source of truth that
            universities, grant committees, and policymakers can trust.
          </p>
          <br />
          <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            Today, Nationcite stands as the definitive platform for academic
            benchmarking, empowering thousands of researchers to reclaim the
            credit they deserve and helping institutions measure their true
            standing in the global arena.
          </p>
        </div>
      </section>
      <section className="px-4 sm:px-8 lg:px-[120px] w-full py-8 sm:py-10 md:py-12 lg:py-12">
        <div className="w-full h-[380px] sm:h-[380px] md:h-[500px] lg:h-[650px] mb-8 sm:mb-10 md:mb-12 lg:mb-12 bg-orange-100 border-2 rounded-md sm:rounded-lg"></div>
      </section>

      <TrustedBy />

      {/* The Minds Powering Nationcite Section */}
      <section className="w-full py-10 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-[120px] bg-white">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-10 lg:gap-12">
          <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-[#1E1E1E]">
            The Architects of Integrity
          </h3>

          {/* Team Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="group cursor-pointer rounded-md sm:rounded-lg bg-[#F2F2F2] pb-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image Placeholder */}
                <div className="w-full aspect-square rounded-md sm:rounded-lg bg-[#E6E6E6] mb-3 sm:mb-4 md:mb-4 lg:mb-4" />

                {/* Text */}
                <div>
                  <h5 className="p2 px-3 text-base sm:text-base md:text-base lg:text-base font-medium text-[#1E1E1E] leading-snug">
                    Team Member Name
                  </h5>
                  <p className="p3 text-sm sm:text-sm md:text-sm lg:text-sm px-3 text-[#6B6B6B] mt-1 leading-relaxed">
                    Lorem ipsum dolor sit amet,
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15 Reasons to Join Us */}
      <section className="w-full px-4 sm:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16">
        <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start text-center lg:text-left">
          <h3 className="mb-4 sm:mb-6 md:mb-6 lg:mb-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl">
            Why Researchers Choose Nationcite
          </h3>
          <p className="text-sm sm:text-base md:text-base lg:text-base text-[#5C5C5C] leading-relaxed">
            A verified platform built for precision, transparency, and long-term
            academic growth.
          </p>
        </div>

        <div className="lg:w-3/5 lg:ml-auto flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 lg:max-w-xl">
          {[
            {
              title: "Vision-Driven",
              desc: "We don't just count citations; we are building the future of academic reputation.",
            },
            {
              title: "Verified Truth",
              desc: "We rely on human-governed data, not just blind algorithms.",
            },
            {
              title: "Execution-Focused",
              desc: "We turn complex bibliometric data into clear, actionable rankings.",
            },
            {
              title: "Scalable Systems",
              desc: "Built to index millions of papers without compromising speed.",
            },
            {
              title: "Transparent Workflows",
              desc: "You see exactly how your score is calculated. No black boxes.",
            },
            {
              title: "Long-Term Partnerships",
              desc: "We grow with you, from your first paper to your emeritus status.",
            },
            {
              title: "Data-Backed Decisions",
              desc: "Every rank and metric is defensible and audit-ready.",
            },
            {
              title: "Security-First",
              desc: "Your profile data is protected by enterprise-grade encryption.",
            },
            {
              title: "Future-Ready",
              desc: "Our infrastructure evolves faster than the academic landscape.",
            },
            {
              title: "End-to-End Ownership",
              desc: "From data ingestion to final ranking, we control the quality chain.",
            },
            {
              title: "Precision Engineering",
              desc: 'We distinguish between "A. Sharma" and "Aditya Sharma" with zero error.',
            },
            {
              title: "Growth-Oriented",
              desc: "Our tools are designed to help you increase your H-index, not just watch it.",
            },
            {
              title: "Automation Expertise",
              desc: "Smart workflows that handle the heavy lifting of data entry.",
            },
            {
              title: "Compliance-Ready",
              desc: "Fully aligned with national data standards and DPDP protocols.",
            },
            {
              title: "Global Standards",
              desc: "We benchmark Indian research against international metrics.",
            },
          ].map((reason, i) => (
            <div
              key={i}
              className="bg-white p-3 sm:p-4 md:p-4 lg:p-5 rounded-md sm:rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-2 sm:gap-3 md:gap-3 lg:gap-3">
                <div className="w-6 sm:w-6 md:w-7 lg:w-7 mt-1 sm:mt-2 md:mt-2 lg:mt-2 h-6 sm:h-6 md:h-7 lg:h-7 text-[#F76A23] bg-orange-50 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" />
                </div>
                <div>
                  <h5 className="font-medium text-sm sm:text-base md:text-base lg:text-lg text-neutral-800">
                    {reason.title}
                  </h5>
                  <p className="text-sm sm:text-sm md:text-sm lg:text-base text-[#5C5C5C] mt-1 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQSection
        kicker="Know Nationcite"
        title="Transparency is Our Currency"
        faqItems={[
          {
            question: "What exactly does Nationcite do?",
            answer:
              "We are India's centralized H-index registry. We verify researchers, calculate their true impact, and rank them on a national leaderboard.",
          },
          {
            question: "How is this different from Google Scholar?",
            answer:
              "Google Scholar is automated and often inaccurate. Nationcite uses verified, curated data to ensure 100% attribution accuracy.",
          },
          {
            question: "Is my data safe?",
            answer:
              "Absolutely. We adhere to strict data protection laws and give you total control over your profile visibility.",
          },
          {
            question: "How do you handle name duplicates?",
            answer:
              "We use a hybrid system of unique identifiers (like ORCID) and manual human review to ensure citations are assigned correctly.",
          },
          {
            question: "Can institutions use this for accreditation?",
            answer:
              "Yes. Our reports are designed to support NAAC, NIRF, and grant applications with verified data.",
          },
          {
            question: "How does the ranking system work?",
            answer:
              "Rankings are dynamic, based on a composite score of H-index, total citations, and recent impact velocity.",
          },
        ]}
      >
        You have questions about how your reputation is managed. We have clear
        answers.
      </FAQSection>

      {/* Custom CTA for About Page */}
      <section className="w-full py-12 md:py-16 bg-white px-4 sm:px-8 lg:px-[120px]">
        <div className="w-full mx-auto flex flex-col items-center text-center">
          <div className="mb-8 md:mb-10">
            <span className="bg-[#FFF5EB] text-[#FF7A00] px-4 py-1 rounded-[8px] text-xs sm:text-sm font-medium border border-[#FFD6B3] inline-block">
              Join the Ecosystem
            </span>
          </div>

          <h3 className="text-[#1E1E1E] mb-8 md:mb-12 text-3xl md:text-3xl text-center">
            Claim Your Place on the Leaderboard
          </h3>

          <p className="text-[#5C5C5C] text-sm md:text-base mt-6 mb-10 md:mb-16 w-full md:w-[600px] text-center leading-relaxed">
            Your hard work deserves to be recognized. Join the platform that is
            defining the standard for Indian research excellence.
          </p>

          <div className="flex py-6 flex-row md:flex-row gap-3 justify-center items-center">
            <button className="font-inter bg-[#1E1E1E] text-white px-4 py-1.5 rounded-[7px] font-medium text-sm sm:text-lg hover:bg-black transition-colors w-auto text-center whitespace-nowrap">
              Search Directory
            </button>

            <button className="font-inter bg-[#FF7A00] text-white px-4 py-1.5 rounded-[7px] font-medium text-sm sm:text-lg hover:bg-[#e66e00] transition-colors shadow-lg shadow-orange-200 w-auto text-center whitespace-nowrap">
              Get Verified Now
            </button>
          </div>
        </div>

        {/* Full-width Image Section */}
        <div className="w-full mt-12 md:mt-16">
          <img
            src="/CTA Section Image - Nationcite.png"
            alt="Nationcite CTA Section"
            className="w-full h-auto rounded-md sm:rounded-lg"
          />
        </div>
      </section>

      {/* CTA Banner Section */}
    </main>
  );
}
