/**
 * Browser-side helpers → Next.js `/api/backend` proxy → FastAPI.
 */

const API_PREFIX = "/api/backend/api/v1";

export class ApiError extends Error {
  status: number;
  detail: unknown;

  constructor(status: number, message: string, detail?: unknown) {
    super(message);
    this.status = status;
    this.detail = detail;
    this.name = "ApiError";
  }
}

async function parseError(res: Response): Promise<{ message: string; detail: unknown }> {
  try {
    const data = (await res.json()) as { detail?: unknown; message?: string };
    const detail = data.detail;
    let message = data.message || res.statusText;
    if (typeof detail === "string") message = detail;
    else if (Array.isArray(detail) && detail[0]?.msg) message = String(detail[0].msg);
    return { message: message || "Request failed", detail };
  } catch {
    return { message: res.statusText || "Request failed", detail: null };
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_PREFIX}${path}`, {
    ...init,
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await parseError(res);
    throw new ApiError(res.status, err.message, err.detail);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_PREFIX}${path}`, {
    ...init,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await parseError(res);
    throw new ApiError(res.status, err.message, err.detail);
  }
  return res.json() as Promise<T>;
}
