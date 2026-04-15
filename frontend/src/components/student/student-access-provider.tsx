"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const STORAGE_PREFIX = "mindguard.student.daily-check-in";
const STORAGE_EVENT = "mindguard-student-check-in";

let cachedKey = "";
let cachedRawValue: string | null = null;
let cachedSubmission: CheckInSubmission | null = null;

type CheckInSubmission = {
  note: string;
  score: number;
  submittedAt: string;
};

type StudentAccessContextValue = {
  hasCheckedInToday: boolean | null;
  submission: CheckInSubmission | null;
  completeCheckIn: (payload: { score: number; note: string }) => void;
};

const StudentAccessContext = createContext<StudentAccessContextValue | null>(
  null,
);

function subscribeToSubmissionStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

function subscribeToHydration() {
  return () => undefined;
}

function getClientReadySnapshot() {
  return true;
}

function getServerReadySnapshot() {
  return false;
}

function getTodayStorageKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");

  return `${STORAGE_PREFIX}.${year}-${month}-${day}`;
}

function readStoredSubmission() {
  if (typeof window === "undefined") {
    return null;
  }

  const storageKey = getTodayStorageKey();
  const rawValue = window.localStorage.getItem(storageKey);

  if (cachedKey === storageKey && cachedRawValue === rawValue) {
    return cachedSubmission;
  }

  if (!rawValue) {
    cachedKey = storageKey;
    cachedRawValue = null;
    cachedSubmission = null;
    return null;
  }

  try {
    cachedKey = storageKey;
    cachedRawValue = rawValue;
    cachedSubmission = JSON.parse(rawValue) as CheckInSubmission;
    return cachedSubmission;
  } catch {
    window.localStorage.removeItem(storageKey);
    cachedKey = storageKey;
    cachedRawValue = null;
    cachedSubmission = null;
    return null;
  }
}

export function StudentAccessProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClient = useSyncExternalStore(
    subscribeToHydration,
    getClientReadySnapshot,
    getServerReadySnapshot,
  );
  const submission = useSyncExternalStore(
    subscribeToSubmissionStore,
    readStoredSubmission,
    () => null,
  );

  function completeCheckIn({ score, note }: { score: number; note: string }) {
    const nextSubmission = {
      note,
      score,
      submittedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      getTodayStorageKey(),
      JSON.stringify(nextSubmission),
    );
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  return (
    <StudentAccessContext.Provider
      value={{
        completeCheckIn,
        hasCheckedInToday: isClient ? submission !== null : null,
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
