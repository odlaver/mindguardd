import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getAdminClassById, getAdminUsers } from "@/lib/server/data";

type AdminClassDetailPageProps = {
  params: Promise<{
    classId: string;
  }>;
};

function classTone(riskBand: "Stabil" | "Monitor" | "Perlu perhatian") {
  if (riskBand === "Stabil") {
    return "aman";
  }

  if (riskBand === "Monitor") {
    return "warning";
  }

  return "danger";
}

export default async function AdminClassDetailPage({
  params,
}: AdminClassDetailPageProps) {
  const { classId } = await params;
  const classItem = await getAdminClassById(classId);

  if (!classItem) {
    notFound();
  }

  const adminUsers = await getAdminUsers();
  const classUsers = adminUsers.filter((item) => item.className === classItem.className);

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengelola Data Kelas/Sekolah</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {classItem.className}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <StatusBadge tone={classTone(classItem.riskBand)}>{classItem.riskBand}</StatusBadge>
            <StatusBadge tone="monitor">{classItem.studentCount} siswa</StatusBadge>
            <StatusBadge tone="neutral">{classItem.completion}</StatusBadge>
          </div>
        </div>
        <Link href="/admin/schools" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
        <SectionCard title="Profil kelas" className="h-full p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Sekolah</p>
              <p className="mt-3 text-lg font-semibold">{classItem.schoolName}</p>
            </div>
            <div className="rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Wali kelas</p>
              <p className="mt-3 text-lg font-semibold">{classItem.homeroom}</p>
            </div>
            <div className="rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Guru BK</p>
              <p className="mt-3 text-lg font-semibold">{classItem.counselor}</p>
            </div>
            <div className="rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Check-in</p>
              <p className="mt-3 text-lg font-semibold">{classItem.completion}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Akun di kelas" className="h-full p-5 sm:p-6">
          <div className="grid content-start gap-3">
            {classUsers.map((user) => (
              <Link
                key={user.id}
                href={`/admin/users/${user.id}`}
                className="panel-hover flex items-center justify-between rounded-[24px] border border-stroke bg-white p-5"
              >
                <div>
                  <p className="soft-label">{user.role}</p>
                  <h2 className="mt-3 text-xl font-semibold">{user.name}</h2>
                </div>
                <span className="text-sm font-semibold text-foreground">Buka</span>
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
