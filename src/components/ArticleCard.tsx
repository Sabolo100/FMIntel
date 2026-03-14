import { calculateReadTime } from "@/lib/readTime";
import { newBadgeConfig } from "@/lib/newBadge";
import { gearLevelConfig } from "@/lib/gearLevel";
import type { RecoveryTime } from "@/lib/recoveryTime";
import type { IntensityZone } from "@/lib/intensityZone";
import type { AgeBadge } from "@/lib/ageBadge";
import type { GearLevel } from "@/lib/gearLevel";
import type { PriceBadge } from "@/lib/priceBadge";

export type ArticleCardProps = {
  category: string;
  title: string;
  excerpt: string;
  wordCount: number;
  categoryColor: string;
  badge: { label: string; className: string } | null;
  priceBadge?: PriceBadge | null;
  featured?: boolean;
  recoveryTime?: RecoveryTime | null;
  isNew?: boolean;
  intensityZone?: IntensityZone | null;
  ageBadge?: AgeBadge | null;
  gearLevel?: GearLevel | null;
};

export default function ArticleCard({
  category,
  title,
  excerpt,
  wordCount,
  categoryColor,
  badge,
  priceBadge,
  featured,
  recoveryTime,
  isNew,
  intensityZone,
  ageBadge,
  gearLevel,
}: ArticleCardProps) {
  return (
    <article className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      {featured && (
        <div className="absolute top-[22px] right-[-28px] w-28 bg-accent-500 text-white text-xs font-bold text-center py-1 rotate-45 shadow-sm z-10">
          Kiemelt
        </div>
      )}

      {/* Placeholder image */}
      <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="5.5" cy="17.5" r="3.5" strokeWidth="1.5" />
            <circle cx="18.5" cy="17.5" r="3.5" strokeWidth="1.5" />
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4" />
          </svg>
        </div>
        {badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${badge.className}`}>
            {badge.label}
          </span>
        )}
        {isNew && (
          <span
            className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${newBadgeConfig.className}`}
            aria-label="Új tartalom"
          >
            {newBadgeConfig.label}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor}`}>
            {category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" strokeWidth="1.75" strokeLinecap="round" />
              <path strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
            </svg>
            {calculateReadTime(wordCount)} olvasás
          </span>
        </div>

        {recoveryTime && (
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${recoveryTime.className}`}
              title="Ajánlott regenerációs idő edzés után"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {recoveryTime.label}
            </span>
          </div>
        )}

        {priceBadge && (
          <div className="mb-3">
            <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${priceBadge.className}`}>
              {priceBadge.label}
            </span>
          </div>
        )}

        {intensityZone && (
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${intensityZone.className}`}
              title={intensityZone.description}
              aria-label={`Pulzuszóna: ${intensityZone.zone} – ${intensityZone.description}`}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {intensityZone.zone}
            </span>
          </div>
        )}

        {ageBadge && (
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${ageBadge.className}`}
              title="Ajánlott korosztály és tapasztalati szint"
              aria-label={`Célkorosztály: ${ageBadge.label}`}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {ageBadge.label}
            </span>
          </div>
        )}

        {gearLevel && (
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${gearLevelConfig[gearLevel].className}`}
              title="Szükséges felszerelés szintje"
              aria-label={`Felszerelés szint: ${gearLevelConfig[gearLevel].label}`}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="5.5" cy="17.5" r="2.5" strokeWidth="1.5" />
                <circle cx="18.5" cy="17.5" r="2.5" strokeWidth="1.5" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4" />
              </svg>
              {gearLevelConfig[gearLevel].label}
            </span>
          </div>
        )}

        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{excerpt}</p>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700 transition-colors"
        >
          Olvasd el
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
