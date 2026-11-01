import { useState } from "react";
import type { HealthState } from "../api/client";
import StatusPill from "../components/StatusPill";
import { FEATURE_CARDS, RECENT_PROJECTS } from "../data/navigation";

const statusBadge = {
  Draft: "bg-slate-700/60 text-slate-300",
  Ready: "bg-emerald-500/15 text-emerald-300",
  Scheduled: "bg-sky-500/15 text-sky-300",
} as const;

export interface DashboardPageProps {
  backendState: HealthState;
}

/** Dashboard — Phase 02 foundation. All data is local/mock. */
export default function DashboardPage({ backendState }: DashboardPageProps) {
  const [newLessonNote, setNewLessonNote] = useState(false);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Welcome section */}
      <section aria-labelledby="welcome-heading" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
              Phase 02 · Dashboard foundation
            </p>
            <h2 id="welcome-heading" className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Welcome back, teacher 👋
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              This is your workspace for building lessons end-to-end — from
              raw inputs to slides, activities, and assessments. The interface
              below uses local mock data; content generation connects in later
              phases.
            </p>
          </div>
          <button
            type="button"
            data-testid="new-lesson-button"
            onClick={() => setNewLessonNote((v) => !v)}
            aria-describedby="new-lesson-note"
            className="shrink-0 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            + New Lesson
          </button>
        </div>
        <p
          id="new-lesson-note"
          data-testid="new-lesson-note"
          aria-live="polite"
          className={`mt-4 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200 ${
            newLessonNote ? "" : "hidden"
          }`}
        >
          Mock action — the lesson creation flow arrives with the Input Center
          (Phase 03). Nothing was sent to any backend.
        </p>
      </section>

      {/* Recent projects */}
      <section aria-labelledby="recent-projects-heading">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 id="recent-projects-heading" className="text-lg font-semibold text-white">
            Recent projects
          </h3>
          <span className="text-xs text-slate-500">Mock data</span>
        </div>
        <ul data-testid="recent-projects" className="grid gap-3 sm:grid-cols-2">
          {RECENT_PROJECTS.map((project) => (
            <li
              key={project.title}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-600"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{project.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {project.subject} · {project.grade} · {project.updated}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusBadge[project.status]}`}>
                  {project.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Feature cards */}
      <section aria-labelledby="feature-cards-heading">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 id="feature-cards-heading" className="text-lg font-semibold text-white">
            Explore features
          </h3>
          <span className="text-xs text-slate-500">Roadmap placeholders</span>
        </div>
        <ul data-testid="feature-cards" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-600"
            >
              <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${feature.accentClasses}`}>
                {feature.badge}
              </span>
              <p className="mt-3 font-medium text-white">{feature.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Backend status (Phase 01 verification preserved) */}
      <section aria-labelledby="backend-status-heading" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 id="backend-status-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          System status
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusPill
            state={backendState}
            label="FastAPI"
            text={backendState === "ok" ? "reachable" : backendState === "checking" ? "checking…" : "unreachable"}
          />
          <StatusPill state="checking" label="CrewAI crew" text="ready in backend" />
          <StatusPill state="checking" label="AI provider" text="not configured" />
        </div>
      </section>
    </div>
  );
}
