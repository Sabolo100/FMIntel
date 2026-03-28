export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangesFeed from "@/components/ChangesFeed";
import { getBuildingById, getBuildingManagement } from "@/lib/db/buildings";
import { getChangesByEntity } from "@/lib/db/changes";
import { buildingTypeLabels, serviceTypeLabels, formatDate, formatArea } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const building = await getBuildingById(id);
  if (!building) return { title: "Ingatlan nem találahtó - FM Intel" };
  return {
    title: `${building.name} - FM Intel`,
    description: building.description || `${building.name} ingatlan részletek az FM Intel platformon.`,
  };
}

const buildingClassColors: Record<string, { color: string; bg: string }> = {
  "A+": { color: "#0284c7", bg: "rgba(2,132,199,0.1)" },
  "A":  { color: "#0d9488", bg: "rgba(13,148,136,0.1)" },
  "B+": { color: "#65a30d", bg: "rgba(101,163,13,0.1)" },
  "B":  { color: "#d97706", bg: "rgba(217,119,6,0.1)" },
  "C":  { color: "#94a3b8", bg: "#f1f5f9" },
};

const roleColors: Record<string, { color: string; bg: string }> = {
  fm: { color: "#0284c7", bg: "rgba(2,132,199,0.1)" },
  pm: { color: "#0d9488", bg: "rgba(13,148,136,0.1)" },
  am: { color: "#4f46e5", bg: "rgba(79,70,229,0.1)" },
};

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 90 ? "#16a34a" : pct >= 70 ? "#65a30d" : pct >= 50 ? "#d97706" : "#dc2626";
  const label = pct >= 90 ? "Megerősített" : pct >= 70 ? "Valószínű" : pct >= 50 ? "Feltételezett" : "Bizonytalan";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-mono" style={{ color }}>{label} {pct}%</span>
    </div>
  );
}

export default async function BuildingProfilePage({ params }: PageProps) {
  const { id } = await params;
  const building = await getBuildingById(id);
  if (!building) notFound();

  const [management, changes] = await Promise.all([
    getBuildingManagement(id),
    getChangesByEntity("building", id),
  ]);

  const classStyle = building.building_class
    ? (buildingClassColors[building.building_class] ?? buildingClassColors["C"])
    : buildingClassColors["C"];

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-card { animation: fadeInUp 0.45s ease both; }
        .row-hover { transition: background 0.15s, transform 0.15s; }
        .row-hover:hover { background: #f8fafc; transform: translateX(3px); }
        .link-hover { transition: color 0.15s; }
        .link-hover:hover { color: #0284c7; }
        .stat-card { transition: box-shadow 0.2s, transform 0.2s; }
        .stat-card:hover { box-shadow: 0 4px 20px rgba(2,132,199,0.1); transform: translateY(-2px); }
        .back-arrow { transition: transform 0.2s; display: inline-block; }
        .back-link:hover .back-arrow { transform: translateX(-4px); }
      `}</style>

      <Header />

      {/* ── HERO HEADER ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 40% 0%, rgba(13,148,136,0.07) 0%, transparent 70%)",
        }} />
        {/* Teal accent bar */}
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ background: "#0d9488" }} />

        {/* Decorative building-class badge — large, faint, top-right */}
        {building.building_class && (
          <div aria-hidden className="pointer-events-none absolute right-8 top-4 font-black select-none hidden lg:block" style={{
            fontSize: "8rem", lineHeight: 1,
            color: "rgba(13,148,136,0.05)",
            fontFamily: "'Georgia', serif",
          }}>
            {building.building_class}
          </div>
        )}

        <div className="relative max-w-6xl mx-auto px-8 lg:px-12 py-10 lg:py-14">
          <Link href="/ingatlanok" className="back-link inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider mb-8 transition-colors" style={{ color: "#94a3b8" }}>
            <span className="back-arrow">←</span> Ingatlanok
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded" style={{ color: "#94a3b8", background: "#f1f5f9" }}>
                  {buildingTypeLabels[building.building_type] ?? building.building_type}
                </span>
                {building.building_class && (
                  <span className="text-sm font-black px-3 py-1 rounded-lg" style={{ color: classStyle.color, background: classStyle.bg }}>
                    {building.building_class} kategória
                  </span>
                )}
              </div>

              <h1 className="font-black leading-none mb-3" style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#0f172a",
                letterSpacing: "-0.03em",
                fontFamily: "'Georgia', serif",
              }}>
                {building.name}
              </h1>

              {/* Address */}
              <p className="flex items-center gap-1.5 text-sm mb-4" style={{ color: "#64748b" }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {[building.address, building.city, building.district, building.zip_code].filter(Boolean).join(", ")}
              </p>

              {building.description && (
                <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
                  {building.description}
                </p>
              )}
            </div>

            {/* Meta block */}
            <div className="lg:w-48 flex-shrink-0">
              <div className="rounded-xl p-4 space-y-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <ConfidenceBar value={building.confidence} />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: "#94a3b8" }}>Státusz</div>
                  <div className="text-sm font-medium" style={{ color: "#1e293b" }}>{building.status}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Alapterület", value: formatArea(building.total_area_sqm) },
              { label: "Szintek", value: building.floors != null ? `${building.floors} szint` : "—" },
              { label: "Építési év", value: building.year_built?.toString() ?? "—" },
              { label: "Felújítás", value: building.year_renovated?.toString() ?? "—" },
            ].map((s) => (
              <div key={s.label} className="stat-card rounded-xl p-5 text-center bg-white" style={{ border: "1px solid #e2e8f0" }}>
                <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "#94a3b8" }}>{s.label}</div>
                <div className="text-xl font-black" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10 space-y-6">

        {/* Management / timeline */}
        <section className="anim-card bg-white rounded-2xl" style={{ border: "1px solid #e2e8f0", animationDelay: "0ms" }}>
          <div className="flex items-center gap-3 px-7 py-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18" />
              </svg>
            </div>
            <h2 className="font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>Kezelők</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: "#94a3b8", background: "#f1f5f9" }}>{management.length}</span>
          </div>

          <div className="px-7 py-4">
            {management.length === 0 ? (
              <p className="text-sm py-4" style={{ color: "#94a3b8" }}>Nincsenek kapcsolódó kezelői adatok.</p>
            ) : (
              /* Timeline list */
              <div className="relative pl-6">
                <div aria-hidden className="absolute left-0 top-3 bottom-3 w-px" style={{ background: "rgba(13,148,136,0.2)" }} />
                {management.map((m, i) => {
                  const rc = roleColors[m.role] ?? roleColors.fm;
                  return (
                    <div key={m.id} className="row-hover relative mb-5 last:mb-0 pl-4 py-3 -ml-6 rounded-lg" style={{ paddingLeft: "2.5rem" }}>
                      {/* Timeline dot */}
                      <div aria-hidden className="absolute left-0 top-4 w-3 h-3 rounded-full border-2" style={{
                        background: !m.ended_at ? rc.color : "#ffffff",
                        borderColor: rc.color,
                        marginLeft: "-0.375rem",
                      }} />
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: rc.color, background: rc.bg }}>
                              {serviceTypeLabels[m.role]}
                            </span>
                          </div>
                          <Link href={`/cegek/${m.company_id}`} className="link-hover text-sm font-bold" style={{ color: "#1e293b" }}>
                            {m.company?.name || "Ismeretlen cég"}
                          </Link>
                          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                            {m.started_at ? formatDate(m.started_at) : "Ismeretlen kezdet"}
                            {m.ended_at ? ` – ${formatDate(m.ended_at)}` : " – ma"}
                          </p>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full flex-shrink-0" style={
                          !m.ended_at
                            ? { color: "#16a34a", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }
                            : { color: "#94a3b8", background: "#f8fafc", border: "1px solid #e2e8f0" }
                        }>
                          {!m.ended_at ? "● Jelenlegi" : "Lezárt"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Changes */}
        <section className="anim-card bg-white rounded-2xl" style={{ border: "1px solid #e2e8f0", animationDelay: "80ms" }}>
          <div className="flex items-center gap-3 px-7 py-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(2,132,199,0.1)", color: "#0284c7" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>Változások</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: "#94a3b8", background: "#f1f5f9" }}>{changes.length}</span>
          </div>
          <div className="px-7 py-4">
            <ChangesFeed changes={changes} showAll />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
