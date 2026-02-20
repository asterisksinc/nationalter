"use client";

import { useInViewOnce } from "./useInViewOnce";

type StatCard = {
  label: string;
  value: string;
  deltaLabel: string;
  deltaTone: "positive" | "negative";
};

type StatsSummaryProps = {
  cards: StatCard[];
};

export function StatsSummary({ cards }: StatsSummaryProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="ao-stats-container">
      {cards.map((card, idx) => (
        <div
          className={`ao-stat-card transition-all duration-700 ease-out will-change-transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: `${idx * 90}ms` }}
          key={card.label}
        >
          <div className="ao-stat-label">{card.label}</div>
          <div className="ao-stat-value">{card.value}</div>
          <div
            className={
              card.deltaTone === "positive"
                ? "ao-stat-positive"
                : "ao-stat-negative"
            }
          >
            {card.deltaLabel}
          </div>
        </div>
      ))}
    </div>
  );
}
