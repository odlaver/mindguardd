import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  checkInRequestSchema,
  counselingCompleteSchema,
  counselingConfirmSchema,
  counselingRequestSchema,
  counselingScheduleSchema,
  makeWhisperExcerpt,
  parseJakartaSchedule,
  systemConfigSchema,
  whisperRequestSchema,
  whisperStatusSchema,
} from "../src/lib/server/form-schemas";

describe("form schemas", () => {
  it("validates mood check-in payloads", () => {
    const parsed = checkInRequestSchema.parse({
      score: 4,
      note: "  Bisa fokus hari ini  ",
    });

    assert.equal(parsed.note, "Bisa fokus hari ini");
    assert.equal(checkInRequestSchema.safeParse({ score: 0 }).success, false);
    assert.equal(checkInRequestSchema.safeParse({ score: 6 }).success, false);
  });

  it("validates whisper reports and generates bounded excerpts", () => {
    const parsed = whisperRequestSchema.parse({
      title: "  Butuh bantuan  ",
      category: "  Relasi teman  ",
      detail: "  Saya butuh ruang aman untuk cerita.  ",
      isAnonymous: true,
      urgency: "Normal",
    });

    assert.equal(parsed.title, "Butuh bantuan");
    assert.equal(parsed.category, "Relasi teman");
    assert.equal(parsed.detail, "Saya butuh ruang aman untuk cerita.");
    assert.equal(whisperRequestSchema.safeParse({ detail: "   " }).success, false);
    assert.equal(makeWhisperExcerpt("a".repeat(140)).length, 120);
  });

  it("validates counseling request payloads", () => {
    const parsed = counselingRequestSchema.parse({
      topic: "  Akademik  ",
      preferredSlot: "  Rabu sore  ",
      summary: "  Saya ingin membahas tekanan belajar minggu ini.  ",
    });

    assert.equal(parsed.topic, "Akademik");
    assert.equal(parsed.preferredSlot, "Rabu sore");
    assert.equal(parsed.summary, "Saya ingin membahas tekanan belajar minggu ini.");
    assert.equal(counselingRequestSchema.safeParse({ topic: "x", preferredSlot: "y", summary: "z" }).success, false);
  });

  it("validates schedule payloads and parses Jakarta local time", () => {
    const parsed = counselingScheduleSchema.parse({
      studentUserId: "student-1",
      requestId: "request-1",
      sessionDate: "2026-05-20",
      sessionTime: "15:30",
      format: "Online",
      location: "Google Meet",
      focus: "Follow up akademik",
      note: "Periksa progres tugas.",
    });

    assert.equal(parsed.format, "Online");
    assert.equal(parseJakartaSchedule(parsed.sessionDate, parsed.sessionTime).toISOString(), "2026-05-20T08:30:00.000Z");
  });

  it("validates session confirmation and completion payloads", () => {
    assert.deepEqual(counselingConfirmSchema.parse({}), { note: "" });
    assert.equal(counselingCompleteSchema.safeParse({ note: "ok" }).success, false);
    assert.equal(counselingCompleteSchema.safeParse({ note: "Sesi selesai dengan baik." }).success, true);
  });

  it("validates admin system config payloads", () => {
    const parsed = systemConfigSchema.parse({
      value: "  85%  ",
      impact: "  Mengubah prioritas notifikasi  ",
      status: "Aktif",
      summary: "  Ambang alert otomatis  ",
    });

    assert.equal(parsed.value, "85%");
    assert.equal(parsed.summary, "Ambang alert otomatis");
    assert.equal(
      systemConfigSchema.safeParse({
        impact: "valid impact",
        status: "Aktif",
        summary: "valid summary",
        value: "",
      }).success,
      false,
    );
  });

  it("validates whisper status updates", () => {
    assert.equal(whisperStatusSchema.safeParse({ status: "Selesai" }).success, true);
    assert.equal(whisperStatusSchema.safeParse({ status: "Ditolak" }).success, false);
  });
});
