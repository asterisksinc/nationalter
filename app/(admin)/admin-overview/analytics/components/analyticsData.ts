export type TrendPoint = {
  label: string;
  registrations: number;
  logins: number;
};

function formatMonthDay(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function seededUnit(seed: number) {
  // Deterministic 0..1 value based on a numeric seed.
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Dummy data (UI-only for now): last 30 days, oldest -> newest.
// Rightmost X-axis point is always "today".
export function buildLast30DaysTrendData(today = new Date()): TrendPoint[] {
  const end = new Date(today);
  end.setHours(0, 0, 0, 0);

  const points: TrendPoint[] = [];

  for (let offsetDays = 29; offsetDays >= 0; offsetDays -= 1) {
    const d = new Date(end);
    d.setDate(end.getDate() - offsetDays);

    // A deterministic, date-based seed for stable looking (but spiky) trends.
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const u = seededUnit(seed);

    // Base undulation + jitter
    const waveA = Math.sin(seed * 0.09);
    const waveB = Math.cos(seed * 0.14);
    const jitter = (u - 0.5) * 16;

    // Occasional spikes (deterministic) to make the orange area visibly jagged.
    const spikeA = seed % 6 === 0 ? 28 : 0;
    const spikeB = seed % 11 === 0 ? 18 : 0;

    const registrations = clampInt(12 + waveA * 8 + waveB * 6 + jitter + spikeA + spikeB, 0, 95);
    const logins = clampInt(registrations * 4.2 + 35 + waveA * 12 + waveB * 10 + jitter * 1.5, 0, 260);

    points.push({
      label: formatMonthDay(d),
      registrations,
      logins,
    });
  }

  return points;
}

export const trendData: TrendPoint[] = buildLast30DaysTrendData();

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
