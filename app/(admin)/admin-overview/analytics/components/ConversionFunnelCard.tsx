import { funnelStages } from "./analyticsData";

function userLabel(count: number) {
  return `${count.toLocaleString()} User`;
}

export function ConversionFunnelCard() {
  const width = 800;
  const height = 420;

  const stages = funnelStages.slice(0, 5);

  const stageCount = 5;
  const sectionWidth = width / stageCount;

  // Staggered Y positioning to naturally hug the funnel curves
  const topYPos = [30, 70, 130, 150, 155];
  const bottomYPos = [390, 350, 290, 270, 265];
  const percentY = 210; // Perfectly centered vertically

  return (
    <div className="flex flex-col rounded-xl border border-[#e1e4ea] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-[#1b2332]">
            User Conversion Funnel
          </div>
          <div className="text-xs text-[#8a94a5]">
            User journey conversion metrics
          </div>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-[#e8f8ec] px-2 py-1 text-xs text-[#1ea55a]">
            Elite
          </span>
          <span className="rounded-full bg-[#fff1e1] px-2 py-1 text-xs text-[#ef8a1b]">
            92nd Percentile
          </span>
        </div>
      </div>

      <div className="my-4 h-px bg-[#eceff4]" />

      <div className="flex justify-between">
        <div>
          <div className="text-xs text-[#8b93a2]">Overall Conversion</div>
          <div className="text-4xl text-[#14a94f] leading-none">21.7%</div>
        </div>
        <div>
          <div className="text-xs text-[#8b93a2]">Total Converted</div>
          <div className="text-5xl text-[#1b2434] leading-none">184</div>
        </div>
      </div>

      <div className="mt-6 w-full rounded-xl border border-[#eadcc9] bg-gradient-to-b from-[#f4e8d9] to-[#efe4d6] p-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[420px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="frontGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff7f00" />
              <stop offset="100%" stopColor="#ff9933" />
            </linearGradient>

            <filter id="bubbleShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Layer 1: Lightest Back */}
          <path
            d="M 0,40 C 200,40 300,105 400,150 C 500,175 600,175 800,175 L 800,245 C 600,245 500,245 400,270 C 300,315 200,380 0,380 Z"
            fill="#fde8d5"
          />
          
          {/* Layer 2: Middle */}
          <path
            d="M 0,70 C 200,70 300,120 400,160 C 500,185 600,185 800,185 L 800,235 C 600,235 500,235 400,260 C 300,300 200,350 0,350 Z"
            fill="#fbd3a9"
          />

          {/* Layer 3: Dark Front Funnel */}
          <path
            d="M 0,100 C 200,100 300,135 400,170 C 500,195 600,195 800,195 L 800,225 C 600,225 500,225 400,250 C 300,285 200,320 0,320 Z"
            fill="url(#frontGrad)"
          />

          {stages.map((stage, i) => {
            const x = sectionWidth * i + sectionWidth / 2;
            const topY = topYPos[i];
            const bottomY = bottomYPos[i];
            
            const words = stage.label ? stage.label.split(" ") : [];

            return (
              <g key={stage.key || i}>
                {/* Vertical Connector Line */}
                <line
                  x1={x}
                  y1={topY}
                  x2={x}
                  y2={bottomY}
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.9"
                />

                {/* Top Users Bubble */}
                {stage.users && (
                  <g transform={`translate(${x},${topY})`}>
                    <rect
                      x="-45"
                      y="-14"
                      width="90"
                      height="28"
                      rx="14"
                      fill="#fef0e3"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="#1f2937"
                    >
                      {userLabel(stage.users)}
                    </text>
                  </g>
                )}

                {/* Middle Percent Bubble */}
                <g transform={`translate(${x},${percentY})`}>
                  <rect
                    x="-40"
                    y="-18"
                    width="80"
                    height="36"
                    rx="18"
                    fill="#fff"
                    filter="url(#bubbleShadow)"
                  />
                  <text
                    x="0"
                    y="6"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="#ff7f00"
                  >
                    {stage.percent}
                  </text>
                </g>

                {/* Bottom Label Bubble */}
                {stage.label && (
                  <g transform={`translate(${x},${bottomY})`}>
                    <rect 
                      x="-50" 
                      y="-24" 
                      width="100" 
                      height="48" 
                      rx="24" 
                      fill="#fdf2e8" 
                    />
                    <text
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#1f2937"
                    >
                      {words.length <= 1 ? (
                        <tspan x="0" y="4">{words[0]}</tspan>
                      ) : (
                        <>
                          <tspan x="0" y="-4">{words[0]}</tspan>
                          <tspan x="0" y="12">{words.slice(1).join(" ")}</tspan>
                        </>
                      )}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
