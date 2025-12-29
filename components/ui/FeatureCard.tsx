interface FeatureCardProps {
  title: string;
  description: string;
  hasImage?: boolean;
  imagePosition?: "top" | "bottom" | "right" | "left";
  variant?: "default" | "small" | "large";
  children?: React.ReactNode;
}

export default function FeatureCard({
  title,
  description,
  hasImage = true,
  imagePosition = "right",
  variant = "default",
  children,
}: FeatureCardProps) {
  const isRow = imagePosition === "right" || imagePosition === "left";
  const isReverse = imagePosition === "left";

  if (variant === "small") {
    return (
      <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 min-h-[300px]">
        <div className="flex-1 flex flex-col justify-end">
          <h4 className="text-sm md:text-base font-semibold text-[#111] mb-2 md:mb-3">
            {title}
          </h4>
          <p className="text-xs md:text-sm text-[#666666]">{description}</p>
        </div>
        {hasImage && (
          <div className="w-full md:w-[200px] h-56 md:h-72 bg-[#f0f0f0] rounded-lg md:rounded-xl"></div>
        )}
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 min-h-auto md:min-h-72">
        <div className="flex-1 max-w-[480px] flex flex-col justify-center">
          <h4 className="text-sm md:text-lg font-semibold text-[#111] mb-2 md:mb-4">
            {title}
          </h4>
          <p className="text-xs md:text-sm text-[#666666]">{description}</p>
        </div>
        {hasImage && (
          <div className="w-full md:w-[320px] h-56 md:h-72 bg-[#f0f0f0] rounded-lg md:rounded-xl"></div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-[#FAFAFA] rounded-xl md:rounded-3xl p-6 md:p-10 flex flex-col ${
        isRow ? "md:flex-row" : ""
      } items-center gap-4 md:gap-6 min-h-auto md:min-h-[300px] ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <h4 className="text-sm md:text-base font-semibold text-[#111] mb-2 md:mb-3">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-[#666666]">{description}</p>
      </div>
      {hasImage && (
        <div className="w-full md:w-40 h-40 bg-[#f0f0f0] rounded-lg md:rounded-xl"></div>
      )}
      {children}
    </div>
  );
}
