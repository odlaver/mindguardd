import "server-only";

import { and, desc, eq, inArray, lt, gte } from "drizzle-orm";

import { getDb } from "@/db/client";
import {
  alerts,
  counselingRequests,
  counselingSessions,
  moodEntries,
  resourcePoints,
  resources,
  schoolClasses,
  schools,
  studentInterventions,
  systemConfigs,
  user,
  whisperReports,
} from "@/db/schema";
import type {
  AdminClass,
  AdminSchool,
  AdminSystemConfig,
  AdminUser,
  AlertItem,
  CounselingRequestStatus,
  CounselingSessionStatus,
  CounselingRequest,
  CounselingSession,
  CounselorStudent,
  MoodPoint,
  ResourceItem,
  StudentIntervention,
  WhisperReport,
} from "@/lib/mock-data";

import { formatDate, formatDateTime, formatShortDate, getJakartaDateKey, getJakartaDayRange } from "./time";

export type StudentProfileData = {
  className: string;
  completionRate: string;
  name: string;
  streak: number;
  todayDate: string;
};

export type StudentAccessState = {
  hasCheckedInToday: boolean;
  submission: null | {
    note: string;
    score: number;
    submittedAt: string;
  };
};

const db = getDb();

function roleToLabel(role: string): AdminUser["role"] {
  if (role === "admin") {
    return "Admin";
  }

  if (role === "counselor") {
    return "Guru BK";
  }

  if (role === "homeroom") {
    return "Wali Kelas";
  }

  return "Siswa";
}

function accountStatus(lastAccessAt: Date | null): AdminUser["status"] {
  return lastAccessAt ? "Aktif" : "Menunggu";
}

function classRiskTone(value: number, activeAlert: AlertItem | undefined): CounselorStudent["risk"] {
  if (activeAlert?.severity === "Tinggi") {
    return "Tinggi";
  }

  if (activeAlert) {
    return "Sedang";
  }

  if (value <= 2) {
    return "Sedang";
  }

  return "Aman";
}

function buildTrend(history: MoodPoint[]) {
  const recent = history.slice(-3);

  if (recent.length < 3) {
    return "Belum cukup data";
  }

  const scores = recent.map((item) => item.score);

  if (scores[2] > scores[1] && scores[1] > scores[0]) {
    return "Naik 3 hari";
  }

  if (scores[2] < scores[1] && scores[1] < scores[0]) {
    return "Turun 3 hari";
  }

  if (scores.every((score) => score <= 2)) {
    return "Stabil rendah";
  }

  return "Fluktuatif";
}

function completionLabel(rate: number) {
  return `${rate}%`;
}

async function getClassMap() {
  const rows = await db.select().from(schoolClasses);
  return new Map(rows.map((item) => [item.id, item]));
}

async function getSchoolMap() {
  const rows = await db.select().from(schools);
  return new Map(rows.map((item) => [item.id, item]));
}

async function getStudentUsers() {
  return db.select().from(user).where(eq(user.role, "student"));
}

async function getMoodHistoryForUsers(userIds: string[]) {
  const rows = userIds.length
    ? await db
        .select()
        .from(moodEntries)
        .where(inArray(moodEntries.userId, userIds))
        .orderBy(moodEntries.recordedAt)
    : [];

  const grouped = new Map<string, MoodPoint[]>();

  for (const row of rows) {
    const list = grouped.get(row.userId) ?? [];
    list.push({
      date: formatShortDate(row.recordedAt),
      note: row.note ?? undefined,
      score: row.score,
    });
    grouped.set(row.userId, list);
  }

  return grouped;
}

async function getAlertItems() {
  const [alertRows, studentRows, classMap] = await Promise.all([
    db.select().from(alerts).orderBy(desc(alerts.lastUpdatedAt)),
    getStudentUsers(),
    getClassMap(),
  ]);
  const studentMap = new Map(studentRows.map((item) => [item.id, item]));

  return alertRows.map((item) => {
    const student = studentMap.get(item.studentUserId);
    const linkedClass = student?.classId ? classMap.get(student.classId) : null;

    return {
      className: linkedClass?.name ?? "-",
      id: item.id,
      lastUpdated: formatDateTime(item.lastUpdatedAt),
      reason: item.reason,
      recommendation: item.recommendation,
      severity: item.severity,
      status: item.status,
      student: student?.name ?? "Siswa",
      studentId: item.studentUserId,
      summary: item.summary,
    } satisfies AlertItem;
  });
}

async function getWhisperItems() {
  const rows = await db.select().from(whisperReports).orderBy(desc(whisperReports.submittedAt));

  return rows.map((item) => ({
    assignedTo: item.assignedTo,
    category: item.category,
    detail: item.detail,
    excerpt: item.excerpt,
    id: item.id,
    nextStep: item.nextStep,
    ownerLabel: item.ownerLabel,
    status: item.status ?? "Sedang Ditinjau",
    studentId: item.studentUserId ?? undefined,
    submittedAt: formatDateTime(item.submittedAt),
    title: item.title,
    urgency: item.urgency,
  })) satisfies WhisperReport[];
}

async function getCounselingSessionItems() {
  const [sessionRows, users] = await Promise.all([
    db.select().from(counselingSessions).orderBy(desc(counselingSessions.scheduledAt)),
    getStudentUsers(),
  ]);
  const userMap = new Map(users.map((item) => [item.id, item]));

  return sessionRows.map((item) => {
    const student = userMap.get(item.studentUserId);

    return {
      counselor: item.counselorName,
      focus: item.focus,
      followUp: item.followUp ?? undefined,
      format: item.format,
      id: item.id,
      invitationStatus: item.invitationStatus as CounselingSessionStatus,
      location: item.location,
      note: item.note,
      outcome: item.outcome ?? undefined,
      requestId: item.requestId ?? undefined,
      status: item.status as CounselingSessionStatus,
      studentCompletionNote: item.studentCompletionNote ?? undefined,
      studentConfirmationNote: item.studentConfirmationNote ?? undefined,
      studentId: item.studentUserId,
      studentName: student?.name ?? "Siswa",
      title: item.title,
      when: formatDateTime(item.scheduledAt),
    } satisfies CounselingSession;
  });
}

async function getCounselingRequestItems() {
  const [requestRows, users, classMap] = await Promise.all([
    db.select().from(counselingRequests).orderBy(desc(counselingRequests.submittedAt)),
    getStudentUsers(),
    getClassMap(),
  ]);
  const userMap = new Map(users.map((item) => [item.id, item]));

  return requestRows.map((item) => {
    const student = userMap.get(item.studentUserId);
    const linkedClass = student?.classId ? classMap.get(student.classId) : null;

    return {
      className: linkedClass?.name ?? "-",
      id: item.id,
      preferredSlot: item.preferredSlot,
      scheduledSessionId: item.scheduledSessionId ?? undefined,
      status: item.status as CounselingRequestStatus,
      studentId: item.studentUserId,
      studentName: student?.name ?? "Siswa",
      submittedAt: formatDateTime(item.submittedAt),
      summary: item.summary,
      topic: item.topic,
    } satisfies CounselingRequest;
  });
}

export async function getStudentAccessState(userId: string): Promise<StudentAccessState> {
  const { end, start } = getJakartaDayRange();
  const entry = await db.query.moodEntries.findFirst({
    orderBy: (table, { desc }) => [desc(table.recordedAt)],
    where: and(
      eq(moodEntries.userId, userId),
      gte(moodEntries.recordedAt, start),
      lt(moodEntries.recordedAt, end),
    ),
  });

  return {
    hasCheckedInToday: Boolean(entry),
    submission: entry
      ? {
          note: entry.note ?? "",
          score: entry.score,
          submittedAt: entry.recordedAt.toISOString(),
        }
      : null,
  };
}

export async function getStudentProfile(userId: string): Promise<StudentProfileData> {
  const [student, classMap] = await Promise.all([
    db.query.user.findFirst({
      where: eq(user.id, userId),
    }),
    getClassMap(),
  ]);

  if (!student) {
    throw new Error(`Student not found: ${userId}`);
  }

  const historyRows = await db
    .select()
    .from(moodEntries)
    .where(eq(moodEntries.userId, userId))
    .orderBy(desc(moodEntries.recordedAt));
  const uniqueKeys = Array.from(
    new Set(historyRows.map((item) => getJakartaDateKey(item.recordedAt))),
  );

  let streak = 0;
  let cursor = uniqueKeys[0] ? new Date(`${uniqueKeys[0]}T00:00:00+07:00`) : null;

  while (cursor) {
    const key = getJakartaDateKey(cursor);

    if (!uniqueKeys.includes(key)) {
      break;
    }

    streak += 1;
    cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
  }

  const recentRange = getJakartaDayRange(new Date());
  const fourteenDaysAgo = new Date(recentRange.start.getTime() - 13 * 24 * 60 * 60 * 1000);
  const activeKeys = uniqueKeys.filter((key) => {
    const day = new Date(`${key}T00:00:00+07:00`);
    return day >= fourteenDaysAgo && day <= recentRange.end;
  }).length;

  return {
    className: student.classId ? classMap.get(student.classId)?.name ?? "-" : "-",
    completionRate: `${Math.min(100, Math.round((activeKeys / 14) * 100))}%`,
    name: student.name,
    streak,
    todayDate: formatDate(new Date()),
  };
}

export async function getStudentMoodHistory(userId: string) {
  const rows = await db
    .select()
    .from(moodEntries)
    .where(eq(moodEntries.userId, userId))
    .orderBy(moodEntries.recordedAt);

  return rows.map((item) => ({
    date: formatShortDate(item.recordedAt),
    note: item.note ?? undefined,
    score: item.score,
  })) satisfies MoodPoint[];
}

export async function getStudentWhisperReports(userId: string) {
  const items = await getWhisperItems();
  return items.filter((item) => item.studentId === userId);
}

export async function getStudentWhisperReportById(userId: string, reportId: string) {
  const items = await getStudentWhisperReports(userId);
  return items.find((item) => item.id === reportId) ?? null;
}

export async function getStudentResources() {
  const [resourceRows, pointRows] = await Promise.all([
    db.select().from(resources),
    db.select().from(resourcePoints).orderBy(resourcePoints.sortOrder),
  ]);
  const pointMap = new Map<string, string[]>();

  for (const row of pointRows) {
    const list = pointMap.get(row.resourceId) ?? [];
    list.push(row.content);
    pointMap.set(row.resourceId, list);
  }

  return resourceRows.map((item) => ({
    category: item.category,
    id: item.id,
    points: pointMap.get(item.id) ?? [],
    readTime: item.readTime,
    summary: item.summary,
    title: item.title,
  })) satisfies ResourceItem[];
}

export async function getStudentResourceById(resourceId: string) {
  const items = await getStudentResources();
  return items.find((item) => item.id === resourceId) ?? null;
}

export async function getStudentCounselingSessions(userId: string) {
  const sessions = await getCounselingSessionItems();
  return sessions.filter((item) => item.studentId === userId);
}

export async function getCounselorStudents() {
  const students = await getStudentUsers();
  const [classMap, alertItems, historyMap, reportItems] = await Promise.all([
    getClassMap(),
    getAlertItems(),
    getMoodHistoryForUsers(students.map((item) => item.id)),
    getWhisperItems(),
  ]);
  const activeAlerts = new Map(
    alertItems
      .filter((item) => item.status !== "Selesai")
      .map((item) => [item.studentId, item]),
  );

  return students.map((item) => {
    const history = historyMap.get(item.id) ?? [];
    const latestMood = history[history.length - 1]?.score ?? 0;
    const activeAlert = activeAlerts.get(item.id);
    const latestReport = reportItems.find((report) => report.studentId === item.id);
    const className = item.classId ? classMap.get(item.classId)?.name ?? "-" : "-";
    const focus = activeAlert?.summary ?? latestReport?.excerpt ?? "Belum ada catatan lanjutan.";

    return {
      className,
      focus,
      id: item.id,
      latestMood,
      moodHistory: history,
      name: item.name,
      risk: classRiskTone(latestMood, activeAlert),
      trend: buildTrend(history),
    } satisfies CounselorStudent;
  });
}

export async function getCounselorOverview() {
  const [studentList, alertItems, reportItems] = await Promise.all([
    getCounselorStudents(),
    getAlertItems(),
    getWhisperItems(),
  ]);

  return {
    activeAlerts: alertItems.filter((item) => item.status !== "Selesai").length,
    anonymousReports: reportItems.filter((item) => item.status !== "Selesai").length,
    monitoredStudents: studentList.length,
    reviewedToday: alertItems.filter(
      (item) => getJakartaDateKey(new Date(item.lastUpdated.replace(", ", "T").replace(".", ":"))) === getJakartaDateKey(new Date()),
    ).length,
  };
}

export async function getAlerts() {
  return getAlertItems();
}

export async function getAlertById(alertId: string) {
  const items = await getAlertItems();
  return items.find((item) => item.id === alertId) ?? null;
}

export async function getWhisperReports() {
  return getWhisperItems();
}

export async function getWhisperReportById(reportId: string) {
  const items = await getWhisperItems();
  return items.find((item) => item.id === reportId) ?? null;
}

export async function getStudentInterventions(studentUserId: string) {
  const rows = await db
    .select()
    .from(studentInterventions)
    .where(eq(studentInterventions.studentUserId, studentUserId));

  return rows.map((item) => ({
    owner: item.owner,
    status: item.status,
    studentId: item.studentUserId,
    title: item.title,
    when: item.whenLabel,
  })) satisfies StudentIntervention[];
}

export async function getCounselingSessions() {
  return getCounselingSessionItems();
}

export async function getCounselingSessionById(sessionId: string) {
  const items = await getCounselingSessionItems();
  return items.find((item) => item.id === sessionId) ?? null;
}

export async function getCounselingRequests() {
  return getCounselingRequestItems();
}

export async function getAdminUsers() {
  const [rows, schoolMap, classMap] = await Promise.all([
    db.select().from(user).orderBy(user.name),
    getSchoolMap(),
    getClassMap(),
  ]);

  return rows.map((item) => ({
    className: item.classId ? classMap.get(item.classId)?.name : undefined,
    email: item.email,
    id: item.id,
    lastAccess: item.lastAccessAt ? formatDateTime(item.lastAccessAt) : "Belum masuk",
    name: item.name,
    role: roleToLabel(item.role ?? "student"),
    schoolId: item.schoolId ?? "",
    schoolName: item.schoolId ? schoolMap.get(item.schoolId)?.name ?? "-" : "-",
    status: accountStatus(item.lastAccessAt ?? null),
  })) satisfies AdminUser[];
}

export async function getAdminUserById(userId: string) {
  const items = await getAdminUsers();
  return items.find((item) => item.id === userId) ?? null;
}

export async function getAdminSchools() {
  const rows = await db.select().from(schools).orderBy(schools.name);

  return rows.map((item) => ({
    classCount: item.classCount,
    completion: completionLabel(item.completionRate),
    counselorCount: item.counselorCount,
    id: item.id,
    name: item.name,
    principal: item.principal,
    studentCount: item.studentCount,
  })) satisfies AdminSchool[];
}

export async function getAdminSchoolById(schoolId: string) {
  const items = await getAdminSchools();
  return items.find((item) => item.id === schoolId) ?? null;
}

export async function getAdminClasses() {
  const [rows, schoolMap] = await Promise.all([
    db.select().from(schoolClasses).orderBy(schoolClasses.name),
    getSchoolMap(),
  ]);

  return rows.map((item) => ({
    className: item.name,
    completion: completionLabel(item.completionRate),
    counselor: item.counselorName,
    homeroom: item.homeroomName,
    id: item.id,
    riskBand: item.riskBand,
    schoolId: item.schoolId,
    schoolName: schoolMap.get(item.schoolId)?.name ?? "-",
    studentCount: item.studentCount,
  })) satisfies AdminClass[];
}

export async function getAdminClassById(classId: string) {
  const items = await getAdminClasses();
  return items.find((item) => item.id === classId) ?? null;
}

export async function getAdminClassByName(className: string) {
  const items = await getAdminClasses();
  return items.find((item) => item.className === className) ?? null;
}

export async function getAdminSystemConfigs() {
  const rows = await db.select().from(systemConfigs).orderBy(systemConfigs.name);

  return rows.map((item) => ({
    group: item.groupName,
    id: item.id,
    impact: item.impact,
    name: item.name,
    status: item.status,
    summary: item.summary,
    value: item.value,
  })) satisfies AdminSystemConfig[];
}

export async function getAdminSystemConfigById(configId: string) {
  const items = await getAdminSystemConfigs();
  return items.find((item) => item.id === configId) ?? null;
}
