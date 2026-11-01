import { useEffect, useState } from "react";
import {
  fetchBackendHealth,
  type BackendHealth,
  type HealthState,
  isTauriRuntime,
} from "./api/client";

/** Status pill shared by the desktop-shell and backend indicators. */
function StatusPill({ state, label }: { state: HealthState; label: string }) {
  const styles: Record<HealthState, string> = {
    checking: "bg-amber-500/10 text-amber-300 ring-amber-500/40",
    ok: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/40",
    error: "bg-rose-500/10 text-rose-300 ring-rose-500/40",
  };
  const dot: Record<HealthState, string> = {
    checking: "bg-amber-400",
    ok: "bg-emerald-400",
    error: "bg-rose-400",
  };
  return (
    <span
      data-testid={`status-${label}`}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ring-1 ${styles[state]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot[state]}`} />
      {label === "backend" ? "Backend" : "Desktop shell"}:{" "}
      {state === "ok" ? "connected" : state === "checking" ? "checking…" : "unavailable"}
    </span>
  );
}

export default function App() {
  const [backendState, setBackendState] = useState<HealthState>("checking");
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const desktop = isTauriRuntime();

  useEffect(() => {
    const controller = new AbortController();
    setBackendState("checking");
    fetchBackendHealth(controller.signal)
      .then((payload) => {
        setHealth(payload);
        setBackendState("ok");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setBackendError(error instanceof Error ? error.message : "Unknown error");
        setBackendState("error");
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_top,#1e3a5f_0%,#0b1220_60%)] px-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <span className="rounded-md bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300 ring-1 ring-sky-500/40">
          Phase 01 · Foundation
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          AI Teacher Assistant
        </h1>
        <p className="max-w-xl text-base text-slate-300">
          Desktop application shell (Tauri 2 + React + TypeScript + Tailwind CSS)
          with a FastAPI + CrewAI backend. This is the Phase 01 placeholder
          screen.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <StatusPill
          state={desktop ? "ok" : "checking"}
          label="shell"
        />
        <StatusPill state={backendState} label="backend" />
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 rounded-xl border border-slate-700/60 bg-slate-900/60 p-6 text-left sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Runtime
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>UI: React 19 + TypeScript</li>
            <li>Styles: Tailwind CSS 4</li>
            <li>Shell: {desktop ? "Tauri 2 desktop window" : "Web browser (dev server)"}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Backend
          </h2>
          {backendState === "ok" && health ? (
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>API: {health.app} v{health.version}</li>
              <li>Environment: {health.environment}</li>
              <li>
                CrewAI:{" "}
                {health.crew?.initialized
                  ? `initialized (${health.crew.agents.length} agent)`
                  : "not initialized"}
              </li>
            </ul>
          ) : (
            <p className="mt-2 text-sm text-rose-300">
              {backendError
                ? `Cannot reach FastAPI: ${backendError}`
                : "Waiting for /api/health…"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
