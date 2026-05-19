import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { user } from "@/db/schema";
import { jsonOk, unauthorized } from "@/lib/server/http";
import { getSessionOrNull } from "@/lib/server/session";

export async function POST() {
  const session = await getSessionOrNull();

  if (!session) {
    return unauthorized();
  }

  await getDb()
    .update(user)
    .set({
      lastAccessAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  return jsonOk({ ok: true });
}
