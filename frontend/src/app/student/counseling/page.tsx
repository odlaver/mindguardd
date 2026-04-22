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

export default async function StudentCounselingHubPage() {
  const session = await requireRole("student");
  const counselingSessions = await getStudentCounselingSessions(session.user.id);
  const upcomingSession = counselingSessions.find((item) => item.invitationStatus !== "Selesai");

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Pilih alur yang kamu butuhkan.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{counselingSessions.length} sesi</StatusBadge>
          {upcomingSession ? (
            <StatusBadge tone={getSessionTone(upcomingSession.invitationStatus)}>
              {upcomingSession.invitationStatus}
            </StatusBadge>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <SectionCard title="Layanan Konseling" className="p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/student/counseling/schedule"
              className="group panel-hover rounded-[30px] border border-stroke bg-white p-6 hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Lihat Jadwal
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] transition group-hover:text-white">
                Cek sesi yang sudah terjadwal.
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Buka daftar sesi, lihat waktu pertemuan, konfirmasi jadwal, lalu
                tandai sesi selesai setelah konseling berlangsung.
              </p>
              <div className="mt-8 flex items-center justify-between">
                <span className="interactive-card-chip-muted rounded-full px-3 py-1 text-xs font-semibold transition">
                  {counselingSessions.length} sesi tersedia
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/student/counseling/request"
              className="group panel-hover rounded-[30px] border border-stroke bg-white p-6 hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Ajukan Konseling
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] transition group-hover:text-white">
                Kirim permintaan sesi baru.
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Sampaikan kebutuhanmu secara singkat, pilih waktu yang nyaman,
                lalu tunggu penjadwalan dari guru BK.
              </p>
              <div className="mt-8 flex items-center justify-between">
                <span className="interactive-card-chip rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground transition">
                  Form pengajuan aktif
                </span>
                <span className="interactive-card-arrow text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>
          </div>
        </SectionCard>

        <SectionCard title="Terdekat" className="p-5">
          {upcomingSession ? (
            <div className="rounded-[28px] border border-stroke bg-[#f7f8f4] p-5">
              <p className="soft-label">{upcomingSession.when}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                {upcomingSession.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {upcomingSession.counselor} | {upcomingSession.location}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <StatusBadge tone={getSessionTone(upcomingSession.invitationStatus)}>
                  {upcomingSession.invitationStatus}
                </StatusBadge>
                <StatusBadge tone="monitor">{upcomingSession.format}</StatusBadge>
              </div>
              <Link
                href={`/student/counseling/${upcomingSession.id}`}
                className="mt-6 inline-flex rounded-full border border-stroke bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-foreground/16 hover:bg-foreground hover:text-white [-webkit-text-fill-color:currentColor] hover:[-webkit-text-fill-color:#ffffff]"
              >
                Detail sesi
              </Link>
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-stroke bg-[#f7f8f4] p-5 text-sm leading-7 text-ink-soft">
              Belum ada sesi terdekat.
            </div>
          )}
        </SectionCard>
      </section>
    </>
  );
}
