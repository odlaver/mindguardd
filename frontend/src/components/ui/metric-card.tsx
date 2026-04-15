type MetricCardProps = {
  label: string;
  value: string | number;
  detail?: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="surface-card-strong panel-hover stagger-in p-5">
      <p className="soft-label">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{value}</p>
      {detail ? <p className="mt-2 text-sm text-ink-soft">{detail}</p> : null}
    </div>
  );
}
