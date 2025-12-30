import React from "react";

export default function LeaderboardFinalCTA() {
  return (
    <section className="w-full py-12 md:py-20 bg-white px-4 md:px-[120px]">
      <div className="w-full bg-[#EAEAEA] rounded-2xl p-8 md:p-28 text-center">
        <h2 className="text-[#1E1E1E] mb-6 md:mb-10 text-2xl md:text-4xl">
          Lorem ipsum dolor
          <br />
          self amet consectetur
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#e66e00] transition-colors w-fit shadow-lg shadow-orange-200">
            CTA Button
          </button>
          <button className="font-inter bg-[#1E1E1E] text-white px-4 py-2 rounded-xl font-medium hover:bg-black transition-colors w-fit">
            CTA Button
          </button>
        </div>
      </div>
    </section>
  );
}
