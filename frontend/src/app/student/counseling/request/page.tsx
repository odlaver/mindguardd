"use client";

import { useState } from "react";
import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

const requestTopics = [
  "Tekanan akademik",
  "Relasi pertemanan",
  "Kondisi di rumah",
  "Kecemasan atau overthinking",
  "Hal lain yang ingin dibahas",
];

const preferredSlots = [
  "Pagi sebelum kelas",
  "Istirahat siang",
  "Setelah jam sekolah",
  "Online di sore hari",
];

export default function StudentCounselingRequestPage() {
  const [topic, setTopic] = useState(requestTopics[0]);
  const [slot, setSlot] = useState(preferredSlots[0]);
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Ajukan sesi baru bila kamu perlu bicara.
          </h1>
        </div>
        <Link href="/student/counseling" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Form Pengajuan" className="p-5 sm:p-6">
          <div className="grid gap-6">
            <div>
              <p className="soft-label">Topik utama</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {requestTopics.map((item) => {
                  const active = topic === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTopic(item)}
                      className={`choice-chip ${
                        active
                          ? "choice-chip-active"
                          : "choice-chip-idle"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="soft-label">Waktu yang nyaman</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {preferredSlots.map((item) => {
                  const active = slot === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSlot(item)}
                      className={`choice-chip ${
                        active
                          ? "choice-chip-active"
                          : "choice-chip-idle"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="soft-label" htmlFor="counseling-summary">
                Cerita singkat
              </label>
              <textarea
                id="counseling-summary"
                rows={6}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                className="field-control mt-3 resize-none"
                placeholder="Tulis garis besar hal yang ingin dibahas."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-ink-soft">
                Pengajuan akan diteruskan ke guru BK untuk dijadwalkan.
              </span>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="button-primary min-w-[160px]"
              >
                Ajukan
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Ringkasan" className="p-5">
          <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-5">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="monitor">{topic}</StatusBadge>
              <StatusBadge tone="aman">{slot}</StatusBadge>
            </div>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              {summary.trim()
                ? summary
                : "Isi ringkasan akan muncul di sini sebelum kamu mengirim pengajuan."}
            </p>
          </div>

          <div className="mt-4 rounded-[24px] border border-dashed border-stroke bg-white p-5">
            <p className="soft-label">Status</p>
            <p className="mt-3 text-xl font-semibold">
              {submitted ? "Pengajuan terkirim" : "Belum diajukan"}
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {submitted
                ? "Guru BK akan meninjau kebutuhanmu lalu mengirim jadwal yang sesuai."
                : "Pilih topik, waktu yang nyaman, lalu kirim saat ringkasan sudah pas."}
            </p>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
