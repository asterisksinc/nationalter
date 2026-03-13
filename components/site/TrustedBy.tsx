import React from "react";
import {
  Zap,
  Triangle,
  Sprout,
  MousePointer2,
  Hexagon,
  Globe,
  Anchor,
  Box,
} from "lucide-react";

interface Logo {
  name: string;
  icon: React.ReactNode;
  image?: string;
  url?: string;
}

// Data set: 8 Logos
const logos: Logo[] = [
  { name: "Luminous", icon: <Zap className="w-5 h-5" /> },
  { name: "Trace", icon: <Triangle className="w-5 h-5" /> },
  { name: "ProNature", icon: <Sprout className="w-5 h-5" /> },
  { name: "Nextmove", icon: <MousePointer2 className="w-5 h-5" /> },
  { name: "Vertex", icon: <Hexagon className="w-5 h-5" /> },
  { name: "Global", icon: <Globe className="w-5 h-5" /> },
  { name: "Harbor", icon: <Anchor className="w-5 h-5" /> },
  { name: "CubeSys", icon: <Box className="w-5 h-5" /> },
];

type TrustedByCms = {
  heading?: string;
  logos?: Array<{ name: string; image?: string; url?: string }>;
};

const DEFAULT_HEADING = "Trusted by India&apos;s Top Institutions";

const TrustedBy = ({ cms }: { cms?: TrustedByCms }) => {
  const renderedLogos =
    cms?.logos && cms.logos.length > 0
      ? cms.logos.map((logo, idx) => ({
          name: logo.name,
          image: logo.image,
          url: logo.url,
          icon: logos[idx % logos.length]?.icon,
        }))
      : logos;

  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden section-padding">
      <div className="w-full mx-auto flex flex-col gap-8">
        <div className="w-full text-center">
          <div className="inline-block max-w-3xl">
            <p className="text-gray-500 text-sm sm:text-sm md:text-lg mt-3 mx-auto text-center">
              {cms?.heading || DEFAULT_HEADING}
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {/* Moving Track */}
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] py-2">
            {renderedLogos.map((logo, index) => (
              <LogoItem key={`set1-${index}`} logo={logo} />
            ))}
            {renderedLogos.map((logo, index) => (
              <LogoItem key={`set2-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

// Logo Item Component
const LogoItem = ({ logo }: { logo: Logo }) => (
  <div className="flex items-center justify-center w-[40vw] md:w-[14vw] shrink-0 px-2">
    <a
      href={logo.url || "#"}
      className="flex items-center gap-2 group cursor-default"
    >
      {/* Icon */}
      <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 rounded-md sm:rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600 transition-colors duration-300">
        {logo.image ? (
          <img src={logo.image} alt={logo.name} className="w-5 h-5 object-contain" />
        ) : (
          logo.icon
        )}
      </div>

      {/* Text */}
      <span className="text-sm sm:text-sm md:text-lg font-semibold text-gray-600 group-hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">
        {logo.name}
      </span>
    </a>
  </div>
);

export default TrustedBy;
