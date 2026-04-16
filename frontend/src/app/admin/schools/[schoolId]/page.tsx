import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminClasses, adminSchools, adminUsers } from "@/lib/mock-data";

type AdminSchoolDetailPageProps = {
  params: Promise<{
    schoolId: string;
  }>;
};

export default async function AdminSchoolDetailPage({
  params,
}: AdminSchoolDetailPageProps) {
  const { schoolId } = await params;
  const school = adminSchools.find((item) => item.id === schoolId);

  if (!school) {
    notFound();
  }

  const schoolClasses = adminClasses.filter((item) => item.schoolId === school.id);
  const schoolUsers = adminUsers.filter((item) => item.schoolId === school.id);

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengelola Data Kelas/Sekolah</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{school.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone="monitor">{school.completion}</StatusBadge>
          <Link href="/admin/schools" className="button-secondary">
            Kembali
          </Link>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <SectionCard title="Profil sekolah" className="h-full">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <p className="soft-label">Kepala sekolah</p>
              <p className="mt-3 text-lg font-semibold">{school.principal}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <p className="soft-label">Guru BK</p>
              <p className="mt-3 text-lg font-semibold">{school.counselorCount}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <p className="soft-label">Siswa</p>
              <p className="mt-3 text-lg font-semibold">{school.studentCount}</p>
            </div>
            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <p className="soft-label">Kelas</p>
              <p className="mt-3 text-lg font-semibold">{school.classCount}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Ruang terkait" className="h-full">
          <div className="grid h-full gap-3">
            {schoolClasses.map((item) => (
              <Link
                key={item.id}
                href={`/admin/schools/classes/${item.id}`}
                className="panel-hover flex items-center justify-between rounded-[26px] border border-stroke bg-white p-5"
              >
                <div>
                  <p className="soft-label">Kelas</p>
                  <h2 className="mt-3 text-xl font-semibold">{item.className}</h2>
                </div>
                <StatusBadge tone="monitor">{item.studentCount} siswa</StatusBadge>
              </Link>
            ))}

            <div className="rounded-[26px] border border-stroke bg-white p-5">
              <p className="soft-label">Akun terhubung</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                {schoolUsers.length}
              </p>
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
