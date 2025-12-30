interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function PrimaryButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  size = "md",
}: PrimaryButtonProps) {
  const baseStyles =
    "flex justify-center items-center font-inter font-medium rounded-xl transition-all hover:opacity-90 whitespace-nowrap";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-4 py-2 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-[#FF7A00] text-white shadow-lg shadow-orange-200 hover:-translate-y-0.5",
    secondary: "bg-white text-gray-900 border border-gray-300",
    outline: "border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00]/10",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
