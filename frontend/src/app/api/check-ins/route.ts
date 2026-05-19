import { and, eq, gte, lt } from "drizzle-orm";

import { getDb } from "@/db/client";
import { moodEntries } from "@/db/schema";
import { checkInRequestSchema } from "@/lib/server/form-schemas";
import { invalidPayload, jsonError, jsonOk, unauthorized } from "@/lib/server/http";
import { getApiRoleSession } from "@/lib/server/session";
import { getJakartaDayRange } from "@/lib/server/time";

export async function POST(request: Request) {
  const session = await getApiRoleSession("student");

  if (!session) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);
  const parsed = checkInRequestSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const { end, start } = getJakartaDayRange();
  const db = getDb();
  const existing = await db.query.moodEntries.findFirst({
    where: and(
      eq(moodEntries.userId, session.user.id),
      gte(moodEntries.recordedAt, start),
      lt(moodEntries.recordedAt, end),
    ),
  });

  if (existing) {
    return jsonError("Check-in hari ini sudah tersimpan.", 409);
  }

  const recordedAt = new Date();

  await db.insert(moodEntries).values({
    id: `mood-${crypto.randomUUID()}`,
    note: parsed.data.note || null,
    recordedAt,
    score: parsed.data.score,
    userId: session.user.id,
  });

  return jsonOk({
    submission: {
      note: parsed.data.note,
      score: parsed.data.score,
      submittedAt: recordedAt.toISOString(),
    },
  });
}
