interface MethodologyCardProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function MethodologyCard({
  title,
  description,
  ctaText = "View Details",
  ctaHref = "#",
}: MethodologyCardProps) {
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-md sm:rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Placeholder */}
      <div className="w-full aspect-square mb-8 bg-gray-50 rounded-xl sm:rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="text-gray-300 flex flex-col items-center gap-2">
          <svg
            width="32"
            height="32"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
          >
            <rect x="4" y="6" width="24" height="18" rx="2" />
            <circle cx="12" cy="15" r="3" />
          </svg>
          <span className="text-xs font-medium">Image Placeholder</span>
        </div>
      </div>

      {/* Content */}
      <h4 className="h4-compact font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-[250px]">
        {description}
      </p>

      {/* CTA */}
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors mt-auto"
      >
        {ctaText}
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 3l5 5-5 5" />
          <path d="M10 8H3" />
        </svg>
      </a>
    </div>
  );
}
