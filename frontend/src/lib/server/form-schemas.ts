import { z } from "zod";

export const checkInRequestSchema = z.object({
  note: z.string().trim().max(300).optional().default(""),
  score: z.number().int().min(1).max(5),
});

export const whisperRequestSchema = z.object({
  category: z.string().trim().min(1).max(80),
  detail: z.string().trim().min(20).max(2000),
  title: z.string().trim().min(3).max(120).optional(),
  urgency: z.enum(["Normal", "Tinggi"]),
});

export const whisperStatusSchema = z.object({
  status: z.enum(["Baru", "Sedang Ditinjau", "Selesai"]),
});

export const counselingRequestSchema = z.object({
  preferredSlot: z.string().trim().min(1).max(120),
  summary: z.string().trim().min(10).max(1200),
  topic: z.string().trim().min(1).max(120),
});

export const counselingScheduleSchema = z.object({
  format: z.enum(["Tatap muka", "Online"]),
  requestId: z.string().trim().min(1),
  sessionDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  sessionTime: z.string().trim().regex(/^\d{2}:\d{2}$/),
});

export const counselingConfirmSchema = z.object({
  note: z.string().trim().max(800).optional().default(""),
});

export const counselingCompleteSchema = z.object({
  note: z.string().trim().min(4).max(1200),
});

export const systemConfigSchema = z.object({
  impact: z.string().trim().min(3).max(800),
  status: z.enum(["Aktif", "Tertunda"]),
  summary: z.string().trim().min(3).max(800),
  value: z.string().trim().min(1).max(200),
});

export function makeWhisperExcerpt(detail: string) {
  const normalized = detail.replace(/\s+/g, " ").trim();
  return normalized.length > 120 ? `${normalized.slice(0, 117)}...` : normalized;
}

export function parseJakartaSchedule(sessionDate: string, sessionTime: string) {
  return new Date(`${sessionDate}T${sessionTime}:00+07:00`);
}
