"use client";

import React from "react";
import "./hero-style.css";
import PrimaryButton from "@/components/ui/PrimaryButton";
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
      <section className="w-full px-4 md:px-[120px] h-screen flex flex-col items-center justify-center text-center page-bg">
       <span className="
  inline-block
  bg-white
  text-[#F76A23]
  border border-[#F76A23]/30
  px-3 py-1
  rounded-lg
  font-medium text-sm
  tracking-wide uppercase
  shadow-sm mb-3  
">
  About Nationcite
</span>


        <h1 className="text-3xl md:text-5xl leading-tight  mb-6">
         
            Building The Digital  Infrastructure <br /> for Tomorrow's brands
          
          
        </h1>
        <div className="p-4 md:p-6 rounded-2xl inline-block mx-auto mb-8">
          <p className="p1 text-[#5C5C5C]  text-lg">
            <span className="block">
              Nationcite builds intelligent digital <br /> infrastructure
           
              to help brands scale with clarity and speed.
            </span>
          </p>
        </div>
        <div>
          <PrimaryButton
            onClick={scrollToNextSection}
            className="bg-[#FF7A00] text-white px-8 w-auto md:px-16 md:w-[250px] py-4 rounded-full hover:bg-[#ff8d28] transition-colors"
          >
            Explore Our Ecosystem
          </PrimaryButton>
        </div>
      </section>
      {/* two img placehodlers blocks.. one block with 70% width and other with 30% width..section padding 120px on left and right.. */}
   <section className="px-[120px] w-full">
  <div className="flex gap-6 w-full">
    {/* 70% block */}
    <div className="w-[65%] h-[650px] bg-neutral-200 rounded-xl flex items-center justify-center">
      <span className="text-neutral-500">Image 1 </span>
    </div>

    {/* 30% block */}
    <div className="w-[35%] h-[650px] bg-neutral-300 rounded-xl flex items-center justify-center">
      <span className="text-neutral-600">Image 2 </span>
    </div>
  </div>
</section>


      {/* Who We Are */}
      <section className="w-full  px-4 md:px-[120px] py-12  md:py-24  grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div>
         <span className="
  inline-block
  bg-white
  text-[#F76A23]
  border border-[#F76A23]/30
  px-3 py-1
  rounded-lg
  font-medium text-sm
  tracking-wide uppercase
  shadow-sm mb-3  
">
  Who we are
</span>
          <h3 className="text-2xl md:text-3xl">
            Where Vision Meets Engineering Excellence
          </h3>
        </div>
        <div className="space-y-6 md:space-y-8 text-[#5C5C5C]">
          <p className="p1">
            Nationcite was born from a simple realization: businesses don't fail
            due to lack of ideas, they fail due to lack of execution-grade
            systems. We exist to bridge this gap by building digital products,
            platforms, and infrastructures that are reliable, scalable, and
            future-ready.
          </p>
          <br />
          <p className="p1">
            At our core, we are architects of digital ecosystems. We blend
            strategy, design, engineering, and automation to create solutions
            that remove friction from growth. Every product we build is designed
            with one intention: to help brands operate smarter, move faster, and
            scale stronger.
          </p>
          <br />
          <p className="p1">
            Today, Nationcite partners with startups, enterprises, and
            innovators across industries, powering their digital journeys with
            precision, accountability, and long-term thinking.
          </p>
        </div>
      </section>
      <section className="px-[120px] w-full">
        <div className="w-full h-[650px] mb-23 bg-orange-100 border-2 ">

        </div>
      </section>

       <TrustedBy  />

      {/* The Minds Powering Nationcite Section */}
     <section className="w-full py-20 md:py-32 px-4 md:px-[120px] bg-white">
  <div className="flex flex-col items-center gap-12">
    <h3 className="md:text-4xl text-center text-[#1E1E1E]">
      The Minds Powering Nationcite
    </h3>

    {/* Team Grid */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="group cursor-pointer rounded-2xl bg-[#F2F2F2] pb-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          {/* Image Placeholder */}
          <div className="w-full aspect-square rounded-2xl bg-[#E6E6E6] mb-4" />

          {/* Text */}
          <div>
            <h5 className=" px-3 text-[#1E1E1E]">
              Team Member Name
            </h5>
            <p className="text-xs px-3 text-[#6B6B6B] mt-1">
              Lorem ipsum dolor sit amet,
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


     

      {/* 15 Reasons to Join Us */}
 <section className="w-full px-4 md:px-[120px] py-12 md:py-24 flex flex-col lg:flex-row gap-8 md:gap-16">
  <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
    <h3 className="mb-6 text-2xl md:text-3xl">Why Organizations Choose Us</h3>
    <p className="p2 text-[#5C5C5C]">
      A reliable platform built for scale, security, and long-term growth.
    </p>
  </div>
  
  <div className="lg:w-3/5 flex flex-col gap-4 md:gap-6 lg:max-w-xl">
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
        className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-start mt-16 gap-3">
          <div className="w-8 md:w-10 h-8 md:h-10 text-[#F76A23] bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Check size={18} className="md:w-5 md:h-5" />
          </div>
          <div >

            <h5 className="font-medium text-sm md:text-lg text-neutral-800">
              {reason}
            </h5>
            <p className="p2 text-[#5C5C5C] mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
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
