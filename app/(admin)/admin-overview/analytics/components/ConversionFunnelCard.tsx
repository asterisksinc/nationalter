import { funnelStages } from "./analyticsData";

function userLabel(count: number) {
  return `${count.toLocaleString()} ${count === 1 ? "User" : "Users"}`;
}

export function ConversionFunnelCard() {
  const innerPadX = 40;
  const scaleX = (800 - innerPadX * 2) / 800;
  const scaleY = 1.12;
  const translateY = -((450 * scaleY - 450) / 2);

  return (
    <div className="ao-card ao-funnel-card">
      <div className="ao-funnel-head-row">
        <div>
          <div className="ao-card-title">User Conversion Funnel</div>
          <div className="ao-card-sub">User journey conversion metrics</div>
        </div>
        <div className="ao-badges">
          <span className="ao-badge-green">Elite</span>
          <span className="ao-badge-orange">92th Percentile</span>
        </div>
      </div>

      <div className="ao-card-divider" />

      <div className="ao-funnel-metrics">
        <div>
          <div className="ao-small-muted">Overall Conversion</div>
          <div className="ao-green-value">21.7%</div>
        </div>
        <div>
          <div className="ao-small-muted">Total Converted</div>
          <div className="ao-dark-value">184</div>
        </div>
      </div>

      <div className="ao-funnel-graph">
        <svg
          className="ao-funnel-svg"
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="User conversion funnel"
          style={{ width: "100%", height: "100%" }}
        >
          <g
            transform={`translate(${innerPadX}, ${translateY}) scale(${scaleX}, ${scaleY})`}
          >
          <defs>
            <linearGradient id="aoFunnelBack" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffe6cc" />
              <stop offset="100%" stopColor="#fff0e0" />
            </linearGradient>
            <linearGradient id="aoFunnelMid" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffcc99" />
              <stop offset="100%" stopColor="#ffdcb3" />
            </linearGradient>
            <linearGradient id="aoFunnelFront" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff7f00" />
              <stop offset="100%" stopColor="#ff9933" />
            </linearGradient>
            <filter id="shadowVal" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2"
                floodColor="#000"
                floodOpacity="0.1"
              />
            </filter>
          </defs>

          <path
            d="
              M 0,20 
              C 150,20 200,80 300,110
              C 400,140 500,165 600,180
              C 700,195 750,200 800,205
              L 800,245
              C 750,250 700,255 600,270
              C 500,285 400,310 300,340
              C 200,370 150,430 0,430
              Z
            "
            fill="url(#aoFunnelBack)"
            opacity="0.6"
          />

          <path
            d="
              M 0,55
              C 150,55 200,105 300,130
              C 400,155 500,175 600,188
              C 700,201 750,205 800,210
              L 800,240
              C 750,245 700,249 600,262
              C 500,275 400,295 300,320
              C 200,345 150,395 0,395
              Z
            "
            fill="url(#aoFunnelMid)"
            opacity="0.8"
          />

          <path
            d="
              M 0,90
              C 150,90 200,130 300,150
              C 400,170 500,185 600,196
              C 700,207 750,210 800,215
              L 800,235
              C 750,240 700,243 600,254
              C 500,265 400,280 300,300
              C 200,320 150,360 0,360
              Z
            "
            fill="url(#aoFunnelFront)"
          />

          {[190, 370, 550, 690].map((x) => (
            <line
              key={`line-${x}`}
              x1={x}
              y1={20}
              x2={x}
              y2={430}
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
          ))}

          {funnelStages.map((stage, idx) => {
            const xPositions = [110, 290, 470, 620, 710];
            const yCenters = [228, 218, 228, 236, 240];

            const xPos = xPositions[idx] || 735;
            const yCenter = yCenters[idx] || 250;

            const yTopRef = [96, 132, 176, 196, 206][idx];
            const yBotRef = [292, 286, 278, 268, 258][idx];

            const labelParts = stage.label.split(" ");
            const labelTop = labelParts[0] ?? "";
            const labelBottom = labelParts.slice(1).join(" ");

            return (
              <g key={stage.key} transform={`translate(${xPos}, 0)`}>
                <g transform={`translate(0, ${yTopRef - 40})`}>
                  <rect
                    x="-55"
                    y="0"
                    width="110"
                    height="30"
                    rx="15"
                    fill="#ffeacc"
                    opacity="0.95"
                  />
                  <text
                    x="0"
                    y="20"
                    textAnchor="middle"
                    fill="#1f2937"
                    fontSize="13"
                    fontWeight="600"
                  >
                    {userLabel(stage.users)}
                  </text>
                </g>

                <g transform={`translate(0, ${yCenter})`}>
                  <rect
                    x="-40"
                    y="-18"
                    width="80"
                    height="36"
                    rx="18"
                    fill="#fff"
                    filter="url(#shadowVal)"
                  />
                  <text
                    x="0"
                    y="6"
                    textAnchor="middle"
                    fill="#ff7f00"
                    fontWeight="bold"
                    fontSize="16"
                  >
                    {stage.percent}
                  </text>
                </g>

                <g transform={`translate(0, ${yBotRef + 2})`}>
                  <path
                    d="M -15,-20 Q 0,-5 15,-20"
                    fill="#fff"
                    opacity="0.1"
                  />

                  <circle r="38" fill="#fff5eb" cy="32" />
                  <text
                    x="0"
                    y="28"
                    textAnchor="middle"
                    fill="#1f2937"
                    fontSize="10"
                    fontWeight="700"
                  >
                    {labelTop}
                  </text>
                  {labelBottom && (
                    <text
                      x="0"
                      y="42"
                      textAnchor="middle"
                      fill="#1f2937"
                      fontSize="10"
                      fontWeight="700"
                    >
                      {labelBottom}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
          </g>
        </svg>
      </div>
    </div>
  );
}
