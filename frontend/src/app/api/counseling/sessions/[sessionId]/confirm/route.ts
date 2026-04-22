import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { counselingSessions } from "@/db/schema";
import { auth } from "@/lib/auth";

const requestSchema = z.object({
  note: z.string().max(800).optional().default(""),
});

type RouteContext = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  const { sessionId } = await context.params;
  const counselingSession = await getDb().query.counselingSessions.findFirst({
    where: and(
      eq(counselingSessions.id, sessionId),
      eq(counselingSessions.studentUserId, session.user.id),
    ),
  });

  if (!counselingSession) {
    return NextResponse.json({ error: "Sesi tidak ditemukan." }, { status: 404 });
  }

  if (counselingSession.status === "Selesai") {
    return NextResponse.json({ error: "Sesi sudah selesai." }, { status: 400 });
  }

  if (
    counselingSession.status !== "Menunggu Konfirmasi" ||
    counselingSession.invitationStatus !== "Menunggu Konfirmasi"
  ) {
    return NextResponse.json(
      { error: "Jadwal ini sudah dikonfirmasi sebelumnya." },
      { status: 400 },
    );
  }

  await getDb()
    .update(counselingSessions)
    .set({
      invitationStatus: "Dikonfirmasi",
      status: "Dikonfirmasi",
      studentConfirmationNote: parsed.data.note.trim() || null,
    })
    .where(eq(counselingSessions.id, counselingSession.id));

  return NextResponse.json({ ok: true });
}
