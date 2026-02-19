type SegmentCard = {
  title: string;
  growth: string;
  signupsLabel: string;
  signupsValue: string;
  conversion: string;
  average: string;
  distribution: string;
  retention: string;
  progress: string;
  tone: string;
};

type PersonaSegmentGridProps = {
  cards: readonly SegmentCard[];
};

export function PersonaSegmentGrid({ cards }: PersonaSegmentGridProps) {
  return (
    <div className="ao-segment-grid">
      {cards.map((card) => (
        <div className="ao-card ao-segment-card" key={card.title}>
          <div className="ao-segment-header">
            <div className={`ao-segment-icon ${card.tone}`} />
            <div>
              <div className="ao-segment-title">{card.title}</div>
              <div className="ao-segment-growth">{card.growth}</div>
            </div>
          </div>
          <div className="ao-divider" />
          <div className="ao-segment-row">
            <div>
              <div className="ao-small-muted">{card.signupsLabel}</div>
              <div className="ao-segment-big">{card.signupsValue}</div>
            </div>
            <div>
              <div className="ao-small-muted">Registration Conversion</div>
              <div className="ao-segment-orange">{card.conversion}</div>
              <div className="ao-small-muted">Above target</div>
            </div>
          </div>
          <div className="ao-progress-track large">
            <span className="ao-progress-fill" style={{ width: card.progress }} />
          </div>
          <div className="ao-average-pill">
            <span>Average Metric</span>
            <strong>{card.average}</strong>
          </div>
          <div className="ao-segment-foot">
            <div>
              <div className="ao-small-muted">Field Distribution</div>
              <div className="ao-foot-value">{card.distribution}</div>
            </div>
            <div>
              <div className="ao-small-muted">Retention Rate</div>
              <div className="ao-segment-orange">{card.retention}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
