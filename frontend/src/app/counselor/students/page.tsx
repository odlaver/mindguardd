import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { counselorStudents } from "@/lib/mock-data";

export default function CounselorStudentsPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Data Siswa</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Data Siswa</h1>
        </div>
        <StatusBadge tone="monitor">{counselorStudents.length} siswa prioritas</StatusBadge>
      </section>

      <SectionCard title="Daftar siswa">
        <div className="grid gap-3">
          {counselorStudents.map((student) => (
            <article
              key={student.id}
              className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">
                    {student.name}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    {student.className} | mood terakhir {student.latestMood}/5
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
                  <Link
                    href={`/counselor/students/${student.id}`}
                    className="button-primary text-white hover:text-white"
                    style={{ WebkitTextFillColor: "#ffffff" }}
                  >
                    Detail
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                {student.focus}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
