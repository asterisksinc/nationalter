interface BenefitCardProps {
  title: string;
  description: string;
  index?: number;
}

export default function BenefitCard({
  title,
  description,
  index = 0,
}: BenefitCardProps) {
  const benefitTitles = [
    "Boost Research Visibility",
    "Track Academic Progress",
    "Build Your Network",
  ];

  const benefitDescriptions = [
    "Increase your research visibility and reach within the global academic community.",
    "Monitor your publication impact and H-index growth over time.",
    "Connect with collaborators and expand your research partnerships.",
  ];

  const displayTitle = title || benefitTitles[index % 3];
  const displayDescription = description || benefitDescriptions[index % 3];

  return (
    <div className="relative flex flex-col justify-end items-center p-5 md:p-6 gap-3 md:gap-4 h-auto md:h-[450px] w-full bg-[#EAEAEA] rounded-md sm:rounded-lg md:rounded-2xl shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)] group transition-shadow duration-300">
      <div className="flex flex-col items-center gap-1 md:gap-2 w-full">
        <h4 className="text-sm md:text-base font-semibold text-center text-[#252525]">
          {displayTitle}
        </h4>
        <p className="text-xs md:text-sm text-center text-[#252525]">
          {displayDescription}
        </p>
      </div>
    </div>
  );
}
