import React from "react";
import Badge from "@/components/ui/Badge";

type BigCardCms = {
  kicker?: string;
  heading?: string;
  paragraphs?: Array<{ text?: string }>;
  image?: string;
};

const DEFAULT_CMS: Required<BigCardCms> = {
  kicker: "Lorem ipsum",
  heading: "Lorem ipsum\ndolor self amet",
  paragraphs: [
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis." },
    { text: "Tempus leo eu aenean sed diam urna tempor, Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere." },
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis." },
  ],
  image: "",
};

export default function Thebigcard({ cms }: { cms?: BigCardCms }) {
  const content = {
    ...DEFAULT_CMS,
    ...(cms || {}),
    paragraphs:
      cms?.paragraphs && cms.paragraphs.length > 0 ? cms.paragraphs : DEFAULT_CMS.paragraphs,
  };

  return (
    <section className="w-full py-8 md:py-12 bg-white section-padding">
      {/* Main Container Card - Cream Background */}
      <div className="w-full bg-white rounded-md sm:rounded-lg py-6 md:py-16">
        {/* Top Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 items-start mb-8 md:mb-12">
          {/* Left Column: Headings */}
          <div className="text-center md:text-left">
            <Badge> Lorem ipsum </Badge>
            <h3 className="text-[#1E1E1E] text-3xl md:text-5xl font-semibold leading-tight text-center md:text-left">
              {content.heading.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < content.heading.split("\n").length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h3>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="space-y-6 text-[#5C5C5C] text-center md:text-left">
            <p className="text-sm sm:text-base leading-relaxed">{content.paragraphs[0]?.text || ""}</p>
            <br className="hidden md:block" />
            <p className="text-sm sm:text-base leading-relaxed">{content.paragraphs[1]?.text || ""}</p>
            <br className="hidden md:block" />
            <p className="text-sm sm:text-base leading-relaxed">{content.paragraphs[2]?.text || ""}</p>
          </div>
        </div>

        {/* Bottom Image/Placeholder Section */}
        <div className="w-full h-[250px] md:h-[500px] relative rounded-md sm:rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
          {content.image ? <img src={content.image} alt={content.heading} className="absolute inset-0 w-full h-full object-cover" /> : null}
          {/* Checkerboard Pattern */}
          <div
            className="absolute inset-0 w-full h-full"
            style={content.image ? { display: "none" } : {
              backgroundImage: `linear-gradient(45deg, #E5E5E5 25%, transparent 25%), linear-gradient(-45deg, #E5E5E5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E5E5E5 75%), linear-gradient(-45deg, transparent 75%, #E5E5E5 75%)`,
              backgroundSize: `40px 40px`,
              backgroundPosition: `0 0, 0 20px, 20px -20px, -20px 0`,
              opacity: 0.8,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
