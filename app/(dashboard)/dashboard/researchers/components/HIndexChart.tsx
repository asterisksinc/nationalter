"use client";
import React from "react";
import { Download, ChevronDown } from "lucide-react";
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
    <div className="col-span-12 lg:col-span-8 p-3 md:p-4 bg-white rounded-lg border border-[#E1E4EA]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4 gap-2 sm:gap-0">
        <div className="text-[14px] md:text-[16px] font-medium leading-[120%] tracking-[-0.006em] text-[#0E121B]">
          H-Index Performance
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
          {/* Desktop Controls */}
          <div className="hidden sm:flex bg-gray-100 rounded-md p-0.5 text-[12px] font-medium leading-[120%]">
            <button className="px-2.5 py-1 bg-white text-gray-900 rounded">
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

          {/* Mobile Year Selector */}
          <div className="flex sm:hidden relative">
            <button className="px-3 py-1 bg-white border border-[#E1E4EA] rounded text-gray-900 text-[12px] font-medium flex items-center justify-between h-7 gap-2">
              1Y
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>

          <button className="flex items-center gap-1.5 px-2.5 py-1 border border-[#E1E4EA] rounded-md text-[11px] md:text-[12px] font-medium leading-[120%] text-[#525866] hover:bg-gray-50 h-7 whitespace-nowrap">
            <Download size={13} strokeWidth={1.5} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="h-[240px] md:h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: -25, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f76a23" stopOpacity={0.25} />
                <stop offset="50%" stopColor="#f76a23" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#f76a23" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={true}
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
                    <div className="bg-gray-900 text-white text-[11px] font-normal leading-[120%] py-1 px-2 rounded flex flex-col items-center z-10 relative">
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
              strokeWidth={2.5}
              fill="url(#colorValue)"
              dot={{
                r: 4,
                fill: "#f76a23",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
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
