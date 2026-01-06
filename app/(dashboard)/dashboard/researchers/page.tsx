"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Ticket,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronRight,
  ChevronDown,
  LogOut,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  MoreHorizontal,
  Clock,
  Ban,
  Check,
  Star,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Types ---

interface TicketData {
  id: string;
  type: string;
  status:
    | "Approved"
    | "Awaiting Review"
    | "Rejected"
    | "Under Review"
    | "Active";
  date: string;
}

// --- Mock Data ---

const chartData = [
  { month: "Jan", value: 3.8 },
  { month: "Feb", value: 6.5 },
  { month: "Mar", value: 5.0 },
  { month: "Apr", value: 6.0 },
  { month: "May", value: 7.8 },
  { month: "Jun", value: 5.8 },
  { month: "Jul", value: 6.8 },
  { month: "Aug", value: 4.8 },
  { month: "Sept", value: 6.0 },
  { month: "Oct", value: 8.0 },
  { month: "Nov", value: 6.5 },
  { month: "Dec", value: 5.0 },
];

const tickets: TicketData[] = [
  {
    id: "#154623",
    type: "h-index update",
    status: "Approved",
    date: "01 Jan 2026",
  },
  {
    id: "#486523",
    type: "Publication update",
    status: "Awaiting Review",
    date: "24 Nov 2025",
  },
  {
    id: "#547861",
    type: "Profile information",
    status: "Rejected",
    date: "19 Aug 2025",
  },
  {
    id: "#753216",
    type: "Subscription Query",
    status: "Under Review",
    date: "24 Oct 2025",
  },
  {
    id: "#753216",
    type: "h-index update",
    status: "Active",
    date: "24 Oct 2025",
  },
];

// --- Components ---

const SidebarItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors mb-1 ${
      active
        ? "bg-orange-50/50 text-[#f76a23]"
        : "text-gray-500 hover:bg-gray-50"
    }`}
  >
    <div className={`${active ? "text-[#f76a23]" : "text-gray-400"}`}>
      {icon}
    </div>
    <span
      className={`font-medium text-sm ${
        active ? "text-[#f76a23]" : "text-gray-600"
      }`}
    >
      {label}
    </span>
  </div>
);

const StatItem = ({
  label,
  value,
  change,
  isPositive,
}: {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}) => (
  <div className="flex flex-col px-6 py-4">
    <span className="text-gray-500 text-sm mb-1">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      <span
        className={`text-xs font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}
        <span className="text-[10px]">{isPositive ? "▲" : "▼"}</span>
      </span>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: TicketData["status"] }) => {
  const styles = {
    Approved: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle2 },
    Active: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle2 },
    "Awaiting Review": {
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: Clock,
    },
    "Under Review": { bg: "bg-yellow-50", text: "text-yellow-700", icon: Star },
    Rejected: { bg: "bg-red-50", text: "text-red-700", icon: Ban },
  };

  const config = styles[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} border-transparent`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {status}
    </span>
  );
};

const ProfileGauge = ({ percentage }: { percentage: number }) => {
  const radius = 65;
  const stroke = 28;
  const centerX = radius + stroke;
  const centerY = radius + stroke;
  const normalizedRadius = radius;
  const circumference = 2 * Math.PI * normalizedRadius;
  const semiCircumference = circumference / 2;

  const dashOffset =
    semiCircumference - (percentage / 100) * semiCircumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-full pt-2">
      <div
        className="relative flex items-center justify-center"
        style={{ width: radius * 2 + stroke * 2, height: radius + stroke * 2 }}
      >
        <svg
          width={radius * 2 + stroke * 2}
          height={radius + stroke * 2}
          viewBox={`0 0 ${radius * 2 + stroke * 2} ${radius + stroke * 2}`}
        >
          <g transform={`rotate(-180 ${centerX} ${centerY})`}>
            {/* Background arc */}
            <circle
              cx={centerX}
              cy={centerY}
              r={normalizedRadius}
              fill="transparent"
              stroke="#FFE5D0"
              strokeWidth={stroke}
              strokeDasharray={`${semiCircumference} ${circumference}`}
              strokeLinecap="butt"
            />

            {/* Progress arc */}
            <circle
              cx={centerX}
              cy={centerY}
              r={normalizedRadius}
              fill="transparent"
              stroke="#FFB366"
              strokeWidth={stroke}
              strokeDasharray={`${semiCircumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              style={{
                transition: "stroke-dashoffset 0.6s ease",
              }}
            />
          </g>
        </svg>

        {/* Text (unchanged classes) */}
        <div className="absolute flex flex-col items-center justify-center bottom-[-1px]">
          <span className="text-2xl font-bold text-[#FF9A3C] leading-none mb-1">
            {percentage}%
          </span>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
            Profile Completed
          </span>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---

export default function ResearchersPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-[#1e1e1e]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-[#f76a23] rounded p-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L9 7L14 12L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 17L9 12L14 17L19 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 tracking-tight leading-none">
                NATIONCITE
              </span>
              <span className="text-[7px] text-gray-400 font-medium tracking-wider uppercase leading-none mt-0.5">
                Powering India&apos;s Research Future
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active
          />
          <SidebarItem icon={<FileText size={18} />} label="My Publications" />
          <SidebarItem icon={<BarChart2 size={18} />} label="Analytics" />
          <SidebarItem icon={<Ticket size={18} />} label="Ticket Center" />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings & Privacy"
          />
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold text-gray-900 truncate">
                John Doe
              </span>
              <span className="text-xs text-gray-500 truncate">
                example@gmail.com
              </span>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] p-8 min-w-[1000px]">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-[#1e1e1e] font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-4 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg text-sm focus:outline-none w-64 text-gray-700 placeholder:text-gray-400 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 relative shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="flex items-center gap-2 bg-[#f76a23] hover:bg-[#e05a1a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Plus size={16} /> Raise Ticket
            </button>
          </div>
        </header>

        {/* Welcome */}
        <div className="mb-6">
          <h5 className="font-bold text-gray-900">
            Good Evening, Dr. Ashok Kumar!
          </h5>
          <p className="text-sm text-gray-500">
            Welcome back to your Research Impact Portal.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 mb-6">
          {/* Main Metrics Group */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex divide-x divide-gray-100">
            <div className="flex-1">
              <StatItem
                label="University Rank"
                value="01"
                change="8"
                isPositive={true}
              />
            </div>
            <div className="flex-1">
              <StatItem
                label="World Rank"
                value="210"
                change="12"
                isPositive={true}
              />
            </div>
            <div className="flex-1">
              <StatItem
                label="Country Rank"
                value="11"
                change="02"
                isPositive={false}
              />
            </div>
            <div className="flex-1">
              <StatItem
                label="H-Index"
                value="129"
                change="13"
                isPositive={true}
              />
            </div>
          </div>

          {/* Publications Card */}
          <div className="w-[200px] bg-orange-50 rounded-xl border border-orange-100 p-4 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-2">
              <div className="bg-orange-100 rounded-full p-1">
                <Check size={12} className="text-[#f76a23]" strokeWidth={3} />
              </div>
            </div>
            <span className="text-gray-600 text-sm font-medium mb-1">
              Publications
            </span>
            <span className="text-3xl font-bold text-[#f76a23]">192</span>
            {/* Decorative gradient overlay */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-200 to-transparent rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>

        {/* Middle Section: Chart + Profile */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Chart */}
          <div className="col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-semibold text-gray-900">
                H-Index Performance
              </h5>
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
                  data={chartData}
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
                            <span className="text-gray-400 text-[10px]">
                              H-Index
                            </span>
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
                    }} // Solid orange with white border
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

          {/* Profile Completeness */}
          <div className="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
            <h5 className=" text-gray-900 mb-4">Profile Completeness</h5>

            <div className="mb-6 -mt-2">
              <ProfileGauge percentage={82} />
            </div>

            <div className="space-y-3 mb-6">
              <h5 className="  tracking-wide mb-6">Status Breakdown</h5>

              <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-sm font-medium text-green-800">
                  ORCID Linked
                </span>
              </div>

              <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-sm font-medium text-green-800">
                  Affiliation Verified
                </span>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start gap-3">
                <AlertTriangle
                  size={16}
                  className="text-orange-500 mt-0.5 shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-orange-700">
                    Missing publications detected
                  </span>
                  <span className="text-xs text-orange-600/80">
                    3 potential matches found
                  </span>
                </div>
              </div>

              <div className="bg-green-50/50 border border-green-100 rounded-lg p-2.5 flex items-center gap-3">
                <div className="bg-green-100 text-green-600 rounded-full p-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-sm font-medium text-green-800">
                  No Duplicate Profiles Found
                </span>
              </div>
            </div>

            <button className="mt-auto w-full bg-[#f76a23] hover:bg-[#e05a1a] text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm shadow-orange-200">
              Complete Your Profile <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Tickets Section */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h5 className="font-semibold text-gray-900">On-Going Tickets</h5>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search by ticket id or type..."
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f76a23] w-64 text-gray-700"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Filter size={16} /> Filter
              </button>
              <button className="flex items-center gap-2 bg-[#f76a23] hover:bg-[#e05a1a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus size={16} /> Add New
              </button>
            </div>
          </div>

          <div className="flex gap-8 mb-6 pb-6 border-b border-gray-100">
            <div>
              <span className="block text-sm text-gray-500 mb-1">
                Open Tickets
              </span>
              <span className="text-2xl font-bold text-gray-900">03</span>
            </div>
            <div className="w-px bg-gray-200 h-10 self-center"></div>
            <div>
              <span className="block text-sm text-gray-500 mb-1">
                In Review Tickets
              </span>
              <span className="text-2xl font-bold text-gray-900">2</span>
            </div>
            <div className="w-px bg-gray-200 h-10 self-center"></div>
            <div>
              <span className="block text-sm text-gray-500 mb-1">
                Approved Tickets
              </span>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <div className="w-px bg-gray-200 h-10 self-center"></div>
            <div>
              <span className="block text-sm text-gray-500 mb-1">Rejected</span>
              <span className="text-2xl font-bold text-gray-900">01</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 w-[20%]">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 w-[30%]">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 w-[25%]">
                    Current Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 w-[25%]">
                    Submitted On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{ticket.type}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{ticket.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
