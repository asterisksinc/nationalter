import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid Turbopack/Next inferring the workspace root from unrelated lockfiles
    // elsewhere on the machine (e.g. C:\pnpm-lock.yaml).
    root: process.cwd(),
  },
};

export default nextConfig;
