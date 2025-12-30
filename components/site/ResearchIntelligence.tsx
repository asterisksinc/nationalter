import React from "react";

export default function ResearchIntelligence() {
  return (
    <section className="w-full py-12 md:py-16 bg-white px-4 md:px-[72px]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h3 className="text-[#1E1E1E] text-2xl md:text-3xl mb-4">
            Research Intelligence & <br /> Academic Insight
          </h3>
          <p className="text-[#5C5C5C] max-w-xl mx-auto">
            Stay informed with data literacy, <br /> ranking methodology, and
            research visibility best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "How the H-Index Shapes Academic Careers in India",
              desc: "A practical guide to understanding how research metrics influence promotions, funding, and reputation.",
            },
            {
              title:
                "OpenAlex vs Scopus vs Web of Science: What's the Difference?",
              desc: "A comparative breakdown of global bibliometric data ecosystems.",
            },
            {
              title:
                "How to Claim & Verify Your Research Profile on Nationcite",
              desc: "Step-by-step guide for researchers to gain ownership and improve profile accuracy.",
            },
            {
              title:
                "Preventing Metric Manipulation: Inside Nationcite's Anti-Gaming System",
              desc: "Preventing Metric Manipulation: Inside Nationcite's Anti-Gaming System",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer research-card bg-[#F5F5F5] rounded-lg md:rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image Container - Now inside the card */}
              <div className="h-40 md:h-[350px] w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-200/50 transition-colors"></div>
                {/* Optional: Add a subtle overlay or placeholder pattern here if needed to match the 'checkerboard' look, 
                    but keeping it clean as per original code style. */}
              </div>

              {/* Text Content - Now inside the card with padding */}
              <div className="p-4 md:p-6 pt-4 md:pt-5 flex flex-col gap-1 md:gap-2">
                <h4 className="text-[#1E1E1E] transition-colors text-sm md:text-lg font-semibold">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-[#5C5C5C]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 md:mt-12">
          <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium text-lg hover:bg-[#E66A00] transition-colors shadow-lg shadow-orange-200 w-auto max-w-sm text-center">
            Explore All Research & Insights
          </button>
        </div>
      </div>
    </section>
  );
}
