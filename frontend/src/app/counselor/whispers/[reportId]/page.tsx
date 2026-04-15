import { notFound } from "next/navigation";

import { WhisperDetailView } from "@/components/counselor/whisper-detail-view";
import { counselorStudents, whisperReports } from "@/lib/mock-data";

type WhisperDetailPageProps = {
  params: Promise<{
    reportId: string;
  }>;
};

export default async function WhisperDetailPage({
  params,
}: WhisperDetailPageProps) {
  const { reportId } = await params;
  const report = whisperReports.find((item) => item.id === reportId);

  if (!report) {
    notFound();
  }

  const student = report.studentId
    ? counselorStudents.find((item) => item.id === report.studentId)
    : undefined;

  return <WhisperDetailView report={report} student={student} />;
}
