export type TrendPoint = { label: string; mau: number; dau: number };

export const trendData: TrendPoint[] = [
  { label: "Oct 7", mau: 19, dau: 5 },
  { label: "", mau: 17, dau: 5.2 },
  { label: "Oct 15", mau: 11, dau: 6 },
  { label: "", mau: 14, dau: 7.8 },
  { label: "", mau: 10, dau: 10.5 },
  { label: "Oct 23", mau: 12, dau: 13.8 },
  { label: "", mau: 9, dau: 17.4 },
  { label: "", mau: 8, dau: 20 },
  { label: "Oct 31", mau: 5.5, dau: 21.4 },
  { label: "", mau: 4.2, dau: 21.8 },
  { label: "Nov 8", mau: 7.2, dau: 21.1 },
  { label: "", mau: 14.4, dau: 18.9 },
  { label: "Nov 16", mau: 16.8, dau: 17.6 },
  { label: "", mau: 24, dau: 16.1 },
  { label: "", mau: 18.3, dau: 14.6 },
  { label: "Nov 24", mau: 19.8, dau: 13.2 },
  { label: "", mau: 20.4, dau: 11.9 },
  { label: "", mau: 23, dau: 10.8 },
  { label: "Dec 2", mau: 18, dau: 9.6 },
  { label: "", mau: 16.3, dau: 8.8 },
  { label: "Dec 10", mau: 18.8, dau: 8.2 },
  { label: "", mau: 17.4, dau: 8 },
  { label: "Dec 18", mau: 30.5, dau: 8.7 },
  { label: "", mau: 23.8, dau: 9.8 },
  { label: "", mau: 27.6, dau: 11.1 },
  { label: "Dec 26", mau: 31.6, dau: 12.9 },
  { label: "", mau: 22.4, dau: 14.8 },
  { label: "", mau: 19.8, dau: 16.2 },
  { label: "Jan 3", mau: 21.2, dau: 17.3 },
];

export const sparklineSets = {
  greenA: "5,17 12,12 19,13 26,10 33,14 40,12 47,16 54,8 61,11 68,9",
  greenB: "5,14 12,10 19,11 26,8 33,12 40,11 47,13 54,9 61,12 68,10",
  greenC: "5,16 12,11 19,12 26,9 33,12 40,10 47,14 54,8 61,12 68,9",
  redA: "5,10 12,15 19,12 26,16 33,13 40,17 47,14 54,19 61,14 68,11",
};

export type StateDetail = {
  users: number;
  fill: string;
  code: string;
  rank: string;
  width: string;
};

export const stateInfo: Record<string, StateDetail> = {
  Maharashtra: {
    users: 847,
    fill: "#ff7f10",
    code: "MH",
    rank: "#1",
    width: "82%",
  },
  Karnataka: {
    users: 665,
    fill: "#ff9621",
    code: "KA",
    rank: "#2",
    width: "66%",
  },
  Telangana: {
    users: 544,
    fill: "#ffb96a",
    code: "TG",
    rank: "#3",
    width: "56%",
  },
  "Tamil Nadu": {
    users: 423,
    fill: "#ffcc8b",
    code: "TN",
    rank: "#4",
    width: "44%",
  },
};

export const indiaStates28 = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export const indiaGeoUrl =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson";

export const funnelStages = [
  {
    key: "signup",
    label: "Sign-ups",
    users: 847,
    percent: "100%",
  },
  {
    key: "verify",
    label: "Email Verified",
    users: 738,
    percent: "87%",
  },
  {
    key: "profile",
    label: "Profile Complete",
    users: 312,
    percent: "42%",
  },
  {
    key: "premium",
    label: "Premium Subscribers",
    users: 184,
    percent: "24%",
  },
  {
    key: "active",
    label: "Active Users",
    users: 80,
    percent: "10%",
  },
] as const;

export const segmentCards = [
  {
    title: "Researchers",
    growth: "↑ + 12% MoM",
    signupsLabel: "New Sign-ups / Day",
    signupsValue: "27",
    conversion: "87%",
    average: "ARIS 78",
    distribution: "34% Medicine",
    retention: "89%",
    progress: "87%",
    tone: "purple",
  },
  {
    title: "Medical Professionals",
    growth: "↑ +18% growth",
    signupsLabel: "New Sign-ups / Day",
    signupsValue: "8",
    conversion: "91%",
    average: "Cardiology 22%",
    distribution: "34% Apollo",
    retention: "94%",
    progress: "91%",
    tone: "pink",
  },
  {
    title: "Organisations",
    growth: "↑ + 32% Growth",
    signupsLabel: "New Sign-ups / Month",
    signupsValue: "12",
    conversion: "68%",
    average: "Faculty 45",
    distribution: "40% IITs",
    retention: "96%",
    progress: "68%",
    tone: "blue",
  },
] as const;
