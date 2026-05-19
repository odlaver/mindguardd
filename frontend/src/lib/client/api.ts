type ApiErrorPayload = {
  error?: string;
};

export type ApiResult<T> =
  | {
      data: T;
      ok: true;
    }
  | {
      error: string;
      ok: false;
      status?: number;
    };

export async function sendJson<T>(
  input: RequestInfo | URL,
  init: RequestInit,
  fallbackError: string,
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
    const payload = (await response.json().catch(() => null)) as
      | (ApiErrorPayload & T)
      | null;

    if (!response.ok) {
      return {
        error: payload?.error ?? fallbackError,
        ok: false,
        status: response.status,
      };
    }

    return {
      data: payload as T,
      ok: true,
    };
  } catch {
    return {
      error: "Koneksi bermasalah. Coba lagi sebentar.",
      ok: false,
    };
  }
}
