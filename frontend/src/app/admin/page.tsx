import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  adminMetrics,
  adminThresholds,
  classHealth,
} from "@/lib/mock-data";

export default function AdminPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Dashboard Admin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Kontrol operasional.
          </h1>
        </div>
        <StatusBadge tone="warning">Mode konfigurasi MVP</StatusBadge>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total users"
          value={adminMetrics.totalUsers}
        />
        <MetricCard
          label="Siswa aktif"
          value={adminMetrics.activeStudents}
        />
        <MetricCard
          label="Guru BK"
          value={adminMetrics.counselors}
        />
        <MetricCard
          label="Kelas"
          value={adminMetrics.classes}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <SectionCard title="System configuration">
          <div className="grid gap-3">
            {adminThresholds.map((item) => (
              <article key={item.label} className="panel-hover rounded-[24px] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">{item.label}</h2>
                  <StatusBadge
                    tone={item.status === "Aktif" ? "aman" : "warning"}
                  >
                    {item.status}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Health per kelas">
          <div className="grid gap-3">
            {classHealth.map((item) => (
              <article
                key={item.className}
                className="panel-hover grid gap-3 rounded-[24px] bg-white p-4 md:grid-cols-[0.7fr_0.5fr_0.7fr]"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.className}</h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    Completion {item.completion}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#eef5ef]">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: item.completion }}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <StatusBadge
                    tone={
                      item.riskBand === "Stabil"
                        ? "aman"
                        : item.riskBand === "Monitor"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {item.riskBand}
                  </StatusBadge>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
