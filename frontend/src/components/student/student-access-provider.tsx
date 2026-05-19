"use client";

import { startTransition, createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { sendJson } from "@/lib/client/api";

type CheckInSubmission = {
  note: string;
  score: number;
  submittedAt: string;
};

type StudentAccessContextValue = {
  hasCheckedInToday: boolean;
  isSaving: boolean;
  submission: CheckInSubmission | null;
  completeCheckIn: (payload: {
    note: string;
    score: number;
  }) => Promise<{ ok: true } | { error: string; ok: false }>;
};

const StudentAccessContext = createContext<StudentAccessContextValue | null>(
  null,
);

export function StudentAccessProvider({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  initialState: {
    hasCheckedInToday: boolean;
    submission: CheckInSubmission | null;
  };
}>) {
  const router = useRouter();
  const [submission, setSubmission] = useState(initialState.submission);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(
    initialState.hasCheckedInToday,
  );
  const [isSaving, setIsSaving] = useState(false);

  async function completeCheckIn({
    score,
    note,
  }: {
    note: string;
    score: number;
  }) {
    setIsSaving(true);
    const result = await sendJson<{
      submission?: CheckInSubmission;
    }>("/api/check-ins", {
      body: JSON.stringify({
        note: note.trim(),
        score,
      }),
      method: "POST",
    }, "Check-in belum bisa disimpan.");

    if (!result.ok || !result.data.submission) {
      setIsSaving(false);
      return {
        error: result.ok ? "Check-in belum bisa disimpan." : result.error,
        ok: false as const,
      };
    }

    setSubmission(result.data.submission);
    setHasCheckedInToday(true);
    setIsSaving(false);
    startTransition(() => {
      router.refresh();
    });

    return { ok: true as const };
  }

  return (
    <StudentAccessContext.Provider
      value={{
        completeCheckIn,
        hasCheckedInToday,
        isSaving,
        submission,
      }}
    >
      {children}
    </StudentAccessContext.Provider>
  );
}

export function useStudentAccess() {
  const value = useContext(StudentAccessContext);

  if (!value) {
    throw new Error("useStudentAccess must be used within StudentAccessProvider");
  }

  return value;
}
