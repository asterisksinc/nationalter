import React from "react";

type SecondaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function SecondaryButton({
  children,
  onClick,
  href,
  className = "",
  disabled = false,
  size = "md",
}: SecondaryButtonProps) {
  const baseStyles =
    "flex justify-center items-center font-inter font-medium rounded-md sm:rounded-lg transition-all hover:opacity-90 whitespace-nowrap";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} bg-[#1E1E1E] text-white shadow-none hover:bg-black ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonStyles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={buttonStyles}>
      {children}
    </button>
  );
}
