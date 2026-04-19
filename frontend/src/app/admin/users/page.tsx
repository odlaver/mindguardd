import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminUsers } from "@/lib/mock-data";

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

export default function AdminUsersPage() {
  const activeUsers = adminUsers.filter((user) => user.status === "Aktif").length;
  const pendingUsers = adminUsers.filter((user) => user.status !== "Aktif").length;

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Akun Pengguna</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Daftar akun.</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{adminUsers.length} akun</StatusBadge>
          <StatusBadge tone="aman">{activeUsers} aktif</StatusBadge>
          <StatusBadge tone="warning">{pendingUsers} pending</StatusBadge>
        </div>
      </section>

      <SectionCard title="Data akun" className="p-5 sm:p-6">
        <div className="hidden rounded-[20px] border border-stroke bg-[#f7f8f4] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft lg:grid lg:grid-cols-[1.35fr_0.85fr_1fr_0.95fr_auto] lg:items-center lg:gap-4">
          <span>Pengguna</span>
          <span>Peran</span>
          <span>Sekolah</span>
          <span>Akses terakhir</span>
          <span className="text-right">Aksi</span>
        </div>

        <div className="mt-3 grid gap-3">
          {adminUsers.map((user) => (
            <article
              key={user.id}
              className="panel-hover rounded-[24px] border border-stroke bg-white px-5 py-5"
            >
              <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr_1fr_0.95fr_auto] lg:items-center">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold tracking-[-0.03em]">{user.name}</h2>
                  <p className="mt-1 truncate text-sm text-ink-soft">{user.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={roleTone(user.role)}>{user.role}</StatusBadge>
                  <StatusBadge tone={accountTone(user.status)}>{user.status}</StatusBadge>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">{user.schoolName}</p>
                  <p className="mt-1 text-sm text-ink-soft">{user.className ?? "-"}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">{user.lastAccess}</p>
                  <p className="mt-1 text-sm text-ink-soft">{user.id}</p>
                </div>

                <div className="flex items-center justify-start lg:justify-end">
                  <Link href={`/admin/users/${user.id}`} className="button-secondary">
                    Detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
