import type { HealthState } from "../api/client";

/* Shared status pill, extracted from Phase 01's App and reused in the
 * Phase 02 top bar and dashboard. */

const pillStyles: Record<HealthState, string> = {
  checking: "bg-amber-500/10 text-amber-300 ring-amber-500/40",
  ok: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/40",
  error: "bg-rose-500/10 text-rose-300 ring-rose-500/40",
};

const dotStyles: Record<HealthState, string> = {
  checking: "bg-amber-400",
  ok: "bg-emerald-400",
  error: "bg-rose-400",
};

export interface StatusPillProps {
  state: HealthState;
  /** Accessible label for the pill ("Backend", "API provider", …). */
  label: string;
  /** Text shown next to the label ("connected", "checking…", "unavailable"). */
  text: string;
}

export default function StatusPill({ state, label, text }: StatusPillProps) {
  return (
    <span
      data-testid={`status-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      aria-label={`${label}: ${text}`}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ${pillStyles[state]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotStyles[state]}`} aria-hidden="true" />
      <span className="whitespace-nowrap">
        <span className="font-semibold">{label}</span> · {text}
      </span>
    </span>
  );
}
