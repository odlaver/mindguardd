import { eq } from "drizzle-orm";
import { config } from "dotenv";

config({ path: ".env" });
config({ override: true, path: ".env.local" });

const defaultPassword = "Mindguard123!";
const monthLookup: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  Mei: 4,
  Jun: 5,
  Jul: 6,
  Agu: 7,
  Sep: 8,
  Okt: 9,
  Nov: 10,
  Des: 11,
};

const seedUsers = [
  {
    key: "student-raka",
    name: "Raka Pratama",
    email: "raka.pratama@mindguard.id",
    role: "student" as const,
    schoolId: "sch-001",
    classId: "cls-001",
    studentCode: "20261102",
    lastAccessAt: "2026-04-16T08:10:00+07:00",
  },
  {
    key: "student-nabila",
    name: "Nabila Rahma",
    email: "nabila.rahma@mindguard.id",
    role: "student" as const,
    schoolId: "sch-002",
    classId: "cls-002",
    studentCode: "20261011",
    lastAccessAt: "2026-04-15T13:20:00+07:00",
  },
  {
    key: "student-rafael",
    name: "Rafael Adi",
    email: "rafael.adi@mindguard.id",
    role: "student" as const,
    schoolId: "sch-001",
    classId: "cls-003",
    studentCode: "20261101",
    lastAccessAt: "2026-04-14T15:20:00+07:00",
  },
  {
    key: "student-nadia",
    name: "Nadia Putri",
    email: "nadia.putri@mindguard.id",
    role: "student" as const,
    schoolId: "sch-002",
    classId: "cls-002",
    studentCode: "20261014",
    lastAccessAt: null,
  },
  {
    key: "student-dinda",
    name: "Dinda Ayu",
    email: "dinda.ayu@mindguard.id",
    role: "student" as const,
    schoolId: "sch-001",
    classId: "cls-004",
    studentCode: "20261027",
    lastAccessAt: "2026-04-15T07:50:00+07:00",
  },
  {
    key: "student-bagas",
    name: "Bagas Nugroho",
    email: "bagas.nugroho@mindguard.id",
    role: "student" as const,
    schoolId: "sch-002",
    classId: "cls-005",
    studentCode: "20259003",
    lastAccessAt: "2026-04-15T08:02:00+07:00",
  },
  {
    key: "student-salma",
    name: "Salma Kirana",
    email: "salma.kirana@mindguard.id",
    role: "student" as const,
    schoolId: "sch-003",
    classId: "cls-006",
    studentCode: "20261119",
    lastAccessAt: "2026-04-15T09:14:00+07:00",
  },
  {
    key: "counselor-sinta",
    name: "Bu Sinta",
    email: "sinta.bk@mindguard.id",
    role: "counselor" as const,
    schoolId: "sch-001",
    classId: undefined,
    studentCode: undefined,
    lastAccessAt: "2026-04-16T07:45:00+07:00",
  },
  {
    key: "counselor-maya",
    name: "Bu Maya",
    email: "maya.bk@mindguard.id",
    role: "counselor" as const,
    schoolId: "sch-002",
    classId: undefined,
    studentCode: undefined,
    lastAccessAt: "2026-04-15T16:05:00+07:00",
  },
  {
    key: "admin",
    name: "Admin Sekolah Pusat",
    email: "admin@mindguard.id",
    role: "admin" as const,
    schoolId: "sch-001",
    classId: undefined,
    studentCode: undefined,
    lastAccessAt: "2026-04-16T09:00:00+07:00",
  },
  {
    key: "homeroom-adi",
    name: "Pak Adi",
    email: "adi.wali@mindguard.id",
    role: "homeroom" as const,
    schoolId: "sch-001",
    classId: "cls-001",
    studentCode: undefined,
    lastAccessAt: "2026-04-15T15:22:00+07:00",
  },
  {
    key: "homeroom-rina",
    name: "Bu Rina",
    email: "rina.wali@mindguard.id",
    role: "homeroom" as const,
    schoolId: "sch-002",
    classId: "cls-002",
    studentCode: undefined,
    lastAccessAt: "2026-04-15T10:10:00+07:00",
  },
  {
    key: "homeroom-yudi",
    name: "Pak Yudi",
    email: "yudi.wali@mindguard.id",
    role: "homeroom" as const,
    schoolId: "sch-001",
    classId: "cls-003",
    studentCode: undefined,
    lastAccessAt: "2026-04-15T08:30:00+07:00",
  },
  {
    key: "homeroom-laras",
    name: "Bu Laras",
    email: "laras.wali@mindguard.id",
    role: "homeroom" as const,
    schoolId: "sch-001",
    classId: "cls-004",
    studentCode: undefined,
    lastAccessAt: "2026-04-15T07:20:00+07:00",
  },
  {
    key: "homeroom-bimo",
    name: "Pak Bimo",
    email: "bimo.wali@mindguard.id",
    role: "homeroom" as const,
    schoolId: "sch-002",
    classId: "cls-005",
    studentCode: undefined,
    lastAccessAt: "2026-04-15T07:35:00+07:00",
  },
  {
    key: "homeroom-dina",
    name: "Bu Dina",
    email: "dina.wali@mindguard.id",
    role: "homeroom" as const,
    schoolId: "sch-003",
    classId: "cls-006",
    studentCode: undefined,
    lastAccessAt: "2026-04-15T08:05:00+07:00",
  },
] as const;

const studentNameById: Record<string, string> = {
  "raka-pratama": "Raka Pratama",
  "nabila-rahma": "Nabila Rahma",
  "rafael-adi": "Rafael Adi",
  "dinda-ayu": "Dinda Ayu",
  "bagas-nugroho": "Bagas Nugroho",
  "salma-kirana": "Salma Kirana",
};

function parseDateLabel(value: string) {
  const normalized = value.trim();
  const dateTimeMatch = normalized.match(
    /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})(?:, (\d{2})\.(\d{2}))?$/,
  );

  if (!dateTimeMatch) {
    throw new Error(`Unsupported localized date label: ${value}`);
  }

  const [, day, month, year, hour = "09", minute = "00"] = dateTimeMatch;
  return new Date(
    `${year}-${String(monthLookup[month] + 1).padStart(2, "0")}-${day.padStart(2, "0")}T${hour}:${minute}:00+07:00`,
  );
}

function parseShortMoodDate(value: string, offset: number) {
  const [day, month] = value.split(" ");
  const monthIndex = monthLookup[month];

  return new Date(
    Date.UTC(2026, monthIndex, Number(day), 1 + (offset % 5), 0, 0),
  );
}

async function ensureUser(
  definition: (typeof seedUsers)[number],
  options: {
    auth: Awaited<typeof import("../src/lib/auth")>["auth"];
    db: ReturnType<Awaited<typeof import("../src/db/client")>["getDb"]>;
    user: Awaited<typeof import("../src/db/schema")>["user"];
  },
) {
  const { auth, db, user } = options;
  let existing = await db.query.user.findFirst({
    where: eq(user.email, definition.email),
  });

  if (!existing) {
    await auth.api.signUpEmail({
      body: {
        email: definition.email,
        name: definition.name,
        password: defaultPassword,
      },
    });

    existing = await db.query.user.findFirst({
      where: eq(user.email, definition.email),
    });
  }

  if (!existing) {
    throw new Error(`Failed to create user ${definition.email}`);
  }

  await db
    .update(user)
    .set({
      role: definition.role,
      schoolId: definition.schoolId,
      classId: definition.classId ?? null,
      studentCode: definition.studentCode ?? null,
      lastAccessAt: definition.lastAccessAt ? new Date(definition.lastAccessAt) : null,
    })
    .where(eq(user.id, existing.id));

  return {
    ...existing,
    role: definition.role,
    schoolId: definition.schoolId,
    classId: definition.classId ?? null,
    studentCode: definition.studentCode ?? null,
  };
}

async function main() {
  const [
    { auth },
    { databaseUrl, getDb },
    {
      account,
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
    },
    {
      adminClasses,
      adminSchools,
      adminSystemConfigs,
      alerts: alertSeed,
      counselingRequests: counselingRequestSeed,
      counselingSessions: counselingSessionSeed,
      counselorStudents,
      resources: resourceSeed,
      studentInterventions: interventionSeed,
      whisperReports: whisperReportSeed,
    },
  ] = await Promise.all([
    import("../src/lib/auth"),
    import("../src/db/client"),
    import("../src/db/schema"),
    import("../src/lib/mock-data"),
  ]);

  const db = getDb();
  console.log(`Seeding database URL: ${databaseUrl}`);

  const users = await Promise.all(
    seedUsers.map((item) =>
      ensureUser(item, {
        auth,
        db,
        user,
      }),
    ),
  );
  const userByName = new Map(users.map((item) => [item.name, item]));
  const getStudentName = (studentId: string) => {
    const studentName = studentNameById[studentId];

    if (!studentName) {
      throw new Error(`Missing student name mapping for ${studentId}`);
    }

    return studentName;
  };

  await db
    .insert(schools)
    .values(
      adminSchools.map((item) => ({
        id: item.id,
        name: item.name,
        principal: item.principal,
        counselorCount: item.counselorCount,
        studentCount: item.studentCount,
        classCount: item.classCount,
        completionRate: Number.parseInt(item.completion, 10),
      })),
    )
    .onConflictDoNothing();

  await db
    .insert(schoolClasses)
    .values(
      adminClasses.map((item) => ({
        id: item.id,
        schoolId: item.schoolId,
        name: item.className,
        homeroomName: item.homeroom,
        counselorName: item.counselor,
        studentCount: item.studentCount,
        completionRate: Number.parseInt(item.completion, 10),
        riskBand: item.riskBand,
      })),
    )
    .onConflictDoNothing();

  const moodRows = counselorStudents.flatMap((student) => {
    const studentUser = userByName.get(student.name);

    if (!studentUser) {
      throw new Error(`Missing mood user for ${student.name}`);
    }

    return student.moodHistory.map((point, index) => ({
      id: `mood-${studentUser.id}-${point.date.replace(/\s+/g, "-").toLowerCase()}`,
      userId: studentUser.id,
      score: point.score,
      note: point.note ?? null,
      recordedAt: parseShortMoodDate(point.date, index),
    }));
  });

  await db.insert(moodEntries).values(moodRows).onConflictDoNothing();

  await db
    .insert(alerts)
    .values(
      alertSeed.map((item) => {
        const studentUser = userByName.get(item.student);

        if (!studentUser) {
          throw new Error(`Missing alert user for ${item.student}`);
        }

        return {
          id: item.id,
          studentUserId: studentUser.id,
          reason: item.reason,
          severity: item.severity,
          status: item.status,
          lastUpdatedAt: parseDateLabel(item.lastUpdated),
          summary: item.summary,
          recommendation: item.recommendation,
        };
      }),
    )
    .onConflictDoNothing();

  await db
    .insert(whisperReports)
    .values(
      whisperReportSeed.map((item) => ({
        id: item.id,
        studentUserId: item.studentId
          ? (userByName.get(item.ownerLabel.replace(/^Anonim /, ""))?.id ??
            userByName.get(getStudentName(item.studentId))?.id ??
            null)
          : null,
        ownerLabel: item.ownerLabel,
        title: item.title,
        category: item.category,
        urgency: item.urgency,
        status: item.status ?? "Sedang Ditinjau",
        submittedAt: parseDateLabel(item.submittedAt),
        excerpt: item.excerpt,
        detail: item.detail,
        nextStep: item.nextStep,
        assignedTo: item.assignedTo,
      })),
    )
    .onConflictDoNothing();

  await db
    .insert(studentInterventions)
    .values(
      interventionSeed.map((item, index) => {
        const studentName = getStudentName(item.studentId);
        const studentUser = userByName.get(studentName);

        if (!studentUser) {
          throw new Error(`Missing intervention user for ${studentName}`);
        }

        return {
          id: `int-${index + 1}`,
          studentUserId: studentUser.id,
          title: item.title,
          owner: item.owner,
          status: item.status,
          whenLabel: item.when,
        };
      }),
    )
    .onConflictDoNothing();

  await db
    .insert(resources)
    .values(
      resourceSeed.map((item) => ({
        id: item.id,
        category: item.category,
        title: item.title,
        readTime: item.readTime,
        summary: item.summary,
      })),
    )
    .onConflictDoNothing();

  await db
    .insert(resourcePoints)
    .values(
      resourceSeed.flatMap((item) =>
        item.points.map((point, index) => ({
          id: `${item.id}-point-${index + 1}`,
          resourceId: item.id,
          sortOrder: index + 1,
          content: point,
        })),
      ),
    )
    .onConflictDoNothing();

  await db
    .insert(counselingRequests)
    .values(
      counselingRequestSeed.map((item) => {
        const studentUser = userByName.get(item.studentName);

        if (!studentUser) {
          throw new Error(`Missing counseling request user for ${item.studentName}`);
        }

        return {
          id: item.id,
          studentUserId: studentUser.id,
          topic: item.topic,
          preferredSlot: item.preferredSlot,
          summary: item.summary,
          status: item.status,
          submittedAt: parseDateLabel(item.submittedAt),
          scheduledSessionId: null,
        };
      }),
    )
    .onConflictDoNothing();

  await db
    .insert(counselingSessions)
    .values(
      counselingSessionSeed.map((item) => {
        const studentUser = userByName.get(item.studentName);
        const counselorUser = userByName.get(item.counselor);

        if (!studentUser) {
          throw new Error(`Missing counseling session user for ${item.studentName}`);
        }

        return {
          id: item.id,
          requestId: item.requestId ?? null,
          studentUserId: studentUser.id,
          counselorUserId: counselorUser?.id ?? null,
          title: item.title,
          counselorName: item.counselor,
          scheduledAt: parseDateLabel(item.when),
          format: item.format,
          location: item.location,
          status: item.status,
          invitationStatus: item.invitationStatus,
          focus: item.focus,
          note: item.note,
          outcome: item.outcome ?? null,
          followUp: item.followUp ?? null,
          studentConfirmationNote: item.studentConfirmationNote ?? null,
          studentCompletionNote: item.studentCompletionNote ?? null,
        };
      }),
    )
    .onConflictDoNothing();

  for (const item of counselingRequestSeed) {
    if (!item.scheduledSessionId) {
      continue;
    }

    await db
      .update(counselingRequests)
      .set({
        scheduledSessionId: item.scheduledSessionId,
      })
      .where(eq(counselingRequests.id, item.id));
  }

  await db
    .insert(systemConfigs)
    .values(
      adminSystemConfigs.map((item) => ({
        id: item.id,
        name: item.name,
        groupName: item.group,
        value: item.value,
        status: item.status,
        summary: item.summary,
        impact: item.impact,
      })),
    )
    .onConflictDoNothing();

  const [userCountRow, accountCountRow] = await Promise.all([
    db.$count(user),
    db.$count(account),
  ]);

  console.log("Database seeded.");
  console.log(`Seeded users: ${userCountRow}`);
  console.log(`Seeded accounts: ${accountCountRow}`);
  console.log(`Demo password for seeded accounts: ${defaultPassword}`);
}

void main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
