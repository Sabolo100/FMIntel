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
        {/* Decorative network-node org chart (SVG) */}
        <div className="flex items-center gap-5 mt-3" aria-hidden>
          {/* Node visualization */}
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            {/* center node */}
            <circle cx="40" cy="20" r="8" fill="rgba(79,70,229,0.15)" stroke="#4f46e5" strokeWidth="1.5" />
            {/* left node */}
            <circle cx="12" cy="20" r="5" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 1" />
            {/* right node */}
            <circle cx="68" cy="20" r="5" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 1" />
            {/* top node */}
            <circle cx="40" cy="5" r="4" fill="rgba(79,70,229,0.08)" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2 1" />
            {/* connectors */}
            <line x1="17" y1="20" x2="32" y2="20" stroke="#4f46e5" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="48" y1="20" x2="63" y2="20" stroke="#4f46e5" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="40" y1="9" x2="40" y2="12" stroke="#4f46e5" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
          <div className="flex flex-col gap-1">
            {[
              { color: "#4f46e5", label: "Igazgató szint" },
              { color: "#0284c7", label: "Menedzser szint" },
            ].map((l) => (
              <span key={l.label} className="inline-flex items-center gap-1.5 text-xs font-mono" style={{ color: "#94a3b8" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
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
                <PersonCard key={person.id} person={person} />
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
