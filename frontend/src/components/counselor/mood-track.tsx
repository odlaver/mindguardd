import type { MoodPoint } from "@/lib/mock-data";

type MoodTrackProps = {
  history: MoodPoint[];
  title?: string;
};

export function MoodTrack({ history, title = "Track Mood 14 Hari" }: MoodTrackProps) {
  return (
    <div className="rounded-[28px] border border-stroke bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
        <span className="soft-label">Skala 1-5</span>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-3 sm:grid-cols-14">
        {history.map((point) => (
          <div
            key={point.date}
            className="panel-hover flex flex-col items-center rounded-[22px] bg-[#f7f8f4] px-2 py-3"
          >
            <div className="flex h-28 items-end">
              <div
                className="w-5 rounded-full bg-foreground/95"
                style={{ height: `${Math.max(18, point.score * 18)}px` }}
              />
            </div>
            <p className="mt-3 text-xs font-semibold text-foreground/75">
              {point.score}
            </p>
            <p className="mt-1 text-[11px] font-medium text-ink-soft">
              {point.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
