export const revalidate = 0;

/**
 * Cégek listing page
 *
 * BANNER IMAGE GENERATION PROMPT (/public/banners/cegek.jpg):
 * "Modern corporate office building lobby interior, glass and steel atrium,
 *  reception desk with minimalist design, high ceiling with skylight, natural
 *  light streaming through floor-to-ceiling windows, cool blue and white tones,
 *  clean architectural photography, ultra wide angle lens, editorial quality,
 *  no people, 16:5 panoramic crop"
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import PageBanner from "@/components/PageBanner";
import { getCompanies } from "@/lib/db/companies";
import type { ServiceType } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    serviceType?: string;
    status?: string;
  }>;
}

export default async function CegekPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const companies = await getCompanies({
    search: params.q || undefined,
    serviceType: (params.serviceType as ServiceType) || undefined,
    status:
      params.status === "active"
        ? true
        : params.status === "inactive"
        ? false
        : undefined,
  });

  const filters = [
    {
      name: "Szolgáltatás típusa",
      paramName: "serviceType",
      options: [
        { value: "fm", label: "Facility Management" },
        { value: "pm", label: "Property Management" },
        { value: "am", label: "Asset Management" },
      ],
    },
    {
      name: "Státusz",
      paramName: "status",
      options: [
        { value: "active", label: "Aktív" },
        { value: "inactive", label: "Inaktív" },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      {/* ── BANNER ─────────────────────────────────────────── */}
      {/* IMAGE: /public/banners/cegek.jpg — see prompt above */}
      <PageBanner
        badge="ADATBÁZIS"
        title="Cégek"
        subtitle="FM, PM és AM szolgáltatók a magyar kereskedelmi ingatlanpiacon"
        imageSrc="/banners/cegek.jpg"
      >
        {/* Decorative service-type chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            { label: "Facility Management", short: "FM", color: "#0284c7", bg: "rgba(2,132,199,0.08)" },
            { label: "Property Management", short: "PM", color: "#0d9488", bg: "rgba(13,148,136,0.08)" },
            { label: "Asset Management", short: "AM", color: "#4f46e5", bg: "rgba(79,70,229,0.08)" },
          ].map((t) => (
            <span
              key={t.short}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
              style={{ color: t.color, background: t.bg, border: `1px solid ${t.color}22` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: t.color }}
              />
              {t.short} · {t.label}
            </span>
          ))}
        </div>
      </PageBanner>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Search + filters row */}
          <div
            className="bg-white rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <SearchBar
              placeholder="Keresés cégnév alapján..."
              defaultValue={params.q}
              paramName="q"
            />
            <FilterBar filters={filters} />
          </div>

          {/* Results count */}
          {companies.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: "#94a3b8" }}
              >
                {companies.length} találat
              </span>
              <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
            </div>
          )}

          {/* Results grid */}
          {companies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20 bg-white rounded-2xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Decorative empty-state: building outline */}
              <svg
                className="mx-auto mb-4"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={1}
              >
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
