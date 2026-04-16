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

export default function AdminUsersPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengelola Akun Pengguna</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Akun pengguna.
          </h1>
        </div>
        <StatusBadge tone="monitor">{adminUsers.length} akun</StatusBadge>
      </section>

      <SectionCard title="Daftar akun">
        <div className="grid gap-3">
          {adminUsers.map((user) => (
            <article
              key={user.id}
              className="panel-hover rounded-[26px] border border-stroke bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">{user.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    {user.role} | {user.schoolName}
                    {user.className ? ` | ${user.className}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone="monitor">{user.id}</StatusBadge>
                  <StatusBadge tone={accountTone(user.status)}>{user.status}</StatusBadge>
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="button-primary text-white hover:text-white"
                    style={{ WebkitTextFillColor: "#ffffff" }}
                  >
                    Detail
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-ink-soft md:grid-cols-2">
                <div>{user.email}</div>
                <div className="md:text-right">{user.lastAccess}</div>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
