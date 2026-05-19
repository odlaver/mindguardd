import { StudentWhisperWorkspace } from "@/components/student/student-whisper-workspace";
import { getStudentWhisperReports } from "@/lib/server/data";
import { requireRole } from "@/lib/server/session";

export default async function StudentWhisperPage() {
  const session = await requireRole("student");
  const whisperReports = await getStudentWhisperReports(session.user.id);

  return <StudentWhisperWorkspace reports={whisperReports} />;
}
