import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { alerts } from "@/lib/mock-data";

export default function CounselorAlertsPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Alert Risiko</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Klik alert untuk melihat detail dan track mood siswa.
          </h1>
        </div>
        <StatusBadge tone="warning">3 hari mood ≤ 2</StatusBadge>
      </section>

      <SectionCard title="Daftar alert aktif">
        <div className="grid gap-3">
          {alerts.map((alert) => (
            <Link
              key={alert.id}
              href={`/counselor/alerts/${alert.id}`}
              className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
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
                  <StatusBadge
                    tone={
                      alert.status === "Baru"
                        ? "danger"
                        : alert.status === "Ditinjau"
                          ? "warning"
                          : alert.status === "Selesai"
                            ? "aman"
                            : "monitor"
                    }
                  >
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
