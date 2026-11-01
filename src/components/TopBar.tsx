import type { HealthState } from "../api/client";
import type { NavItem } from "../data/navigation";
import StatusPill from "./StatusPill";

export interface TopBarProps {
  section: NavItem;
  backendState: HealthState;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

/** Application top bar: hamburger (mobile), title + current section, and the
 * provider/status placeholders (mock-only in Phase 02). */
export default function TopBar({ section, backendState, sidebarOpen, onToggleSidebar }: TopBarProps) {
  const backendText =
    backendState === "ok" ? "connected" : backendState === "checking" ? "checking…" : "unavailable";

  return (
    <header
      data-testid="topbar"
      className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur md:px-6"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
          aria-controls="primary-sidebar"
          aria-expanded={sidebarOpen}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-white md:text-lg">
            AI Teacher Assistant
          </h1>
          <p className="truncate text-xs text-slate-400" aria-live="polite">
            Current area: <span data-testid="current-area" className="font-medium text-sky-300">{section.label}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusPill
            state={backendState}
            label="Backend"
            text={backendText}
          />
          <StatusPill
            state="checking"
            label="AI provider"
            text="not configured"
          />
        </div>
      </div>
    </header>
  );
}
