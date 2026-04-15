"use client";

import { useMemo, useState } from "react";

import type { MoodPoint } from "@/lib/mock-data";

type MoodHistoryChartProps = {
  data: MoodPoint[];
};

const chartWidth = 760;
const chartHeight = 280;
const chartPadding = { top: 24, right: 20, bottom: 30, left: 32 };

function toneForScore(score: number) {
  if (score >= 4) {
    return "bg-safe/14 text-foreground";
  }

  if (score === 3) {
    return "bg-secondary/18 text-foreground";
  }

  return "bg-warning/20 text-foreground";
}

export function MoodHistoryChart({ data }: MoodHistoryChartProps) {
  const [activeIndex, setActiveIndex] = useState(data.length - 1);
  const activePoint = data[activeIndex];

  const chart = useMemo(() => {
    const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
    const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;
    const stepX = data.length > 1 ? plotWidth / (data.length - 1) : 0;

    const points = data.map((point, index) => {
      const x = chartPadding.left + index * stepX;
      const y =
        chartPadding.top + ((5 - point.score) / 4) * plotHeight;

      return { ...point, x, y };
    });

    const linePath = points
      .map((point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
      )
      .join(" ");

    const areaPath = [
      `M ${points[0]?.x ?? chartPadding.left} ${chartHeight - chartPadding.bottom}`,
      ...points.map((point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`),
      `L ${points[points.length - 1]?.x ?? chartWidth - chartPadding.right} ${chartHeight - chartPadding.bottom}`,
      "Z",
    ].join(" ");

    return { areaPath, linePath, plotHeight, points };
  }, [data]);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="surface-card panel-hover stagger-in p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="soft-label">Skala 1-5</span>
            <span className="rounded-full bg-[#f1f5ef] px-3 py-1 text-xs font-medium text-ink-soft">
              14 hari
            </span>
          </div>
          <div className="text-sm text-ink-soft">Hover atau klik titik</div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="min-w-[720px]"
            role="img"
            aria-label="Grafik mood 14 hari dengan skala 1 sampai 5"
          >
            <defs>
              <linearGradient id="mood-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(115,173,135,0.24)" />
                <stop offset="100%" stopColor="rgba(115,173,135,0.02)" />
              </linearGradient>
            </defs>

            {[1, 2, 3, 4, 5].map((score) => {
              const y =
                chartPadding.top +
                ((5 - score) / 4) * chart.plotHeight;

              return (
                <g key={score}>
                  <line
                    x1={chartPadding.left}
                    x2={chartWidth - chartPadding.right}
                    y1={y}
                    y2={y}
                    stroke="rgba(32,51,45,0.08)"
                    strokeDasharray={score === 1 ? "0" : "4 8"}
                  />
                  <text
                    x={10}
                    y={y + 4}
                    fill="rgba(101,118,111,0.9)"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {score}
                  </text>
                </g>
              );
            })}

            <path d={chart.areaPath} fill="url(#mood-fill)" />
            <path
              d={chart.linePath}
              fill="none"
              stroke="#20332d"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {chart.points.map((point, index) => {
              const active = index === activeIndex;

              return (
                <g
                  key={point.date}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    fill={active ? "#20332d" : "#ffffff"}
                    r={active ? 10 : 7}
                    stroke="#20332d"
                    strokeWidth="3"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2 text-xs font-medium text-ink-soft sm:grid-cols-14">
          {data.map((point) => (
            <button
              key={point.date}
              type="button"
              onMouseEnter={() => setActiveIndex(data.findIndex((item) => item.date === point.date))}
              onClick={() => setActiveIndex(data.findIndex((item) => item.date === point.date))}
              className={`rounded-full px-2 py-2 transition ${
                point.date === activePoint.date
                  ? "bg-foreground text-white"
                  : "bg-[#f5f7f3] text-ink-soft hover:bg-[#edf2ee] hover:text-foreground"
              }`}
            >
              {point.date}
            </button>
          ))}
        </div>
      </div>

      <div className="surface-card-strong panel-hover stagger-in p-6">
        <p className="soft-label">Titik aktif</p>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.04em]">
              {activePoint.date}
            </h3>
            <p className="mt-2 text-sm text-ink-soft">Mood {activePoint.score}/5</p>
          </div>
          <span
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${toneForScore(
              activePoint.score,
            )}`}
          >
            {activePoint.score >= 4
              ? "Stabil"
              : activePoint.score === 3
                ? "Netral"
                : "Perlu ruang"}
          </span>
        </div>

        <div className="mt-8 rounded-[28px] border border-stroke bg-white px-5 py-6">
          <p className="text-sm leading-7 text-foreground/86">
            {activePoint.note ?? "Tidak ada catatan."}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div className="panel-hover rounded-[24px] bg-[#f4f7f3] px-4 py-4">
            <p className="soft-label">Rata-rata</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
              {(data.reduce((sum, point) => sum + point.score, 0) / data.length).toFixed(1)}
            </p>
          </div>
          <div className="panel-hover rounded-[24px] bg-[#f4f7f3] px-4 py-4">
            <p className="soft-label">Tertinggi</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
              {Math.max(...data.map((point) => point.score))}/5
            </p>
          </div>
          <div className="panel-hover rounded-[24px] bg-[#f4f7f3] px-4 py-4">
            <p className="soft-label">Terendah</p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
              {Math.min(...data.map((point) => point.score))}/5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
