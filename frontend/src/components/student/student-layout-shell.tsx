"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { studentNav } from "@/lib/navigation";

import { useStudentAccess } from "./student-access-provider";

export function StudentLayoutShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { hasCheckedInToday } = useStudentAccess();

  useEffect(() => {
    if (hasCheckedInToday === false && pathname !== "/student") {
      router.replace("/student");
    }
  }, [hasCheckedInToday, pathname, router]);

  if (hasCheckedInToday === null) {
    return <div className="min-h-screen" />;
  }

  if (!hasCheckedInToday && pathname === "/student") {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] items-center px-4 py-6 lg:px-6">
        <div className="w-full">{children}</div>
      </div>
    );
  }

  if (!hasCheckedInToday) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] items-center px-4 py-6 lg:px-6">
        <section className="surface-card-strong w-full p-8">
          <p className="soft-label">Mood Check-In</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Akses halaman siswa dibuka setelah mood hari ini diisi.
          </h1>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Sistem sedang mengarahkan kembali ke halaman input mood.
          </p>
        </section>
      </div>
    );
  }

  return (
    <AppShell
      accentClass="bg-primary/20 text-foreground"
      navItems={studentNav}
      roleLabel="Siswa"
      title="Ruang Siswa"
    >
      {children}
    </AppShell>
  );
}
