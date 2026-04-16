"use client";

import { useState } from "react";
import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { counselingRequests, counselorStudents } from "@/lib/mock-data";

export default function CounselorCounselingSchedulePage() {
  const [selectedStudentId, setSelectedStudentId] = useState(counselorStudents[0]?.id ?? "");
  const [sessionDate, setSessionDate] = useState("2026-04-18");
  const [sessionTime, setSessionTime] = useState("10:30");
  const [sessionFormat, setSessionFormat] = useState<"Tatap muka" | "Online">("Tatap muka");
  const [created, setCreated] = useState(false);

  const selectedStudent = counselorStudents.find((student) => student.id === selectedStudentId);

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Mengatur Jadwal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Mengatur Jadwal</h1>
        </div>
        <Link href="/counselor/counseling" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
        <SectionCard title="Membuat Jadwal Baru" className="p-5 sm:p-6">
          <div className="grid gap-6">
            <div>
              <p className="soft-label">Siswa</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {counselorStudents.map((student) => {
                  const active = selectedStudentId === student.id;

                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "border-foreground bg-foreground text-white"
                          : "border-stroke bg-white text-foreground hover:border-foreground/16"
                      }`}
                    >
                      {student.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="soft-label">Tanggal</span>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(event) => setSessionDate(event.target.value)}
                  className="rounded-[22px] border border-stroke bg-white px-4 py-3 outline-none transition focus:border-foreground/18"
                />
              </label>
              <label className="grid gap-2">
                <span className="soft-label">Waktu</span>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(event) => setSessionTime(event.target.value)}
                  className="rounded-[22px] border border-stroke bg-white px-4 py-3 outline-none transition focus:border-foreground/18"
                />
              </label>
            </div>

            <div>
              <p className="soft-label">Format</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["Tatap muka", "Online"] as const).map((option) => {
                  const active = sessionFormat === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSessionFormat(option)}
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
            </div>

            <div className="rounded-[28px] border border-stroke bg-[#f7f8f4] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="soft-label">Jadwal</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                    {selectedStudent?.name ?? "-"}
                  </h2>
                </div>
                <StatusBadge tone={created ? "warning" : "danger"}>
                  {created ? "Sedang Ditinjau" : "Baru"}
                </StatusBadge>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                {sessionDate} | {sessionTime} | {sessionFormat}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm leading-7 text-ink-soft">{selectedStudent?.className ?? ""}</span>
              <button
                type="button"
                className="button-primary"
                style={{ WebkitTextFillColor: "#ffffff" }}
                onClick={() => setCreated(true)}
              >
                Simpan
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Pengajuan Konseling" className="p-5 sm:p-6">
          <div className="grid gap-3">
            {counselingRequests.map((request) => (
              <article
                key={request.id}
                className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{request.studentName}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                      {request.className} | {request.id}
                    </p>
                  </div>
                  <StatusBadge
                    tone={
                      request.status === "Baru"
                        ? "danger"
                        : request.status === "Sedang Ditinjau"
                          ? "warning"
                          : "aman"
                    }
                  >
                    {request.status}
                  </StatusBadge>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  {request.topic} | {request.preferredSlot}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{request.summary}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  {request.submittedAt}
                </p>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
