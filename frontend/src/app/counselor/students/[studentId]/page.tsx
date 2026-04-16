import Link from "next/link";
import { notFound } from "next/navigation";

import { MoodTrack } from "@/components/counselor/mood-track";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  alerts,
  counselorStudents,
  studentInterventions,
  whisperReports,
} from "@/lib/mock-data";

function getReviewTone(status: "Baru" | "Sedang Ditinjau" | "Selesai") {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "aman";
}

type StudentDetailPageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function StudentDetailPage({
  params,
}: StudentDetailPageProps) {
  const { studentId } = await params;
  const student = counselorStudents.find((item) => item.id === studentId);

  if (!student) {
    notFound();
  }

  const linkedAlerts = alerts.filter((item) => item.studentId === student.id);
  const linkedReports = whisperReports.filter((item) => item.studentId === student.id);
  const interventions = studentInterventions.filter(
    (item) => item.studentId === student.id,
  );
  const riskDays = student.moodHistory.filter((item) => item.score <= 2).length;

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Melihat Detail Mood Siswa</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {student.name}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone="monitor">{student.className}</StatusBadge>
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
          <Link href="/counselor/students" className="button-secondary">
            Kembali
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Mood terakhir" value={`${student.latestMood}/5`} />
        <MetricCard label="Hari risiko" value={riskDays} />
        <MetricCard label="Alert terkait" value={linkedAlerts.length} />
        <MetricCard label="Tindak lanjut" value={interventions.length} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Ringkasan siswa">
          <p className="text-base leading-8 text-ink-soft">{student.focus}</p>

          <div className="mt-6">
            <MoodTrack history={student.moodHistory} />
          </div>
        </SectionCard>

        <div className="grid gap-4">
          <SectionCard title="Tindak lanjut">
            <div className="grid gap-3">
              {interventions.map((item) => (
                <article
                  key={`${item.studentId}-${item.title}`}
                  className="panel-hover rounded-[24px] bg-white p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <StatusBadge
                      tone={
                        item.status === "Baru"
                          ? "danger"
                          : item.status === "Sedang Ditinjau"
                            ? "warning"
                            : "aman"
                      }
                    >
                      {item.status}
                    </StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    PIC: {item.owner}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">
                    Jadwal: {item.when}
                  </p>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Terkait">
            <div className="grid gap-3">
              {linkedAlerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={`/counselor/alerts/${alert.id}`}
                  className="panel-hover rounded-[22px] border border-stroke bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{alert.id}</p>
                    <StatusBadge tone={alert.severity === "Tinggi" ? "danger" : "warning"}>
                      {alert.severity}
                    </StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {alert.reason}
                  </p>
                </Link>
              ))}
              {linkedReports.map((report) => (
                <Link
                  key={report.id}
                  href={`/counselor/whispers/${report.id}`}
                  className="panel-hover rounded-[22px] border border-stroke bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{report.id}</p>
                    <StatusBadge tone={getReviewTone(report.status ?? "Baru")}>
                      {report.status}
                    </StatusBadge>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {report.title}
                  </p>
                </Link>
              ))}
              <Link
                href="/counselor/counseling"
                className="button-primary"
                style={{ WebkitTextFillColor: "#ffffff" }}
              >
                Kelola konseling
              </Link>
            </div>
          </SectionCard>
        </div>
      </section>
    </>
  );
}
