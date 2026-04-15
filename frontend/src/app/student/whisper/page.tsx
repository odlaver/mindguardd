"use client";

import Link from "next/link";
import { useState } from "react";

import { CustomSelect } from "@/components/ui/custom-select";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { whisperReports } from "@/lib/mock-data";

function getStatusTone(status?: string) {
  if (status === "Selesai") {
    return "aman";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "warning";
}

export default function StudentWhisperPage() {
  const [urgency, setUrgency] = useState<"Normal" | "Tinggi">("Normal");

  return (
    <>
      <section className="page-hero stagger-in grid gap-5 p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:p-8">
        <div>
          <p className="soft-label">Kirim Laporan</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Kirim laporan anonim.
          </h1>
        </div>
        <StatusBadge tone="danger">Privat</StatusBadge>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Laporan baru">
          <div className="grid gap-4">
            <CustomSelect
              label="Kategori"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 8.5H17M7 12H14M7 15.5H12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              }
              options={[
                {
                  label: "Bullying",
                  description: "Perundungan verbal, fisik, atau online",
                },
                {
                  label: "Tekanan sosial",
                  description: "Teman, kelompok, atau lingkungan sekitar",
                },
                {
                  label: "Relasi sekolah",
                  description: "Guru, kelas, aturan, atau interaksi di sekolah",
                },
                {
                  label: "Masalah pribadi",
                  description: "Hal personal yang ingin disampaikan dengan aman",
                },
              ]}
            />

            <label className="space-y-2">
              <span className="text-sm font-semibold">Urgensi</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setUrgency("Normal")}
                  aria-pressed={urgency === "Normal"}
                  className={`rounded-[22px] border px-4 py-4 text-left font-semibold transition ${
                    urgency === "Normal"
                      ? "border-foreground bg-foreground text-white shadow-[0_14px_30px_rgba(23,48,41,0.14)]"
                      : "border-stroke bg-white text-foreground hover:border-foreground/18 hover:bg-[#f7f9f5]"
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("Tinggi")}
                  aria-pressed={urgency === "Tinggi"}
                  className={`rounded-[22px] border px-4 py-4 text-left font-semibold transition ${
                    urgency === "Tinggi"
                      ? "border-danger bg-danger text-white shadow-[0_14px_30px_rgba(217,122,114,0.2)]"
                      : "border-danger/30 bg-danger/10 text-danger hover:bg-danger hover:text-white"
                  }`}
                >
                  Tinggi
                </button>
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold">Isi laporan</span>
              <textarea
                rows={8}
                className="w-full rounded-[22px] border border-stroke bg-white px-4 py-4 outline-none transition focus:border-foreground/25"
                placeholder="Tulis yang perlu disampaikan."
              />
            </label>

            <div className="flex justify-end">
              <button type="button" className="button-primary min-w-[180px]">
                Kirim
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Riwayat laporan saya">
          <div className="grid gap-3">
            {whisperReports.map((report) => (
              <Link
                key={report.id}
                href={`/student/whisper/${report.id}`}
                className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone="monitor">{report.category}</StatusBadge>
                    <StatusBadge
                      tone={report.urgency === "Tinggi" ? "danger" : "warning"}
                    >
                      {report.urgency}
                    </StatusBadge>
                  </div>
                  <StatusBadge tone={getStatusTone(report.status)}>
                    {report.status ?? "Sedang Ditinjau"}
                  </StatusBadge>
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                  {report.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {report.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                    {report.id} | {report.submittedAt}
                  </p>
                  <span className="text-sm font-semibold text-foreground/70">
                    {"Detail ->"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
