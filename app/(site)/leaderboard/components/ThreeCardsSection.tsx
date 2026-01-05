import React from "react";

export default function ThreeCardsSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-white px-4 sm:px-8 lg:px-[120px]">
      <div className="w-full">
        <div className="w-full flex justify-center">
          <div className="flex flex-col items-center text-center mb-8 md:mb-16 gap-6 max-w-3xl">
            <h3 className="text-[#1E1E1E] mb-3 pb-0 md:mb-3 text-2xl md:text-3xl text-center">
              Lorem Ipsum
            </h3>
            <p className="text-[#5C5C5C] mt-0 pb-0 max-w-xl text-center text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#EAEAEA] rounded-md sm:rounded-lg overflow-hidden flex flex-col h-full"
            >
              <div className="w-full h-[200px] md:h-auto md:min-h-[500px] bg-[#EAEAEA] flex-shrink-0 md:flex-1"></div>
              <div className="p-6 md:p-10 flex flex-col flex-1">
                <h5 className="text-[#1E1E1E] mb-4 text-base sm:text-lg md:text-xl">
                  Lorem ipsum dolor sit amet
                </h5>
                <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
