import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { counselingSessions } from "@/lib/mock-data";

function getSessionTone(status: string) {
  if (status === "Selesai") {
    return "aman";
  }

  if (status === "Terdekat") {
    return "danger";
  }

  return "monitor";
}

export default function StudentCounselingPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Jadwal Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Lihat sesi yang sudah dijadwalkan.
          </h1>
        </div>
        <StatusBadge tone="monitor">{counselingSessions.length} sesi</StatusBadge>
      </section>

      <SectionCard title="Daftar sesi">
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
                <StatusBadge tone={getSessionTone(session.status)}>
                  {session.status}
                </StatusBadge>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {session.counselor} | {session.format}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground">
                  {session.location}
                </span>
                <span className="text-sm font-semibold text-foreground/70">
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
