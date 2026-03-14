/**
 * Price tier badge configuration for article cards.
 * Displays an equipment price-range indicator: Budget / Mid / Premium.
 * Intended for Felszerelés (Equipment) articles only.
 */

export type PriceTier = "budget" | "mid" | "premium";

export interface PriceBadge {
  label: string;
  className: string;
}

export const priceBadgeConfig: Record<PriceTier, PriceBadge> = {
  budget: {
    label: "💰 Budget",
    className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
  mid: {
    label: "⭐ Középkategória",
    className: "bg-sky-100 text-sky-700 border border-sky-200",
  },
  premium: {
    label: "💎 Prémium",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
};
