"use client";

import Link from "next/link";
import { useState } from "react";

import { useStudentAccess } from "@/components/student/student-access-provider";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CounselingSession, MoodPoint, ResourceItem, WhisperReport } from "@/lib/mock-data";
import { studentMoodOptions } from "@/lib/mock-data";
import type { StudentProfileData } from "@/lib/server/data";

function getMoodPreview(score: number, note?: string) {
  const option = studentMoodOptions.find((item) => item.score === score);

  return {
    emoji: option?.emoji ?? ":|",
    note: note || option?.label || "Tenang",
    score,
  };
}

type StudentDashboardProps = {
  counselingSessions: CounselingSession[];
  moodHistory: MoodPoint[];
  profile: StudentProfileData;
  resources: ResourceItem[];
  whisperReports: WhisperReport[];
};

export function StudentDashboard({
  counselingSessions,
  moodHistory,
  profile,
  resources,
  whisperReports,
}: StudentDashboardProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { completeCheckIn, hasCheckedInToday, isSaving, submission } = useStudentAccess();
  const latestHistory = moodHistory[moodHistory.length - 1];
  const latestMood = submission
    ? getMoodPreview(submission.score, submission.note)
    : latestHistory
      ? getMoodPreview(latestHistory.score, latestHistory.note)
      : getMoodPreview(3);
  const recentDays = moodHistory.slice(-5).reverse();
  const averageScore = moodHistory.length
    ? (
        moodHistory.reduce((sum, point) => sum + point.score, 0) / moodHistory.length
      ).toFixed(1)
    : "0.0";

  if (!hasCheckedInToday) {
    return (
      <section className="page-hero stagger-in overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="soft-label">Mood Check-In</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              Apa kabarmu hari ini?
            </h1>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {studentMoodOptions.map((option) => {
            const active = selectedScore === option.score;

            return (
              <button
                key={option.score}
                type="button"
                onClick={() => setSelectedScore(option.score)}
                className={`rounded-[28px] border p-5 text-left transition ${
                  active
                    ? "border-foreground bg-foreground text-white shadow-[0_18px_40px_rgba(32,51,45,0.16)]"
                    : "border-stroke bg-white/86 hover:-translate-y-0.5 hover:border-foreground/16"
                }`}
              >
                <span className="text-4xl">{option.emoji}</span>
                <div className="mt-6">
                  <p className="text-lg font-semibold">{option.label}</p>
                  <p
                    className={`mt-1 text-sm ${
                      active ? "text-white/70" : "text-ink-soft"
                    }`}
                  >
                    {option.score}/5
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-[30px] border border-stroke bg-[#f7f8f4] p-5 sm:p-6">
          <textarea
            rows={5}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="w-full resize-none rounded-[24px] border border-stroke bg-white px-5 py-4 text-[15px] leading-7 outline-none transition focus:border-foreground/25"
            placeholder="Kalau mau, tulis sedikit."
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-ink-soft">
              <span>Opsional</span>
              {error ? <p className="mt-1 font-medium text-danger">{error}</p> : null}
            </div>
            <button
              type="button"
              disabled={selectedScore === null || isSaving}
              onClick={async () => {
                if (selectedScore === null) {
                  return;
                }

                const result = await completeCheckIn({
                  note: note.trim(),
                  score: selectedScore,
                });

                if (!result.ok) {
                  setError(result.error);
                  return;
                }

                setError(null);
              }}
              className="button-primary min-w-[140px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero stagger-in grid gap-5 overflow-hidden p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="soft-label">Ruang Siswa</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              Halo, {profile.name.split(" ")[0]}.
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="monitor">{profile.className}</StatusBadge>
            <StatusBadge tone="aman">{profile.streak} hari</StatusBadge>
            <StatusBadge tone="warning">{profile.completionRate} konsisten</StatusBadge>
          </div>
        </div>

        <div className="panel-hover rounded-[32px] border border-stroke bg-[#f7f8f4] p-6">
          <div>
            <p className="soft-label">Hari ini</p>
            <div className="mt-5 flex items-center gap-4">
              <span className="text-6xl">{latestMood.emoji}</span>
              <div>
                <p className="text-[2.5rem] font-semibold leading-none">
                  {latestMood.score}/5
                </p>
                <p className="mt-2 text-lg text-ink-soft">{latestMood.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.28fr_0.72fr]">
        <SectionCard title="Overview" className="p-5 sm:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href="/student/history"
              className="group panel-hover rounded-[28px] border border-stroke bg-white px-5 py-5 text-foreground hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Riwayat Mood
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] transition group-hover:text-white">
                Lihat perubahan
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Rata-rata statistik mood 14 hari terakhir adalah {averageScore}/5
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="interactive-card-chip-muted rounded-full px-3 py-1 text-xs font-semibold transition">
                  {moodHistory.length} catatan
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/student/whisper"
              className="group panel-hover rounded-[28px] border border-stroke bg-white px-5 py-5 text-foreground hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Kirim Laporan
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] transition group-hover:text-white">
                Buka whisper
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Sampaikan sesuatu dengan aman dan anonim
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="interactive-card-chip rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger transition">
                  {whisperReports.length} laporan
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/student/resources"
              className="group panel-hover rounded-[28px] border border-stroke bg-white px-5 py-5 text-foreground hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Materi Edukasi
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] transition group-hover:text-white">
                Pilih materi
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Artikel singkat untuk bantu hari ini terasa lebih ringan
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="interactive-card-chip rounded-full bg-secondary/16 px-3 py-1 text-xs font-semibold text-foreground transition">
                  {resources.length} artikel
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/student/counseling"
              className="group panel-hover rounded-[28px] border border-stroke bg-white px-5 py-5 text-foreground hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Konseling
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] transition group-hover:text-white">
                Atur kebutuhan
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Lihat jadwal aktif atau ajukan sesi baru dengan BK
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="interactive-card-chip rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground transition">
                  {counselingSessions.length} sesi aktif
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>
          </div>
        </SectionCard>

        <SectionCard title="Riwayat Mood" className="p-4 sm:p-[18px]">
          <div className="grid gap-3">
            {recentDays.map((point) => (
              <div
                key={point.date}
                className="panel-hover flex items-center justify-between rounded-[18px] bg-white px-3.5 py-3"
              >
                <div>
                  <p className="text-xs font-medium text-ink-soft">{point.date}</p>
                  <p className="mt-1 text-[0.95rem] font-semibold">
                    {getMoodPreview(point.score).note}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[1.55rem]">{getMoodPreview(point.score).emoji}</span>
                  <span className="text-[0.95rem] font-semibold">{point.score}/5</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
