import { AppShell } from "@/components/layout/app-shell";
import { adminNav } from "@/lib/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      accentClass="bg-warning/25 text-foreground"
      navItems={adminNav}
      roleLabel="Admin"
      title="Admin Control"
    >
      {children}
    </AppShell>
  );
}
