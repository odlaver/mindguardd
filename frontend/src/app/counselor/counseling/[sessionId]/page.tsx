import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCounselingSessionById } from "@/lib/server/data";
import { requireRole } from "@/lib/server/session";

type CounselingDetailPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
  searchParams: Promise<{
    created?: string;
  }>;
};

function getReviewTone(status: "Menunggu Konfirmasi" | "Dikonfirmasi" | "Selesai") {
  if (status === "Menunggu Konfirmasi") {
    return "warning";
  }

  if (status === "Dikonfirmasi") {
    return "monitor";
  }

  return "aman";
}

export default async function CounselorCounselingDetailPage({
  params,
  searchParams,
}: CounselingDetailPageProps) {
  await requireRole("counselor");
  const { sessionId } = await params;
  const { created } = await searchParams;
  const session = await getCounselingSessionById(sessionId);

  if (!session) {
    notFound();
  }

  const hasOutcome = Boolean(session.outcome?.trim());
  const hasFollowUp = Boolean(session.followUp?.trim());
  const hasStudentCompletionNote = Boolean(session.studentCompletionNote?.trim());
  const hasSummary = hasOutcome || hasFollowUp || hasStudentCompletionNote;

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Detail Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {session.studentName}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={getReviewTone(session.status)}>{session.status}</StatusBadge>
          <StatusBadge tone="monitor">{session.format}</StatusBadge>
          <Link href="/counselor/counseling/agenda" className="button-secondary">
            Kembali
          </Link>
        </div>
      </section>

      <section className={`grid gap-4 ${hasSummary ? "xl:grid-cols-[1.02fr_0.98fr]" : ""}`}>
        <SectionCard title="Catatan Sesi" className="p-5 sm:p-6">
          {created === "1" ? (
            <div className="mb-4 rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
              <p className="soft-label">Konfirmasi</p>
              <p className="mt-3 text-base leading-8 text-ink-soft">
                Jadwal berhasil dibuat dan sudah masuk ke agenda konseling.
              </p>
            </div>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
              <p className="soft-label">Siswa</p>
              <p className="mt-3 text-base font-semibold">{session.studentName}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
              <p className="soft-label">Waktu</p>
              <p className="mt-3 text-base font-semibold">{session.when}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
              <p className="soft-label">Lokasi</p>
              <p className="mt-3 text-base font-semibold">{session.location}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
              <p className="soft-label">Konselor</p>
              <p className="mt-3 text-base font-semibold">{session.counselor}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
              <p className="soft-label">Fokus</p>
              <p className="mt-3 text-base font-semibold">{session.focus}</p>
            </div>
          </div>

          <div className="mt-4 rounded-[28px] border border-stroke bg-white p-5">
            <p className="soft-label">Catatan</p>
            <p className="mt-3 text-base leading-8 text-ink-soft">{session.note}</p>
          </div>

          <div className="mt-4 rounded-[28px] border border-stroke bg-[#f7f8f4] p-5">
            <p className="soft-label">Catatan konfirmasi siswa</p>
            <p className="mt-3 text-base leading-8 text-ink-soft">
              {session.studentConfirmationNote ?? "-"}
            </p>
          </div>
        </SectionCard>

        {hasSummary ? (
          <SectionCard title="Ringkasan Hasil Konseling" className="p-5 sm:p-6">
            <div className="grid gap-4">
              {hasOutcome ? (
                <div className="rounded-[28px] border border-stroke bg-[#f7f8f4] p-5">
                  <p className="soft-label">Hasil sesi</p>
                  <p className="mt-3 text-base leading-8 text-ink-soft">{session.outcome}</p>
                </div>
              ) : null}
              {hasFollowUp ? (
                <div className="rounded-[28px] border border-stroke bg-white p-5">
                  <p className="soft-label">Tindak lanjut</p>
                  <p className="mt-3 text-base leading-8 text-ink-soft">{session.followUp}</p>
                </div>
              ) : null}
              {hasStudentCompletionNote ? (
                <div className="rounded-[28px] border border-stroke bg-white p-5">
                  <p className="soft-label">Catatan penutupan siswa</p>
                  <p className="mt-3 text-base leading-8 text-ink-soft">
                    {session.studentCompletionNote}
                  </p>
                </div>
              ) : null}
            </div>
          </SectionCard>
        ) : null}
      </section>
    </>
  );
}
