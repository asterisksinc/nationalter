import React from "react";
import { Download } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  month: string;
  value: number;
}

interface HIndexChartProps {
  data: ChartDataPoint[];
}

export const HIndexChart = ({ data }: HIndexChartProps) => {
  return (
    <div className="col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h5 className="font-semibold text-gray-900">H-Index Performance</h5>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 rounded-lg p-1 flex text-xs font-medium">
            <button className="px-3 py-1 bg-white text-gray-900 rounded shadow-sm">
              1Y
            </button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-900">
              3Y
            </button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-900">
              5Y
            </button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-900">
              All
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      <div className="h-[420px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f76a23" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f76a23" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={true}
              horizontal={true}
              strokeDasharray="3 3"
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              domain={[0, 10]}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg flex flex-col items-center z-10 relative">
                      <span className="font-bold mb-0.5">
                        {payload[0].value}
                      </span>
                      <span className="text-gray-400 text-[10px]">H-Index</span>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-gray-900"></div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="#f76a23"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={{
                r: 3,
                fill: "#f76a23",
                stroke: "#fff",
                strokeWidth: 1.5,
              }}
              activeDot={{
                r: 5,
                fill: "#f76a23",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
