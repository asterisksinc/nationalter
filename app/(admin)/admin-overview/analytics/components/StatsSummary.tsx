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
  return (
    <div className="ao-stats-container">
      {cards.map((card) => (
        <div className="ao-stat-card" key={card.label}>
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
