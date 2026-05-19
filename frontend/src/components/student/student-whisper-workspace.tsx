"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { CharacterCount } from "@/components/ui/character-count";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { sendJson } from "@/lib/client/api";
import type { WhisperReport } from "@/lib/types";

const categories = [
  "Bullying",
  "Tekanan sosial",
  "Relasi sekolah",
  "Masalah pribadi",
] as const;

function getStatusTone(status?: string) {
  if (status === "Selesai") {
    return "aman";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "warning";
}

type StudentWhisperWorkspaceProps = {
  reports: WhisperReport[];
};

export function StudentWhisperWorkspace({
  reports,
}: StudentWhisperWorkspaceProps) {
  const router = useRouter();
  const [category, setCategory] = useState<(typeof categories)[number]>("Bullying");
  const [urgency, setUrgency] = useState<"Normal" | "Tinggi">("Normal");
  const [detail, setDetail] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const nextTitle = String(formData.get("title") ?? "").trim();
    const nextDetail = String(formData.get("detail") ?? "").trim();

    if (nextTitle.length > 0 && nextTitle.length < 3) {
      setError("Judul minimal 3 karakter jika diisi.");
      setIsSubmitting(false);
      return;
    }

    if (nextDetail.length < 20) {
      setError("Isi laporan minimal 20 karakter.");
      setIsSubmitting(false);
      return;
    }

    const result = await sendJson<{ id?: string; ok?: boolean }>(
      "/api/whispers",
      {
        body: JSON.stringify({
          category,
          detail: nextDetail,
          title: nextTitle || undefined,
          urgency,
        }),
        method: "POST",
      },
      "Laporan belum bisa dikirim.",
    );

    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setCategory("Bullying");
    setUrgency("Normal");
    setDetail("");
    setTitle("");
    setIsSubmitting(false);
    router.refresh();
  }

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
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div>
              <span className="text-sm font-semibold">Kategori</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((item) => {
                  const active = item === category;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`choice-chip ${
                        active ? "choice-chip-active" : "choice-chip-idle"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold">Judul singkat</span>
                <CharacterCount max={120} min={3} optional value={title} />
              </div>
              <input
                name="title"
                maxLength={120}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="field-control bg-white px-4"
                placeholder="Opsional, bisa dikosongkan."
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold">Urgensi</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setUrgency("Normal")}
                  aria-pressed={urgency === "Normal"}
                  className={`rounded-[20px] border px-4 py-4 text-left font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/10 ${
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
                  className={`rounded-[20px] border px-4 py-4 text-left font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-danger/15 ${
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold">Isi laporan</span>
                <CharacterCount max={2000} min={20} value={detail} />
              </div>
              <textarea
                name="detail"
                rows={8}
                maxLength={2000}
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                className="field-control bg-white px-4"
                placeholder="Tulis yang perlu disampaikan."
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-ink-soft">
                {error ? <p className="font-medium text-danger">{error}</p> : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary min-w-[180px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Riwayat laporan saya">
          <div className="grid gap-3">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/student/whisper/${report.id}`}
                className="panel-hover rounded-[24px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone="monitor">{report.category}</StatusBadge>
                    <StatusBadge tone={report.urgency === "Tinggi" ? "danger" : "warning"}>
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
                  <span className="interactive-card-arrow text-sm font-semibold text-foreground/70">
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
