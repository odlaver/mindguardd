import { and, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { schoolClasses, user, whisperReports } from "@/db/schema";
import { makeWhisperExcerpt, whisperRequestSchema } from "@/lib/server/form-schemas";
import { invalidPayload, jsonOk, unauthorized } from "@/lib/server/http";
import { createEntityId } from "@/lib/server/id";
import { getApiRoleSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const session = await getApiRoleSession("student");

  if (!session) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);
  const parsed = whisperRequestSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const detail = parsed.data.detail;
  const title =
    parsed.data.title?.trim() ||
    `${parsed.data.category} - ${detail.split(/[.!?]/)[0]?.slice(0, 48) ?? "Laporan baru"}`;
  const db = getDb();
  const linkedClass = session.user.classId
    ? await db.query.schoolClasses.findFirst({
        where: eq(schoolClasses.id, session.user.classId),
      })
    : null;
  const schoolCounselor =
    session.user.schoolId
      ? await db.query.user.findFirst({
          where: and(
            eq(user.role, "counselor"),
            eq(user.schoolId, session.user.schoolId),
          ),
        })
      : null;
  const id = createEntityId("WSP");

  await db.insert(whisperReports).values({
    assignedTo: linkedClass?.counselorName ?? schoolCounselor?.name ?? "Guru BK",
    category: parsed.data.category,
    detail,
    excerpt: makeWhisperExcerpt(detail),
    id,
    nextStep: "Guru BK akan memeriksa laporan ini dan menentukan langkah aman berikutnya.",
    ownerLabel: `Anonim ${linkedClass?.name ?? "Siswa"}`,
    status: "Baru",
    studentUserId: session.user.id,
    submittedAt: new Date(),
    title,
    urgency: parsed.data.urgency,
  });

  return jsonOk({ id, ok: true });
}
