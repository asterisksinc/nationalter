"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";
import FinalCTA from "@/components/site/FinalCTA";
import FAQSection from "@/components/site/FAQSection";
const items = [
  {
    title: "Lorem ipsum dolor self amet, consectetur",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Lorem ipsum dolor self amet, consectetur",
    body: "Second item content goes here. You can change this later.",
  },
  {
    title: "Lorem ipsum dolor self amet, consectetur",
    body: "Third item content goes here. You can change this later.",
  },
  {
    title: "Lorem ipsum dolor self amet, consectetur",
    body: "Fourth item content goes here. You can change this later.",
  },
  {
    title: "Lorem ipsum dolor self amet, consectetur",
    body: "Fifth item content goes here. You can change this later.",
  },
];
export default function BlogPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] min-h-screen sm:h-screen flex flex-col items-center justify-center text-center page-bg py-8 sm:py-10 md:py-10 lg:py-10">
        {/* BADGE */}
        <span className="inline-block bg-white text-[#F76A23] border border-[#F76A23]/30 px-2 sm:px-3 md:px-3 lg:px-3 py-1 rounded-[6px] font-medium text-xs sm:text-sm md:text-sm lg:text-sm tracking-wide uppercase shadow-sm mt-4 sm:mt-5 md:mt-5 lg:mt-5 mb-2 sm:mb-4 md:mb-4 lg:mb-4">
          Resources
        </span>

        {/* HEADING */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 md:mb-6 lg:mb-6">
          Lorem ipsum dolor
          <br className="hidden sm:block" />
          sit amet consectetur
        </h1>

        {/* DESCRIPTION */}
        <div className="px-4 sm:p-4 md:p-5 lg:p-6 rounded-2xl inline-block mx-auto mb-6 sm:mb-8 md:mb-8 lg:mb-8">
          <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C]">
            <span className="block max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </p>
        </div>

        {/* CTA */}
        <div className="w-full px-4 flex justify-center sm:w-auto sm:px-0">
          <button className="bg-white text-[#1E1E1E] border border-gray-300 px-4 sm:px-6 md:px-6 lg:px-6 py-2 sm:py-3 md:py-3 lg:py-3 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-xl text-sm sm:text-base md:text-base lg:text-base font-medium hover:bg-gray-50 transition duration-200 w-full sm:w-auto">
            Explore Resources
          </button>
        </div>
      </section>

      {/* First Blog Grid Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug mb-6 sm:mb-8 md:mb-8 lg:mb-8">
            Lorem ipsum
            <br />
            dolor self amet
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="group cursor-pointer rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="w-full bg-[#f5f5f5]">
                  <img
                    src="/dummy/test.png"
                    alt="Blog post image"
                    className="w-full h-40 sm:h-48 md:h-48 lg:h-48 object-cover"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-4 lg:p-5">
                  <h5 className="text-sm sm:text-base md:text-base lg:text-lg font-medium text-[#1E1E1E] mb-2 leading-snug">
                    Lorem ipsum dolor slef amet
                  </h5>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-[#6B6B6B] mb-3 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <Link
                    href="/blog/example-post"
                    className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#FF7A00] hover:text-[#ff8d28] transition-colors inline-flex items-center gap-1"
                  >
                    Learn more <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Feature Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-0 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl overflow-hidden shadow-lg">
          <div className="min-h-[300px] md:min-h-[420px] bg-[url('/dummy/test.png')] bg-[length:40px_40px] bg-repeat flex items-center">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-6 text-[#252525]">
                Lorem ipsum dolor
                <br />
                sit amet consectetur
                <br className="hidden md:block" />
                Lorem ipsum dolor sit
              </h3>
              <p className="text-sm sm:text-base md:text-base lg:text-base text-[#5C5C5C] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="bg-[#FFF7EE] flex items-center">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-6 text-[#252525]">
                Lorem ipsum dolor
                <br />
                sit amet
              </h3>
              <p className="text-sm sm:text-base md:text-base lg:text-base text-[#5C5C5C] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Blog Grid Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-10 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-snug mb-6 sm:mb-8 md:mb-8 lg:mb-8">
            Lorem ipsum
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="group cursor-pointer rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="w-full bg-[#f5f5f5]">
                  <img
                    src="/dummy/test.png"
                    alt="Blog post image"
                    className="w-full h-40 sm:h-48 md:h-48 lg:h-48 object-cover"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-4 lg:p-5">
                  <h5 className="text-sm sm:text-base md:text-base lg:text-lg font-medium text-[#1E1E1E] mb-2 leading-snug">
                    Lorem ipsum dolor slef amet
                  </h5>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-[#6B6B6B] mb-3 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <Link
                    href="/blog/example-post"
                    className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-[#FF7A00] hover:text-[#ff8d28] transition-colors inline-flex items-center gap-1"
                  >
                    Learn more <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ/Accordion Section */}
            

      <FinalCTA />
    </>
  );
}
