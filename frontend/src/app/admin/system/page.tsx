import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminSystemConfigs } from "@/lib/mock-data";

function configTone(status: "Aktif" | "Tertunda") {
  return status === "Aktif" ? "aman" : "warning";
}

export default function AdminSystemPage() {
  const activeConfigs = adminSystemConfigs.filter((item) => item.status === "Aktif").length;
  const pendingConfigs = adminSystemConfigs.filter((item) => item.status === "Tertunda").length;

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengkonfigurasi Sistem</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Konfigurasi sistem.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{adminSystemConfigs.length} pengaturan</StatusBadge>
          <StatusBadge tone="aman">{activeConfigs} aktif</StatusBadge>
          <StatusBadge tone="warning">{pendingConfigs} tertunda</StatusBadge>
        </div>
      </section>

      <SectionCard title="Daftar konfigurasi" className="p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {adminSystemConfigs.map((item) => (
            <article
              key={item.id}
              className="panel-hover flex min-h-[320px] flex-col rounded-[24px] border border-stroke bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusBadge tone="monitor">{item.group}</StatusBadge>
                <StatusBadge tone={configTone(item.status)}>{item.status}</StatusBadge>
              </div>

              <h2 className="mt-5 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.045em]">
                {item.name}
              </h2>

              <div className="mt-5 rounded-[20px] border border-stroke bg-[#f7f8f4] p-4">
                <p className="soft-label">Nilai aktif</p>
                <p className="mt-3 text-lg font-semibold">{item.value}</p>
              </div>

              <div className="mt-5 flex-1">
                <p className="text-sm leading-7 text-ink-soft">{item.summary}</p>
                <div className="mt-4 rounded-[20px] border border-stroke bg-[#f7f8f4] p-4">
                  <p className="soft-label">Dampak</p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{item.impact}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <StatusBadge tone="neutral">{item.group}</StatusBadge>
                <Link href={`/admin/system/${item.id}`} className="button-secondary">
                  Ubah
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
