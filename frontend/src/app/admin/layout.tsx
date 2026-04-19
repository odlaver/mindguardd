import { AppShell } from "@/components/layout/app-shell";
import { adminNav } from "@/lib/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
