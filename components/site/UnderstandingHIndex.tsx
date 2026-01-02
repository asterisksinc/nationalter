import React from "react";

const CheckerboardPattern = ({ className }: { className?: string }) => (
  <div className={`overflow-hidden relative bg-gray-50 ${className}`}>
    <div
      className="absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage: `
          linear-gradient(45deg, #cbd5e1 25%, transparent 25%),
          linear-gradient(-45deg, #cbd5e1 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #cbd5e1 75%),
          linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    />
  </div>
);

export default function UnderstandingHIndex() {
  const cards = [
    {
      title: "What is the H-Index?",
      description:
        "It measures both productivity and impact by balancing total publications with citation performance.",
    },
    {
      title: "Why H-Index Matters",
      description:
        "It reflects sustained scholarly influence not just one successful paper.",
    },
    {
      title: "Beyond Citation Counts",
      description:
        "Unlike raw citations, H-Index prevents inflation through a single highly-cited work.",
    },
    {
      title: "Institutional Benchmarking",
      description:
        "Helps universities assess research output and discipline strengths.",
    },
    {
      title: "Academic Visibility",
      description:
        "Higher H-index improves visibility in global research databases.",
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 md:px-[72px]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h3 className="h3 mb-3 md:mb-4 max-w-[500px] md:max-w-[700px] text-center">
            Understanding the H-Index <br /> Backbone of Research Impact
          </h3>
          <p className="p1 text-gray-500 max-w-[350px] md:max-w-[700px] text-center">
            The H-Index is more than number. It reflects consistency, influence,
            and academic credibility. Here's what it truly represents and why it
            matters.
          </p>
        </div>

        {/* Mobile Layout - Simple Cards */}
        <div className="md:hidden space-y-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <CheckerboardPattern className="w-full h-40" />
              <div className="p-4">
                <h5 className="text-xs sm:text-sm font-semibold text-[#1E1E1E] mb-1">
                  {card.title}
                </h5>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Top 3 cards, Bottom 2 cards */}
        <div className="hidden md:block space-y-3">
          {/* First Row - 3 Equal Cards */}
          <div className="grid grid-cols-3 gap-5">
            {cards.slice(0, 3).map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[420px]"
              >
                <CheckerboardPattern className="w-full flex-1" />
                <div className="p-5 pb-6">
                  <h5 className="text-xs sm:text-sm font-semibold text-[#1E1E1E] mb-2">
                    {card.title}
                  </h5>
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-snug">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 2 Cards (wider) */}
          <div className="grid grid-cols-2 gap-5">
            {cards.slice(3, 5).map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[420px]"
              >
                <CheckerboardPattern className="w-full flex-1" />
                <div className="p-5 pb-6">
                  <h5 className="text-xs sm:text-sm font-semibold text-[#1E1E1E] mb-2">
                    {card.title}
                  </h5>
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-snug">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
