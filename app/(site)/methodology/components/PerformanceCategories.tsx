import React from "react";

type Performance = {
  heading?: string;
  categories?: {
    icon?: string;
    title: string;
    description: string;
  }[];
};

const DEFAULT_CATEGORIES = [
  {
    icon: "E",
    title: "Elite",
    description: "Top 10% within the discipline.",
  },
  {
    icon: "E",
    title: "High",
    description: "Among the strongest researchers in the field.",
  },
  {
    icon: "E",
    title: "Above Average",
    description: "Consistently outperforming the majority of peers.",
  },
  {
    icon: "E",
    title: "Average",
    description: "Demonstrating steady scholarly contribution.",
  },
];

const PerformanceCategories = ({ cms }: { cms: Performance }) => {
  const categories = cms.categories && cms.categories.length > 0 ? cms.categories : DEFAULT_CATEGORIES;

  return (
    <section className="w-full py-10 md:py-16 bg-white section-padding">
      <div className="mx-auto w-full">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mt-5 text-3xl font-semibold leading-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
            {cms.heading || "Performance Categories"}
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
          {categories.slice(0, 4).map((category, index) => (
            <article
              key={category.title}
              className="group rounded-3xl border border-gray-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffeee0] hover:shadow-[0_10px_30px_rgba(247,106,35,0.1)]"
            >
              <div className="flex justify-start">
                <div className="inline-flex h-12 w-12 mb-2 items-center justify-center rounded-full bg-[#f9f6f3] text-sm font-semibold text-[#C95D10]">
                  {category.icon || `0${index + 1}`}
                </div>
              </div>

              <h4 className="mt-5 text-lg font-medium leading-tight text-[#1E1E1E]">
                {category.title}
              </h4>

              <p className="mt-3 text-sm leading-7 text-[#5C5C5C] sm:text-base">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceCategories;
