"use client";

import Link from "next/link";
import { useState } from "react";

import { useStudentAccess } from "@/components/student/student-access-provider";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  counselingSessions,
  resources,
  studentMoodHistory,
  studentMoodOptions,
  studentProfile,
  whisperReports,
} from "@/lib/mock-data";

function getMoodPreview(score: number, note?: string) {
  const option = studentMoodOptions.find((item) => item.score === score);

  return {
    emoji: option?.emoji ?? ":|",
    note: note || option?.label || "Tenang",
    score,
  };
}

export default function StudentPage() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const { completeCheckIn, hasCheckedInToday, submission } = useStudentAccess();
  const latestHistory = studentMoodHistory[studentMoodHistory.length - 1];
  const latestMood = submission
    ? getMoodPreview(submission.score, submission.note)
    : getMoodPreview(latestHistory.score, latestHistory.note);
  const recentDays = studentMoodHistory.slice(-5).reverse();
  const averageScore = (
    studentMoodHistory.reduce((sum, point) => sum + point.score, 0) /
    studentMoodHistory.length
  ).toFixed(1);
  const nearestSession = counselingSessions[0];

  if (hasCheckedInToday === null) {
    return <div className="min-h-screen" />;
  }

  if (!hasCheckedInToday) {
    return (
      <section className="page-hero stagger-in overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="soft-label">{studentProfile.todayDate}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
              Apa kabarmu hari ini?
            </h1>
          </div>
          <div className="rounded-full bg-primary/14 px-4 py-2 text-sm font-medium text-foreground">
            {studentProfile.name.split(" ")[0]}
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
            <span className="text-sm text-ink-soft">Opsional</span>
            <button
              type="button"
              disabled={selectedScore === null}
              onClick={() => {
                if (selectedScore === null) {
                  return;
                }

                completeCheckIn({
                  note: note.trim(),
                  score: selectedScore,
                });
              }}
              className="button-primary min-w-[140px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Simpan
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
            <p className="soft-label">{studentProfile.todayDate}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              Halo, {studentProfile.name.split(" ")[0]}.
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="monitor">{studentProfile.className}</StatusBadge>
            <StatusBadge tone="aman">
              {studentProfile.streak} hari
            </StatusBadge>
          </div>
        </div>

        <div className="panel-hover rounded-[32px] border border-stroke bg-[#f7f8f4] p-6">
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
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Lanjutkan" className="p-5 sm:p-6">
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
                Rata-rata 14 hari terakhir {averageScore}/5
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-[#f4f7f3] px-3 py-1 text-xs font-semibold text-foreground transition group-hover:bg-white/12 group-hover:text-white">
                  {studentMoodHistory.length} catatan
                </span>
                <span className="text-lg transition group-hover:translate-x-1">
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
                <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger transition group-hover:bg-white/12 group-hover:text-white">
                  {whisperReports.length} laporan
                </span>
                <span className="text-lg transition group-hover:translate-x-1">
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
                <span className="rounded-full bg-secondary/16 px-3 py-1 text-xs font-semibold text-foreground transition group-hover:bg-white/12 group-hover:text-white">
                  {resources.length} artikel
                </span>
                <span className="text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/student/counseling"
              className="group panel-hover rounded-[28px] border border-stroke bg-white px-5 py-5 text-foreground hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Jadwal Konseling
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] transition group-hover:text-white">
                Lihat sesi
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Cek jadwal terdekat dan detail pertemuan
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground transition group-hover:bg-white/12 group-hover:text-white">
                  {counselingSessions.length} sesi
                </span>
                <span className="text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-4 grid gap-3 rounded-[28px] border border-dashed border-stroke bg-[#f7f8f4] p-4 sm:grid-cols-4">
            <div className="rounded-[22px] bg-white px-4 py-4">
              <p className="soft-label">Mood terakhir</p>
              <p className="mt-3 text-xl font-semibold">{latestMood.note}</p>
            </div>
            <div className="rounded-[22px] bg-white px-4 py-4">
              <p className="soft-label">Streak</p>
              <p className="mt-3 text-xl font-semibold">
                {studentProfile.streak} hari check-in
              </p>
            </div>
            <div className="rounded-[22px] bg-white px-4 py-4">
              <p className="soft-label">Ruang bantu</p>
              <p className="mt-3 text-xl font-semibold">
                Materi & laporan siap dipakai
              </p>
            </div>
            <div className="rounded-[22px] bg-white px-4 py-4">
              <p className="soft-label">Sesi terdekat</p>
              <p className="mt-3 text-xl font-semibold">{nearestSession.when}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Beberapa hari terakhir" className="p-4 sm:p-5">
          <div className="grid gap-3">
            {recentDays.map((point) => (
              <div
                key={point.date}
                className="panel-hover flex items-center justify-between rounded-[20px] bg-white px-4 py-3.5"
              >
                <div>
                  <p className="text-xs font-medium text-ink-soft">{point.date}</p>
                  <p className="mt-1 text-base font-semibold">
                    {getMoodPreview(point.score).note}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[1.7rem]">
                    {getMoodPreview(point.score).emoji}
                  </span>
                  <span className="text-base font-semibold">{point.score}/5</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
