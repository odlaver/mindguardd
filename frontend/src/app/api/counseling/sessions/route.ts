import { and, eq, isNull } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/db/client";
import { counselingRequests, counselingSessions, user } from "@/db/schema";
import { auth } from "@/lib/auth";

const requestSchema = z.object({
  format: z.enum(["Tatap muka", "Online"]),
  requestId: z.string().min(1),
  sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sessionTime: z.string().regex(/^\d{2}:\d{2}$/),
});

export async function POST(request: Request) {
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

  const requestItem = await getDb().query.counselingRequests.findFirst({
    where: and(
      eq(counselingRequests.id, parsed.data.requestId),
      isNull(counselingRequests.scheduledSessionId),
    ),
  });

  if (!requestItem) {
    return NextResponse.json(
      { error: "Pengajuan tidak ditemukan atau sudah dijadwalkan." },
      { status: 404 },
    );
  }

  const studentAccount = await getDb().query.user.findFirst({
    where: eq(user.id, requestItem.studentUserId),
  });

  if (!studentAccount || studentAccount.role !== "student") {
    return NextResponse.json({ error: "Siswa pengaju tidak ditemukan." }, { status: 404 });
  }

  const scheduledAt = new Date(
    `${parsed.data.sessionDate}T${parsed.data.sessionTime}:00+07:00`,
  );
  const id = `CS-${String(Math.floor(Math.random() * 900) + 200)}`;

  await getDb().transaction(async (tx) => {
    await tx.insert(counselingSessions).values({
      counselorName: session.user.name,
      counselorUserId: session.user.id,
      focus: `Menindaklanjuti pengajuan ${requestItem.topic.toLowerCase()}.`,
      format: parsed.data.format,
      id,
      invitationStatus: "Menunggu Konfirmasi",
      location:
        parsed.data.format === "Online" ? "Google Meet sekolah" : "Ruang BK 2",
      note: "Jadwal dibuat guru BK dan menunggu konfirmasi siswa.",
      requestId: requestItem.id,
      scheduledAt,
      status: "Menunggu Konfirmasi",
      studentUserId: studentAccount.id,
      title: "Sesi tindak lanjut",
    });

    await tx
      .update(counselingRequests)
      .set({
        scheduledSessionId: id,
        status: "Dijadwalkan",
      })
      .where(eq(counselingRequests.id, requestItem.id));
  });

  return NextResponse.json({ id, ok: true });
}
