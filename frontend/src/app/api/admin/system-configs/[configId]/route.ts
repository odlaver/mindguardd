import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { systemConfigs } from "@/db/schema";
import { auth } from "@/lib/auth";

const requestSchema = z.object({
  impact: z.string().min(3).max(800),
  status: z.enum(["Aktif", "Tertunda"]),
  summary: z.string().min(3).max(800),
  value: z.string().min(1).max(200),
});

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/system-configs/[configId]">,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  const { configId } = await context.params;
  const result = await getDb()
    .update(systemConfigs)
    .set({
      impact: parsed.data.impact.trim(),
      status: parsed.data.status,
      summary: parsed.data.summary.trim(),
      value: parsed.data.value.trim(),
    })
    .where(eq(systemConfigs.id, configId))
    .returning();

  if (!result[0]) {
    return NextResponse.json({ error: "Konfigurasi tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ config: result[0], ok: true });
}
