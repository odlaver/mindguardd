import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { counselingRequests, counselingSessions } from "@/db/schema";
import { auth } from "@/lib/auth";

const requestSchema = z.object({
  note: z.string().min(4).max(1200),
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
    return NextResponse.json({ error: "Sesi sudah ditutup sebelumnya." }, { status: 400 });
  }

  if (counselingSession.status === "Menunggu Konfirmasi") {
    return NextResponse.json(
      { error: "Konfirmasi jadwal dulu sebelum menutup sesi." },
      { status: 400 },
    );
  }

  if (
    counselingSession.status !== "Dikonfirmasi" ||
    counselingSession.invitationStatus !== "Dikonfirmasi"
  ) {
    return NextResponse.json(
      { error: "Sesi hanya bisa ditutup setelah statusnya terkonfirmasi." },
      { status: 400 },
    );
  }

  await getDb().transaction(async (tx) => {
    await tx
      .update(counselingSessions)
      .set({
        invitationStatus: "Selesai",
        status: "Selesai",
        studentCompletionNote: parsed.data.note.trim(),
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

  return NextResponse.json({ ok: true });
}
