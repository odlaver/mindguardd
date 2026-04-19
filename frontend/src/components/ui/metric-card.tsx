type MetricCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  trend?: string;
  trendTone?: "aman" | "warning" | "neutral";
};

const trendToneClass = {
  aman: "text-safe",
  warning: "text-warning",
  neutral: "text-foreground/72",
};

export function MetricCard({
  label,
  value,
  detail,
  trend,
  trendTone = "neutral",
}: MetricCardProps) {
  return (
    <div className="surface-card-strong panel-hover stagger-in p-5">
      <p className="soft-label">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground">{value}</p>
      {detail ? <p className="mt-2 text-sm text-ink-soft">{detail}</p> : null}
      {trend ? (
        <p className={`mt-3 text-sm font-semibold ${trendToneClass[trendTone]}`}>{trend}</p>
      ) : null}
    </div>
  );
}
