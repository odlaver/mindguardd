"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CharacterCount } from "@/components/ui/character-count";
import { sendJson } from "@/lib/client/api";
import type { CounselingSessionStatus } from "@/lib/types";

type StudentCounselingSessionActionsProps = {
  sessionId: string;
  status: CounselingSessionStatus;
  studentConfirmationNote?: string;
  studentCompletionNote?: string;
};

export function StudentCounselingSessionActions({
  sessionId,
  status,
  studentConfirmationNote,
  studentCompletionNote,
}: StudentCounselingSessionActionsProps) {
  const router = useRouter();
  const [confirmationNote, setConfirmationNote] = useState(studentConfirmationNote ?? "");
  const [completionNote, setCompletionNote] = useState(studentCompletionNote ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(path: string, payload: { note: string }) {
    setError(null);
    setIsSubmitting(true);

    const result = await sendJson<{ ok?: boolean }>(
      path,
      {
        body: JSON.stringify({
          note: payload.note.trim(),
        }),
        method: "PATCH",
      },
      "Perubahan belum bisa disimpan.",
    );

    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      {status === "Menunggu Konfirmasi" ? (
        <>
          <label className="grid gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="soft-label">Catatan konfirmasi</span>
              <CharacterCount max={800} optional value={confirmationNote} />
            </div>
            <textarea
              rows={5}
              maxLength={800}
              value={confirmationNote}
              onChange={(event) => setConfirmationNote(event.target.value)}
              className="field-control resize-none"
              placeholder="Contoh: Saya siap hadir dan ingin fokus membahas tekanan tugas."
            />
          </label>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              submit(`/api/counseling/sessions/${sessionId}/confirm`, {
                note: confirmationNote.trim(),
              })
            }
            className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Menyimpan..." : "Konfirmasi jadwal"}
          </button>
        </>
      ) : null}

      {status === "Dikonfirmasi" ? (
        <>
          <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4 text-sm leading-7 text-ink-soft">
            {studentConfirmationNote?.trim()
              ? studentConfirmationNote
              : "Belum ada catatan konfirmasi."}
          </div>
          <label className="grid gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="soft-label">Catatan setelah konseling</span>
              <CharacterCount max={1200} min={4} value={completionNote} />
            </div>
            <textarea
              rows={6}
              maxLength={1200}
              value={completionNote}
              onChange={(event) => setCompletionNote(event.target.value)}
              className="field-control resize-none"
              placeholder="Tulis ringkasan singkat dari sisi siswa setelah sesi selesai."
            />
          </label>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              completionNote.trim().length < 4
                ? setError("Catatan setelah konseling minimal 4 karakter.")
                : submit(`/api/counseling/sessions/${sessionId}/complete`, {
                    note: completionNote.trim(),
                  })
            }
            className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Menyimpan..." : "Tandai konseling selesai"}
          </button>
        </>
      ) : null}

      {status === "Selesai" ? (
        <>
          <div className="rounded-[24px] border border-stroke bg-[#f7f8f4] p-4">
            <p className="soft-label">Catatan konfirmasi</p>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {studentConfirmationNote?.trim() || "-"}
            </p>
          </div>
          <div className="rounded-[24px] border border-stroke bg-white p-4">
            <p className="soft-label">Catatan penutupan</p>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {studentCompletionNote?.trim() || "-"}
            </p>
          </div>
        </>
      ) : null}

      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
    </div>
  );
}
