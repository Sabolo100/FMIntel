/**
 * Age & Experience Badge
 * Indicates which age/experience sub-group an article is aimed at
 * (e.g. "45+ újrakezdő", "50+ profi") so readers can quickly find
 * content relevant to their cycling background.
 */

export type AgeExperienceLevel =
  | "45_beginner"
  | "45_advanced"
  | "50_active"
  | "50_pro"
  | "55_veteran";

export interface AgeBadge {
  label: string;
  className: string;
}

export const ageBadgeConfig: Record<AgeExperienceLevel, AgeBadge> = {
  "45_beginner": {
    label: "45+ újrakezdő",
    className: "bg-sky-100 text-sky-700 border border-sky-300",
  },
  "45_advanced": {
    label: "45+ haladó",
    className: "bg-sky-200 text-sky-800 border border-sky-400",
  },
  "50_active": {
    label: "50+ aktív",
    className: "bg-violet-100 text-violet-700 border border-violet-300",
  },
  "50_pro": {
    label: "50+ profi",
    className: "bg-violet-200 text-violet-800 border border-violet-400",
  },
  "55_veteran": {
    label: "55+ veterán",
    className: "bg-amber-100 text-amber-700 border border-amber-300",
  },
};
