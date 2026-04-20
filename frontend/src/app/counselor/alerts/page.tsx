import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getAlerts } from "@/lib/server/data";

function getReviewTone(status: "Baru" | "Sedang Ditinjau" | "Selesai") {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "aman";
}

export default async function CounselorAlertsPage() {
  const alerts = await getAlerts();

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Menerima Alert Risiko</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Alert Risiko</h1>
        </div>
        <StatusBadge tone="monitor">3 hari mood &lt;= 2</StatusBadge>
      </section>

      <SectionCard title="Daftar alert aktif" className="p-5 sm:p-6">
        <div className="grid gap-3">
          {alerts.map((alert) => (
            <Link
              key={alert.id}
              href={`/counselor/alerts/${alert.id}`}
              className="group panel-hover rounded-[28px] border border-stroke bg-white px-5 py-5 hover:border-foreground/16 hover:bg-[#f7f8f4]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{alert.student}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    {alert.className} | {alert.id}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={alert.severity === "Tinggi" ? "danger" : "warning"}>
                    {alert.severity}
                  </StatusBadge>
                  <StatusBadge tone={getReviewTone(alert.status)}>
                    {alert.status}
                  </StatusBadge>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{alert.reason}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {alert.lastUpdated}
              </p>
            </Link>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
