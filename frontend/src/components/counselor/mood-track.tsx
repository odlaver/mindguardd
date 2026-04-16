"use client";

import { useState } from "react";

import type { MoodPoint } from "@/lib/mock-data";

type MoodTrackProps = {
  history: MoodPoint[];
  title?: string;
  showActiveCard?: boolean;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
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

export function MoodTrack({
  history,
  title = "Track Mood 7 Hari",
  showActiveCard = true,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
}: MoodTrackProps) {
  const recentHistory = history.slice(-7);
  const [internalActiveIndex, setInternalActiveIndex] = useState(recentHistory.length - 1);
  const activeIndex = controlledActiveIndex ?? internalActiveIndex;
  const activePoint = recentHistory[activeIndex];

  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  const stepX =
    recentHistory.length > 1 ? plotWidth / (recentHistory.length - 1) : 0;

  const points = recentHistory.map((point, index) => {
    const x = chartPadding.left + index * stepX;
    const y = chartPadding.top + ((5 - point.score) / 4) * plotHeight;

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
    `L ${
      points[points.length - 1]?.x ?? chartWidth - chartPadding.right
    } ${chartHeight - chartPadding.bottom}`,
    "Z",
  ].join(" ");

  if (!activePoint) {
    return null;
  }

  const setActivePoint = (index: number) => {
    setInternalActiveIndex(index);
    onActiveIndexChange?.(index);
  };

  return (
    <div className="grid min-w-0 gap-5">
      <div className="min-w-0 overflow-hidden rounded-[28px] border border-stroke bg-white p-5 shadow-[0_18px_50px_rgba(35,58,50,0.06)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
            <span className="soft-label">Skala 1-5</span>
          </div>
          <div className="text-sm text-ink-soft"></div>
        </div>

        <div className="mt-6 min-w-0">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-auto w-full"
            role="img"
            aria-label="Grafik mood 7 hari dengan skala 1 sampai 5"
          >
            <defs>
              <linearGradient id="counselor-mood-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(115,173,135,0.24)" />
                <stop offset="100%" stopColor="rgba(115,173,135,0.02)" />
              </linearGradient>
            </defs>

            {[1, 2, 3, 4, 5].map((score) => {
              const y = chartPadding.top + ((5 - score) / 4) * plotHeight;

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

            <path d={areaPath} fill="url(#counselor-mood-fill)" />
            <path
              d={linePath}
              fill="none"
              stroke="#20332d"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {points.map((point, index) => {
              const active = index === activeIndex;

              return (
                <g
                  key={point.date}
                  onMouseEnter={() => setActivePoint(index)}
                  onClick={() => setActivePoint(index)}
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

        <div className="mt-3 grid grid-cols-7 gap-2 text-xs font-medium text-ink-soft">
          {recentHistory.map((point, index) => (
            <button
              key={point.date}
              type="button"
              onMouseEnter={() => setActivePoint(index)}
              onClick={() => setActivePoint(index)}
              className={`rounded-full px-2 py-2 transition ${
                index === activeIndex
                  ? "bg-foreground text-white"
                  : "bg-[#f5f7f3] text-ink-soft hover:bg-[#edf2ee] hover:text-foreground"
              }`}
            >
              {point.date}
            </button>
          ))}
        </div>
      </div>

      {showActiveCard ? (
        <MoodTrackActiveCard history={recentHistory} activeIndex={activeIndex} />
      ) : null}
    </div>
  );
}

type MoodTrackActiveCardProps = {
  history: MoodPoint[];
  activeIndex: number;
};

export function MoodTrackActiveCard({
  history,
  activeIndex,
}: MoodTrackActiveCardProps) {
  const activePoint = history[activeIndex];

  if (!activePoint) {
    return null;
  }

  return (
    <div className="min-w-0 rounded-[28px] border border-stroke bg-white p-6 shadow-[0_18px_50px_rgba(35,58,50,0.06)]">
      <p className="soft-label">Titik aktif</p>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold tracking-[-0.04em]">{activePoint.date}</h3>
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

      <div className="mt-8 rounded-[28px] border border-stroke bg-[#f7f8f4] px-5 py-6">
        <p className="text-sm leading-7 text-foreground/86">
          {activePoint.note ?? "Tidak ada catatan."}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[24px] bg-[#f4f7f3] px-4 py-4">
          <p className="soft-label">Rata-rata</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
            {(history.reduce((sum, point) => sum + point.score, 0) / history.length).toFixed(1)}
          </p>
        </div>
        <div className="rounded-[24px] bg-[#f4f7f3] px-4 py-4">
          <p className="soft-label">Tertinggi</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
            {Math.max(...history.map((point) => point.score))}/5
          </p>
        </div>
        <div className="rounded-[24px] bg-[#f4f7f3] px-4 py-4">
          <p className="soft-label">Terendah</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
            {Math.min(...history.map((point) => point.score))}/5
          </p>
        </div>
      </div>
    </div>
  );
}
