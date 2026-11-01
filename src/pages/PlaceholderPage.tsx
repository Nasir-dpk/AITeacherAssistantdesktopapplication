import type { NavItem } from "../data/navigation";

/** Generic placeholder panel for sections that arrive in later phases. */
export default function PlaceholderPage({ section }: { section: NavItem }) {
  return (
    <div className="mx-auto grid max-w-5xl place-items-center px-4 py-16 text-center">
      <div
        data-testid="placeholder-panel"
        className="w-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/30">
          {section.icon}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-white">{section.label}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          This section is planned for <span className="font-semibold text-sky-300">{section.phase}</span>. The
          navigation is wired up now; functionality ships with its phase.
        </p>
      </div>
    </div>
  );
}
