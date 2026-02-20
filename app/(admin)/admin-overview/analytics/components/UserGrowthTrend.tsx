import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TrendPoint } from "./analyticsData";

type UserGrowthTrendProps = {
  data: TrendPoint[];
};

export function UserGrowthTrend({ data }: UserGrowthTrendProps) {
  // Calculate intelligent Y-axis domain based on data
  const calculateYAxisDomain = () => {
    if (!data || data.length === 0) return [0, 100];
    
    const allValues = data.flatMap(point => [point.registrations || 0, point.logins || 0]);
    const maxValue = Math.max(...allValues);
    const meanValue = allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
    
    // Use the higher of max or mean * 2 for better scaling
    const suggestedMax = Math.max(maxValue, meanValue * 2);
    
    // Round up to next significant number for cleaner axis
    const magnitude = Math.pow(10, Math.floor(Math.log10(suggestedMax)));
    const normalizedMax = suggestedMax / magnitude;
    const roundedMax = Math.ceil(normalizedMax) * magnitude;
    
    return [0, Math.max(roundedMax, 20)]; // Minimum of 20 for readability
  };

  const [yMin, yMax] = calculateYAxisDomain();

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
                  domain={[yMin, yMax]}
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#8b95a5", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e7eaef',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                  labelStyle={{ color: '#374151', fontWeight: '600' }}
                  formatter={(value, name) => [
                    typeof value === 'number' ? value.toLocaleString() : value,
                    name === 'registrations' ? 'New Registrations' : 'Portal Logins'
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
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
                  type="monotone"
                  dataKey="registrations"
                  stroke="#ff8515"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: "#ff8515", stroke: "#ffffff", strokeWidth: 2 }}
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
                  activeDot={{ r: 5, fill: "#2a66e7", stroke: "#ffffff", strokeWidth: 2 }}
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
