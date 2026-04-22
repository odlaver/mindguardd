import { and, eq, inArray, ne } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { counselingRequests, counselingSessions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createEntityId } from "@/lib/server/id";

const requestSchema = z.object({
  preferredSlot: z.string().min(1).max(120),
  summary: z.string().min(10).max(1200),
  topic: z.string().min(1).max(120),
});

export async function POST(request: Request) {
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
    return NextResponse.json(
      {
        error:
          "Masih ada alur konseling yang aktif. Selesaikan atau tunggu jadwal yang berjalan terlebih dulu.",
      },
      { status: 409 },
    );
  }

  const id = createEntityId("REQ");

  await db.insert(counselingRequests).values({
    id,
    preferredSlot: parsed.data.preferredSlot.trim(),
    status: "Baru",
    studentUserId: session.user.id,
    submittedAt: new Date(),
    summary: parsed.data.summary.trim(),
    topic: parsed.data.topic.trim(),
  });

  return NextResponse.json({ id, ok: true });
}
