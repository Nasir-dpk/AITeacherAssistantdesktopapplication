/**
 * Minimal client for the FastAPI backend.
 *
 * In development the Vite dev server proxies `/api/*` and `/health` to the
 * backend (see vite.config.ts), so no CORS setup is needed. For packaged
 * desktop builds set VITE_API_BASE_URL (see .env.example) — the backend
 * allows the Tauri WebView origin via CORS.
 */

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

export interface BackendHealth {
  status: string;
  app: string;
  version: string;
  environment: string;
  crew?: {
    initialized: boolean;
    agents: Array<string>;
    error?: string;
  };
}

export type HealthState = "checking" | "ok" | "error";

/** True when the frontend runs inside the Tauri desktop WebView. */
export function isTauriRuntime(): boolean {
  return (
    typeof window !== "undefined" &&
    ("__TAURI_INTERNALS__" in window || "__TAURI__" in window)
  );
}

/** Fetch the backend's /api/health endpoint. */
export async function fetchBackendHealth(
  signal?: AbortSignal,
): Promise<BackendHealth> {
  const response = await fetch(`${API_BASE_URL}/api/health`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Backend responded with HTTP ${response.status}`);
  }
  return (await response.json()) as BackendHealth;
}
