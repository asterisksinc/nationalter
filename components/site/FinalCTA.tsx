import React from "react";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="w-full py-12 md:py-16 bg-white section-padding">
      <div className="w-full mx-auto flex flex-col items-center text-center">
        <div className="mb-8 md:mb-10">
          <span className="bg-[#FFF5EB] text-[#FF7A00] px-4 py-1 rounded-[8px] text-xs sm:text-sm font-medium border border-[#FFD6B3] inline-block">
            Get Verified
          </span>
        </div>

        <h3 className="text-[#1E1E1E] mb-8 md:mb-12 text-3xl md:text-3xl text-center">
          Your work deserves to be seen
        </h3>

        <p className="text-[#5C5C5C] text-sm md:text-base mt-6 mb-10 md:mb-16 w-full md:w-[600px] text-center leading-relaxed">
          Don't let your hard-earned citations get lost in the noise. Join
          India's top researchers on the leaderboard today.
        </p>

        <div className="flex py-6 flex-col md:flex-row gap-6 justify-center items-center">
          <button className="font-inter bg-[#FF7A00] text-white px-2 py-1.5 rounded-[7px] font-medium text-base sm:text-lg hover:bg-[#e66e00] transition-colors shadow-lg shadow-orange-200 w-full md:w-auto max-w-[360px] text-center">
            Claim My Profile Now
          </button>
        </div>
      </div>

      {/* Full-width Image Section */}
      <div className="w-full mt-12 md:mt-16">
        <img
          src="/CTA Section Image - Nationcite.png"
          alt="Nationcite CTA Section"
          className="w-full h-auto rounded-md sm:rounded-lg"
        />
      </div>
    </section>
  );
}
