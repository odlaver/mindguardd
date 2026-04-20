import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { getDb } from "../db/client";

export const auth = betterAuth({
  appName: "MindGuard",
  basePath: "/api/auth",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "mindguard-dev-secret-change-this-in-production",
  trustedOrigins: process.env.BETTER_AUTH_URL
    ? [process.env.BETTER_AUTH_URL]
    : undefined,
  database: drizzleAdapter(getDb(), {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: ["student", "counselor", "admin", "homeroom"],
        required: false,
        defaultValue: "student",
        input: false,
      },
      schoolId: {
        type: "string",
        required: false,
        input: false,
      },
      classId: {
        type: "string",
        required: false,
        input: false,
      },
      studentCode: {
        type: "string",
        required: false,
        input: false,
      },
      lastAccessAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type AuthUser = Session["user"];
