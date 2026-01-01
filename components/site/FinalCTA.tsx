import React from "react";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="w-full py-12 md:py-16 bg-white px-4 md:px-[72px]">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-8 md:mb-10">
          <span className="bg-[#FFF5EB] text-[#FF7A00] px-4 py-1 rounded-[8px] text-sm font-medium border border-[#FFD6B3] inline-block">
            CTA Section
          </span>
        </div>

        <h3 className="text-[#1E1E1E] mb-8 md:mb-12 text-3xl md:text-3xl">
          Claim Your Academic Identity.
          <br />
          Shape Your Research Legacy.
        </h3>

        <p className="p2 text-[#5C5C5C] text-sm md:text-base mt-6 mb-10 md:mb-16 w-full md:w-[600px]">
          Whether you are a researcher building visibility, or an institution
          managing thousands of profiles Nationcite gives you verified control,
          transparent impact measurement, and trusted national recognition.
        </p>

        <div className="flex py-6 flex-col md:flex-row gap-6 justify-center items-center">
          <button className="font-inter bg-[#1E1E1E] text-white px-2 py-1.5 rounded-[7px] font-medium text-lg hover:bg-black transition-colors w-full md:w-auto max-w-[360px] text-center">
            Request Institution Dashboard
          </button>
          <button className="font-inter bg-[#FF7A00] text-white px-2 py-1.5 rounded-[7px] font-medium text-lg hover:bg-[#e66e00] transition-colors shadow-lg shadow-orange-200 w-full md:w-auto max-w-[360px] text-center">
            Claim Your Profile
          </button>
        </div>
      </div>

      {/* Full-width Image Section */}
      <div className="w-screen relative left-[calc(-50vw+50%)] px-4 md:px-[76px] mt-12 md:mt-16">
        <img
          src="/CTA Section Image - Nationcite.png"
          alt="Nationcite CTA Section"
          className="w-full h-auto rounded-lg md:rounded-2xl"
        />
      </div>
    </section>
  );
}
