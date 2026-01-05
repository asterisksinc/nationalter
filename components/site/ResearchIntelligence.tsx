import React from "react";

export default function ResearchIntelligence() {
  return (
    <section className="w-full py-12 md:py-16 bg-white section-padding">
      <div className="w-full mx-auto">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="mb-4">
            <span className="bg-[#FFF5EB] text-[#FF7A00] px-4 py-1 rounded-[8px] text-xs sm:text-sm font-medium border border-[#FFD6B3] inline-block">
              Intelligence
            </span>
          </div>
          <h3 className="text-[#1E1E1E] text-2xl md:text-3xl mb-4 text-center">
            The Research Playbook
          </h3>
          <p className="text-[#5C5C5C] mx-auto text-center text-sm sm:text-base leading-relaxed">
            Strategies to increase your citations, win grants, and publish in Q1
            journals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "How to boost your H-index in 6 months",
              desc: "Actionable steps to get your old work noticed again.",
            },
            {
              title: "The Grant Writing Checklist",
              desc: "What the committees are actually looking for this year.",
            },
            {
              title: 'Stop ignoring "Altmetrics"',
              desc: "Why social media mentions are starting to matter for tenure.",
            },
            {
              title: "Understanding the Nationcite Algorithm",
              desc: "How we calculate your rank compared to your peers.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer research-card bg-[#F5F5F5] rounded-md sm:rounded-lg overflow-hidden flex flex-col h-full"
            >
              {/* Image Container - Now inside the card */}
              <div className="h-40 md:h-[250px] lg:h-[350px] w-full relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gray-200/50 transition-colors"></div>
                {/* Optional: Add a subtle overlay or placeholder pattern here if needed to match the 'checkerboard' look, 
                    but keeping it clean as per original code style. */}
              </div>

              {/* Text Content - Now inside the card with padding */}
              <div className="p-4 md:p-6 pt-4 md:pt-5 flex flex-col gap-1 md:gap-2 flex-1">
                <h4 className="text-[#1E1E1E] transition-colors text-base sm:text-base md:text-lg font-semibold leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-sm md:text-base text-[#5C5C5C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 md:mt-12">
          <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-[7px] font-medium text-sm sm:text-base md:text-lg hover:bg-[#E66A00] transition-colors shadow-lg shadow-orange-200 w-auto max-w-sm text-center">
            Read All Guides
          </button>
        </div>
      </div>
    </section>
  );
}
