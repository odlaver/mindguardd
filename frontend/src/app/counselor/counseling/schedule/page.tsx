import { CounselingScheduleBuilder } from "@/components/counselor/counseling-schedule-builder";
import { getCounselingRequests } from "@/lib/server/data";
import { requireSchoolScopedRole } from "@/lib/server/session";

export default async function CounselorCounselingSchedulePage() {
  const { schoolId } = await requireSchoolScopedRole("counselor");
  const counselingRequests = await getCounselingRequests(schoolId);

  return (
    <CounselingScheduleBuilder
      initialNowIso={new Date().toISOString()}
      requests={counselingRequests}
    />
  );
}
