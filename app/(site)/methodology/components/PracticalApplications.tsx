import React from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

type PracticalApplicationsProps = {
    badge_text?: string;
    heading?: string;
    applications?: {
        image?: string;
        title: string;
        description: string;
    }[];
};

const DEFAULT_APPLICATIONS = [
    {
        image: "/dummy/researcher.jpg",
        title: "Researchers",
        description:
            "Benchmark performance, strengthen promotion dossiers, and monitor long-term scholarly growth.",
    },
    {
        image: "/dummy/university.jpg",
        title: "Universities",
        description:
            "Support faculty evaluation, recruitment, institutional benchmarking, and strategic planning.",
    },
    {
        image: "/dummy/medical.jpg",
        title: "Funding Agencies",
        description: "Compare research performance fairly across disciplines using normalized analytics.",
    },
    {
        image: "/dummy/test.png",
        title: "Policymakers",
        description:
            "Access evidence-based national and regional research intelligence for informed policy development.",
    },
];

const PracticalApplications = ({ cms }: { cms: PracticalApplicationsProps }) => {
    const applications =
        cms.applications && cms.applications.length > 0 ? cms.applications : DEFAULT_APPLICATIONS;

    return (
        <section className="w-full py-10 md:py-16 bg-white section-padding">
            <div className="mx-auto w-full">
                <div className="mx-auto max-w-4xl text-center">
                    <Badge>{cms.badge_text || "Who Benefits"}</Badge>

                    <h3 className="mt-5 text-3xl font-semibold leading-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
                        {cms.heading || "Research Intelligence That Supports Better Academic Decisions"}
                    </h3>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
                    {applications.slice(0, 4).map((application, index) => (
                        <article
    key={`${application.title}-${index}`}
    className="overflow-hidden rounded-3xl border border-gray-200 bg-white text-left"
>
    <div className="relative h-[450px] w-full">
        <Image
            src={application.image || "/dummy/researcher.jpg"}
            alt={application.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/40 via-40% to-white flex flex-col justify-end px-5 pb-5 sm:px-6 sm:pb-6">
            <h4 className="text-lg font-medium leading-tight text-[#1E1E1E]">
                {application.title}
            </h4>
            <p className="mt-3 text-xs leading-5 text-[#5C5C5C] sm:text-sm sm:leading-6">
                {application.description}
            </p>
        </div>
    </div>
</article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PracticalApplications
