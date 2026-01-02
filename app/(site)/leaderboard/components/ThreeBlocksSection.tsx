import React from "react";

export default function ThreeBlocksSection() {
  return (
    <section className="w-full py-12 md:py-24 mt-10 px-4 md:px-[72px] bg-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <h3 className="h3 mb-3 md:mb-4 max-w-[500px] md:max-w-[700px] text-center">
            Research Intelligence & <br /> Academic Insight
          </h3>
          <p className="text-gray-500 max-w-[350px] md:max-w-[700px] text-center text-sm sm:text-base leading-relaxed">
            Stay informed with data literacy, ranking methodology, and research
            visibility best practices.
          </p>
        </div>

        {/* MOBILE LAYOUT - Single column */}
        <div className="md:hidden flex flex-col gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="w-full h-[200px] bg-gray-100 flex-shrink-0"></div>
            <div className="p-6 flex flex-col flex-1">
              <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                Lorem ipsum dolor slef amet
              </h5>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed flex-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a
                href="#"
                className="text-[#F76A23] font-medium text-sm sm:text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                Learn More &gt;
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="w-full h-[200px] bg-gray-100 flex-shrink-0"></div>
            <div className="p-6 flex flex-col flex-1">
              <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                Lorem ipsum dolor slef amet
              </h5>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed flex-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a
                href="#"
                className="text-[#F76A23] font-medium text-sm sm:text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                Learn More &gt;
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="w-full h-[200px] bg-gray-100 flex-shrink-0"></div>
            <div className="p-6 flex flex-col flex-1">
              <h5 className="text-base sm:text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                Lorem ipsum dolor slef amet
              </h5>
              <p className="text-sm sm:text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a
                href="#"
                className="text-[#F76A23] font-medium text-sm sm:text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                Learn More &gt;
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT - 60/40 split */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 mb-10 md:auto-rows-fr">
          {/* Left Column - 60% width - 2 Stacked Cards */}
          <div className="md:col-span-3 flex flex-col gap-8 h-full">
            {/* Card 1 */}
            <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="w-full h-[260px] bg-gray-100 flex-shrink-0 md:order-last"></div>
              <div className="p-8 flex flex-col flex-1">
                <h5 className="text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                  Lorem ipsum dolor slef amet
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a
                  href="#"
                  className="text-[#F76A23] font-medium text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
                >
                  Learn More &gt;
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="w-full h-[260px] bg-gray-100 flex-shrink-0 md:order-last"></div>
              <div className="p-8 flex flex-col flex-1">
                <h5 className="text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                  Lorem ipsum dolor slef amet
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a
                  href="#"
                  className="text-[#F76A23] font-medium text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
                >
                  Learn More &gt;
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - 40% width - 1 Tall Card */}
          <div className="md:col-span-2 bg-white rounded-md sm:rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="w-full flex-1 bg-gray-100 md:order-last md:flex-[2]"></div>
            <div className="p-8 flex flex-col flex-shrink-0">
              <h5 className="text-base font-semibold text-[#1E1E1E] mb-3 leading-snug">
                Lorem ipsum dolor slef amet
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a
                href="#"
                className="text-[#F76A23] font-medium text-sm mt-4 hover:text-[#ff8c1a] transition-colors flex items-center gap-1"
              >
                Learn More &gt;
              </a>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-[#FF7A00] text-white px-6 py-2 rounded-[7px] font-medium text-sm sm:text-base transition-colors hover:bg-[#ff8c1a] shadow-md">
            Explore All Resources
          </button>
        </div>
      </div>
    </section>
  );
}
