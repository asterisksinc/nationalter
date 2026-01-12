import React from "react";

interface ProfileGaugeProps {
  percentage: number;
}

export const ProfileGauge = ({ percentage }: ProfileGaugeProps) => {
  // Dimensions
  const width = 250;
  const strokeWidth = 38; // Increased width for the bar (was 28)
  const radius = (width - strokeWidth) / 2;
  const centerX = width / 2;
  const centerY = width / 2;

  // Math for a semi-circle (180 degrees)
  const circumference = Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center w-[272px] h-[150px]">
      {/* SVG Container: Semi-circle
        "overflow-hidden" crops the circle perfectly in half 
      */}
      <div
        className="relative overflow-hidden w-full"
        style={{ width: `${width}px`, height: `${width / 2}px` }}
      >
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className="block"
        >
          {/* Rotate 180deg to make it a Top Arch */}
          <g transform={`rotate(180 ${centerX} ${centerY})`}>
            {/* Background Track - Lighter Orange 
                Matches CSS: rgba(255, 173, 50, 0.1)
            */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(255, 173, 50, 0.1)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference * 2}`}
              strokeLinecap="butt"
            />

            {/* Progress Bar - Soft/Lighter Active Orange
                Matches CSS: rgba(255, 122, 0, 0.37)
                This creates the "lighter" look you requested compared to solid #FF7A00
            */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(255, 122, 0, 0.37)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference * 2}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              className="transition-all duration-700 ease-out"
            />
          </g>
        </svg>
      </div>

      {/* Text Position - Centered inside the gauge area */}
      <div className="absolute top-[85px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0">
        <span className="font-sans font-bold text-[32px] leading-[120%] text-[#FF7A00]">
          {percentage}%
        </span>
        <span className="font-sans font-semibold text-[12px] leading-[120%] text-[#0E121B] whitespace-nowrap">
          Profile Completed
        </span>
      </div>
    </div>
  );
};
