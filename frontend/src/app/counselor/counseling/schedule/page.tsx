import { CounselingScheduleBuilder } from "@/components/counselor/counseling-schedule-builder";
import { getCounselingRequests } from "@/lib/server/data";

export default async function CounselorCounselingSchedulePage() {
  const counselingRequests = await getCounselingRequests();

  return (
    <CounselingScheduleBuilder
      initialNowIso={new Date().toISOString()}
      requests={counselingRequests}
    />
  );
}
