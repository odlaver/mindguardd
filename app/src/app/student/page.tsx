import { StudentDashboard } from "@/components/student/student-dashboard";
import {
  getStudentCounselingSessions,
  getStudentMoodHistory,
  getStudentProfile,
  getStudentResources,
  getStudentWhisperReports,
} from "@/lib/server/data";
import { requireRole } from "@/lib/server/session";

export default async function StudentPage() {
  const session = await requireRole("student");
  const [profile, moodHistory, whisperReports, resources, counselingSessions] =
    await Promise.all([
      getStudentProfile(session.user.id),
      getStudentMoodHistory(session.user.id),
      getStudentWhisperReports(session.user.id),
      getStudentResources(),
      getStudentCounselingSessions(session.user.id),
    ]);

  return (
    <StudentDashboard
      counselingSessions={counselingSessions}
      moodHistory={moodHistory}
      profile={profile}
      resources={resources}
      whisperReports={whisperReports}
    />
  );
}
