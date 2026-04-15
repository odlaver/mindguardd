import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { alerts } from "@/lib/mock-data";

export default function CounselorAlertsPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Alert Center</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Review dan tindak lanjut alert.
          </h1>
        </div>
        <StatusBadge tone="warning">3 hari mood ≤ 2</StatusBadge>
      </section>

      <SectionCard title="Daftar alert aktif">
        <div className="overflow-hidden rounded-[24px] border border-stroke">
          <div className="hidden grid-cols-[0.9fr_1.2fr_0.7fr_0.9fr_0.9fr] gap-4 bg-[#f6faf6] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft md:grid">
            <div>Siswa</div>
            <div>Alasan</div>
            <div>Severity</div>
            <div>Status</div>
            <div>Updated</div>
          </div>
          {alerts.map((alert) => (
            <article
              key={alert.id}
              className="grid gap-3 border-t border-stroke bg-white px-5 py-4 md:grid-cols-[0.9fr_1.2fr_0.7fr_0.9fr_0.9fr] md:items-center"
            >
              <div>
                <p className="text-sm font-semibold">{alert.student}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                  {alert.className} • {alert.id}
                </p>
              </div>
              <p className="text-sm leading-6 text-ink-soft">{alert.reason}</p>
              <div>
                <StatusBadge
                  tone={alert.severity === "Tinggi" ? "danger" : "warning"}
                >
                  {alert.severity}
                </StatusBadge>
              </div>
              <div>
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
              <p className="text-sm text-ink-soft">{alert.lastUpdated}</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
