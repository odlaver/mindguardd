import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { systemConfigs } from "@/db/schema";
import { systemConfigSchema } from "@/lib/server/form-schemas";
import { invalidPayload, jsonError, jsonOk, unauthorized } from "@/lib/server/http";
import { getApiRoleSession } from "@/lib/server/session";

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/system-configs/[configId]">,
) {
  const session = await getApiRoleSession("admin");

  if (!session) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);
  const parsed = systemConfigSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const { configId } = await context.params;
  const result = await getDb()
    .update(systemConfigs)
    .set({
      impact: parsed.data.impact,
      status: parsed.data.status,
      summary: parsed.data.summary,
      value: parsed.data.value,
    })
    .where(eq(systemConfigs.id, configId))
    .returning();

  if (!result[0]) {
    return jsonError("Konfigurasi tidak ditemukan.", 404);
  }

  return jsonOk({ config: result[0], ok: true });
}
