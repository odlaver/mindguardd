import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { whisperReports } from "@/db/schema";
import { auth } from "@/lib/auth";

const requestSchema = z.object({
  status: z.enum(["Baru", "Sedang Ditinjau", "Selesai"]),
});

type WhisperStatusRouteContext = {
  params: Promise<{
    reportId: string;
  }>;
};

export async function PATCH(request: Request, context: WhisperStatusRouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "counselor") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  const { reportId } = await context.params;
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
    return NextResponse.json({ error: "Laporan tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, report: result[0] });
}
