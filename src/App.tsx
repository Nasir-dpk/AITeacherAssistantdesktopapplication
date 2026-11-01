import { useEffect, useState } from "react";
import {
  fetchBackendHealth,
  type BackendHealth,
  type HealthState,
} from "./api/client";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardPage from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import { NAV_ITEMS, type SectionId } from "./data/navigation";

const DEFAULT_SECTION: SectionId = "dashboard";

/** Application shell: sidebar navigation + top bar + active page.
 * The Phase 01 backend health check is preserved and surfaced in the top bar. */
export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(DEFAULT_SECTION);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [backendState, setBackendState] = useState<HealthState>("checking");
  const [, setHealth] = useState<BackendHealth | null>(null);

  const currentSection =
    NAV_ITEMS.find((item) => item.id === activeSection) ?? NAV_ITEMS[0];

  useEffect(() => {
    const controller = new AbortController();
    setBackendState("checking");
    fetchBackendHealth(controller.signal)
      .then((payload) => {
        setHealth(payload);
        setBackendState("ok");
      })
      .catch(() => {
        if (!controller.signal.aborted) setBackendState("error");
      });
    return () => controller.abort();
  }, []);

  const handleNavigate = (id: SectionId) => {
    setActiveSection(id);
    setMobileNavOpen(false);
  };

  return (
    <div className="flex h-full" id="app-shell">
      {/* Mobile scrim */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/60 md:hidden" aria-hidden="true" onClick={() => setMobileNavOpen(false)} />
      )}

      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        mobileOpen={mobileNavOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          section={currentSection}
          backendState={backendState}
          sidebarOpen={mobileNavOpen}
          onToggleSidebar={() => setMobileNavOpen((v) => !v)}
        />

        <main className="h-full flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,#12233a_0%,#0b1220_65%)] p-4 md:p-8">
          {activeSection === "dashboard" ? (
            <DashboardPage backendState={backendState} />
          ) : (
            <PlaceholderPage section={currentSection} />
          )}
        </main>
      </div>
    </div>
  );
}
