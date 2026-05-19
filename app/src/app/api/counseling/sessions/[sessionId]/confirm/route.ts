import { and, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { counselingSessions } from "@/db/schema";
import { counselingConfirmSchema } from "@/lib/server/form-schemas";
import { invalidPayload, jsonError, jsonOk, unauthorized } from "@/lib/server/http";
import { getApiRoleSession } from "@/lib/server/session";

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getApiRoleSession("student");

  if (!session) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);
  const parsed = counselingConfirmSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const { sessionId } = await context.params;
  const counselingSession = await getDb().query.counselingSessions.findFirst({
    where: and(
      eq(counselingSessions.id, sessionId),
      eq(counselingSessions.studentUserId, session.user.id),
    ),
  });

  if (!counselingSession) {
    return jsonError("Sesi tidak ditemukan.", 404);
  }

  if (counselingSession.status === "Selesai") {
    return jsonError("Sesi sudah selesai.", 400);
  }

  if (
    counselingSession.status !== "Menunggu Konfirmasi" ||
    counselingSession.invitationStatus !== "Menunggu Konfirmasi"
  ) {
    return jsonError("Jadwal ini sudah dikonfirmasi sebelumnya.", 400);
  }

  await getDb()
    .update(counselingSessions)
    .set({
      invitationStatus: "Dikonfirmasi",
      status: "Dikonfirmasi",
      studentConfirmationNote: parsed.data.note || null,
    })
    .where(eq(counselingSessions.id, counselingSession.id));

  return jsonOk({ ok: true });
}
