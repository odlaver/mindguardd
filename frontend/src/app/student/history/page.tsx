import { MoodHistoryChart } from "@/components/student/mood-history-chart";
import { StatusBadge } from "@/components/ui/status-badge";
import { studentMoodHistory } from "@/lib/mock-data";

export default function StudentHistoryPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Riwayat Mood</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Riwayat emosi.
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">14 hari</StatusBadge>
          <StatusBadge>Skala 1-5</StatusBadge>
        </div>
      </section>

      <MoodHistoryChart data={studentMoodHistory} />
    </>
  );
}
