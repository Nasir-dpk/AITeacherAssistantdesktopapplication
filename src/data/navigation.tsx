/**
 * Local, mock-only UI data for the Phase 02 dashboard foundation.
 * No AI providers, no backend calls, and no persistence — later phases
 * replace these fixtures with real state.
 *
 * The inline SVG icons are deliberately simple (single stroke weight, no
 * fill) so they inherit the current text color and stay legible on both
 * themes.
 */
import type { ReactNode } from "react";

export type SectionId =
  | "dashboard"
  | "input-center"
  | "lesson-planner"
  | "slide-studio"
  | "motion-graphics"
  | "voice-examples"
  | "assessment"
  | "project-library"
  | "settings";

export interface NavItem {
  id: SectionId;
  label: string;
  /** Short hint used in accessibility labels and placeholder panels. */
  phase: string;
  icon: ReactNode;
}

const iconProps = {
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
} as const;

const gps = (size: number, children: ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...iconProps}>
    {children}
  </svg>
);

/** Label -> id mapping kept in spec order: Dashboard, Input Center, Lesson
 * Planner, Slide Studio, Motion Graphics, Voice & Examples, Assessment,
 * Project Library, Settings. */
export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    phase: "Phase 02",
    icon: gps(18, <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h4A1.5 1.5 0 0 1 11 5.5v4A1.5 1.5 0 0 1 9.5 11h-4A1.5 1.5 0 0 1 4 9.5v-4Z" /><path d="M13 5.5A1.5 1.5 0 0 1 14.5 4h4A1.5 1.5 0 0 1 20 5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 13 9.5v-4Z" /><path d="M4 14.5A1.5 1.5 0 0 1 5.5 13h4A1.5 1.5 0 0 1 11 14.5v4A1.5 1.5 0 0 1 9.5 20h-4A1.5 1.5 0 0 1 4 18.5v-4Z" /><path d="M13 14.5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 20 14.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4Z" /></>),
  },
  {
    id: "input-center",
    label: "Input Center",
    phase: "Phase 03",
    icon: gps(18, <><path d="M3 6.5C3 5.7 3.7 5 4.5 5h15c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-15C3.7 19 3 18.3 3 17.5v-11Z" /><path d="m3.5 6 8.5 6 8.5-6" /></>),
  },
  {
    id: "lesson-planner",
    label: "Lesson Planner",
    phase: "Phase 04",
    icon: gps(18, <><path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" /><path d="M14 3v6h6" /><path d="M8 13h6M8 16h4" /></>),
  },
  {
    id: "slide-studio",
    label: "Slide Studio",
    phase: "Phase 05",
    icon: gps(18, <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M12 16v2m-3.5 3L12 18l3.5 3" /><path d="M8.5 9.5h7" /><path d="M8.5 12.5h4" /></>),
  },
  {
    id: "motion-graphics",
    label: "Motion Graphics",
    phase: "Phase 06",
    icon: gps(18, <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9.5 4.5 2.5-4.5 2.5v-5Z" /></>),
  },
  {
    id: "voice-examples",
    label: "Voice & Examples",
    phase: "Phase 07",
    icon: gps(18, <><path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" /><path d="M19 11a7 7 0 0 1-14 0" /><path d="M12 18v3" /></>),
  },
  {
    id: "assessment",
    label: "Assessment",
    phase: "Phase 08",
    icon: gps(18, <><path d="M9 11.5 11 13.5 15 9.5" /><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-15Z" /><path d="M9 3v2.5h6V3" /></>),
  },
  {
    id: "project-library",
    label: "Project Library",
    phase: "Phase 09",
    icon: gps(18, <><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></>),
  },
  {
    id: "settings",
    label: "Settings",
    phase: "Phase 10",
    icon: gps(18, <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.58 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 8.86a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09c0 .68.4 1.3 1.03 1.56.6.25 1.3.13 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87c.26.63.88 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.03Z" /></>),
  },
];

export interface RecentProject {
  title: string;
  subject: string;
  grade: string;
  updated: string;
  status: "Draft" | "Ready" | "Scheduled";
}

/** Mock recent projects — replaced by the project library in a later phase. */
export const RECENT_PROJECTS: RecentProject[] = [
  { title: "Photosynthesis & Respiration", subject: "Biology", grade: "Grade 9", updated: "Updated 2 days ago", status: "Draft" },
  { title: "Linear Equations Sprint", subject: "Mathematics", grade: "Grade 8", updated: "Updated 4 days ago", status: "Ready" },
  { title: "World War II — Causes & Effects", subject: "History", grade: "Grade 10", updated: "Updated 1 week ago", status: "Scheduled" },
  { title: "Short Story Writing Workshop", subject: "English", grade: "Grade 7", updated: "Updated 2 weeks ago", status: "Draft" },
];

export interface FeatureCard {
  title: string;
  description: string;
  badge: string;
  accentClasses: string;
}

/** Feature cards shown on the dashboard. */
export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Input Center",
    description: "Capture lessons, objectives, and materials in one guided intake form.",
    badge: "Phase 03",
    accentClasses: "bg-sky-500/10 text-sky-300 ring-sky-500/40",
  },
  {
    title: "Lesson Planner",
    description: "Turn inputs into structured, standards-aligned lesson plans.",
    badge: "Phase 04",
    accentClasses: "bg-violet-500/10 text-violet-300 ring-violet-500/40",
  },
  {
    title: "Slide Studio",
    description: "Generate editable classroom slides from your lesson plans.",
    badge: "Phase 05",
    accentClasses: "bg-amber-500/10 text-amber-300 ring-amber-500/40",
  },
  {
    title: "Assessment",
    description: "Draft quizzes, rubric checks, and exit tickets in seconds.",
    badge: "Phase 08",
    accentClasses: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/40",
  },
];
