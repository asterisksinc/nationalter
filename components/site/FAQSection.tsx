"use client";

import React, { useState } from "react";

export type FAQItem = { question: string; answer: string };

export default function FAQSection({
  title = "Everything You Need to Know About Us",
  kicker = "Know Nationcite",
  questions = [
    "How does Nationcite ensure project quality?",
    "What industries do you specialize in?",
    "Can you handle enterprise-scale infrastructure?",
    "What is your engagement model?",
    "How do you handle data security?",
  ],
  faqItems,
  children,
}: {
  title?: string;
  kicker?: string;
  questions?: string[];
  faqItems?: FAQItem[];
  children?: React.ReactNode;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  // Use faqItems if provided, otherwise use questions array for backwards compatibility
  const displayItems =
    faqItems || questions.map((q) => ({ question: q, answer: "" }));

  return (
    <section className="w-full px-4 sm:px-8 lg:px-[120px] pt-12 md:pt-24 flex flex-col items-center">
      {/* Header Section - Centered */}
      <div className="text-center max-w-3xl mb-12">
        <span
          className="
    inline-flex items-center
    px-4 py-1.5
    rounded-[7px]
    border border-[#F76A23]/30
    bg-[white]/10
    text-[#F76A23]
    text-xs sm:text-sm
    font-semibold
    uppercase
    tracking-wider
    mb-4
  "
        >
          {kicker}
        </span>

        <div className="w-full flex justify-center">
          <h3
            className="
      mb-6
      text-2xl md:text-3xl
      text-center
      max-w-[22ch]
      sm:max-w-none
      leading-snug
    "
          >
            {title}
          </h3>
        </div>

        <p className="text-[#5C5C5C] text-center text-sm sm:text-base leading-relaxed">
          {children ?? (
            <>
              This section answers the most common questions about Nationcite,
              who we are, how we operate, and what makes our company different
              in the digital ecosystem.
            </>
          )}
        </p>
      </div>

      {/* FAQ Items - Centered vertical list with white border */}
      <div className="w-full border border-white rounded-md sm:rounded-lg bg-white shadow-sm p-6 md:p-8">
        <div className="space-y-0">
          {displayItems.map((item, i) => (
            <div key={i} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleFaq(i)}
                className="font-inter flex justify-between items-center w-full py-6 text-left focus:outline-none"
              >
                <span
                  className={`font-medium text-base sm:text-base md:text-lg transition-colors ${
                    openFaqIndex === i ? "text-[#F76A23]" : "text-neutral-900"
                  }`}
                >
                  {item.question}
                </span>
                <span className="text-2xl font-light text-gray-400 ml-4 shrink-0">
                  {openFaqIndex === i ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqIndex === i
                    ? "max-h-96 opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-[#5C5C5C] text-sm sm:text-sm md:text-base leading-relaxed">
                  <div className="bg-gray-50 p-6 rounded-md sm:rounded-lg border border-gray-100">
                    <p>
                      {item.answer ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
