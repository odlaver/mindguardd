"use client";

import { useState } from "react";
import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CounselorStudent, WhisperReport } from "@/lib/mock-data";

type WhisperDetailViewProps = {
  report: WhisperReport;
  student?: CounselorStudent;
};

export function WhisperDetailView({
  report,
  student,
}: WhisperDetailViewProps) {
  const [status, setStatus] = useState<"Sedang Ditinjau" | "Selesai">(
    report.status ?? "Sedang Ditinjau",
  );

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Detail Laporan</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {report.title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone="monitor">{report.ownerLabel}</StatusBadge>
          <StatusBadge tone={report.urgency === "Tinggi" ? "danger" : "warning"}>
            {report.urgency}
          </StatusBadge>
          <Link href="/counselor/whispers" className="button-secondary">
            Kembali ke Laporan
          </Link>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.06fr_0.94fr]">
        <SectionCard title="Isi laporan">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="monitor">{report.category}</StatusBadge>
            <StatusBadge tone={status === "Selesai" ? "aman" : "warning"}>
              {status}
            </StatusBadge>
          </div>

          <p className="mt-5 text-base leading-8 text-ink-soft">{report.detail}</p>

          <div className="mt-6 rounded-[24px] bg-white p-5">
            <p className="soft-label">Tindak lanjut saat ini</p>
            <p className="mt-3 text-base leading-8 text-ink-soft">{report.nextStep}</p>
          </div>
        </SectionCard>

        <div className="grid gap-4">
          <SectionCard title="Update status">
            <div className="flex flex-wrap gap-2">
              {(["Sedang Ditinjau", "Selesai"] as const).map((option) => {
                const active = status === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setStatus(option)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-foreground bg-foreground text-white"
                        : "border-stroke bg-white text-foreground hover:border-foreground/16"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              Status diperbarui untuk sesi kerja saat ini.
            </p>
          </SectionCard>

          <SectionCard title="Info penanganan">
            <div className="grid gap-3">
              <div className="rounded-[22px] bg-white p-4">
                <p className="soft-label">Laporan</p>
                <p className="mt-3 text-base font-semibold">{report.id}</p>
              </div>
              <div className="rounded-[22px] bg-white p-4">
                <p className="soft-label">Penanggung jawab</p>
                <p className="mt-3 text-base font-semibold">{report.assignedTo}</p>
              </div>
              <div className="rounded-[22px] bg-white p-4">
                <p className="soft-label">Masuk pada</p>
                <p className="mt-3 text-base font-semibold">{report.submittedAt}</p>
              </div>
            </div>

            {student ? (
              <Link
                href={`/counselor/students/${student.id}`}
                className="button-primary mt-4"
                style={{ WebkitTextFillColor: "#ffffff" }}
              >
                Buka detail siswa
              </Link>
            ) : null}
          </SectionCard>
        </div>
      </section>
    </>
  );
}
