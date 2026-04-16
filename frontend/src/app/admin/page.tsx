import Link from "next/link";

import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  adminClasses,
  adminMetrics,
  adminSchools,
  adminSystemConfigs,
  adminUsers,
} from "@/lib/mock-data";

const featureCards = [
  {
    href: "/admin/users",
    label: "Mengelola Akun Pengguna",
    title: "Akun Pengguna",
    detail: `${adminUsers.length} akun`,
  },
  {
    href: "/admin/schools",
    label: "Mengelola Data Kelas/Sekolah",
    title: "Data Kelas dan Sekolah",
    detail: `${adminSchools.length} sekolah | ${adminClasses.length} kelas`,
  },
  {
    href: "/admin/system",
    label: "Mengkonfigurasi Sistem",
    title: "Konfigurasi Sistem",
    detail: `${adminSystemConfigs.length} pengaturan`,
  },
];

export default function AdminPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengelola Data User dan Sekolah</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Panel admin.
          </h1>
        </div>
        <StatusBadge tone="monitor">{adminSchools.length} sekolah aktif</StatusBadge>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total pengguna" value={adminMetrics.totalUsers} />
        <MetricCard label="Siswa aktif" value={adminMetrics.activeStudents} />
        <MetricCard label="Guru BK" value={adminMetrics.counselors} />
        <MetricCard label="Kelas" value={adminMetrics.classes} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.32fr_0.68fr]">
        <SectionCard title="Alur utama">
          <div className="grid gap-4 md:grid-cols-3">
            {featureCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="panel-hover flex min-h-[250px] flex-col rounded-[28px] border border-stroke bg-white p-6 transition"
              >
                <span className="soft-label">{item.label}</span>
                <h2 className="mt-5 text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.045em]">
                  {item.title}
                </h2>
                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <StatusBadge tone="monitor">{item.detail}</StatusBadge>
                  <span className="text-2xl leading-none text-foreground">-&gt;</span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Sorotan sekolah">
          <div className="grid gap-3">
            {adminSchools.map((school) => (
              <Link
                key={school.id}
                href={`/admin/schools/${school.id}`}
                className="panel-hover grid gap-3 rounded-[26px] border border-stroke bg-white p-5 md:grid-cols-[1fr_0.45fr_0.28fr]"
              >
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">
                    {school.name}
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    {school.studentCount} siswa | {school.classCount} kelas
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#eef5ef]">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: school.completion }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge tone="monitor">{school.completion}</StatusBadge>
                  <span className="text-xl leading-none text-foreground">-&gt;</span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
