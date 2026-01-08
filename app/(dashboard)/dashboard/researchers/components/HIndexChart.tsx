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
    <div className="col-span-8 bg-white rounded-lg border border-[#E1E4EA] p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[16px] font-medium leading-[20px] tracking-[-0.006em] text-[#0E121B]">
          H-Index Performance
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-md p-0.5 flex text-[12px] font-medium leading-[120%]">
            <button className="px-2.5 py-1 bg-white text-gray-900 rounded shadow-sm">
              1Y
            </button>
            <button className="px-2.5 py-1 text-gray-500 hover:text-gray-900">
              3Y
            </button>
            <button className="px-2.5 py-1 text-gray-500 hover:text-gray-900">
              5Y
            </button>
            <button className="px-2.5 py-1 text-gray-500 hover:text-gray-900">
              All
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-2.5 py-1 border border-gray-200 rounded-md text-[12px] font-medium leading-[120%] text-[#525866] hover:bg-gray-50 h-[28px]">
            <Download size={13} strokeWidth={1.5} /> Export Report
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: -25, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f76a23" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f76a23" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="0"
              stroke="#E1E4EA"
              strokeWidth={1}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              orientation="right"
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
                    <div className="bg-gray-900 text-white text-[11px] font-normal leading-[120%] py-1 px-2 rounded shadow-lg flex flex-col items-center z-10 relative">
                      <span className="font-semibold">{payload[0].value}</span>
                      <span className="text-gray-400 text-[9px]">H-Index</span>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-gray-900"></div>
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
