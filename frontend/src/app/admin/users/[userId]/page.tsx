import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminClasses, adminSchools, adminUsers } from "@/lib/mock-data";

type AdminUserDetailPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

function accountTone(status: "Aktif" | "Menunggu" | "Nonaktif") {
  if (status === "Aktif") {
    return "aman";
  }

  if (status === "Menunggu") {
    return "warning";
  }

  return "neutral";
}

function roleTone(role: "Admin" | "Guru BK" | "Siswa" | "Wali Kelas") {
  if (role === "Admin") {
    return "warning";
  }

  if (role === "Guru BK") {
    return "monitor";
  }

  if (role === "Siswa") {
    return "aman";
  }

  return "neutral";
}

export default async function AdminUserDetailPage({
  params,
}: AdminUserDetailPageProps) {
  const { userId } = await params;
  const user = adminUsers.find((item) => item.id === userId);

  if (!user) {
    notFound();
  }

  const school = adminSchools.find((item) => item.id === user.schoolId);
  const linkedClass = user.className
    ? adminClasses.find((item) => item.className === user.className)
    : null;

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengelola Akun Pengguna</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{user.name}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <StatusBadge tone={roleTone(user.role)}>{user.role}</StatusBadge>
            <StatusBadge tone={accountTone(user.status)}>{user.status}</StatusBadge>
            <StatusBadge tone="monitor">{user.id}</StatusBadge>
          </div>
        </div>
        <Link href="/admin/users" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
        <SectionCard title="Profil akun" className="h-full p-5 sm:p-6">
          <div className="grid gap-3">
            <div className="min-w-0 rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Email</p>
              <p className="mt-3 break-all text-lg font-semibold leading-8">{user.email}</p>
            </div>
            <div className="min-w-0 rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Sekolah</p>
              <p className="mt-3 text-lg font-semibold">{user.schoolName}</p>
            </div>
            <div className="min-w-0 rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Kelas</p>
              <p className="mt-3 text-lg font-semibold">{user.className ?? "-"}</p>
            </div>
            <div className="min-w-0 rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-5">
              <p className="soft-label">Akses terakhir</p>
              <p className="mt-3 text-lg font-semibold">{user.lastAccess}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Ruang terkait" className="h-full p-5 sm:p-6">
          <div className="grid content-start gap-3">
            {school ? (
              <Link
                href={`/admin/schools/${school.id}`}
                className="panel-hover flex items-center justify-between rounded-[24px] border border-stroke bg-white p-5"
              >
                <div>
                  <p className="soft-label">Data sekolah</p>
                  <h2 className="mt-3 text-xl font-semibold">{school.name}</h2>
                </div>
                <span className="text-sm font-semibold text-foreground">Buka</span>
              </Link>
            ) : null}

            {linkedClass ? (
              <Link
                href={`/admin/schools/classes/${linkedClass.id}`}
                className="panel-hover flex items-center justify-between rounded-[24px] border border-stroke bg-white p-5"
              >
                <div>
                  <p className="soft-label">Data kelas</p>
                  <h2 className="mt-3 text-xl font-semibold">{linkedClass.className}</h2>
                </div>
                <span className="text-sm font-semibold text-foreground">Buka</span>
              </Link>
            ) : null}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
