import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { user } from "@/db/schema";
import { getDb } from "@/db/client";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await getDb()
    .update(user)
    .set({
      lastAccessAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({ ok: true });
}
