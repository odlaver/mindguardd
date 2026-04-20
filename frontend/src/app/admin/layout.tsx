import { requireRole } from "@/lib/server/session";

import { AppShell } from "@/components/layout/app-shell";
import { adminNav } from "@/lib/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireRole("admin");

  return (
    <AppShell
      accentClass="border border-warning/35 bg-warning/18 text-foreground"
      navItems={adminNav}
      roleLabel="Admin"
      title="Panel Admin"
    >
      {children}
    </AppShell>
  );
}
