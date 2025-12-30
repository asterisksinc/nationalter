import React from "react";

export default function ConsultancySection() {
  return (
    <section className="w-full py-8 md:py-12 bg-white px-4 md:px-[120px] overflow-hidden relative">
      <div className="w-full relative flex flex-col items-center text-center max-w-6xl mx-auto">
        {/* --- Floating Badge Icons (Decorative) --- */}
        {/* Top Left */}
        <div className="absolute top-[-40px] left-[5%] md:left-[10%] text-gray-800 opacity-80 scale-75 md:scale-100 animate-pulse-slow">
          <BadgeIcon />
        </div>
        {/* Middle Left */}
        <div className="absolute top-[35%] left-[-20px] md:left-[5%] text-gray-800 opacity-80 scale-90">
          <BadgeIcon />
        </div>
        {/* Bottom Left */}
        <div className="absolute bottom-[10%] left-[5%] md:left-[12%] text-gray-800 opacity-80 scale-75">
          <BadgeIcon />
        </div>

        {/* Top Right */}
        <div className="absolute top-[-20px] right-[5%] md:right-[15%] text-gray-800 opacity-80 scale-90">
          <BadgeIcon />
        </div>
        {/* Middle Right */}
        <div className="absolute top-[40%] right-[-10px] md:right-[5%] text-gray-800 opacity-80">
          <BadgeIcon />
        </div>
        {/* Bottom Right */}
        <div className="absolute bottom-[5%] right-[8%] md:right-[15%] text-gray-800 opacity-80 scale-75 md:scale-100">
          <BadgeIcon />
        </div>

        {/* --- Main Content --- */}

        {/* Tag */}
        <div className="mb-6 relative z-10">
          <span className="bg-[#FFF5EB] text-[#1E1E1E] pl-2 pr-4 py-1.5 rounded-full text-xs font-semibold border border-[#FFD6B3] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]"></span>
            CTA Goes Here
          </span>
        </div>

        {/* Heading */}
        <h3 className="mb-6 relative z-10 max-w-3xl">
          Custom Consultancy Calls Powered by Industry Experts
        </h3>

        {/* Subtext */}
        <p className="p2 pb-3 mb-10 relative z-10 max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Feature List */}
        <div className="flex flex-col items-start gap-4 mb-10 relative z-10">
          {[
            "Verified profile badge",
            "Monthly auto-refresh",
            "Premium Profile Coach access",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Checkmark Icon */}
              <div className="w-6 h-6 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF7A00] flex-shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="11.5 3.5 5.5 10.5 2.5 7.5"></polyline>
                </svg>
              </div>
              <span className="font-medium text-[#1E1E1E]">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium text-sm md:text-base hover:bg-[#e66e00] transition-all shadow-lg shadow-orange-200 relative z-10">
          CTA Button
        </button>
      </div>
    </section>
  );
}

// Custom Badge Icon Component (Star/Gear shape with User)
function BadgeIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-[#1E1E1E]"
    >
      {/* Badge/Star Shape */}
      <path
        d="M12 2L14.8 4.2L18.2 3.8L19.2 7.2L22.5 8.5L21.8 12L22.5 15.5L19.2 16.8L18.2 20.2L14.8 19.8L12 22L9.2 19.8L5.8 20.2L4.8 16.8L1.5 15.5L2.2 12L1.5 8.5L4.8 7.2L5.8 3.8L9.2 4.2L12 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* User Icon Inside */}
      <g transform="translate(0, 1)">
        {/* Head */}
        <circle
          cx="12"
          cy="10"
          r="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Shoulders (Arc) */}
        <path
          d="M16 16C16 13.7909 14.2091 12 12 12C9.79086 12 8 13.7909 8 16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sad mouth (optional based on image detail, simpler just to keep user abstract) */}
        {/* <path d="M10.5 10.5C10.5 10.5 11 10 11.5 10.5" strokeWidth="0.5"/> */}
      </g>
    </svg>
  );
}
