import { and, eq, inArray, ne } from "drizzle-orm";

import { getDb } from "@/db/client";
import { counselingRequests, counselingSessions } from "@/db/schema";
import { counselingRequestSchema } from "@/lib/server/form-schemas";
import { invalidPayload, jsonError, jsonOk, unauthorized } from "@/lib/server/http";
import { createEntityId } from "@/lib/server/id";
import { getApiRoleSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const session = await getApiRoleSession("student");

  if (!session) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);
  const parsed = counselingRequestSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const db = getDb();
  const [activeRequest, activeSession] = await Promise.all([
    db.query.counselingRequests.findFirst({
      where: and(
        eq(counselingRequests.studentUserId, session.user.id),
        inArray(counselingRequests.status, ["Baru", "Dijadwalkan"]),
      ),
    }),
    db.query.counselingSessions.findFirst({
      where: and(
        eq(counselingSessions.studentUserId, session.user.id),
        ne(counselingSessions.status, "Selesai"),
      ),
    }),
  ]);

  if (activeRequest || activeSession) {
    return jsonError(
      "Masih ada alur konseling yang aktif. Selesaikan atau tunggu jadwal yang berjalan terlebih dulu.",
      409,
    );
  }

  const id = createEntityId("REQ");

  await db.insert(counselingRequests).values({
    id,
    preferredSlot: parsed.data.preferredSlot,
    status: "Baru",
    studentUserId: session.user.id,
    submittedAt: new Date(),
    summary: parsed.data.summary,
    topic: parsed.data.topic,
  });

  return jsonOk({ id, ok: true });
}
