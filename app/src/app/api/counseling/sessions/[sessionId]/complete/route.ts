import { and, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { counselingRequests, counselingSessions } from "@/db/schema";
import { counselingCompleteSchema } from "@/lib/server/form-schemas";
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
  const parsed = counselingCompleteSchema.safeParse(body);

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
    return jsonError("Sesi sudah ditutup sebelumnya.", 400);
  }

  if (counselingSession.status === "Menunggu Konfirmasi") {
    return jsonError("Konfirmasi jadwal dulu sebelum menutup sesi.", 400);
  }

  if (
    counselingSession.status !== "Dikonfirmasi" ||
    counselingSession.invitationStatus !== "Dikonfirmasi"
  ) {
    return jsonError("Sesi hanya bisa ditutup setelah statusnya terkonfirmasi.", 400);
  }

  await getDb().transaction(async (tx) => {
    await tx
      .update(counselingSessions)
      .set({
        invitationStatus: "Selesai",
        status: "Selesai",
        studentCompletionNote: parsed.data.note,
      })
      .where(eq(counselingSessions.id, counselingSession.id));

    if (counselingSession.requestId) {
      await tx
        .update(counselingRequests)
        .set({
          status: "Selesai",
        })
        .where(eq(counselingRequests.id, counselingSession.requestId));
    }
  });

  return jsonOk({ ok: true });
}
