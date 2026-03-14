/**
 * Heart rate intensity zone indicator for training-related article cards.
 * Displays a small heart icon and pulse zone label (e.g. Z2, Z3) as a badge.
 * Intended for Edzésterv (training) articles — NOT for equipment articles.
 *
 * Standard 5-zone model:
 *   Z1 – Very light (regeneration rides)
 *   Z2 – Endurance base (aerobic, fat-burning — ideal for 45-60 age group)
 *   Z3 – Aerobic tempo (moderate intensity)
 *   Z4 – Lactate threshold (hard training)
 *   Z5 – VO2 max / anaerobic (max effort)
 */

export type IntensityZoneLevel = "z1" | "z2" | "z3" | "z4" | "z5";

export interface IntensityZone {
  /** Short zone label shown on the badge, e.g. "Z2" */
  zone: string;
  /** Human-readable Hungarian description of the zone */
  description: string;
  /** Tailwind class string for the badge styling */
  className: string;
}

/**
 * Pre-defined intensity zone presets.
 * Use the key matching the article's primary training zone.
 */
export const intensityZoneConfig: Record<IntensityZoneLevel, IntensityZone> = {
  z1: {
    zone: "Z1",
    description: "Regenerációs zóna",
    className: "bg-slate-100 text-slate-600 border border-slate-300",
  },
  z2: {
    zone: "Z2",
    description: "Alap állóképesség",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  z3: {
    zone: "Z3",
    description: "Aerob tempó",
    className: "bg-yellow-50 text-yellow-700 border border-yellow-300",
  },
  z4: {
    zone: "Z4",
    description: "Laktát küszöb",
    className: "bg-orange-50 text-orange-700 border border-orange-300",
  },
  z5: {
    zone: "Z5",
    description: "Maximális erőfeszítés",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
};
