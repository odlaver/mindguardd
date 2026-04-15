import Link from "next/link";

import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { alerts, counselorOverview, counselorStudents } from "@/lib/mock-data";

export default function CounselorPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Dashboard Monitoring</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Prioritas hari ini.
          </h1>
        </div>
        <Link href="/counselor/alerts" className="button-primary">
          Buka Alert Center
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Siswa dipantau"
          value={counselorOverview.monitoredStudents}
        />
        <MetricCard
          label="Alert aktif"
          value={counselorOverview.activeAlerts}
        />
        <MetricCard
          label="Ditinjau hari ini"
          value={counselorOverview.reviewedToday}
        />
        <MetricCard
          label="Whisper baru"
          value={counselorOverview.anonymousReports}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Siswa prioritas">
          <div className="grid gap-3">
            {counselorStudents.map((student) => (
              <Link
                key={student.id}
                href={`/counselor/students/${student.id}`}
                className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{student.name}</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      {student.className} • mood terakhir {student.latestMood}/5
                    </p>
                  </div>
                  <StatusBadge
                    tone={
                      student.risk === "Tinggi"
                        ? "danger"
                        : student.risk === "Sedang"
                          ? "warning"
                          : "aman"
                    }
                  >
                    {student.risk}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground/75">
                  {student.trend}
                </p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Alert terbaru">
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <article key={alert.id} className="panel-hover rounded-[24px] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{alert.id}</p>
                    <h2 className="mt-1 text-lg font-semibold">
                      {alert.student}
                    </h2>
                  </div>
                  <StatusBadge
                    tone={alert.severity === "Tinggi" ? "danger" : "warning"}
                  >
                    {alert.severity}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {alert.reason}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  {alert.status} • {alert.lastUpdated}
                </p>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
