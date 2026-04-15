import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { whisperReports } from "@/lib/mock-data";

export default function CounselorWhispersPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Whisper Reports</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Laporan anonim harus tetap actionable.
          </h1>
        </div>
        <StatusBadge tone="danger">5 laporan perlu review</StatusBadge>
      </section>

      <SectionCard title="Inbox laporan">
        <div className="grid gap-3 lg:grid-cols-2">
          {whisperReports.map((report) => (
            <article key={report.id} className="panel-hover rounded-[24px] bg-white p-5">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="monitor">{report.category}</StatusBadge>
                <StatusBadge
                  tone={report.urgency === "Tinggi" ? "danger" : "warning"}
                >
                  {report.urgency}
                </StatusBadge>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{report.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                {report.excerpt}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {report.id} • {report.submittedAt}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
