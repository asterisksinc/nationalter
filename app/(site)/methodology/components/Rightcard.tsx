import React from "react";

export default function RightCard() {
  return (
    <section className="w-full py-8 md:py-12 section-padding">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Column: Badge & Heading */}
        <div className="text-center md:text-left">
          <span className="inline-block text-[#FF7A00] font-medium mb-4 md:mb-6 text-sm tracking-wide uppercase">
            How we Calculate
          </span>
          <h3 className="text-[#1E1E1E] text-3xl md:text-5xl font-semibold leading-tight text-center md:text-left">
            Lorem ipsum dolor
            <br />
            Self Amet
          </h3>
        </div>

        {/* Right Column: Text Content */}
        <div className="space-y-4 text-[#5C5C5C] text-center md:text-left">
          <p className="text-sm sm:text-base leading-relaxed">
            Nationcite was born from a simple realization: businesses don&apos;t fail
            due to lack of ideas, they fail due to lack of execution-grade
            systems. We exist to bridge this gap by building digital products,
            platforms, and infrastructures that are reliable, scalable, and
            future-ready.
          </p>
          <br />
          <p className="text-sm sm:text-base leading-relaxed">
            At our core, we are architects of digital ecosystems. We blend
            strategy, design, engineering, and automation to create solutions
            that remove friction from growth. Every product we build is designed
            with one intention: to help brands operate smarter, move faster, and
            scale stronger.
          </p>
          <br />
          <p className="text-sm sm:text-base leading-relaxed">
            Today, Nationcite partners with startups, enterprises, and
            innovators across industries, powering their digital journeys with
            precision, accountability, and long-term thinking.
          </p>
        </div>
      </div>
    </section>
  );
}
