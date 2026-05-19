import { NextResponse } from "next/server";

export function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export function invalidPayload() {
  return jsonError("Isi form belum sesuai. Periksa kolom wajib dan batas karakter.", 400);
}

export function unauthorized() {
  return jsonError("Unauthorized", 401);
}

export function jsonOk<T extends Record<string, unknown>>(body: T) {
  return NextResponse.json(body);
}
