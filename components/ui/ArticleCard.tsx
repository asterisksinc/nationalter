interface ArticleCardProps {
  title: string;
  category: string;
  date: string;
  description: string;
  hasImage?: boolean;
}

export default function ArticleCard({
  title,
  category,
  date,
  description,
  hasImage = true,
}: ArticleCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-none md:rounded-sm transition-all duration-300">
      {hasImage && (
        <div className="w-full h-96 bg-gray-50 rounded-md sm:rounded-lg border border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden mb-6 transition-colors">
          <div className="text-gray-300 flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <svg
                width="32"
                height="32"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              >
                <rect x="4" y="6" width="24" height="18" rx="2" />
                <circle cx="12" cy="15" r="3" />
              </svg>
            </div>
            <span className="text-sm font-medium">Feature Image</span>
          </div>
        </div>
      )}

      <div className="flex flex-col grow px-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">
          <span className="text-indigo-600">{category}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{date}</span>
        </div>

        <p className="text-gray-600 text-sm sm:text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
