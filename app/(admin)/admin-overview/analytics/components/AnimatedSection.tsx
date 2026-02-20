"use client";

import React from "react";
import { useInViewOnce } from "./useInViewOnce";

type AnimatedSectionProps = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
};

export function AnimatedSection({
  children,
  delayMs = 0,
  className = "",
}: AnimatedSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
