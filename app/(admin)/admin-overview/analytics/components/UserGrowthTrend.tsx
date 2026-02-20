import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type { TrendPoint } from "./analyticsData";

type UserGrowthTrendProps = {
  data: TrendPoint[];
};

export function UserGrowthTrend({ data }: UserGrowthTrendProps) {
  return (
    <div className="ao-card ao-chart-wrapper">
      <div>
        <div className="ao-chart-title">User Registrations vs Logins</div>
        <div className="ao-chart-subtitle">
          New registrations vs portal logins (Last 30 Days)
        </div>
      </div>
      <div className="ao-chart-divider" />

      <div className="ao-chart-area">
        <div className="ao-chart-scroll">
          <div className="ao-chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 22 }}>
                <defs>
                  <linearGradient id="aoOrangeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff8a18" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#ff8a18" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e7eaef" vertical={true} horizontal={true} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  height={44}
                  angle={-40}
                  textAnchor="end"
                  tick={{ fill: "#8b95a5", fontSize: 9 }}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.15)]}
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#8b95a5", fontSize: 10 }}
                />
                <Area
                  yAxisId="right"
                  type="linear"
                  dataKey="registrations"
                  stroke="none"
                  fill="url(#aoOrangeFill)"
                />
                <Line
                  yAxisId="right"
                  type="linear"
                  dataKey="registrations"
                  stroke="#ff8515"
                  strokeWidth={2}
                  dot={false}
                  strokeLinejoin="round"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="logins"
                  stroke="#2a66e7"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="ao-chart-legend">
        <span className="ao-legend-item">
          <span className="ao-legend-box ao-orange-box" />
          New Registrations
        </span>
        <span className="ao-legend-item">
          <span className="ao-legend-box ao-blue-box" />
          Portal Logins
        </span>
      </div>
    </div>
  );
}
