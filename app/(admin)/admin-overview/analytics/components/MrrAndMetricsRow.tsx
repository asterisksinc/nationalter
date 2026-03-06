type SparklineSets = {
  greenA: string;
  greenB: string;
  greenC: string;
  redA: string;
};

type MrrAndMetricsRowProps = {
  sparklines: SparklineSets;
};

export function MrrAndMetricsRow({ sparklines }: MrrAndMetricsRowProps) {
  return (
    <div className="ao-mid-grid">
      <div className="ao-card ao-donut-card">
        <div className="ao-card-title">MRR Breakdown by Persona</div>
        <div className="ao-card-big">842</div>
        <div className="ao-divider" />

        <div className="ao-donut-wrap">
          <div className="ao-donut" />
        </div>

        <div className="ao-donut-legend">
          <div className="ao-donut-row">
            <span className="ao-dot ao-dot-pro" />
            <span className="ao-donut-name">Researchers Pro</span>
            <span className="ao-donut-value">₹28.0L (66%)</span>
          </div>
          <div className="ao-donut-row">
            <span className="ao-dot ao-dot-org" />
            <span className="ao-donut-name">Org Enterprise</span>
            <span className="ao-donut-value">₹12.0L (28%)</span>
          </div>
          <div className="ao-donut-row">
            <span className="ao-dot ao-dot-med" />
            <span className="ao-donut-name">Medical Premium</span>
            <span className="ao-donut-value">₹2.5L (6%)</span>
          </div>
        </div>
      </div>

      <div className="ao-card ao-metrics-card">
        <div className="ao-metrics-head">Platform Metrics</div>
        <div className="ao-metrics-sub">Overview of MRR, active users, registrations, and core KPIs.</div>

        <div className="ao-metrics-grid">
          <div className="ao-metric-cell">
            <div className="ao-metric-top">
              <div>
                <div className="ao-metric-label">New Researchers</div>
                <div className="ao-metric-value">27/day</div>
                <div className="ao-up">↑ +25% vs last month</div>
              </div>
              <svg className="ao-spark" viewBox="0 0 70 22">
                <polyline points={sparklines.greenA} />
              </svg>
            </div>
          </div>

          <div className="ao-metric-cell">
            <div className="ao-metric-top">
              <div>
                <div className="ao-metric-label">Registration Conversion</div>
                <div className="ao-metric-value">87%</div>
                <div className="ao-up">↑ + 3%</div>
              </div>
              <svg className="ao-spark" viewBox="0 0 70 22">
                <polyline points={sparklines.greenB} />
              </svg>
            </div>
          </div>

          <div className="ao-metric-cell">
            <div className="ao-metric-top">
              <div>
                <div className="ao-metric-label">Premium Conversion</div>
                <div className="ao-metric-value">23%</div>
                <div className="ao-down">↓ - 5%</div>
              </div>
              <svg className="ao-spark ao-spark-red" viewBox="0 0 70 22">
                <polyline points={sparklines.redA} />
              </svg>
            </div>
          </div>

          <div className="ao-metric-cell">
            <div className="ao-metric-top">
              <div>
                <div className="ao-metric-label">Org Retention</div>
                <div className="ao-metric-value">94%</div>
                <div className="ao-up">↑ +2%</div>
              </div>
              <svg className="ao-spark" viewBox="0 0 70 22">
                <polyline points={sparklines.greenA} />
              </svg>
            </div>
          </div>

          <div className="ao-metric-cell">
            <div className="ao-metric-top">
              <div>
                <div className="ao-metric-label">ARIS Adoption</div>
                <div className="ao-metric-value">78%</div>
                <div className="ao-up">↑ +2%</div>
              </div>
              <svg className="ao-spark" viewBox="0 0 70 22">
                <polyline points={sparklines.greenB} />
              </svg>
            </div>
          </div>

          <div className="ao-metric-cell">
            <div className="ao-metric-top">
              <div>
                <div className="ao-metric-label">ORCID Connected</div>
                <div className="ao-metric-value">72%</div>
                <div className="ao-up">↑ +12%</div>
              </div>
              <svg className="ao-spark" viewBox="0 0 70 22">
                <polyline points={sparklines.greenC} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
