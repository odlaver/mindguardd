import Link from "next/link";

import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getAdminClasses,
  getAdminSchools,
  getAdminSystemConfigs,
  getAdminUsers,
} from "@/lib/server/data";

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

export default async function AdminPage() {
  const [adminClasses, adminSchools, adminSystemConfigs, adminUsers] =
    await Promise.all([
      getAdminClasses(),
      getAdminSchools(),
      getAdminSystemConfigs(),
      getAdminUsers(),
    ]);
  const metricCards = [
    {
      label: "Total pengguna",
      trend: "+18 bulan ini",
      trendTone: "aman" as const,
      value: adminUsers.length,
    },
    {
      label: "Siswa aktif",
      trend: "+12 minggu ini",
      trendTone: "aman" as const,
      value: adminUsers.filter((item) => item.role === "Siswa").length,
    },
    {
      label: "Guru BK",
      trend: "1 penugasan baru",
      trendTone: "neutral" as const,
      value: adminUsers.filter((item) => item.role === "Guru BK").length,
    },
    {
      label: "Kelas",
      trend: "2 kelas dipantau",
      trendTone: "warning" as const,
      value: adminClasses.length,
    },
  ];
  const schoolsNeedingAttention = adminSchools
    .map((school) => {
      const relatedClasses = adminClasses.filter((item) => item.schoolId === school.id);
      const needsAttention = relatedClasses.filter(
        (item) => item.riskBand === "Perlu perhatian",
      ).length;

      return {
        ...school,
        needsAttention,
      };
    })
    .sort(
      (a, b) => Number.parseInt(a.completion, 10) - Number.parseInt(b.completion, 10),
    );
  const pendingRequests = [
    {
      detail: adminUsers.find((item) => item.status === "Menunggu")?.name ?? "-",
      href: `/admin/users/${adminUsers.find((item) => item.status === "Menunggu")?.id ?? adminUsers[0]?.id ?? ""}`,
      id: "REQ-ADM-01",
      title: "Verifikasi akun Guru BK",
      tone: "warning" as const,
    },
    {
      detail: adminSystemConfigs.find((item) => item.status === "Tertunda")?.name ?? "-",
      href: `/admin/system/${adminSystemConfigs.find((item) => item.status === "Tertunda")?.id ?? adminSystemConfigs[0]?.id ?? ""}`,
      id: "REQ-ADM-02",
      title: "Konfigurasi tertunda",
      tone: "warning" as const,
    },
    {
      detail:
        adminClasses.find((item) => item.riskBand === "Perlu perhatian")?.className ?? "-",
      href: `/admin/schools/classes/${adminClasses.find((item) => item.riskBand === "Perlu perhatian")?.id ?? adminClasses[0]?.id ?? ""}`,
      id: "REQ-ADM-03",
      title: "Kelas prioritas",
      tone: "danger" as const,
    },
  ];
  const adminLog = adminUsers.slice(0, 3).map((item, index) => ({
    detail: `Akses terakhir ${item.lastAccess}`,
    href: `/admin/users/${item.id}`,
    id: `LOG-0${index + 1}`,
    title: item.name,
  }));

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
          Lihat pengguna
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
