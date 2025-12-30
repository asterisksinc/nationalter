import React from "react";

export default function ThreeCardsSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-white px-4 md:px-[120px]">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6 md:gap-8">
          <div>
            <h3 className=" text-[#1E1E1E] mb-4 md:mb-6 text-2xl md:text-3xl">
              Lorem Ipsum
            </h3>
            <p className="p1 text-[#5C5C5C] max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <button className="font-inter bg-[#FF7A00] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#e66e00] transition-colors uppercase text-sm tracking-wide w-auto shadow-lg shadow-orange-200">
            CTA Button
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#EAEAEA] rounded-2xl p-6 md:p-10 min-h-[250px] md:min-h-[500px] flex flex-col justify-end"
            >
              <h5 className="text-[#1E1E1E] mb-4 text-lg md:text-xl">
                Lorem ipsum dolor sit amet
              </h5>
              <p className="p3 text-[#5C5C5C]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
