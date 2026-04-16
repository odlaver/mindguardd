import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { whisperReports } from "@/lib/mock-data";

function getReviewTone(status: "Baru" | "Sedang Ditinjau" | "Selesai") {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "aman";
}

export default function CounselorWhispersPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Menindaklanjuti Siswa</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Laporan Siswa</h1>
        </div>
        <StatusBadge tone="danger">
          {whisperReports.filter((item) => item.status !== "Selesai").length} laporan aktif
        </StatusBadge>
      </section>

      <SectionCard title="Inbox laporan">
        <div className="grid gap-3 lg:grid-cols-2">
          {whisperReports.map((report) => (
            <Link
              key={report.id}
              href={`/counselor/whispers/${report.id}`}
              className="panel-hover rounded-[24px] border border-stroke bg-white p-5"
            >
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="monitor">{report.category}</StatusBadge>
                <StatusBadge tone={report.urgency === "Tinggi" ? "danger" : "warning"}>
                  {report.urgency}
                </StatusBadge>
                <StatusBadge tone={getReviewTone(report.status ?? "Baru")}>
                  {report.status}
                </StatusBadge>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{report.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{report.excerpt}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {report.id} | {report.ownerLabel}
              </p>
            </Link>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
