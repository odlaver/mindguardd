import { StudentCounselingRequestForm } from "@/components/student/student-counseling-request-form";
import { requireRole } from "@/lib/server/session";

export default async function StudentCounselingRequestPage() {
  await requireRole("student");
  return <StudentCounselingRequestForm />;
}
