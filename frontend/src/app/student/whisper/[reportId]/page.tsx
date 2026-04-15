import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { whisperReports } from "@/lib/mock-data";

type WhisperDetailPageProps = {
  params: Promise<{
    reportId: string;
  }>;
};

function getStatusTone(status?: string) {
  if (status === "Selesai") {
    return "aman";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "warning";
}

export default async function WhisperDetailPage({
  params,
}: WhisperDetailPageProps) {
  const { reportId } = await params;
  const report = whisperReports.find((item) => item.id === reportId);

  if (!report) {
    notFound();
  }

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Detail Laporan</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {report.title}
          </h1>
        </div>
        <Link href="/student/whisper" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Isi laporan">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone="monitor">{report.category}</StatusBadge>
            <StatusBadge tone={report.urgency === "Tinggi" ? "danger" : "warning"}>
              {report.urgency}
            </StatusBadge>
            <StatusBadge tone={getStatusTone(report.status)}>
              {report.status ?? "Sedang Ditinjau"}
            </StatusBadge>
          </div>
          <p className="mt-6 text-base leading-8 text-ink-soft">{report.detail}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
            {report.id} | {report.submittedAt}
          </p>
        </SectionCard>

        <SectionCard title="Tindak lanjut">
          <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
            <p className="soft-label">Status</p>
            <p className="mt-3 text-lg font-semibold">
              {report.status ?? "Sedang Ditinjau"}
            </p>
          </div>
          <div className="mt-4 rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
            <p className="soft-label">Langkah berikutnya</p>
            <p className="mt-3 text-sm leading-7 text-foreground/88">
              {report.nextStep}
            </p>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
