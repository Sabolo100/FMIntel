export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangesFeed from "@/components/ChangesFeed";
import { getCompanyById, getCompanyBuildings, getCompanyPeople } from "@/lib/db/companies";
import { getChangesByEntity } from "@/lib/db/changes";
import { serviceTypeLabels, positionCategoryLabels, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const company = await getCompanyById(id);
  if (!company) return { title: "Cég nem található - FM Intel" };
  return {
    title: `${company.name} - FM Intel`,
    description: company.description || `${company.name} céginformációk az FM Intel platformon.`,
  };
}

const serviceColors: Record<string, { color: string; bg: string; border: string }> = {
  fm: { color: "#0284c7", bg: "rgba(2,132,199,0.08)", border: "rgba(2,132,199,0.2)" },
  pm: { color: "#0d9488", bg: "rgba(13,148,136,0.08)", border: "rgba(13,148,136,0.2)" },
  am: { color: "#4f46e5", bg: "rgba(79,70,229,0.08)", border: "rgba(79,70,229,0.2)" },
};
const serviceLabels: Record<string, string> = {
  fm: "Facility Management",
  pm: "Property Management",
  am: "Asset Management",
};

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

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

export default async function CompanyProfilePage({ params }: PageProps) {
  const { id } = await params;
  const company = await getCompanyById(id);
  if (!company) notFound();

  const [buildings, people, changes] = await Promise.all([
    getCompanyBuildings(id),
    getCompanyPeople(id),
    getChangesByEntity("company", id),
  ]);

  const primaryService = company.service_types?.[0];
  const accentColor = primaryService ? (serviceColors[primaryService]?.color ?? "#0284c7") : "#0284c7";

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
        .back-arrow { transition: transform 0.2s; display: inline-block; }
        .back-link:hover .back-arrow { transform: translateX(-4px); }
      `}</style>

      <Header />

      {/* ── HERO HEADER ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}
      >
        {/* Blueprint grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(2,132,199,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        {/* Radial glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 40% 0%, rgba(2,132,199,0.07) 0%, transparent 70%)",
        }} />
        {/* Accent left bar */}
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ background: accentColor }} />

        <div className="relative max-w-6xl mx-auto px-8 lg:px-12 py-10 lg:py-14">
          {/* Back */}
          <Link href="/cegek" className="back-link inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider mb-8 transition-colors" style={{ color: "#94a3b8" }}>
            <span className="back-arrow">←</span> Cégek
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded" style={{ color: "#94a3b8", background: "#f1f5f9" }}>
                  FM · PM · AM SZEREPLŐ
                </span>
                {company.is_international && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: "#4f46e5", background: "rgba(79,70,229,0.08)" }}>
                    Nemzetközi
                  </span>
                )}
              </div>

              <h1 className="font-black leading-none mb-3" style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#0f172a",
                letterSpacing: "-0.03em",
                fontFamily: "'Georgia', serif",
              }}>
                {company.name}
              </h1>

              {/* Service type pills */}
              {company.service_types?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.service_types.map((type) => {
                    const c = serviceColors[type] ?? serviceColors.fm;
                    return (
                      <span key={type} className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full" style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                        {serviceLabels[type] ?? type.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              )}

              {company.description && (
                <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#475569" }}>
                  {company.description}
                </p>
              )}
            </div>

            {/* Right meta block */}
            <div className="lg:w-56 flex-shrink-0">
              <div className="rounded-xl p-4 space-y-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <ConfidenceBar value={company.confidence} />
                {company.headquarters_city && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: "#94a3b8" }}>Székhely</div>
                    <div className="text-sm font-medium" style={{ color: "#1e293b" }}>{company.headquarters_city}</div>
                  </div>
                )}
                {company.founded_year && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: "#94a3b8" }}>Alapítva</div>
                    <div className="text-sm font-medium" style={{ color: "#1e293b" }}>{company.founded_year}</div>
                  </div>
                )}
                {company.employee_count_estimate && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: "#94a3b8" }}>Létszám</div>
                    <div className="text-sm font-medium" style={{ color: "#1e293b" }}>~{company.employee_count_estimate.toLocaleString("hu-HU")} fő</div>
                  </div>
                )}
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: "#0284c7" }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10 space-y-6">

        {/* Buildings */}
        <section className="anim-card bg-white rounded-2xl" style={{ border: "1px solid #e2e8f0", animationDelay: "0ms" }}>
          <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
                </svg>
              </div>
              <h2 className="font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>Kezelt ingatlanok</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: "#94a3b8", background: "#f1f5f9" }}>{buildings.length}</span>
            </div>
          </div>
          <div className="px-7 py-4">
            {buildings.length === 0 ? (
              <p className="text-sm py-4" style={{ color: "#94a3b8" }}>Nincsenek kapcsolódó ingatlanok.</p>
            ) : (
              <div>
                {buildings.map((bm, i) => (
                  <div key={bm.id} className="row-hover flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-lg cursor-pointer"
                    style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}>
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}>
                        {(i + 1).toString().padStart(2, "0")}
                      </div>
                      <div>
                        <Link href={`/ingatlanok/${bm.building_id}`} className="link-hover text-sm font-semibold" style={{ color: "#1e293b" }}>
                          {bm.building?.name || "Ismeretlen ingatlan"}
                        </Link>
                        <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                          {serviceTypeLabels[bm.role]}
                          {bm.started_at && ` · ${formatDate(bm.started_at)}`}
                          {bm.ended_at && ` – ${formatDate(bm.ended_at)}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full flex-shrink-0" style={
                      !bm.ended_at
                        ? { color: "#16a34a", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }
                        : { color: "#94a3b8", background: "#f8fafc", border: "1px solid #e2e8f0" }
                    }>
                      {!bm.ended_at ? "● Aktuális" : "Lezárt"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* People */}
        <section className="anim-card bg-white rounded-2xl" style={{ border: "1px solid #e2e8f0", animationDelay: "80ms" }}>
          <div className="flex items-center gap-3 px-7 py-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(79,70,229,0.1)", color: "#4f46e5" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h2 className="font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>Munkatársak</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: "#94a3b8", background: "#f1f5f9" }}>{people.length}</span>
          </div>
          <div className="px-7 py-4">
            {people.length === 0 ? (
              <p className="text-sm py-4" style={{ color: "#94a3b8" }}>Nincsenek kapcsolódó személyek.</p>
            ) : (
              <div>
                {people.map((job, i) => {
                  const name = job.person?.name || "?";
                  const initials = getInitials(name);
                  return (
                    <div key={job.id} className="row-hover flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-lg"
                      style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: "rgba(79,70,229,0.1)", color: "#4f46e5" }}>
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <Link href={`/emberek/${job.person_id}`} className="link-hover text-sm font-semibold" style={{ color: "#1e293b" }}>
                            {name}
                          </Link>
                          <p className="text-xs mt-0.5 truncate" style={{ color: "#94a3b8" }}>
                            {job.position_title}
                            {job.position_category && ` · ${positionCategoryLabels[job.position_category]}`}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full flex-shrink-0" style={
                        job.is_current
                          ? { color: "#0284c7", background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.2)" }
                          : { color: "#94a3b8", background: "#f8fafc", border: "1px solid #e2e8f0" }
                      }>
                        {job.is_current ? "● Jelenlegi" : "Korábbi"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Changes */}
        <section className="anim-card bg-white rounded-2xl" style={{ border: "1px solid #e2e8f0", animationDelay: "160ms" }}>
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
