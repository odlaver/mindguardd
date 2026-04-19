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

const metricCards = [
  {
    label: "Total pengguna",
    value: adminMetrics.totalUsers,
    trend: "+18 bulan ini",
    trendTone: "aman" as const,
  },
  {
    label: "Siswa aktif",
    value: adminMetrics.activeStudents,
    trend: "+12 minggu ini",
    trendTone: "aman" as const,
  },
  {
    label: "Guru BK",
    value: adminMetrics.counselors,
    trend: "1 penugasan baru",
    trendTone: "neutral" as const,
  },
  {
    label: "Kelas",
    value: adminMetrics.classes,
    trend: "2 kelas dipantau",
    trendTone: "warning" as const,
  },
];

const schoolsNeedingAttention = adminSchools
  .map((school) => {
    const relatedClasses = adminClasses.filter((item) => item.schoolId === school.id);
    const needsAttention = relatedClasses.filter((item) => item.riskBand === "Perlu perhatian").length;

    return {
      ...school,
      needsAttention,
    };
  })
  .sort((a, b) => Number.parseInt(a.completion, 10) - Number.parseInt(b.completion, 10));

const pendingRequests = [
  {
    id: "REQ-ADM-01",
    title: "Verifikasi akun Guru BK",
    detail: adminUsers.find((item) => item.status === "Menunggu")?.name ?? "Nadia Putri",
    tone: "warning" as const,
    href: "/admin/users/usr-004",
  },
  {
    id: "REQ-ADM-02",
    title: "Konfigurasi tertunda",
    detail:
      adminSystemConfigs.find((item) => item.status === "Tertunda")?.name ?? "Pengingat harian",
    tone: "warning" as const,
    href: "/admin/system/cfg-003",
  },
  {
    id: "REQ-ADM-03",
    title: "Kelas prioritas",
    detail:
      adminClasses.find((item) => item.riskBand === "Perlu perhatian")?.className ?? "XI IPA 2",
    tone: "danger" as const,
    href: "/admin/schools/classes/cls-001",
  },
];

const adminLog = [
  {
    id: "LOG-01",
    title: "Admin Sekolah Pusat",
    detail: "Login terakhir 16 Apr 2026, 09.00",
    href: "/admin/users/usr-005",
  },
  {
    id: "LOG-02",
    title: "Bu Sinta",
    detail: "Akses Guru BK 16 Apr 2026, 07.45",
    href: "/admin/users/usr-002",
  },
  {
    id: "LOG-03",
    title: "Alert otomatis",
    detail: "Konfigurasi aktif",
    href: "/admin/system/cfg-001",
  },
];

function completionTone(completion: string) {
  const score = Number.parseInt(completion, 10);

  if (score >= 85) {
    return "aman";
  }

  if (score >= 80) {
    return "warning";
  }

  return "danger";
}

export default function AdminPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Ringkasan Sistem</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Ringkasan sistem.
          </h1>
        </div>
        <Link
          href="/admin/users"
          className="button-primary"
          style={{ WebkitTextFillColor: "#ffffff" }}
        >
          Tambah pengguna
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            trend={item.trend}
            trendTone={item.trendTone}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <SectionCard title="Sekolah membutuhkan perhatian">
          <div className="grid gap-3">
            {schoolsNeedingAttention.map((school) => (
              <article
                key={school.id}
                className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{school.name}</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      {school.classCount} kelas | {school.studentCount} siswa
                    </p>
                  </div>
                  <StatusBadge tone={completionTone(school.completion)}>
                    {school.completion}
                  </StatusBadge>
                </div>

                <div className="mt-4 rounded-[20px] border border-stroke bg-[#f7f8f4] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="soft-label">Check-in siswa</p>
                    <span className="text-sm font-semibold text-foreground/72">
                      {school.completion}
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#eef5ef]">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: school.completion }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground/75">
                    {school.needsAttention} kelas prioritas
                  </span>
                  <Link href={`/admin/schools/${school.id}`} className="button-secondary">
                    Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-4">
          <SectionCard title="Permintaan tertunda">
            <div className="grid gap-3">
              {pendingRequests.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{item.id}</p>
                    <StatusBadge tone={item.tone}>{item.title}</StatusBadge>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{item.detail}</h2>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Log admin">
            <div className="grid gap-3">
              {adminLog.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="panel-hover rounded-[24px] border border-stroke bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{item.id}</p>
                    <StatusBadge tone="monitor">Aktivitas</StatusBadge>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.detail}</p>
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>
    </>
  );
}
