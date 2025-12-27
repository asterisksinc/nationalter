import React from "react";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="w-full py-20 md:py-32 bg-white px-4 md:px-[120px]">
      <div className="w-full flex flex-col items-center text-center">
        <div className="mb-8 md:mb-10">
          <span className="bg-[#FFF5EB] text-[#FF7A00] px-4  rounded-full text-sm font-medium border border-[#FFD6B3]">
            CTA Section
          </span>
        </div>

        <h3 className="text-[#1E1E1E] mb-10 md:mb-16 text-3xl md:text-3xl">
          Claim Your Academic Identity.
          <br />
          Shape Your Research Legacy.
        </h3>

        <p className="p1 text-[#5C5C5C] mt-10 mb-14 md:mb-20 w-full md:w-[900px]">
          Whether you are a researcher building visibility, or an institution
          managing thousands of profiles  Nationcite gives you verified control,
          transparent impact measurement, and trusted national recognition.
        </p>

        <div className="flex py-6 flex-col md:flex-row gap-8 justify-center">
          <button className="bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium text-lg hover:bg-[#e66e00] transition-colors shadow-lg shadow-orange-200 w-fit">
            Claim Your Profile
          </button>
          <button className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl font-medium text-lg hover:bg-black transition-colors w-fit">
            Request Institution Dashboard{" "}
          </button>
        </div>
      </div>

      {/* Full-width Image Section */}
      <div className="w-screen relative left-[calc(-50vw+50%)] px-[76px] mt-12 md:mt-16">
        <img
          src="/CTA Section Image - Nationcite.png"
          alt="Nationcite CTA Section"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </section>
  );
}
