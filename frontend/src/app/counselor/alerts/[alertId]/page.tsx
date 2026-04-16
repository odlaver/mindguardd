import Link from "next/link";
import { notFound } from "next/navigation";

import { AlertDetailPanels } from "@/components/counselor/alert-detail-panels";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { alerts, counselorStudents } from "@/lib/mock-data";

type AlertDetailPageProps = {
  params: Promise<{
    alertId: string;
  }>;
};

function getReviewTone(status: "Baru" | "Sedang Ditinjau" | "Selesai") {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "aman";
}

export default async function AlertDetailPage({ params }: AlertDetailPageProps) {
  const { alertId } = await params;
  const alert = alerts.find((item) => item.id === alertId);

  if (!alert) {
    notFound();
  }

  const student = counselorStudents.find((item) => item.id === alert.studentId);

  if (!student) {
    notFound();
  }

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Menerima Alert Risiko</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {alert.student}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone="monitor">{alert.className}</StatusBadge>
          <StatusBadge tone={alert.severity === "Tinggi" ? "danger" : "warning"}>
            {alert.severity}
          </StatusBadge>
          <Link href="/counselor/alerts" className="button-secondary">
            Kembali
          </Link>
        </div>
      </section>

      <SectionCard className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={getReviewTone(alert.status)}>{alert.status}</StatusBadge>
          <StatusBadge tone="monitor">{alert.id}</StatusBadge>
        </div>

        <p className="mt-5 text-lg font-semibold tracking-[-0.03em]">{alert.reason}</p>
        <p className="mt-4 text-base leading-8 text-ink-soft">{alert.summary}</p>

        <div className="mt-6">
          <AlertDetailPanels
            history={student.moodHistory}
            recommendation={alert.recommendation}
            detailHref={`/counselor/students/${student.id}`}
          />
        </div>
      </SectionCard>
    </>
  );
}
