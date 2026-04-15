import { AppShell } from "@/components/layout/app-shell";
import { counselorNav } from "@/lib/navigation";

export default function CounselorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
