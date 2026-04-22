import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCounselingRequests, getCounselingSessions } from "@/lib/server/data";

export default async function CounselorCounselingPage() {
  const [counselingRequests, counselingSessions] = await Promise.all([
    getCounselingRequests(),
    getCounselingSessions(),
  ]);
  const activeSessions = counselingSessions.filter((session) => session.status !== "Selesai");
  const incomingRequests = counselingRequests.filter((request) => request.status === "Baru");

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Mengelola Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Kelola Konseling</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{activeSessions.length} agenda aktif</StatusBadge>
          <StatusBadge tone="warning">{incomingRequests.length} pengajuan masuk</StatusBadge>
        </div>
      </section>

      <section>
        <SectionCard title="Fitur Konseling" className="p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/counselor/counseling/schedule"
              className="group panel-hover flex min-h-[280px] flex-col rounded-[30px] border border-stroke bg-white p-6 hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Mengatur Jadwal
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] transition group-hover:text-white">
                Jadwal & Pengajuan
              </h2>
              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="interactive-card-chip-muted rounded-full px-3 py-1 text-xs font-semibold transition">
                  {incomingRequests.length} pengajuan baru
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/counselor/counseling/agenda"
              className="group panel-hover flex min-h-[280px] flex-col rounded-[30px] border border-stroke bg-white p-6 hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Melihat Agenda Konseling
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] transition group-hover:text-white">
                Agenda & Riwayat
              </h2>
              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="interactive-card-chip rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground transition">
                  {counselingSessions.length} sesi
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
