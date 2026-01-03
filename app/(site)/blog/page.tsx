"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import SiteHero from "@/components/site/SiteHero";
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
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <SiteHero>
        {/* BADGE */}
        <Badge>Resources</Badge>

        {/* HEADING */}
        <h1 className="mb-8">
          Lorem ipsum dolor
          <br className="hidden sm:block" /> sit amet consectetur
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-[#5C5C5C] pt-4 mb-10 max-w-[500px] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </SiteHero>

      {/* First Blog Grid Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[120px] py-0 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="bg-[#f5f5f5] rounded-lg sm:rounded-xl p-1 sm:p-1 md:p-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-10 lg:mb-10">
            {/* Search Input */}
            <div className="w-full sm:flex-1">
              <input
                type="text"
                placeholder="Search for Resources"
                className="w-full px-4 py-2 sm:py-2.5 text-sm text-black rounded-md sm:rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent font-inter placeholder-gray-500"
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-sm text-black border border-gray-200 bg-white rounded-md sm:rounded-lg hover:bg-gray-100 hover:border-gray-600 transition-colors font-inter shadow-md z-50"
                >
                  <span>Sort</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {/* Sort Dropdown Menu */}
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md sm:rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSortBy("newest");
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-inter transition-colors ${
                        sortBy === "newest"
                          ? "bg-orange-50 text-[#FF7A00]"
                          : "text-black hover:bg-gray-50"
                      }`}
                    >
                      Newest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("oldest");
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-inter transition-colors border-t border-gray-200 ${
                        sortBy === "oldest"
                          ? "bg-orange-50 text-[#FF7A00]"
                          : "text-black hover:bg-gray-50"
                      }`}
                    >
                      Oldest
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-sm text-black border border-gray-200 bg-white rounded-md sm:rounded-lg hover:bg-gray-100 hover:border-gray-600 transition-colors font-inter shadow-md z-50">
                <span>Filter</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <article
                key={i}
                className="group cursor-pointer rounded-md sm:rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="w-full bg-[#f5f5f5]">
                  <img
                    src="/dummy/test.png"
                    alt="Blog post image"
                    className="w-full h-40 sm:h-48 md:h-48 lg:h-48 object-cover"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-4 lg:p-5">
                  <h5 className="text-base sm:text-base md:text-base lg:text-lg font-medium text-[#1E1E1E] mb-2 leading-snug">
                    Lorem ipsum dolor slef amet
                  </h5>
                  <p className="text-sm sm:text-sm md:text-sm lg:text-sm text-[#6B6B6B] mb-3 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <Link
                    href="/blog/example-post"
                    className="text-sm sm:text-sm md:text-sm lg:text-sm font-medium text-[#FF7A00] hover:text-[#ff8d28] transition-colors inline-flex items-center gap-1"
                  >
                    Learn more <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      <FinalCTA />
    </main>
  );
}
