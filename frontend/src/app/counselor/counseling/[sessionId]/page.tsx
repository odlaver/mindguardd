import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { counselingSessions } from "@/lib/mock-data";

type CounselingDetailPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

function getReviewTone(status: "Baru" | "Sedang Ditinjau" | "Selesai") {
  if (status === "Baru") {
    return "danger";
  }

  if (status === "Sedang Ditinjau") {
    return "warning";
  }

  return "aman";
}

export default async function CounselorCounselingDetailPage({
  params,
}: CounselingDetailPageProps) {
  const { sessionId } = await params;
  const session = counselingSessions.find((item) => item.id === sessionId);

  if (!session) {
    notFound();
  }

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
            Kembali ke Agenda
          </Link>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Catatan Sesi" className="p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
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
        </SectionCard>

        <SectionCard title="Ringkasan Hasil Konseling" className="p-5 sm:p-6">
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-stroke bg-[#f7f8f4] p-5">
              <p className="soft-label">Hasil sesi</p>
              <p className="mt-3 text-base leading-8 text-ink-soft">
                {session.outcome ?? "Sesi ini belum memiliki ringkasan hasil akhir."}
              </p>
            </div>
            <div className="rounded-[28px] border border-stroke bg-white p-5">
              <p className="soft-label">Tindak lanjut</p>
              <p className="mt-3 text-base leading-8 text-ink-soft">
                {session.followUp ?? "Tindak lanjut belum dicatat."}
              </p>
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
