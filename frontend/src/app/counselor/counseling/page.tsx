import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { counselingRequests, counselingSessions } from "@/lib/mock-data";

export default function CounselorCounselingPage() {
  const activeSessions = counselingSessions.filter((session) => session.status !== "Selesai");

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Mengelola Konseling</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Pilih alur kerja konseling yang ingin dibuka.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{activeSessions.length} agenda aktif</StatusBadge>
          <StatusBadge tone="warning">{counselingRequests.length} pengajuan masuk</StatusBadge>
        </div>
      </section>

      <section>
        <SectionCard title="Fitur Konseling" className="p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/counselor/counseling/schedule"
              className="group panel-hover flex min-h-[390px] flex-col rounded-[30px] border border-stroke bg-white p-6 hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >  
              <p className="soft-label transition group-hover:text-white/72">
                Mengatur Jadwal
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] transition group-hover:text-white">
                Buat tindak lanjut dan buka pengajuan siswa.
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Atur jadwal baru untuk siswa prioritas dan lihat pengajuan
                konseling yang masuk dari sisi siswa.
              </p>
              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="rounded-full bg-[#f4f7f3] px-3 py-1 text-xs font-semibold text-foreground transition group-hover:bg-white/12 group-hover:text-white">
                  {counselingRequests.length} pengajuan
                </span>
                <span className="text-lg transition group-hover:translate-x-1">
                  {"->"}
                </span>
              </div>
            </Link>

            <Link
              href="/counselor/counseling/agenda"
              className="group panel-hover flex min-h-[320px] flex-col rounded-[30px] border border-stroke bg-white p-6 hover:border-foreground/16 hover:bg-foreground hover:text-white"
            >
              <p className="soft-label transition group-hover:text-white/72">
                Melihat Agenda Konseling
              </p>
              <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.05em] transition group-hover:text-white">
                Buka agenda aktif dan riwayat sesi.
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft transition group-hover:text-white/74">
                Lihat sesi yang sedang berjalan, cek riwayat konseling, lalu
                buka detail untuk catatan dan ringkasan hasil.
              </p>
              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="rounded-full bg-primary/16 px-3 py-1 text-xs font-semibold text-foreground transition group-hover:bg-white/12 group-hover:text-white">
                  {counselingSessions.length} sesi
                </span>
                <span className="text-lg transition group-hover:translate-x-1">
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
