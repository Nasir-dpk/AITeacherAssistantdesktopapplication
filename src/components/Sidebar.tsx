import { NAV_ITEMS, type SectionId } from "../data/navigation";

export interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  /** Mobile drawer state; on md+ the sidebar is always visible. */
  mobileOpen: boolean;
}

/** Primary navigation. Purely keyboard-friendly: regular <button> elements,
 * visible focus rings, and aria-current for the active section. */
export default function Sidebar({ activeSection, onNavigate, mobileOpen }: SidebarProps) {
  return (
    <aside
      id="primary-sidebar"
      aria-label="Primary navigation"
      data-testid="sidebar"
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-900/95 backdrop-blur transition-transform duration-200 md:relative md:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-2 px-5 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 text-lg font-bold text-white" aria-hidden="true">
          A
        </span>
        <span className="text-sm font-semibold text-white">AI Teacher</span>
      </div>

      <nav aria-label="Sections" className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = item.id === activeSection;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    active
                      ? "bg-sky-500/15 font-semibold text-white ring-1 ring-inset ring-sky-500/40"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <span className={`shrink-0 ${active ? "text-sky-300" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="px-5 py-3 text-[11px] leading-snug text-slate-500">
        Local mock data · no AI providers connected
      </p>
    </aside>
  );
}
