import { StudentAccessProvider } from "@/components/student/student-access-provider";
import { StudentLayoutShell } from "@/components/student/student-layout-shell";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StudentAccessProvider>
      <StudentLayoutShell>{children}</StudentLayoutShell>
    </StudentAccessProvider>
  );
}
