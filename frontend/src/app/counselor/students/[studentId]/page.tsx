import { notFound } from "next/navigation";

import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  counselorStudents,
  studentInterventions,
  studentMoodHistory,
} from "@/lib/mock-data";

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

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Student Mood Detail</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {student.name}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{student.className}</StatusBadge>
          <StatusBadge tone="danger">{student.risk}</StatusBadge>
          <StatusBadge>{student.trend}</StatusBadge>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Mood terakhir"
          value={`${student.latestMood}/5`}
        />
        <MetricCard
          label="Hari risiko"
          value="3"
        />
        <MetricCard
          label="Whisper terkait"
          value="1"
        />
        <MetricCard
          label="Intervensi aktif"
          value={studentInterventions.length}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <SectionCard title="Histori mood 14 hari">
          <div className="grid gap-3">
            {studentMoodHistory.map((point) => (
              <div
                key={point.date}
                className="panel-hover grid gap-3 rounded-[24px] bg-white p-4 md:grid-cols-[0.4fr_0.2fr_1fr]"
              >
                <div>
                  <p className="text-sm font-semibold">{point.date}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    mood entry
                  </p>
                </div>
                <div className="text-3xl font-semibold">{point.score}</div>
                <p className="text-sm leading-6 text-ink-soft">
                  {point.note ?? "Tidak ada catatan tambahan."}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-4">
          <SectionCard title="Tindak lanjut">
            <div className="grid gap-3">
              {studentInterventions.map((item) => (
                <article key={item.title} className="panel-hover rounded-[24px] bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <StatusBadge
                      tone={item.status === "Dijadwalkan" ? "warning" : "monitor"}
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

          <SectionCard title="Catatan">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="danger">Tren menurun</StatusBadge>
              <StatusBadge tone="warning">Tekanan sosial</StatusBadge>
              <StatusBadge tone="monitor">1 whisper terkait</StatusBadge>
            </div>
          </SectionCard>
        </div>
      </section>
    </>
  );
}
