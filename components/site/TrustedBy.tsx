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

const TrustedBy = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white overflow-hidden px-4 md:px-[72px]">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        <div className="w-full text-center">
          <div className="inline-block max-w-3xl">
            <p className="text-gray-500  text-sm md:text-lg mt-3 mx-auto text-center">
              Trusted by Leading Academic Institutions{" "}
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
            {logos.map((logo, index) => (
              <LogoItem key={`set1-${index}`} logo={logo} />
            ))}
            {logos.map((logo, index) => (
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
  // Layout Logic:
  // - Container is ~60vw. To see 3 items, each needs to be ~20vw.
  // - px-4 makes the spacing much tighter between cards.
  <div className="flex items-center justify-center w-[50vw] md:w-[20vw] shrink-0 px-4">
    <div className="flex items-center gap-3 group cursor-default">
      {/* Placeholder Space - slightly smaller for compactness */}
      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600 transition-colors duration-300">
        {logo.icon}
      </div>

      {/* Text Label */}
      <span className="text-lg font-semibold text-gray-600 group-hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">
        {logo.name}
      </span>
    </div>
  </div>
);

export default TrustedBy;
