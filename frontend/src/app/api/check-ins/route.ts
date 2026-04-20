import { and, eq, gte, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { moodEntries } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getJakartaDayRange } from "@/lib/server/time";

const requestSchema = z.object({
  note: z.string().max(300).optional().default(""),
  score: z.number().int().min(1).max(5),
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
    return NextResponse.json(
      {
        error: "Check-in hari ini sudah tersimpan.",
      },
      { status: 409 },
    );
  }

  const recordedAt = new Date();

  await db.insert(moodEntries).values({
    id: `mood-${crypto.randomUUID()}`,
    note: parsed.data.note.trim() || null,
    recordedAt,
    score: parsed.data.score,
    userId: session.user.id,
  });

  return NextResponse.json({
    submission: {
      note: parsed.data.note.trim(),
      score: parsed.data.score,
      submittedAt: recordedAt.toISOString(),
    },
  });
}
