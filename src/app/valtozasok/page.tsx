export const revalidate = 0;

/**
 * Változások (Changes feed) page
 *
 * BANNER IMAGE GENERATION PROMPT (/public/banners/valtozasok.jpg):
 * "Abstract data visualization concept, multiple monitors showing real-time
 *  dashboards, graphs and data streams, modern corporate intelligence center,
 *  soft blue monitor glow illuminating the dark room, information architecture
 *  aesthetic, bokeh background lights, professional photography with blue and
 *  cyan accent lights, 16:5 panoramic crop"
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangesFeed from "@/components/ChangesFeed";
import FilterBar from "@/components/ui/FilterBar";
import PageBanner from "@/components/PageBanner";
import { getRecentChanges, getChangesByType } from "@/lib/db/changes";
import type { ChangeType } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    changeType?: string;
  }>;
}

const changeTypeColors: Record<string, { color: string; label: string }> = {
  new_entity:       { color: "#22c55e", label: "Új entitás" },
  updated_entity:   { color: "#3b82f6", label: "Frissítés" },
  new_management:   { color: "#f59e0b", label: "Új kezelés" },
  ended_management: { color: "#f97316", label: "Megszűnt" },
  personnel_move:   { color: "#a855f7", label: "Személyi" },
  company_relation: { color: "#6366f1", label: "Cégkapcsolat" },
  data_correction:  { color: "#94a3b8", label: "Javítás" },
};

export default async function ValtozasokPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let changes;
  if (params.changeType) {
    changes = await getChangesByType(params.changeType as ChangeType, 100);
  } else {
    changes = await getRecentChanges(100);
  }

  const filters = [
    {
      name: "Változás típusa",
      paramName: "changeType",
      options: [
        { value: "new_entity", label: "Új entitás" },
        { value: "updated_entity", label: "Frissített entitás" },
        { value: "new_management", label: "Új kezelési szerződés" },
        { value: "ended_management", label: "Megszűnt kezelés" },
        { value: "personnel_move", label: "Személyi változás" },
        { value: "company_relation", label: "Cégkapcsolat változás" },
        { value: "data_correction", label: "Adatjavítás" },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      {/* ── BANNER ─────────────────────────────────────────── */}
      {/* IMAGE: /public/banners/valtozasok.jpg — see prompt above */}
      <PageBanner
        badge="LIVE"
        badgeLive
        title="Változások"
        subtitle="Piaci mozgások, személyi változások és adatfrissítések időrendi sorrendben"
        imageSrc="/banners/valtozasok.jpg"
      >
        {/* Change type color legend */}
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(changeTypeColors).map(([, v]) => (
            <span
              key={v.label}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                color: v.color,
                background: `${v.color}12`,
                border: `1px solid ${v.color}25`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.color }} />
              {v.label}
            </span>
          ))}
        </div>
      </PageBanner>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Filters + count row */}
          <div
            className="bg-white rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <FilterBar filters={filters} />
            <span className="text-xs font-mono tracking-widest uppercase flex-shrink-0" style={{ color: "#94a3b8" }}>
              {changes.length} bejegyzés
            </span>
          </div>

          {/* Changes feed */}
          <div
            className="bg-white rounded-2xl"
            style={{ border: "1px solid #e2e8f0" }}
          >
            {/* Timeline accent line + header */}
            <div
              className="flex items-center gap-3 px-6 py-4"
              style={{ borderBottom: "1px solid #f1f5f9" }}
            >
              {/* Decorative timeline dot-stack */}
              <div className="flex flex-col gap-1" aria-hidden>
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="block rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: "#0284c7",
                      opacity: 1 - i * 0.3,
                    }}
                  />
                ))}
              </div>
              <div>
                <div className="text-xs font-mono tracking-widest uppercase" style={{ color: "#0284c7" }}>
                  IDŐRENDI NAPLÓ
                </div>
                <div className="text-sm font-semibold" style={{ color: "#0f172a" }}>
                  Legfrissebb piaci változások
                </div>
              </div>
            </div>

            <div className="p-5">
              <ChangesFeed changes={changes} showAll />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
