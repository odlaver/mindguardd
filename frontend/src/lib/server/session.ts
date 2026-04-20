import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getRoleHomePath } from "@/lib/role-home-path";

export type AppRole = "admin" | "counselor" | "homeroom" | "student";

export async function getSessionOrNull() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getSessionOrNull();

  if (!session) {
    redirect("/");
  }

  return session;
}

export async function requireRole(allowed: AppRole | AppRole[]) {
  const session = await requireSession();
  const roles = Array.isArray(allowed) ? allowed : [allowed];
  const role = session.user.role as AppRole | undefined;

  if (!role || !roles.includes(role)) {
    redirect(getRoleHomePath(role));
  }

  return session;
}
