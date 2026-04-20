import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCounselingSessions } from "@/lib/server/data";

function getReviewTone(status: "Menunggu Konfirmasi" | "Dikonfirmasi" | "Selesai") {
  if (status === "Menunggu Konfirmasi") {
    return "warning";
  }

  if (status === "Dikonfirmasi") {
    return "monitor";
  }

  return "aman";
}

export default async function CounselorCounselingAgendaPage() {
  const counselingSessions = await getCounselingSessions();
  const activeSessions = counselingSessions.filter((session) => session.status !== "Selesai");
  const historySessions = counselingSessions.filter((session) => session.status === "Selesai");

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Melihat Agenda Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Agenda Konseling</h1>
        </div>
        <Link href="/counselor/counseling" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Agenda Konseling" className="p-5 sm:p-6">
          <div className="grid gap-3">
            {activeSessions.map((session) => (
              <Link
                key={session.id}
                href={`/counselor/counseling/${session.id}`}
                className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{session.studentName}</p>
                    <p className="mt-1 text-sm text-ink-soft">{session.when}</p>
                  </div>
                  <StatusBadge tone={getReviewTone(session.status)}>
                    {session.status}
                  </StatusBadge>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{session.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusBadge tone="monitor">{session.format}</StatusBadge>
                  <StatusBadge tone="monitor">{session.location}</StatusBadge>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Riwayat Konseling" className="p-5 sm:p-6">
          <div className="grid gap-3">
            {historySessions.map((session) => (
              <Link
                key={session.id}
                href={`/counselor/counseling/${session.id}`}
                className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{session.studentName}</p>
                    <p className="mt-1 text-sm text-ink-soft">{session.when}</p>
                  </div>
                  <StatusBadge tone="aman">{session.status}</StatusBadge>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{session.focus}</p>
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
