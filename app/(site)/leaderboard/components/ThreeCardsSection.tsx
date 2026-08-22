import React from "react";
import Badge from "@/components/ui/Badge";

type ThreeCardsCms = {
  badge_text?: string;
  heading?: string;
  subheading?: string;
  cards?: Array<{
    title?: string;
    description?: string;
    image?: string;
  }>;
};

const DEFAULT_CMS: Required<ThreeCardsCms> = {
  badge_text: "Evaluation Framework",
  heading: "Standardized. Transparent. Defensible.",
  subheading:
    "All rankings are derived from documented bibliometric methodologies, verified academic data sources, and discipline-sensitive normalization principles to ensure credibility and fairness.",
  cards: [
    {
      title: "Discipline-Normalized Assessment",
      description:
        "Researchers and institutions are evaluated within subject-specific cohorts to ensure equitable comparison across diverse academic domains.",
      image: "",
    },
    {
      title: "Verified Data Governance",
      description:
        "All metrics are sourced from recognized scholarly databases and processed under strict validation protocols to maintain data integrity.",
      image: "",
    },
    {
      title: "Standard H-Index Computation",
      description:
        "H-index values are calculated in accordance with established Hirsch methodology, ensuring methodological consistency and international comparability.",
      image: "",
    },
  ],
};

export default function ThreeCardsSection({ cms }: { cms?: ThreeCardsCms }) {
  const content = {
    ...DEFAULT_CMS,
    ...(cms || {}),
    cards: cms?.cards && cms.cards.length > 0 ? cms.cards : DEFAULT_CMS.cards,
  };

  return (
    <section className="w-full py-12 md:py-20 bg-white section-padding">
      <div className="w-full">
        <div className="w-full flex justify-center">
          <div className="flex flex-col items-center text-center mb-8 md:mb-16 gap-6 max-w-3xl">
            <Badge>{content.badge_text}</Badge>
            <h3 className="text-[#1E1E1E] mb-3 pb-0 md:mb-3 text-2xl md:text-3xl text-center">
              {content.heading}
            </h3>
            <p className="text-[#5C5C5C] mt-0 pb-0 max-w-xl text-center text-sm sm:text-base leading-relaxed">
              {content.subheading}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.cards.slice(0, 3).map((card, i) => (
            <div
              key={i}
              className="bg-[#EAEAEA] rounded-md sm:rounded-lg overflow-hidden flex flex-col h-full"
            >
              <div className="w-full h-[200px] md:h-auto lg:min-h-[500px] bg-[#EAEAEA] flex-shrink-0 md:flex-1">
                {card.image ? (
                  <img src={card.image} alt={card.title || `Card ${i + 1}`} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="p-6 md:p-10 flex flex-col flex-1">
                <h5 className="text-[#1E1E1E] mb-4 text-base sm:text-lg md:text-xl">
                  {card.title || ""}
                </h5>
                <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed">
                  {card.description || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
