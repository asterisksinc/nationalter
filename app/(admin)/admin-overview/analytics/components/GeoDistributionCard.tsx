"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import type { StateDetail } from "./analyticsData";

type HoveredState = {
  name: string;
  users: number;
  code: string;
  rank: string;
};

type GeoDistributionCardProps = {
  geoUrl: string;
  states28: readonly string[];
  stateInfo: Record<string, StateDetail>;
};

type StateRow = {
  key: string;
  labelLeft: string;
  labelRight: string;
  users: number;
  width: string;
  isTop: boolean;
};

function buildStateRows(
  states28: readonly string[],
  stateInfo: Record<string, StateDetail>
): StateRow[] {
  const rows = states28.map((stateName) => {
    const detail = stateInfo[stateName];
    if (!detail) {
      return {
        key: stateName,
        labelLeft: stateName,
        labelRight: "—",
        users: 0,
        width: "0%",
        isTop: false,
      };
    }

    return {
      key: stateName,
      labelLeft: stateName,
      labelRight: `${detail.users.toLocaleString()} Users`,
      users: detail.users,
      width: detail.width,
      isTop: true,
    };
  });

  return rows.sort((a, b) => {
    const aUsers = stateInfo[a.key]?.users ?? 0;
    const bUsers = stateInfo[b.key]?.users ?? 0;

    if (aUsers !== bUsers) {
      return bUsers - aUsers;
    }

    return a.key.localeCompare(b.key);
  });
}

export function GeoDistributionCard({
  geoUrl,
  states28,
  stateInfo,
}: GeoDistributionCardProps) {
  const [hoveredState, setHoveredState] = useState<HoveredState | null>(null);
  const [mapTooltip, setMapTooltip] = useState({ x: 0, y: 0 });

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  const rows = useMemo(() => buildStateRows(states28, stateInfo), [states28, stateInfo]);
  const maxUsers = useMemo(() => rows.reduce((maxVal, row) => Math.max(maxVal, row.users), 0), [rows]);

  const scheduleTooltipUpdate = (x: number, y: number) => {
    lastPointRef.current = { x, y };
    if (rafRef.current != null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      if (lastPointRef.current) {
        setMapTooltip(lastPointRef.current);
      }
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const updateTooltipFromMouse = (event: ReactMouseEvent, immediate?: boolean) => {
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }

    const rect = wrap.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (immediate) {
      setMapTooltip({ x, y });
    }

    scheduleTooltipUpdate(x, y);
  };

  return (
    <div className="ao-card ao-geo-card">
      <div>
        <div className="ao-card-title">Geographic Distribution</div>
        <div className="ao-card-sub">Top performing states by user base</div>
      </div>

      <div className="ao-card-divider" />

      <div ref={wrapRef} className="ao-india-wrap">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1100, center: [82.5, 23] }}
          className="ao-india-svg"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = String(
                  geo.properties.st_nm || geo.properties.NAME_1 || ""
                );
                const detail = stateInfo[stateName];
                const fill = detail?.fill || "#dfe3ea";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="ao-map-region"
                    onMouseEnter={(event) => {
                      if (!detail) {
                        return;
                      }

                      updateTooltipFromMouse(event, true);
                      setHoveredState({
                        name: stateName,
                        users: detail.users,
                        code: detail.code,
                        rank: detail.rank,
                      });
                    }}
                    onMouseMove={(event) => {
                      if (!detail) {
                        return;
                      }
                      updateTooltipFromMouse(event);
                    }}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      default: {
                        fill,
                        stroke: "#2f3a4b",
                        strokeWidth: 1.2,
                        outline: "none",
                        cursor: detail ? "pointer" : "default",
                      },
                      hover: {
                        fill,
                        stroke: "#000000",
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: detail ? "pointer" : "default",
                      },
                      pressed: {
                        fill,
                        stroke: "#000000",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          <Marker coordinates={[75.9, 19.7]}>
            <circle r={2.5} fill="#2f3a4b" />
          </Marker>
        </ComposableMap>

        {hoveredState && (
          <div
            className="ao-map-tooltip"
            style={{
              left: `${mapTooltip.x}px`,
              top: `${mapTooltip.y}px`,
            }}
          >
            {hoveredState.name}
            <br />
            {hoveredState.users.toLocaleString()} Users
          </div>
        )}
      </div>

      <div className="ao-state-list" role="list">
        {rows.map((row, index) => {
          const ratio = maxUsers > 0 ? row.users / maxUsers : 0;
          const opacity = row.isTop ? 0.35 + ratio * 0.65 : 0.25;
          const tone = `rgba(255, 133, 21, ${opacity.toFixed(3)})`;

          return (
          <div className="ao-state-card" key={row.key} role="listitem">
            <div className="ao-state-top">
              <span className="ao-state-rank">#{index + 1} {row.labelLeft}</span>
              <span className={row.isTop ? "ao-state-users" : "ao-state-users ao-muted"} style={row.isTop ? { color: tone } : undefined}>
                {row.labelRight}
              </span>
            </div>
            <div className="ao-progress-track">
              <span
                className={row.isTop ? "ao-progress-fill" : "ao-progress-fill ao-muted-fill"}
                style={row.isTop ? { width: row.width, background: tone } : { width: row.width }}
              />
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
