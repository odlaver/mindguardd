import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getStudentCounselingSessions } from "@/lib/server/data";
import { requireRole } from "@/lib/server/session";

function getSessionTone(status: string) {
  if (status === "Menunggu Konfirmasi") {
    return "warning";
  }

  if (status === "Dikonfirmasi") {
    return "monitor";
  }

  return "aman";
}

export default async function StudentCounselingSchedulePage() {
  const session = await requireRole("student");
  const counselingSessions = await getStudentCounselingSessions(session.user.id);

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Lihat jadwal sesi yang sudah terpasang.
          </h1>
        </div>
        <Link href="/student/counseling" className="button-secondary">
          Kembali
        </Link>
      </section>

      <SectionCard title="Jadwal Konseling">
        <div className="grid gap-3">
          {counselingSessions.map((session) => (
            <Link
              key={session.id}
              href={`/student/counseling/${session.id}`}
              className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="soft-label">{session.when}</p>
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                    {session.title}
                  </h2>
                </div>
                <StatusBadge tone={getSessionTone(session.invitationStatus)}>
                  {session.invitationStatus}
                </StatusBadge>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {session.counselor} | {session.format}
              </p>
              {session.studentConfirmationNote || session.studentCompletionNote ? (
                <p className="mt-2 text-sm leading-7 text-ink-soft">
                  {session.studentCompletionNote ?? session.studentConfirmationNote}
                </p>
              ) : null}
              <div className="mt-5 flex items-center justify-between">
                <span className="interactive-card-chip rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground transition">
                  {session.location}
                </span>
                <span className="interactive-card-arrow text-sm font-semibold text-foreground/70">
                  {"Detail ->"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
