import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { schoolClasses, whisperReports } from "@/db/schema";
import { auth } from "@/lib/auth";

const requestSchema = z.object({
  category: z.string().min(1).max(80),
  detail: z.string().min(20).max(2000),
  title: z.string().min(3).max(120).optional(),
  urgency: z.enum(["Normal", "Tinggi"]),
});

function makeExcerpt(detail: string) {
  const normalized = detail.replace(/\s+/g, " ").trim();
  return normalized.length > 120 ? `${normalized.slice(0, 117)}...` : normalized;
}

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

  const id = `WSP-${String(Math.floor(Math.random() * 900) + 100)}`;
  const detail = parsed.data.detail.trim();
  const title =
    parsed.data.title?.trim() ||
    `${parsed.data.category} - ${detail.split(/[.!?]/)[0]?.slice(0, 48) ?? "Laporan baru"}`;
  const linkedClass = session.user.classId
    ? await getDb().query.schoolClasses.findFirst({
        where: eq(schoolClasses.id, session.user.classId),
      })
    : null;

  await getDb().insert(whisperReports).values({
    assignedTo: "Bu Sinta",
    category: parsed.data.category.trim(),
    detail,
    excerpt: makeExcerpt(detail),
    id,
    nextStep: "Guru BK akan memeriksa laporan ini dan menentukan langkah aman berikutnya.",
    ownerLabel: `Anonim ${linkedClass?.name ?? "Siswa"}`,
    status: "Baru",
    studentUserId: session.user.id,
    submittedAt: new Date(),
    title,
    urgency: parsed.data.urgency,
  });

  return NextResponse.json({ id, ok: true });
}
