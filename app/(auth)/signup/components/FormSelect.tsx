interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const FormSelect = ({ label, options, ...props }: SelectProps) => {
  return (
    <div className="w-full relative">
      <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5 md:mb-2 font-sans">
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full px-3 md:px-4 py-3 md:py-2.5 text-sm md:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all appearance-none bg-white cursor-pointer text-neutral-800 touch-manipulation"
          {...props}
        >
          <option value="" disabled selected>
            Select
          </option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 md:px-4 pointer-events-none text-neutral-400">
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
