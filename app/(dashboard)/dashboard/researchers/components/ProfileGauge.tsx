import React from "react";

interface ProfileGaugeProps {
  percentage: number;
}

export const ProfileGauge = ({ percentage }: ProfileGaugeProps) => {
  const radius = 65;
  const stroke = 28;
  const centerX = radius + stroke;
  const centerY = radius + stroke;
  const normalizedRadius = radius;
  const circumference = 2 * Math.PI * normalizedRadius;
  const semiCircumference = circumference / 2;

  const dashOffset = semiCircumference - (percentage / 100) * semiCircumference;

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

        {/* Text */}
        <div className="absolute flex flex-col items-center justify-center bottom-[-1px]">
          <span className="text-[24px] font-semibold text-[#FF9A3C] leading-none mb-1">
            {percentage}%
          </span>
          <span className="text-[10px] font-medium leading-[120%] text-[#525866] uppercase tracking-wide">
            Profile Completed
          </span>
        </div>
      </div>
    </div>
  );
};
