"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { CounselingRequest } from "@/lib/mock-data";

type CounselingScheduleBuilderProps = {
  requests: CounselingRequest[];
};

function getRequestTone(status: CounselingRequest["status"]) {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Dijadwalkan") {
    return "monitor";
  }

  return "aman";
}

export function CounselingScheduleBuilder({ requests }: CounselingScheduleBuilderProps) {
  const router = useRouter();
  const openRequests = requests.filter(
    (request) => request.status === "Baru" && !request.scheduledSessionId,
  );
  const [selectedRequestId, setSelectedRequestId] = useState(openRequests[0]?.id ?? "");
  const [sessionDate, setSessionDate] = useState("2026-04-18");
  const [sessionTime, setSessionTime] = useState("10:30");
  const [sessionFormat, setSessionFormat] = useState<"Tatap muka" | "Online">("Tatap muka");
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRequest = openRequests.find((request) => request.id === selectedRequestId);

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
              <p className="soft-label">Pilih pengajuan</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {openRequests.map((request) => {
                  const active = selectedRequestId === request.id;

                  return (
                    <button
                      key={request.id}
                      type="button"
                      onClick={() => setSelectedRequestId(request.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "border-foreground bg-foreground text-white"
                          : "border-stroke bg-white text-foreground hover:border-foreground/16"
                      }`}
                    >
                      {request.studentName}
                    </button>
                  );
                })}
              </div>
              {!openRequests.length ? (
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  Tidak ada pengajuan baru yang perlu dijadwalkan.
                </p>
              ) : null}
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
                    {selectedRequest?.studentName ?? "-"}
                  </h2>
                </div>
                <StatusBadge tone={created ? "warning" : "danger"}>
                  {created ? "Menunggu Konfirmasi" : "Baru"}
                </StatusBadge>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                {sessionDate} | {sessionTime} | {sessionFormat}
              </p>
              <p className="mt-2 text-sm leading-7 text-ink-soft">
                {selectedRequest
                  ? `${selectedRequest.topic} | ${selectedRequest.preferredSlot}`
                  : "Pilih pengajuan untuk melihat ringkasannya."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm leading-7 text-ink-soft">
                <span>{selectedRequest?.className ?? ""}</span>
                {error ? <p className="font-medium text-danger">{error}</p> : null}
              </div>
              <button
                type="button"
                disabled={isSubmitting || !selectedRequest}
                className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
                style={{ WebkitTextFillColor: "#ffffff" }}
                onClick={async () => {
                  setError(null);
                  setIsSubmitting(true);

                  const response = await fetch("/api/counseling/sessions", {
                    body: JSON.stringify({
                      format: sessionFormat,
                      requestId: selectedRequestId,
                      sessionDate,
                      sessionTime,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                  });
                  const payload = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;

                  if (!response.ok) {
                    setError(payload?.error ?? "Jadwal belum bisa disimpan.");
                    setIsSubmitting(false);
                    return;
                  }

                  setCreated(true);
                  setIsSubmitting(false);
                  router.refresh();
                }}
              >
                {isSubmitting ? "Menyimpan..." : "Buat jadwal"}
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Pengajuan Konseling" className="p-5 sm:p-6">
          <div className="grid gap-3">
            {requests.map((request) => (
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
                  <StatusBadge tone={getRequestTone(request.status)}>
                    {request.status}
                  </StatusBadge>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  {request.topic} | {request.preferredSlot}
                </p>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{request.summary}</p>
                {request.scheduledSessionId ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                    Terkait sesi {request.scheduledSessionId}
                  </p>
                ) : null}
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
