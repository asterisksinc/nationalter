import React from "react";

export default function LeaderboardFinalCTA() {
  return (
    <section className="w-full py-20 md:py-28 bg-white px-4 md:px-[120px]">
      <div className="w-full bg-[#EAEAEA] rounded-md sm:rounded-lg p-10 md:p-32 text-center min-h-[320px] md:min-h-[420px] flex flex-col items-center justify-center">
        <h2 className="text-[#1E1E1E] mb-6 md:mb-10 text-2xl md:text-4xl font-semibold text-center">
          Lorem ipsum dolor
          <br />
          self amet consectetur
        </h2>

        <div className="flex flex-row flex-nowrap justify-center gap-6 mt-4">
          <button className="font-inter bg-[#FF7A00] text-white px-6 py-3 rounded-[7px] font-medium hover:bg-[#e66e00] transition-colors w-fit shadow-md">
            CTA Button
          </button>
          <button className="font-inter bg-[#1E1E1E] text-white px-6 py-3 rounded-[7px] font-medium hover:bg-black transition-colors w-fit shadow-sm">
            CTA Button
          </button>
        </div>
      </div>
    </section>
  );
}
