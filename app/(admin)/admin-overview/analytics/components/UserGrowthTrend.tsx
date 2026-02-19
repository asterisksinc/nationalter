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
        <div className="ao-chart-title">User Growth Trend</div>
        <div className="ao-chart-subtitle">
          Daily Active Users (DAU) vs Monthly Active Users (MAU)
        </div>
      </div>
      <div className="ao-chart-divider" />

      <div className="ao-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="aoOrangeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a18" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ff8a18" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e7eaef" vertical={true} horizontal={true} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8b95a5", fontSize: 10 }}
              minTickGap={22}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 35]}
              ticks={[0, 5, 10, 15, 20, 25, 30, 35]}
              tickFormatter={(value) => (value === 0 ? "0" : `${value}k`)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8b95a5", fontSize: 10 }}
            />
            <Area
              yAxisId="right"
              type="linear"
              dataKey="mau"
              stroke="none"
              fill="url(#aoOrangeFill)"
            />
            <Line
              yAxisId="right"
              type="linear"
              dataKey="mau"
              stroke="#ff8515"
              strokeWidth={2}
              dot={false}
              strokeLinejoin="round"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="dau"
              stroke="#2a66e7"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="ao-chart-legend">
        <span className="ao-legend-item">
          <span className="ao-legend-box ao-orange-box" />
          Monthly Active Users
        </span>
        <span className="ao-legend-item">
          <span className="ao-legend-box ao-blue-box" />
          Daily Active Users
        </span>
      </div>
    </div>
  );
}
