import Link from "next/link";

import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getAlerts,
  getCounselorOverview,
  getCounselorStudents,
  getWhisperReports,
} from "@/lib/server/data";

function getReviewTone(status: "Baru" | "Sedang Ditinjau" | "Selesai") {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "aman";
}

export default async function CounselorPage() {
  const [alerts, counselorOverview, counselorStudents, whisperReports] = await Promise.all([
    getAlerts(),
    getCounselorOverview(),
    getCounselorStudents(),
    getWhisperReports(),
  ]);
  const priorityStudentIds = new Set(
    alerts.filter((alert) => alert.severity === "Tinggi").map((alert) => alert.studentId),
  );
  const priorityStudents = counselorStudents.filter((student) =>
    priorityStudentIds.has(student.id),
  );

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Memantau Dashboard Mood</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Prioritas Hari Ini</h1>
        </div>
        <Link
          href="/counselor/alerts"
          className="button-primary"
          style={{ WebkitTextFillColor: "#ffffff" }}
        >
          Alert Risiko
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Siswa dipantau" value={counselorOverview.monitoredStudents} />
        <MetricCard label="Alert aktif" value={counselorOverview.activeAlerts} />
        <MetricCard label="Ditinjau hari ini" value={counselorOverview.reviewedToday} />
        <MetricCard label="Laporan masuk" value={counselorOverview.anonymousReports} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <SectionCard title="Siswa prioritas">
          <div className="grid gap-3">
            {priorityStudents.map((student) => (
              <article
                key={student.id}
                className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{student.name}</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      {student.className} | mood terakhir {student.latestMood}/5
                    </p>
                  </div>
                  <StatusBadge
                    tone="danger"
                  >
                    Prioritas
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{student.focus}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground/75">
                    {student.trend}
                  </span>
                  <Link
                    href={`/counselor/students/${student.id}`}
                    className="button-secondary"
                  >
                    Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-4">
          <SectionCard title="Alert terbaru">
            <div className="grid gap-3">
              {alerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={`/counselor/alerts/${alert.id}`}
                  className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{alert.id}</p>
                      <h2 className="mt-1 text-lg font-semibold">{alert.student}</h2>
                    </div>
                    <StatusBadge tone={alert.severity === "Tinggi" ? "danger" : "warning"}>
                      {alert.severity}
                    </StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{alert.reason}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Menindaklanjuti siswa">
            <div className="grid gap-3">
              {whisperReports.map((report) => (
                <Link
                  key={report.id}
                  href={`/counselor/whispers/${report.id}`}
                  className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{report.id}</p>
                    <StatusBadge tone={getReviewTone(report.status ?? "Baru")}>
                      {report.status}
                    </StatusBadge>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{report.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{report.ownerLabel}</p>
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>
    </>
  );
}
