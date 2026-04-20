import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { counselingRequests } from "@/db/schema";
import { auth } from "@/lib/auth";

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

  const id = `REQ-${String(Math.floor(Math.random() * 900) + 100)}`;

  await getDb().insert(counselingRequests).values({
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
