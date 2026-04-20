import Link from "next/link";
import { notFound } from "next/navigation";

import { StudentCounselingSessionActions } from "@/components/student/student-counseling-session-actions";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCounselingSessionById } from "@/lib/server/data";
import { requireRole } from "@/lib/server/session";

type CounselingDetailPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

function getSessionTone(status: string) {
  if (status === "Menunggu Konfirmasi") {
    return "warning";
  }

  if (status === "Dikonfirmasi") {
    return "monitor";
  }

  return "aman";
}

export default async function CounselingDetailPage({
  params,
}: CounselingDetailPageProps) {
  const viewer = await requireRole("student");
  const { sessionId } = await params;
  const session = await getCounselingSessionById(sessionId);

  if (!session || session.studentId !== viewer.user.id) {
    notFound();
  }

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Detail Sesi</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {session.title}
          </h1>
        </div>
        <Link href="/student/counseling/schedule" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Info sesi">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={getSessionTone(session.invitationStatus)}>
              {session.invitationStatus}
            </StatusBadge>
            <StatusBadge tone="monitor">{session.format}</StatusBadge>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Waktu</p>
              <p className="mt-3 text-lg font-semibold">{session.when}</p>
            </div>
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Lokasi</p>
              <p className="mt-3 text-lg font-semibold">{session.location}</p>
            </div>
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Konselor</p>
              <p className="mt-3 text-lg font-semibold">{session.counselor}</p>
            </div>
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Fokus</p>
              <p className="mt-3 text-lg font-semibold">{session.focus}</p>
            </div>
          </div>
        </SectionCard>

        <StudentCounselingSessionActions
          sessionId={session.id}
          status={session.invitationStatus}
          studentConfirmationNote={session.studentConfirmationNote}
          studentCompletionNote={session.studentCompletionNote}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Catatan sesi">
          <p className="text-base leading-8 text-ink-soft">{session.note}</p>
        </SectionCard>

        <SectionCard title="Ringkasan hasil">
          <div className="grid gap-4">
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Hasil sesi</p>
              <p className="mt-3 text-base leading-8 text-ink-soft">{session.outcome ?? "-"}</p>
            </div>
            <div className="rounded-[22px] border border-stroke bg-white px-4 py-4">
              <p className="soft-label">Tindak lanjut</p>
              <p className="mt-3 text-base leading-8 text-ink-soft">{session.followUp ?? "-"}</p>
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
