import "server-only";

import { and, desc, eq, gte, inArray, lt } from "drizzle-orm";
import { cache } from "react";

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
  CounselingRequest,
  CounselingRequestStatus,
  CounselingSession,
  CounselingSessionStatus,
  CounselorStudent,
  MoodPoint,
  ResourceItem,
  StudentIntervention,
  WhisperReport,
} from "@/lib/mock-data";

import {
  formatDateTime,
  formatShortDate,
  getJakartaDateKey,
  getJakartaDayRange,
} from "./time";

export type StudentProfileData = {
  className: string;
  completionRate: string;
  name: string;
  streak: number;
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

  if (activeAlert || value <= 2) {
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
  return `${Math.max(0, Math.min(100, rate))}%`;
}

function addToCounter(map: Map<string, number>, key: null | string | undefined) {
  if (!key) {
    return;
  }

  map.set(key, (map.get(key) ?? 0) + 1);
}

function calculateRate(completed: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((completed / total) * 100);
}

function mapAlertRow(
  item: typeof alerts.$inferSelect,
  studentMap: Map<string, typeof user.$inferSelect>,
  classMap: Map<string, typeof schoolClasses.$inferSelect>,
) {
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
}

function mapWhisperRow(item: typeof whisperReports.$inferSelect) {
  return {
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
  } satisfies WhisperReport;
}

function mapCounselingSessionRow(
  item: typeof counselingSessions.$inferSelect,
  studentName: string,
) {
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
    studentName,
    title: item.title,
    when: formatDateTime(item.scheduledAt),
  } satisfies CounselingSession;
}

function mapCounselingRequestRow(
  item: typeof counselingRequests.$inferSelect,
  studentName: string,
  className: string,
) {
  return {
    className,
    id: item.id,
    preferredSlot: item.preferredSlot,
    scheduledSessionId: item.scheduledSessionId ?? undefined,
    status: item.status as CounselingRequestStatus,
    studentId: item.studentUserId,
    studentName,
    submittedAt: formatDateTime(item.submittedAt),
    summary: item.summary,
    topic: item.topic,
  } satisfies CounselingRequest;
}

const getClassMap = cache(async () => {
  const rows = await db.select().from(schoolClasses);
  return new Map(rows.map((item) => [item.id, item]));
});

const getSchoolMap = cache(async () => {
  const rows = await db.select().from(schools);
  return new Map(rows.map((item) => [item.id, item]));
});

const getStudentUsers = cache(async () =>
  db.select().from(user).where(eq(user.role, "student")),
);

const getAllUsers = cache(async () =>
  db.select().from(user).orderBy(user.name),
);

const getOperationalStats = cache(async () => {
  const { end, start } = getJakartaDayRange();
  const [classRows, userRows, todayMoodRows, moodRows, alertRows] = await Promise.all([
    db.select().from(schoolClasses),
    db
      .select({
        classId: user.classId,
        id: user.id,
        role: user.role,
        schoolId: user.schoolId,
      })
      .from(user),
    db
      .select({
        userId: moodEntries.userId,
      })
      .from(moodEntries)
      .where(and(gte(moodEntries.recordedAt, start), lt(moodEntries.recordedAt, end))),
    db
      .select({
        recordedAt: moodEntries.recordedAt,
        score: moodEntries.score,
        userId: moodEntries.userId,
      })
      .from(moodEntries)
      .orderBy(desc(moodEntries.recordedAt)),
    db
      .select({
        severity: alerts.severity,
        status: alerts.status,
        studentUserId: alerts.studentUserId,
      })
      .from(alerts),
  ]);

  const classStudentCount = new Map<string, number>();
  const schoolStudentCount = new Map<string, number>();
  const schoolCounselorCount = new Map<string, number>();
  const schoolClassCount = new Map<string, number>();
  const classStudentIds = new Map<string, string[]>();
  const schoolStudentIds = new Map<string, string[]>();
  const todayCheckedInIds = new Set(todayMoodRows.map((item) => item.userId));
  const latestMoodByStudent = new Map<string, number>();
  const activeAlertByStudent = new Map(
    alertRows
      .filter((item) => item.status !== "Selesai")
      .map((item) => [item.studentUserId, item] as const),
  );

  for (const row of moodRows) {
    if (!latestMoodByStudent.has(row.userId)) {
      latestMoodByStudent.set(row.userId, row.score);
    }
  }

  for (const row of classRows) {
    addToCounter(schoolClassCount, row.schoolId);
  }

  for (const row of userRows) {
    if (row.role === "student") {
      addToCounter(classStudentCount, row.classId);
      addToCounter(schoolStudentCount, row.schoolId);

      if (row.classId) {
        const classIds = classStudentIds.get(row.classId) ?? [];
        classIds.push(row.id);
        classStudentIds.set(row.classId, classIds);
      }

      if (row.schoolId) {
        const schoolIds = schoolStudentIds.get(row.schoolId) ?? [];
        schoolIds.push(row.id);
        schoolStudentIds.set(row.schoolId, schoolIds);
      }
    }

    if (row.role === "counselor") {
      addToCounter(schoolCounselorCount, row.schoolId);
    }
  }

  const classCompletionRate = new Map<string, number>();
  const schoolCompletionRate = new Map<string, number>();
  const classRiskBand = new Map<string, AdminClass["riskBand"]>();

  for (const [classId, studentIds] of classStudentIds) {
    const checkedInToday = studentIds.filter((studentId) => todayCheckedInIds.has(studentId)).length;
    const hasHighAlert = studentIds.some(
      (studentId) => activeAlertByStudent.get(studentId)?.severity === "Tinggi",
    );
    const hasWarningSignal = studentIds.some((studentId) => {
      const alert = activeAlertByStudent.get(studentId);
      return Boolean(alert) || (latestMoodByStudent.get(studentId) ?? 5) <= 2;
    });

    classCompletionRate.set(classId, calculateRate(checkedInToday, studentIds.length));
    classRiskBand.set(
      classId,
      hasHighAlert ? "Perlu perhatian" : hasWarningSignal ? "Monitor" : "Stabil",
    );
  }

  for (const [schoolId, studentIds] of schoolStudentIds) {
    const checkedInToday = studentIds.filter((studentId) => todayCheckedInIds.has(studentId)).length;
    schoolCompletionRate.set(schoolId, calculateRate(checkedInToday, studentIds.length));
  }

  return {
    classCompletionRate,
    classRiskBand,
    classStudentCount,
    schoolClassCount,
    schoolCompletionRate,
    schoolCounselorCount,
    schoolStudentCount,
  };
});

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

  return alertRows.map((item) => mapAlertRow(item, studentMap, classMap));
}

async function getWhisperItems() {
  const rows = await db.select().from(whisperReports).orderBy(desc(whisperReports.submittedAt));
  return rows.map(mapWhisperRow);
}

async function getCounselingSessionItems() {
  const [sessionRows, users] = await Promise.all([
    db.select().from(counselingSessions).orderBy(desc(counselingSessions.scheduledAt)),
    getStudentUsers(),
  ]);
  const userMap = new Map(users.map((item) => [item.id, item]));

  return sessionRows.map((item) =>
    mapCounselingSessionRow(item, userMap.get(item.studentUserId)?.name ?? "Siswa"),
  );
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

    return mapCounselingRequestRow(
      item,
      student?.name ?? "Siswa",
      linkedClass?.name ?? "-",
    );
  });
}

export async function getStudentAccessState(userId: string): Promise<StudentAccessState> {
  const { end, start } = getJakartaDayRange();
  const entry = await db.query.moodEntries.findFirst({
    orderBy: (table, { desc: orderDesc }) => [orderDesc(table.recordedAt)],
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
  const uniqueKeys = Array.from(new Set(historyRows.map((item) => getJakartaDateKey(item.recordedAt))));

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
    completionRate: completionLabel(Math.round((activeKeys / 14) * 100)),
    name: student.name,
    streak,
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
  const rows = await db
    .select()
    .from(whisperReports)
    .where(eq(whisperReports.studentUserId, userId))
    .orderBy(desc(whisperReports.submittedAt));

  return rows.map(mapWhisperRow);
}

export async function getStudentWhisperReportById(userId: string, reportId: string) {
  const row = await db.query.whisperReports.findFirst({
    where: and(
      eq(whisperReports.id, reportId),
      eq(whisperReports.studentUserId, userId),
    ),
  });

  return row ? mapWhisperRow(row) : null;
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
  const [resourceRow, pointRows] = await Promise.all([
    db.query.resources.findFirst({
      where: eq(resources.id, resourceId),
    }),
    db
      .select()
      .from(resourcePoints)
      .where(eq(resourcePoints.resourceId, resourceId))
      .orderBy(resourcePoints.sortOrder),
  ]);

  if (!resourceRow) {
    return null;
  }

  return {
    category: resourceRow.category,
    id: resourceRow.id,
    points: pointRows.map((item) => item.content),
    readTime: resourceRow.readTime,
    summary: resourceRow.summary,
    title: resourceRow.title,
  } satisfies ResourceItem;
}

export async function getStudentCounselingSessions(userId: string) {
  const [rows, studentAccount] = await Promise.all([
    db
      .select()
      .from(counselingSessions)
      .where(eq(counselingSessions.studentUserId, userId))
      .orderBy(desc(counselingSessions.scheduledAt)),
    db.query.user.findFirst({
      where: eq(user.id, userId),
    }),
  ]);

  return rows.map((item) => mapCounselingSessionRow(item, studentAccount?.name ?? "Siswa"));
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
      .map((item) => [item.studentId, item] as const),
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
  const { end, start } = getJakartaDayRange();
  const [studentList, alertRows, reportRows] = await Promise.all([
    getCounselorStudents(),
    db.select().from(alerts),
    db.select().from(whisperReports),
  ]);

  return {
    activeAlerts: alertRows.filter((item) => item.status !== "Selesai").length,
    anonymousReports: reportRows.filter((item) => item.status !== "Selesai").length,
    monitoredStudents: studentList.length,
    reviewedToday: alertRows.filter(
      (item) =>
        item.status === "Sedang Ditinjau" &&
        item.lastUpdatedAt >= start &&
        item.lastUpdatedAt < end,
    ).length,
  };
}

export async function getAlerts() {
  return getAlertItems();
}

export async function getAlertById(alertId: string) {
  const [alertRow, studentRows, classMap] = await Promise.all([
    db.query.alerts.findFirst({
      where: eq(alerts.id, alertId),
    }),
    getStudentUsers(),
    getClassMap(),
  ]);

  if (!alertRow) {
    return null;
  }

  const studentMap = new Map(studentRows.map((item) => [item.id, item]));
  return mapAlertRow(alertRow, studentMap, classMap);
}

export async function getWhisperReports() {
  return getWhisperItems();
}

export async function getWhisperReportById(reportId: string) {
  const row = await db.query.whisperReports.findFirst({
    where: eq(whisperReports.id, reportId),
  });

  return row ? mapWhisperRow(row) : null;
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
  const row = await db.query.counselingSessions.findFirst({
    where: eq(counselingSessions.id, sessionId),
  });

  if (!row) {
    return null;
  }

  const studentAccount = await db.query.user.findFirst({
    where: eq(user.id, row.studentUserId),
  });

  return mapCounselingSessionRow(row, studentAccount?.name ?? "Siswa");
}

export async function getCounselingRequests() {
  return getCounselingRequestItems();
}

export async function getAdminUsers() {
  const [rows, schoolMap, classMap] = await Promise.all([
    getAllUsers(),
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
  const [rows, stats] = await Promise.all([
    db.select().from(schools).orderBy(schools.name),
    getOperationalStats(),
  ]);

  return rows.map((item) => ({
    classCount: stats.schoolClassCount.get(item.id) ?? 0,
    completion: completionLabel(stats.schoolCompletionRate.get(item.id) ?? 0),
    counselorCount: stats.schoolCounselorCount.get(item.id) ?? 0,
    id: item.id,
    name: item.name,
    principal: item.principal,
    studentCount: stats.schoolStudentCount.get(item.id) ?? 0,
  })) satisfies AdminSchool[];
}

export async function getAdminSchoolById(schoolId: string) {
  const items = await getAdminSchools();
  return items.find((item) => item.id === schoolId) ?? null;
}

export async function getAdminClasses() {
  const [rows, schoolMap, stats] = await Promise.all([
    db.select().from(schoolClasses).orderBy(schoolClasses.name),
    getSchoolMap(),
    getOperationalStats(),
  ]);

  return rows.map((item) => ({
    className: item.name,
    completion: completionLabel(stats.classCompletionRate.get(item.id) ?? 0),
    counselor: item.counselorName,
    homeroom: item.homeroomName,
    id: item.id,
    riskBand: stats.classRiskBand.get(item.id) ?? "Stabil",
    schoolId: item.schoolId,
    schoolName: schoolMap.get(item.schoolId)?.name ?? "-",
    studentCount: stats.classStudentCount.get(item.id) ?? 0,
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
  const row = await db.query.systemConfigs.findFirst({
    where: eq(systemConfigs.id, configId),
  });

  if (!row) {
    return null;
  }

  return {
    group: row.groupName,
    id: row.id,
    impact: row.impact,
    name: row.name,
    status: row.status,
    summary: row.summary,
    value: row.value,
  } satisfies AdminSystemConfig;
}
