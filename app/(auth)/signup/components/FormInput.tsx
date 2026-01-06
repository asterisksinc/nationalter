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
      <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans tracking-wide">
        {label}
      </label>
      <input
        className={`w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] transition-all placeholder:text-neutral-400 ${error ? "border-red-500" : ""
          } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-[10px] mt-1 ml-1">{error}</p>}
    </div>
  );
};
