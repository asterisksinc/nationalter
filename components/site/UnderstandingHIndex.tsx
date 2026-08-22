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

type HIndexCms = {
  heading?: string;
  subheading?: string;
  cards?: Array<{ title: string; description: string; video_url?: string }>;
};

export default function UnderstandingHIndex({ cms }: { cms?: HIndexCms }) {
  const fallbackCards = [
    {
      title: "What Is the H-Index?",
      description:
        "A balance of productivity and citations measuring sustained scholarly influence.",
      video_url: "/creatives/what is h index.mov"
    },
    {
      title: "Why It Matters",
      description:
        "Used globally for representing research credibility, and institutional benchmarking.",
      video_url: "/creatives/why it matters_.mov"
    },
    {
      title: "The Raw Number Problem",
      description:
        "Citation cultures differ across fields, raw scores alone are misleading.",
      video_url: "/creatives/The raw number problem_.mov"
    },
    {
      title: "Field-Normalized Percentiles",
      description:
        "You’re compared only with peers in your discipline for true fairness.",
      video_url: "/creatives/field normalised_.mov"
    },
    {
      title: "Beyond One Metric",
      description:
        "Additional indicators ensure balanced, and responsible research assessment.",
      video_url: "/creatives/Beyond one metric_.mov"
    },
  ];

  return renderComponent({
    header: {
      heading: cms?.heading || "The Number That Defines Your Career",
      subheading:
        cms?.subheading ||
        "Your H-index is more than just a statistic. In modern academia, it is your currency. Here is why it matters.",
    },
    cards: cms?.cards && cms.cards.length > 0 ? cms.cards : fallbackCards,
  });
}

function renderComponent({
  header,
  cards,
}: {
  header: { heading: string; subheading: string };
  cards: Array<{ title: string; description: string; video_url?: string }>;
}) {

  return (
    <section className="w-full bg-white py-12 md:py-16 section-padding">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h3 className="h3 mb-3 md:mb-4 max-w-[500px] md:max-w-[700px] text-center">
            {header.heading}
          </h3>
          <p className="text-gray-500 max-w-[350px] md:max-w-[700px] text-center text-sm sm:text-base leading-relaxed">
            {header.subheading}
          </p>
        </div>

        {/* Mobile Layout - Simple Cards */}
        <div className="md:hidden space-y-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden"
            >
              {card.video_url ? (
                <video src={card.video_url} className="w-full flex-1 object-cover" loop autoPlay muted></video>
              ): (
                <CheckerboardPattern className="w-full flex-1" />
              )}
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
                className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col h-[420px]"
              >
                {card.video_url ? (
                <video src={card.video_url} className="w-full flex-1 object-cover" loop autoPlay muted></video>
              ): (
                <CheckerboardPattern className="w-full flex-1" />
              )}
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
                className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col h-[420px]"
              >
                {card.video_url ? (
                <video src={card.video_url} className="w-full flex-1 object-cover" loop autoPlay muted></video>
              ): (
                <CheckerboardPattern className="w-full flex-1" />
              )}
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
