import { and, eq, isNull, ne } from "drizzle-orm";

import { getDb } from "@/db/client";
import { counselingRequests, counselingSessions, user } from "@/db/schema";
import { counselingScheduleSchema, parseJakartaSchedule } from "@/lib/server/form-schemas";
import { invalidPayload, jsonError, jsonOk, unauthorized } from "@/lib/server/http";
import { createEntityId } from "@/lib/server/id";
import { getApiRoleSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const session = await getApiRoleSession("counselor");

  if (!session) {
    return unauthorized();
  }

  if (!session.user.schoolId) {
    return jsonError("Scope sekolah akun konselor belum tersedia.", 403);
  }

  const body = await request.json().catch(() => null);
  const parsed = counselingScheduleSchema.safeParse(body);

  if (!parsed.success) {
    return invalidPayload();
  }

  const db = getDb();
  const requestItem = await db.query.counselingRequests.findFirst({
    where: and(
      eq(counselingRequests.id, parsed.data.requestId),
      isNull(counselingRequests.scheduledSessionId),
    ),
  });

  if (!requestItem) {
    return jsonError("Pengajuan tidak ditemukan atau sudah dijadwalkan.", 404);
  }

  if (requestItem.status !== "Baru") {
    return jsonError("Pengajuan ini tidak lagi berada pada tahap penjadwalan baru.", 409);
  }

  const studentAccount = await db.query.user.findFirst({
    where: eq(user.id, requestItem.studentUserId),
  });

  if (!studentAccount || studentAccount.role !== "student") {
    return jsonError("Siswa pengaju tidak ditemukan.", 404);
  }

  if (studentAccount.schoolId !== session.user.schoolId) {
    return jsonError("Guru BK hanya dapat menjadwalkan siswa dalam sekolah yang sama.", 403);
  }

  const scheduledAt = parseJakartaSchedule(parsed.data.sessionDate, parsed.data.sessionTime);

  if (Number.isNaN(scheduledAt.getTime()) || scheduledAt.getTime() <= Date.now()) {
    return jsonError("Waktu sesi harus lebih besar dari waktu Indonesia saat ini.", 400);
  }

  const existingSession = await db.query.counselingSessions.findFirst({
    where: and(
      eq(counselingSessions.studentUserId, studentAccount.id),
      ne(counselingSessions.status, "Selesai"),
    ),
  });

  if (existingSession) {
    return jsonError("Siswa ini masih memiliki sesi aktif yang belum selesai.", 409);
  }

  const id = createEntityId("CS");

  await db.transaction(async (tx) => {
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
      title: `Sesi ${requestItem.topic}`,
    });

    await tx
      .update(counselingRequests)
      .set({
        scheduledSessionId: id,
        status: "Dijadwalkan",
      })
      .where(eq(counselingRequests.id, requestItem.id));
  });

  return jsonOk({ id, ok: true });
}
