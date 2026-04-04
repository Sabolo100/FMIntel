export const revalidate = 0;

/**
 * Emberek (People) listing page
 *
 * BANNER IMAGE GENERATION PROMPT (/public/banners/emberek.jpg):
 * "Corporate business professionals in a modern glass conference room, high-level
 *  meeting atmosphere, Budapest skyline visible through large windows, warm
 *  professional lighting, shallow depth of field, editorial photography style,
 *  desaturated professional color grade with subtle blue tones, no faces visible,
 *  16:5 panoramic crop"
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonCard from "@/components/PersonCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import PageBanner from "@/components/PageBanner";
import { getPeople } from "@/lib/db/people";
import type { PositionCategory } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    positionCategory?: string;
  }>;
}

export default async function EmberekPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const people = await getPeople({
    search: params.q || undefined,
    positionCategory: (params.positionCategory as PositionCategory) || undefined,
  });

  const filters = [
    {
      name: "Pozíció kategória",
      paramName: "positionCategory",
      options: [
        { value: "ceo", label: "Vezérigazgató (CEO)" },
        { value: "coo", label: "Operatív igazgató (COO)" },
        { value: "cfo", label: "Pénzügyi igazgató (CFO)" },
        { value: "cto", label: "Technológiai igazgató (CTO)" },
        { value: "fm_director", label: "FM igazgató" },
        { value: "pm_director", label: "PM igazgató" },
        { value: "am_director", label: "AM igazgató" },
        { value: "fm_manager", label: "FM menedzser" },
        { value: "pm_manager", label: "PM menedzser" },
        { value: "am_manager", label: "AM menedzser" },
        { value: "regional_director", label: "Regionális igazgató" },
        { value: "country_manager", label: "Országigazgató" },
        { value: "head_of_operations", label: "Üzemeltetési vezető" },
        { value: "head_of_technical", label: "Műszaki vezető" },
        { value: "board_member", label: "Igazgatósági tag" },
        { value: "partner", label: "Partner" },
        { value: "business_development", label: "Üzletfejlesztés" },
        { value: "leasing_manager", label: "Bérbeadási menedzser" },
        { value: "other", label: "Egyéb" },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      {/* ── BANNER ─────────────────────────────────────────── */}
      {/* IMAGE: /public/banners/emberek.jpg — see prompt above */}
      <PageBanner
        badge="ADATBÁZIS"
        title="Szakmai szereplők"
        subtitle="Vezetők és döntéshozók az FM/PM/AM szektorban"
        imageSrc="/banners/emberek.jpg"
      >
        {/* Decorative position-level chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            { label: "Ügyvezető / CEO", color: "#4f46e5", bg: "rgba(79,70,229,0.08)" },
            { label: "FM / PM igazgató", color: "#0284c7", bg: "rgba(2,132,199,0.08)" },
            { label: "AM menedzser", color: "#0d9488", bg: "rgba(13,148,136,0.08)" },
          ].map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
              style={{ color: t.color, background: t.bg, border: `1px solid ${t.color}22` }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
              {t.label}
            </span>
          ))}
        </div>
      </PageBanner>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Search + filters */}
          <div
            className="bg-white rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <SearchBar
              placeholder="Keresés név alapján..."
              defaultValue={params.q}
              paramName="q"
            />
            <FilterBar filters={filters} />
          </div>

          {/* Results count */}
          {people.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#94a3b8" }}>
                {people.length} találat
              </span>
              <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
            </div>
          )}

          {/* Results */}
          {people.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {people.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  companyName={person.current_company?.name ?? undefined}
                />
              ))}
            </div>
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
