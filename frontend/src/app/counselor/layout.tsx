import { requireRole } from "@/lib/server/session";

import { AppShell } from "@/components/layout/app-shell";
import { counselorNav } from "@/lib/navigation";

export default async function CounselorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireRole(["counselor"]);

  return (
    <AppShell
      accentClass="bg-secondary/22 text-foreground"
      navItems={counselorNav}
      roleLabel="Guru BK"
      title="Dashboard BK"
    >
      {children}
    </AppShell>
  );
}
