import { relations, sql } from "drizzle-orm";
import type { AnySQLiteColumn } from "drizzle-orm/sqlite-core";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { account, session, user, verification } from "./auth-schema";

export const schools = sqliteTable("school", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  principal: text("principal").notNull(),
  counselorCount: integer("counselor_count").default(0).notNull(),
  studentCount: integer("student_count").default(0).notNull(),
  classCount: integer("class_count").default(0).notNull(),
  completionRate: integer("completion_rate").default(0).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
});

export const schoolClasses = sqliteTable(
  "school_class",
  {
    id: text("id").primaryKey(),
    schoolId: text("school_id")
      .notNull()
      .references(() => schools.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    homeroomName: text("homeroom_name").notNull(),
    counselorName: text("counselor_name").notNull(),
    studentCount: integer("student_count").default(0).notNull(),
    completionRate: integer("completion_rate").default(0).notNull(),
    riskBand: text("risk_band", {
      enum: ["Stabil", "Monitor", "Perlu perhatian"],
    }).notNull(),
  },
  (table) => [index("school_class_school_id_idx").on(table.schoolId)],
);

export const moodEntries = sqliteTable(
  "mood_entry",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    note: text("note"),
    recordedAt: integer("recorded_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [index("mood_entry_user_id_recorded_at_idx").on(table.userId, table.recordedAt)],
);

export const alerts = sqliteTable(
  "alert",
  {
    id: text("id").primaryKey(),
    studentUserId: text("student_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    reason: text("reason").notNull(),
    severity: text("severity", { enum: ["Tinggi", "Sedang"] }).notNull(),
    status: text("status", {
      enum: ["Baru", "Sedang Ditinjau", "Selesai"],
    }).notNull(),
    lastUpdatedAt: integer("last_updated_at", { mode: "timestamp_ms" }).notNull(),
    summary: text("summary").notNull(),
    recommendation: text("recommendation").notNull(),
  },
  (table) => [index("alert_student_user_id_idx").on(table.studentUserId)],
);

export const whisperReports = sqliteTable(
  "whisper_report",
  {
    id: text("id").primaryKey(),
    studentUserId: text("student_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    ownerLabel: text("owner_label").notNull(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    urgency: text("urgency", { enum: ["Tinggi", "Normal"] }).notNull(),
    status: text("status", {
      enum: ["Baru", "Sedang Ditinjau", "Selesai"],
    }).default("Sedang Ditinjau"),
    submittedAt: integer("submitted_at", { mode: "timestamp_ms" }).notNull(),
    excerpt: text("excerpt").notNull(),
    detail: text("detail").notNull(),
    nextStep: text("next_step").notNull(),
    assignedTo: text("assigned_to").notNull(),
  },
  (table) => [index("whisper_report_student_user_id_idx").on(table.studentUserId)],
);

export const studentInterventions = sqliteTable(
  "student_intervention",
  {
    id: text("id").primaryKey(),
    studentUserId: text("student_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    owner: text("owner").notNull(),
    status: text("status", {
      enum: ["Baru", "Sedang Ditinjau", "Selesai"],
    }).notNull(),
    whenLabel: text("when_label").notNull(),
  },
  (table) => [index("student_intervention_student_user_id_idx").on(table.studentUserId)],
);

export const resources = sqliteTable("resource", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  readTime: text("read_time").notNull(),
  summary: text("summary").notNull(),
});

export const resourcePoints = sqliteTable(
  "resource_point",
  {
    id: text("id").primaryKey(),
    resourceId: text("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull(),
    content: text("content").notNull(),
  },
  (table) => [index("resource_point_resource_id_sort_order_idx").on(table.resourceId, table.sortOrder)],
);

export const counselingSessions = sqliteTable(
  "counseling_session",
  {
    id: text("id").primaryKey(),
    requestId: text("request_id").references((): AnySQLiteColumn => counselingRequests.id, {
      onDelete: "set null",
    }),
    studentUserId: text("student_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    counselorUserId: text("counselor_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    counselorName: text("counselor_name").notNull(),
    scheduledAt: integer("scheduled_at", { mode: "timestamp_ms" }).notNull(),
    format: text("format", { enum: ["Tatap muka", "Online"] }).notNull(),
    location: text("location").notNull(),
    status: text("status", {
      enum: ["Menunggu Konfirmasi", "Dikonfirmasi", "Selesai"],
    }).notNull(),
    invitationStatus: text("invitation_status", {
      enum: ["Menunggu Konfirmasi", "Dikonfirmasi", "Selesai"],
    }).notNull(),
    focus: text("focus").notNull(),
    note: text("note").notNull(),
    outcome: text("outcome"),
    followUp: text("follow_up"),
    studentConfirmationNote: text("student_confirmation_note"),
    studentCompletionNote: text("student_completion_note"),
  },
  (table) => [index("counseling_session_student_user_id_idx").on(table.studentUserId)],
);

export const counselingRequests = sqliteTable(
  "counseling_request",
  {
    id: text("id").primaryKey(),
    studentUserId: text("student_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    topic: text("topic").notNull(),
    preferredSlot: text("preferred_slot").notNull(),
    summary: text("summary").notNull(),
    status: text("status", {
      enum: ["Baru", "Dijadwalkan", "Selesai"],
    }).notNull(),
    submittedAt: integer("submitted_at", { mode: "timestamp_ms" }).notNull(),
    scheduledSessionId: text("scheduled_session_id").references(
      (): AnySQLiteColumn => counselingSessions.id,
      {
        onDelete: "set null",
      },
    ),
  },
  (table) => [index("counseling_request_student_user_id_idx").on(table.studentUserId)],
);

export const systemConfigs = sqliteTable("system_config", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  groupName: text("group_name").notNull(),
  value: text("value").notNull(),
  status: text("status", { enum: ["Aktif", "Tertunda"] }).notNull(),
  summary: text("summary").notNull(),
  impact: text("impact").notNull(),
});

export const schoolRelations = relations(schools, ({ many }) => ({
  classes: many(schoolClasses),
}));

export const schoolClassRelations = relations(schoolClasses, ({ one }) => ({
  school: one(schools, {
    fields: [schoolClasses.schoolId],
    references: [schools.id],
  }),
}));

export const moodEntryRelations = relations(moodEntries, ({ one }) => ({
  user: one(user, {
    fields: [moodEntries.userId],
    references: [user.id],
  }),
}));

export const alertRelations = relations(alerts, ({ one }) => ({
  student: one(user, {
    fields: [alerts.studentUserId],
    references: [user.id],
  }),
}));

export const whisperReportRelations = relations(whisperReports, ({ one }) => ({
  student: one(user, {
    fields: [whisperReports.studentUserId],
    references: [user.id],
  }),
}));

export const resourceRelations = relations(resources, ({ many }) => ({
  points: many(resourcePoints),
}));

export const resourcePointRelations = relations(resourcePoints, ({ one }) => ({
  resource: one(resources, {
    fields: [resourcePoints.resourceId],
    references: [resources.id],
  }),
}));

export const counselingSessionRelations = relations(
  counselingSessions,
  ({ one }) => ({
    student: one(user, {
      fields: [counselingSessions.studentUserId],
      references: [user.id],
    }),
    counselor: one(user, {
      fields: [counselingSessions.counselorUserId],
      references: [user.id],
    }),
  }),
);

export const counselingRequestRelations = relations(
  counselingRequests,
  ({ one }) => ({
    student: one(user, {
      fields: [counselingRequests.studentUserId],
      references: [user.id],
    }),
  }),
);

export {
  account,
  session,
  user,
  verification,
};
