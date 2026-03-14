/**
 * Recovery time indicator for training-related article cards.
 * Shows recommended rest time after the described workout/training session.
 * Intended only for Edzésterv (training) and active sport articles —
 * NOT for Felszerelés (equipment) articles.
 */

export type RecoveryLevel = "light" | "moderate" | "intense";

export interface RecoveryTime {
  /** Short display label shown on the card, e.g. "24ó regeneráció" */
  label: string;
  /** Tailwind class string for the badge styling */
  className: string;
}

/**
 * Pre-defined recovery time presets keyed by intensity level.
 * Use `light` for easy/route articles, `moderate` for standard training,
 * and `intense` for demanding multi-day programs.
 */
export const recoveryTimeConfig: Record<RecoveryLevel, RecoveryTime> = {
  light: {
    label: "24ó regeneráció",
    className: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  moderate: {
    label: "36ó pihenő",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  intense: {
    label: "48ó regeneráció",
    className: "bg-rose-50 text-rose-700 border border-rose-200",
  },
};
