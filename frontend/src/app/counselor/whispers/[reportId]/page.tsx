import { notFound } from "next/navigation";

import { WhisperDetailView } from "@/components/counselor/whisper-detail-view";
import { getCounselorStudents, getWhisperReportById } from "@/lib/server/data";

type WhisperDetailPageProps = {
  params: Promise<{
    reportId: string;
  }>;
};

export default async function WhisperDetailPage({
  params,
}: WhisperDetailPageProps) {
  const { reportId } = await params;
  const [report, counselorStudents] = await Promise.all([
    getWhisperReportById(reportId),
    getCounselorStudents(),
  ]);

  if (!report) {
    notFound();
  }

  const student = report.studentId
    ? counselorStudents.find((item) => item.id === report.studentId)
    : undefined;

  return <WhisperDetailView report={report} student={student} />;
}
