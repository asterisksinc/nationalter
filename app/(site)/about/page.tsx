"use client";

import React from "react";
import "./hero-style.css";
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
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] min-h-screen sm:h-screen flex flex-col items-center justify-center text-center page-bg py-8 sm:py-10 md:py-10 lg:py-10">
        {/* BADGE */}
        <span
          className="
      inline-block
      bg-white
      text-[#F76A23]
      border border-[#F76A23]/30
      px-2 sm:px-3 md:px-3 lg:px-3 py-1
      rounded-[6px]
      font-medium text-xs sm:text-sm md:text-sm lg:text-sm
      tracking-wide uppercase
      shadow-sm
      mt-4 sm:mt-5 md:mt-5 lg:mt-5
      mb-2 sm:mb-4 md:mb-4 lg:mb-4
    "
        >
          About Nationcite
        </span>

        {/* HEADING */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 md:mb-6 lg:mb-6">
          Building The Digital Infrastructure <br className="hidden sm:block" />{" "}
          for Tomorrow's brands
        </h1>

        {/* DESCRIPTION */}
        <div className="px-4 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-lg mt-10 md:mt-5 inline-block mx-auto mb-6 sm:mb-8 md:mb-8 lg:mb-8">
          <p className="text-sm sm:text-lg md:text-lg lg:text-xl text-[#5C5C5C] leading-relaxed">
            <span className="block max-w-[500px] mx-auto">
              Nationcite builds intelligent digital infrastructure to help
              brands scale with clarity and speed.
            </span>
          </p>
        </div>

        {/* CTA */}
        <div className="w-full px-4 flex justify-center sm:w-auto sm:px-0">
          <button
            onClick={scrollToNextSection}
            className="bg-[#FF7A00] text-white px-4 sm:px-6 md:px-6 lg:px-6 w-auto py-2 rounded-md sm:rounded-lg text-sm sm:text-base md:text-base lg:text-base font-medium hover:bg-[#ff8d28] active:bg-[#ff6d00] transition duration-200 shadow hover:shadow-md focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2"
          >
            Explore Our Ecosystem
          </button>
        </div>
      </section>

      {/* two img placehodlers blocks.. one block with 70% width and other with 30% width..section padding 120px on left and right.. */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-[120px] w-full py-8 sm:py-10 md:py-12 lg:py-12">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
          {/* 70% block */}
          <div className="w-full md:w-[65%] h-[320px] sm:h-[420px] md:h-[500px] lg:h-[600px] bg-neutral-200 rounded-md sm:rounded-lg flex items-center justify-center">
            <span className="text-neutral-500 text-sm sm:text-base md:text-base lg:text-base">
              Image 1{" "}
            </span>
          </div>

          {/* 30% block */}
          <div className="w-full md:w-[35%] h-[280px] sm:h-[320px] md:h-[500px] lg:h-[600px] bg-neutral-300 rounded-md sm:rounded-lg flex items-center justify-center">
            <span className="text-neutral-600 text-sm sm:text-base md:text-base lg:text-base">
              Image 2{" "}
            </span>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
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
            Where Vision Meets Engineering Excellence
          </h3>
        </div>
        <div className="space-y-3 sm:space-y-6 md:space-y-6 lg:space-y-8 text-[#5C5C5C] text-center md:text-left">
          <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            Nationcite was born from a simple realization: businesses don't fail
            due to lack of ideas, they fail due to lack of execution-grade
            systems. We exist to bridge this gap by building digital products,
            platforms, and infrastructures that are reliable, scalable, and
            future-ready.
          </p>
          <br />
          <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            At our core, we are architects of digital ecosystems. We blend
            strategy, design, engineering, and automation to create solutions
            that remove friction from growth. Every product we build is designed
            with one intention: to help brands operate smarter, move faster, and
            scale stronger.
          </p>
          <br />
          <p className="text-sm sm:text-base md:text-base lg:text-base leading-relaxed">
            Today, Nationcite partners with startups, enterprises, and
            innovators across industries, powering their digital journeys with
            precision, accountability, and long-term thinking.
          </p>
        </div>
      </section>
      <section className="px-4 sm:px-6 md:px-8 lg:px-[120px] w-full py-8 sm:py-10 md:py-12 lg:py-12">
        <div className="w-full h-[380px] sm:h-[380px] md:h-[500px] lg:h-[650px] mb-8 sm:mb-10 md:mb-12 lg:mb-12 bg-orange-100 border-2 rounded-md sm:rounded-lg"></div>
      </section>

      <TrustedBy />

      {/* The Minds Powering Nationcite Section */}
      <section className="w-full py-10 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-[120px] bg-white">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-10 lg:gap-12">
          <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-[#1E1E1E]">
            The Minds Powering Nationcite
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
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16">
        <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start text-center lg:text-left">
          <h3 className="mb-4 sm:mb-6 md:mb-6 lg:mb-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl">
            Why Organizations Choose Us
          </h3>
          <p className="text-sm sm:text-base md:text-base lg:text-base text-[#5C5C5C] leading-relaxed">
            A reliable platform built for scale, security, and long-term growth.
          </p>
        </div>

        <div className="lg:w-3/5 lg:ml-auto flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 lg:max-w-xl">
          {[
            "Innovation",
            "Scalability",
            "Precision",
            "Transparency",
            "Reliability",
            "Speed",
            "Security",
            "Ownership",
            "Performance",
            "Adaptability",
            "Vision",
            "Automation",
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
                    {reason}
                  </h5>
                  <p className="text-sm sm:text-sm md:text-sm lg:text-base text-[#5C5C5C] mt-1 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </main>
  );
}
