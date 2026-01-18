interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-2 font-sans">
        {label}
      </label>
      <input
        className={`w-full px-3 md:px-4 py-3 md:py-2.5 text-sm md:text-base border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-neutral-400 text-neutral-900 touch-manipulation ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-[10px] mt-1 ml-1">{error}</p>}
    </div>
  );
};
