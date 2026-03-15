import React from "react";

type ThreeBlocksCms = {
  heading?: string;
  subheading?: string;
  cards?: Array<{
    title?: string;
    description?: string;
    image?: string;
    link_label?: string;
    link_url?: string;
  }>;
  cta_label?: string;
  cta_url?: string;
};

const DEFAULT_CMS: Required<ThreeBlocksCms> = {
  heading: "Research Intelligence & Academic Insight",
  subheading:
    "Stay informed with data literacy, ranking methodology, and research visibility best practices.",
  cards: Array.from({ length: 3 }, () => ({
    title: "Lorem ipsum dolor slef amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "",
    link_label: "Learn More",
    link_url: "#",
  })),
  cta_label: "Explore All Resources",
  cta_url: "#",
};

export default function ThreeBlocksSection({ cms }: { cms?: ThreeBlocksCms }) {
  const content = {
    ...DEFAULT_CMS,
    ...(cms || {}),
    cards: cms?.cards && cms.cards.length > 0 ? cms.cards : DEFAULT_CMS.cards,
  };

  const card1 = content.cards[0] || DEFAULT_CMS.cards[0];
  const card2 = content.cards[1] || DEFAULT_CMS.cards[1];
  const card3 = content.cards[2] || DEFAULT_CMS.cards[2];

  return (
    <section className="w-full py-12 md:py-24 mt-10 section-padding bg-white">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h3 className="h3 mb-3 md:mb-4 max-w-[500px] md:max-w-[700px] text-center">
            {content.heading}
          </h3>
          <p className="text-gray-500 max-w-[350px] md:max-w-[700px] text-center text-sm sm:text-base leading-relaxed">
            {content.subheading}
          </p>
        </div>

        {/* MOBILE LAYOUT - Single column (Visible on Mobile & Tablet) */}
        <div className="lg:hidden flex flex-col gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col">
            <div className="w-full h-[200px] bg-gray-100 flex-shrink-0">
              {card1.image ? <img src={card1.image} alt={card1.title || ""} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                {card1.title}
              </h5>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed flex-1">
                {card1.description}
              </p>
              <a
                href={card1.link_url || "#"}
                className="text-[#F76A23] font-medium text-sm sm:text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                {card1.link_label || "Learn More"} &gt;
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col">
            <div className="w-full h-[200px] bg-gray-100 flex-shrink-0">
              {card2.image ? <img src={card2.image} alt={card2.title || ""} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                {card2.title}
              </h5>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed flex-1">
                {card2.description}
              </p>
              <a
                href={card2.link_url || "#"}
                className="text-[#F76A23] font-medium text-sm sm:text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                {card2.link_label || "Learn More"} &gt;
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col">
            <div className="w-full h-[200px] bg-gray-100 flex-shrink-0">
              {card3.image ? <img src={card3.image} alt={card3.title || ""} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                {card3.title}
              </h5>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">
                {card3.description}
              </p>
              <a
                href={card3.link_url || "#"}
                className="text-[#F76A23] font-medium text-sm sm:text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                {card3.link_label || "Learn More"} &gt;
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT - 60/40 split (Visible on Laptop/Desktop only) */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8 mb-10 lg:auto-rows-fr">
          {/* Left Column - 60% width - 2 Stacked Cards */}
          <div className="lg:col-span-3 flex flex-col gap-8 h-full">
            {/* Card 1 */}
            <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col h-full">
              <div className="w-full h-[260px] bg-gray-100 flex-shrink-0 md:order-last">
                {card1.image ? <img src={card1.image} alt={card1.title || ""} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h5 className="text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                  {card1.title}
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {card1.description}
                </p>
                <a
                  href={card1.link_url || "#"}
                  className="text-[#F76A23] font-medium text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
                >
                  {card1.link_label || "Learn More"} &gt;
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col h-full">
              <div className="w-full h-[260px] bg-gray-100 flex-shrink-0 lg:order-last">
                {card2.image ? <img src={card2.image} alt={card2.title || ""} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h5 className="text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                  {card2.title}
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {card2.description}
                </p>
                <a
                  href={card2.link_url || "#"}
                  className="text-[#F76A23] font-medium text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
                >
                  {card2.link_label || "Learn More"} &gt;
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - 40% width - 1 Tall Card */}
          <div className="lg:col-span-2 bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-none overflow-hidden flex flex-col h-full">
            <div className="w-full flex-1 bg-gray-100 lg:order-last lg:flex-[2]">
              {card3.image ? <img src={card3.image} alt={card3.title || ""} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="p-8 flex flex-col flex-shrink-0">
              <h5 className="text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                {card3.title}
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {card3.description}
              </p>
              <a
                href={card3.link_url || "#"}
                className="text-[#F76A23] font-medium text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                {card3.link_label || "Learn More"} &gt;
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a href={content.cta_url || "#"} className="bg-[#FF7A00] text-white px-6 py-2 rounded-[7px] font-medium text-sm sm:text-base transition-colors hover:bg-[#ff8c1a] shadow-md">
            {content.cta_label}
          </a>
        </div>
      </div>
    </section>
  );
}
