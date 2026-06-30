import React from "react";
import Badge from "@/components/ui/Badge";

type Framework = {
    badge_text?: string;
    heading?: string;
    description?: string;
    cards?: {
        icon?: string;
        title: string;
        description: string;
    }[];
}

const DEFAULT_CARDS = [
    {
        icon: "",
        title: "Reduce Disciplinary Bias",
        description: "Ensures fair comparisons through field-normalized evaluation.",
    },
    {
        icon: "",
        title: "Reward Meaningful Impact",
        description: "Recognizes sustained scholarly influence rather than publication quantity.",
    },
    {
        icon: "",
        title: "Transparent Methodology",
        description: "Every analytical framework and calculation is publicly documented.",
    },
    {
        icon: "",
        title: "Difficult to Manipulate",
        description:
            "Verified data sources and structured evaluation reduce opportunities for metric inflation.",
    },
    {
        icon: "",
        title: "Reproducible Results",
        description: "Version-controlled methodologies ensure long-term consistency and auditability.",
    },
    {
        icon: "",
        title: "Supports Better Decisions",
        description:
            "Provides valuable insights for researchers, institutions, funding agencies, and policymakers.",
    },
];

const Framework = ({ cms }: { cms: Framework }) => {
    const cards = cms.cards && cms.cards.length > 0 ? cms.cards : DEFAULT_CARDS;

    return (
        <section className="w-full py-10 md:py-16 bg-white section-padding">
            <div className="mx-auto w-full">
                <div className="mx-auto max-w-4xl text-center">
                    <Badge>{cms.badge_text || "Framework"}</Badge>

                    <h3 className="mt-5 text-3xl font-semibold leading-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
                        {cms.heading || "Designed for Accuracy. Built for Academic Trust"}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-[#5C5C5C] sm:text-base">
                        {cms.description ||
                            "The NationCite framework is designed around internationally accepted principles of responsible research assessment. Every calculation is transparent, every methodology is documented, and every ranking emphasizes balanced scholarly contribution rather than isolated metrics or publication volume."}
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    {cards.map((card, index) => (
                        <article
                            key={`${card.title}-${index}`}
                            className="group rounded-3xl border border-gray-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_10px_30px_rgba(247,106,35,0.1)]"
                        >
                                <div className="flex justify-start">
                                    <div className="inline-flex h-12 w-12 mb-2 items-center justify-center rounded-full bg-[#f9f6f3] text-sm font-semibold text-[#C95D10]">
                                        {card.icon || `0${index + 1}`}
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-lg font-medium leading-tight text-[#1E1E1E]">
                                        {card.title}
                                    </h4>
                                    <p className="mt-3 text-sm leading-7 text-[#5C5C5C] sm:text-base">
                                        {card.description}
                                    </p>
                                </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Framework
