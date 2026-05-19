import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { whisperReports } from "@/db/schema";
import { getWhisperReportById } from "@/lib/server/data";
import { whisperStatusSchema } from "@/lib/server/form-schemas";
import { invalidPayload, jsonError, jsonOk, unauthorized } from "@/lib/server/http";
import { getApiRoleSession } from "@/lib/server/session";

type WhisperStatusRouteContext = {
  params: Promise<{
    reportId: string;
  }>;
};

export async function PATCH(request: Request, context: WhisperStatusRouteContext) {
  const session = await getApiRoleSession("counselor");

  if (!session) {
    return unauthorized();
  }

  if (!session.user.schoolId) {
    return jsonError("Scope sekolah akun konselor belum tersedia.", 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = whisperStatusSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const { reportId } = await context.params;
  const report = await getWhisperReportById(reportId, session.user.schoolId);

  if (!report) {
    return jsonError("Laporan tidak ditemukan.", 404);
  }

  const result = await getDb()
    .update(whisperReports)
    .set({
      status: parsed.data.status,
    })
    .where(eq(whisperReports.id, reportId))
    .returning({
      id: whisperReports.id,
      status: whisperReports.status,
    });

  if (!result[0]) {
    return jsonError("Laporan tidak ditemukan.", 404);
  }

  return jsonOk({ ok: true, report: result[0] });
}
