/**
 * "Új" (New) badge configuration for article cards.
 * Displayed in the top-right corner of the card image when an article
 * has `isNew: true` in the static data.
 * Green colour, consistent with the site's badge design language.
 */

export interface NewBadge {
  label: string;
  className: string;
}

export const newBadgeConfig: NewBadge = {
  label: "Új",
  className: "bg-green-500 text-white",
};
