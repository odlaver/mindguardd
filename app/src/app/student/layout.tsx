import { getStudentAccessState } from "@/lib/server/data";
import { requireRole } from "@/lib/server/session";

import { StudentAccessProvider } from "@/components/student/student-access-provider";
import { StudentLayoutShell } from "@/components/student/student-layout-shell";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireRole("student");
  const accessState = await getStudentAccessState(session.user.id);

  return (
    <StudentAccessProvider initialState={accessState}>
      <StudentLayoutShell currentTimeIso={new Date().toISOString()}>
        {children}
      </StudentLayoutShell>
    </StudentAccessProvider>
  );
}
