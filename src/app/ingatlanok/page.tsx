export const revalidate = 0;

/**
 * Ingatlanok listing page
 *
 * BANNER IMAGE GENERATION PROMPT (/public/banners/ingatlanok.jpg):
 * "Budapest modern commercial real estate district aerial photography, glass office
 *  parks, logistics centers and warehouse complexes viewed from above, abstract
 *  geometric urban planning patterns, clear blue sky with light clouds, sharp
 *  architectural lines, top-down perspective, professional drone photography,
 *  cyan and slate color palette, 16:5 panoramic crop"
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuildingCard from "@/components/BuildingCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import PageBanner from "@/components/PageBanner";
import MapViewToggle from "@/components/MapViewToggle";
import { getBuildings, searchBuildings } from "@/lib/db/buildings";
import type { BuildingType, BuildingClass, BuildingStatus } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    buildingType?: string;
    buildingClass?: string;
    status?: string;
    view?: string;
  }>;
}

export default async function IngatlanokPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isMapView = params.view === "map";

  let buildings;
  if (params.q) {
    buildings = await searchBuildings(params.q);
  } else {
    buildings = await getBuildings({
      buildingType: (params.buildingType as BuildingType) || undefined,
      buildingClass: (params.buildingClass as BuildingClass) || undefined,
      status: (params.status as BuildingStatus) || undefined,
    });
  }

  const filters = [
    {
      name: "Ingatlan típusa",
      paramName: "buildingType",
      options: [
        { value: "iroda", label: "Iroda" },
        { value: "raktar", label: "Raktár" },
        { value: "logisztikai", label: "Logisztikai" },
        { value: "vegyes", label: "Vegyes használatú" },
      ],
    },
    {
      name: "Osztály",
      paramName: "buildingClass",
      options: [
        { value: "A+", label: "A+" },
        { value: "A", label: "A" },
        { value: "B+", label: "B+" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
      ],
    },
    {
      name: "Státusz",
      paramName: "status",
      options: [
        { value: "mukodo", label: "Működő" },
        { value: "fejlesztes_alatt", label: "Fejlesztés alatt" },
        { value: "tervezett", label: "Tervezett" },
        { value: "felujitas_alatt", label: "Felújítás alatt" },
        { value: "ures", label: "Üres" },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      {/* ── BANNER ─────────────────────────────────────────── */}
      {/* IMAGE: /public/banners/ingatlanok.jpg — see prompt above */}
      <PageBanner
        badge="ADATBÁZIS"
        title="Ingatlanok"
        subtitle="Kereskedelmi ingatlanok a magyar piacon: irodák, raktárak, logisztikai központok"
        imageSrc="/banners/ingatlanok.jpg"
      >
        {/* Decorative building-class scale */}
        <div className="flex items-center gap-1 mt-3">
          <span className="text-xs font-mono mr-2" style={{ color: "#94a3b8" }}>Osztály:</span>
          {[
            { cls: "A+", color: "#0284c7" },
            { cls: "A",  color: "#0d9488" },
            { cls: "B+", color: "#65a30d" },
            { cls: "B",  color: "#d97706" },
            { cls: "C",  color: "#94a3b8" },
          ].map((c, i) => (
            <span
              key={c.cls}
              className="inline-flex items-center justify-center text-xs font-bold rounded"
              style={{
                width: 32,
                height: 24,
                background: `${c.color}15`,
                color: c.color,
                border: `1px solid ${c.color}30`,
                fontSize: "0.65rem",
                opacity: 1 - i * 0.08,
              }}
            >
              {c.cls}
            </span>
          ))}
          {/* Floor-plan dots decoration */}
          <div className="ml-4 flex gap-1 items-center" aria-hidden>
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: "rgba(2,132,199,0.2)",
                  transform: `scale(${1 - i * 0.08})`,
                }}
              />
            ))}
          </div>
        </div>
      </PageBanner>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Search + filters + view toggle */}
          <div
            className="bg-white rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <SearchBar
              placeholder="Keresés név vagy cím alapján..."
              defaultValue={params.q}
              paramName="q"
            />
            <FilterBar filters={filters} />
            <MapViewToggle isMapView={isMapView} />
          </div>

          {/* Results count */}
          {buildings.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#94a3b8" }}>
                {buildings.length} találat
              </span>
              <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
            </div>
          )}

          {/* Results — list or map */}
          {buildings.length > 0 ? (
            isMapView ? (
              <MapViewToggle.Map buildings={buildings} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {buildings.map((building) => (
                  <BuildingCard key={building.id} building={building} />
                ))}
              </div>
            )
          ) : (
            <div
              className="text-center py-20 bg-white rounded-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <h3 className="text-base font-semibold mb-1" style={{ color: "#475569" }}>
                Nincs találat
              </h3>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Próbáld módosítani a keresési feltételeket vagy a szűrőket.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
