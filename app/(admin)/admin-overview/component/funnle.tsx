"use client";

import React from "react";

import {
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sign-ups", value: 847 },
  { name: "Email Verified", value: 738 },
  { name: "Profile Complete", value: 312 },
  { name: "Premium Subscribers", value: 184 },
  { name: "Active Users", value: 80 },
];

export default function FreeFunnel() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div style={{ width: "100%", height: 400,transform:'rotate(-90deg)' }}>
      {isMounted ? (
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={data}
              isAnimationActive
              fill="#ff7a00"
            >
              <LabelList
                position="right"
                fill="#000"
                stroke="none"
                dataKey="name"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
}
