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
      title: "Productivity meets Impact",
      description:
        "H-index proves you don't just write papers you write papers that other scientists actually use. It is the only metric that measures both quantity and quality.",
    },
    {
      title: "Unlock More Grants",
      description:
        "Grant committees don't have time to read every paper. They look at your score. A verified H-index on Nationcite proves your track record instantly.",
    },
    {
      title: "Fast-Track Tenure",
      description:
        "Universities hire based on prestige. A high ranking on our National Leaderboard puts your resume at the top of the pile.",
    },
    {
      title: "We Catch What Others Miss",
      description:
        "Generic search engines often attribute your work to others with the same name. We verify your identity so you get credit for every citation.",
    },
    {
      title: "Speak the Global Language",
      description:
        "Whether you are applying to IIT or Oxford, the H-index is the universal standard of scientific competence.",
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-8 lg:px-[120px]">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h3 className="h3 mb-3 md:mb-4 max-w-[500px] md:max-w-[700px] text-center">
            The Number That Defines Your Career
          </h3>
          <p className="text-gray-500 max-w-[350px] md:max-w-[700px] text-center text-sm sm:text-base leading-relaxed">
            Your H-index is more than just a statistic. In modern academia, it
            is your currency. Here is why it matters.
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
                <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-1 leading-snug">
                  {card.title}
                </h5>
                <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">
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
                  <h5 className="text-base font-semibold text-[#1E1E1E] mb-2 leading-snug">
                    {card.title}
                  </h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
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
                  <h5 className="text-base font-semibold text-[#1E1E1E] mb-2 leading-snug">
                    {card.title}
                  </h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
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
