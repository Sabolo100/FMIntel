/**
 * Gear level badge configuration for article cards.
 * Displays the required equipment level: Alapfelszerelés / Közepes / Profi szint.
 * Helps users quickly assess whether content is relevant to their current gear.
 */

export type GearLevel = "basic" | "mid" | "pro";

export interface GearLevelBadge {
  label: string;
  className: string;
}

export const gearLevelConfig: Record<GearLevel, GearLevelBadge> = {
  basic: {
    label: "🚲 Alapfelszerelés",
    className: "bg-teal-100 text-teal-700 border border-teal-200",
  },
  mid: {
    label: "🚲 Közepes",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  pro: {
    label: "🚲 Profi szint",
    className: "bg-violet-100 text-violet-700 border border-violet-200",
  },
};

/**
 * Returns the gear level badge config for a given level.
 * Returns null for unknown/undefined values.
 */
export function getGearLevelBadge(level: GearLevel): GearLevelBadge {
  return gearLevelConfig[level];
}
