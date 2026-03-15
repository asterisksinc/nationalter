import React from "react";

type NarrativeCms = {
  kicker?: string;
  heading?: string;
  paragraphs?: Array<{ text?: string }>;
};

const DEFAULT_CMS: Required<NarrativeCms> = {
  kicker: "How we Calculate",
  heading: "Lorem ipsum dolor\nSelf Amet",
  paragraphs: [
    { text: "Nationcite was born from a simple realization: businesses don&apos;t fail due to lack of ideas, they fail due to lack of execution-grade systems. We exist to bridge this gap by building digital products, platforms, and infrastructures that are reliable, scalable, and future-ready." },
    { text: "At our core, we are architects of digital ecosystems. We blend strategy, design, engineering, and automation to create solutions that remove friction from growth. Every product we build is designed with one intention: to help brands operate smarter, move faster, and scale stronger." },
    { text: "Today, Nationcite partners with startups, enterprises, and innovators across industries, powering their digital journeys with precision, accountability, and long-term thinking." },
  ],
};

export default function RightCard({ cms }: { cms?: NarrativeCms }) {
  const content = {
    ...DEFAULT_CMS,
    ...(cms || {}),
    paragraphs:
      cms?.paragraphs && cms.paragraphs.length > 0 ? cms.paragraphs : DEFAULT_CMS.paragraphs,
  };

  return (
    <section className="w-full py-8 md:py-12 section-padding">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Column: Badge & Heading */}
        <div className="text-center md:text-left">
          <span className="inline-block text-[#FF7A00] font-medium mb-4 md:mb-6 text-sm tracking-wide uppercase">
            {content.kicker}
          </span>
          <h3 className="text-[#1E1E1E] text-3xl md:text-5xl font-semibold leading-tight text-center md:text-left">
            {content.heading.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < content.heading.split("\n").length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </h3>
        </div>

        {/* Right Column: Text Content */}
        <div className="space-y-4 text-[#5C5C5C] text-center md:text-left">
          <p className="text-sm sm:text-base leading-relaxed">{content.paragraphs[0]?.text || ""}</p>
          <br />
          <p className="text-sm sm:text-base leading-relaxed">{content.paragraphs[1]?.text || ""}</p>
          <br />
          <p className="text-sm sm:text-base leading-relaxed">{content.paragraphs[2]?.text || ""}</p>
        </div>
      </div>
    </section>
  );
}
