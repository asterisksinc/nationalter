import React from "react";

type LeaderboardFinalCtaCms = {
  heading?: string;
  primary_cta_label?: string;
  primary_cta_url?: string;
  secondary_cta_label?: string;
  secondary_cta_url?: string;
  background_image?: string;
};

const DEFAULT_CMS: Required<LeaderboardFinalCtaCms> = {
  heading: "Lorem ipsum dolor self amet consectetur",
  primary_cta_label: "CTA Button",
  primary_cta_url: "#",
  secondary_cta_label: "CTA Button",
  secondary_cta_url: "#",
  background_image: "",
};

export default function LeaderboardFinalCTA({ cms }: { cms?: LeaderboardFinalCtaCms }) {
  const content = { ...DEFAULT_CMS, ...(cms || {}) };

  return (
    <section className="w-full py-20 md:py-28 bg-white section-padding">
      <div
        className="w-full bg-[#EAEAEA] rounded-md sm:rounded-lg p-10 md:p-32 text-center min-h-[320px] md:min-h-[420px] flex flex-col items-center justify-center"
        style={
          content.background_image
            ? {
                backgroundImage: `url(${content.background_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <h2 className="text-[#1E1E1E] mb-6 md:mb-10 text-2xl md:text-4xl font-semibold text-center">
          {content.heading}
        </h2>

        <div className="flex flex-row flex-nowrap justify-center gap-6 mt-4">
          <a href={content.primary_cta_url} className="font-inter bg-[#FF7A00] text-white px-6 py-3 rounded-[7px] font-medium hover:bg-[#e66e00] transition-colors shadow-md whitespace-nowrap min-w-[120px]">
            {content.primary_cta_label}
          </a>

          <a href={content.secondary_cta_url} className="font-inter bg-[#1E1E1E] text-white px-6 py-3 rounded-[7px] font-medium hover:bg-black transition-colors shadow-none whitespace-nowrap min-w-[120px]">
            {content.secondary_cta_label}
          </a>
        </div>
      </div>
    </section>
  );
}
