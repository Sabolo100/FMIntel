export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangesFeed from "@/components/ChangesFeed";
import { getPersonById, getPersonJobs } from "@/lib/db/people";
import { getChangesByEntity } from "@/lib/db/changes";
import { positionCategoryLabels, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const person = await getPersonById(id);
  if (!person) return { title: "Személy nem található - FM Intel" };
  return {
    title: `${person.name} - FM Intel`,
    description: person.bio || `${person.name} profilja az FM Intel platformon.`,
  };
}

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/** Pastel avatar color from name hash */
function avatarColor(name: string): { bg: string; text: string } {
  const palette = [
    { bg: "rgba(2,132,199,0.12)", text: "#0284c7" },
    { bg: "rgba(79,70,229,0.12)", text: "#4f46e5" },
    { bg: "rgba(13,148,136,0.12)", text: "#0d9488" },
    { bg: "rgba(217,119,6,0.12)", text: "#d97706" },
    { bg: "rgba(220,38,38,0.1)", text: "#dc2626" },
  ];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return palette[Math.abs(hash) % palette.length];
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

export default async function PersonProfilePage({ params }: PageProps) {
  const { id } = await params;
  const person = await getPersonById(id);
  if (!person) notFound();

  const [jobs, changes] = await Promise.all([
    getPersonJobs(id),
    getChangesByEntity("person", id),
  ]);

  const currentJob = jobs.find((j) => j.is_current);
  const pastJobs = jobs.filter((j) => !j.is_current);

  const initials = getInitials(person.name);
  const avColor = avatarColor(person.name);

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes avatarPop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .anim-card { animation: fadeInUp 0.45s ease both; }
        .anim-avatar { animation: avatarPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .row-hover { transition: background 0.15s, transform 0.15s; }
        .row-hover:hover { background: #f8fafc; transform: translateX(3px); }
        .link-hover { transition: color 0.15s; }
        .link-hover:hover { color: #0284c7; }
        .btn-hover { transition: background 0.15s, box-shadow 0.15s; }
        .btn-hover:hover { background: rgba(2,132,199,0.12); box-shadow: 0 0 0 3px rgba(2,132,199,0.1); }
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
          backgroundImage: `linear-gradient(rgba(79,70,229,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 30% 0%, rgba(79,70,229,0.07) 0%, transparent 70%)",
        }} />
        {/* Indigo accent bar */}
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ background: "#4f46e5" }} />

        <div className="relative max-w-6xl mx-auto px-8 lg:px-12 py-10 lg:py-14">
          <Link href="/emberek" className="back-link inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider mb-8 transition-colors" style={{ color: "#94a3b8" }}>
            <span className="back-arrow">←</span> Szakmai szereplők
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-8">
            {/* Avatar */}
            <div className="anim-avatar flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black shadow-sm" style={{ background: avColor.bg, color: avColor.text, fontFamily: "'Georgia', serif" }}>
                {initials}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono tracking-[0.15em] uppercase mb-2" style={{ color: "#94a3b8" }}>
                SZAKMAI SZEREPLŐ
              </div>

              <h1 className="font-black leading-none mb-2" style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#0f172a",
                letterSpacing: "-0.03em",
                fontFamily: "'Georgia', serif",
              }}>
                {person.name}
              </h1>

              {/* Current position */}
              {(person.title || currentJob) && (
                <p className="text-base mb-4" style={{ color: "#475569" }}>
                  <span className="font-semibold">{person.title || currentJob?.position_title}</span>
                  {currentJob?.company && (
                    <>
                      {" — "}
                      <Link href={`/cegek/${currentJob.company_id}`} className="link-hover font-semibold" style={{ color: "#0284c7" }}>
                        {currentJob.company.name}
                      </Link>
                    </>
                  )}
                </p>
              )}

              {person.bio && (
                <p className="text-sm leading-relaxed mb-5 max-w-xl" style={{ color: "#64748b" }}>
                  {person.bio}
                </p>
              )}

              {/* Action links */}
              <div className="flex flex-wrap gap-3">
                {person.linkedin_url && (
                  <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer"
                    className="btn-hover inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg"
                    style={{ color: "#0284c7", background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.2)" }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn profil
                  </a>
                )}
                {person.email && (
                  <a href={`mailto:${person.email}`}
                    className="btn-hover inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg"
                    style={{ color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {person.email}
                  </a>
                )}
              </div>
            </div>

            {/* Confidence block */}
            <div className="sm:self-start flex-shrink-0">
              <div className="rounded-xl p-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", minWidth: 160 }}>
                <ConfidenceBar value={person.confidence} />
                <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
                  <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "#94a3b8" }}>Munkák</div>
                  <div className="text-2xl font-black" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>{jobs.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10 space-y-6">

        {/* Career timeline */}
        <section className="anim-card bg-white rounded-2xl" style={{ border: "1px solid #e2e8f0", animationDelay: "0ms" }}>
          <div className="flex items-center gap-3 px-7 py-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(79,70,229,0.1)", color: "#4f46e5" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>Karrierút</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: "#94a3b8", background: "#f1f5f9" }}>{jobs.length}</span>
          </div>

          <div className="px-7 py-4">
            {jobs.length === 0 ? (
              <p className="text-sm py-4" style={{ color: "#94a3b8" }}>Nincsenek rögzített munkák.</p>
            ) : (
              <div className="relative pl-6">
                {/* Vertical timeline line */}
                <div aria-hidden className="absolute left-0 top-3 bottom-3 w-px" style={{ background: "rgba(79,70,229,0.2)" }} />

                {/* Current job first */}
                {currentJob && (
                  <div className="row-hover relative mb-5 pl-4 py-3 -ml-6 rounded-lg" style={{ paddingLeft: "2.5rem" }}>
                    <div aria-hidden className="absolute left-0 top-4 w-3.5 h-3.5 rounded-full" style={{
                      background: "#4f46e5",
                      marginLeft: "-0.4375rem",
                      boxShadow: "0 0 0 3px rgba(79,70,229,0.15)",
                    }} />
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: "#16a34a", background: "rgba(22,163,74,0.08)" }}>
                            ● Jelenlegi
                          </span>
                        </div>
                        <Link href={`/cegek/${currentJob.company_id}`} className="link-hover text-sm font-bold" style={{ color: "#1e293b" }}>
                          {currentJob.company?.name || "Ismeretlen cég"}
                        </Link>
                        <p className="text-sm mt-0.5 font-medium" style={{ color: "#475569" }}>
                          {currentJob.position_title}
                        </p>
                        {currentJob.position_category && (
                          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                            {positionCategoryLabels[currentJob.position_category]}
                          </p>
                        )}
                        <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                          {currentJob.started_at ? formatDate(currentJob.started_at) : "Ismeretlen kezdet"} – ma
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Past jobs */}
                {pastJobs.map((job) => (
                  <div key={job.id} className="row-hover relative mb-5 last:mb-0 pl-4 py-3 -ml-6 rounded-lg" style={{ paddingLeft: "2.5rem" }}>
                    <div aria-hidden className="absolute left-0 top-4 w-3 h-3 rounded-full border-2" style={{
                      background: "#ffffff",
                      borderColor: "rgba(79,70,229,0.35)",
                      marginLeft: "-0.375rem",
                    }} />
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/cegek/${job.company_id}`} className="link-hover text-sm font-bold" style={{ color: "#1e293b" }}>
                          {job.company?.name || "Ismeretlen cég"}
                        </Link>
                        <p className="text-sm mt-0.5" style={{ color: "#475569" }}>
                          {job.position_title}
                        </p>
                        {job.position_category && (
                          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                            {positionCategoryLabels[job.position_category]}
                          </p>
                        )}
                        <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                          {job.started_at ? formatDate(job.started_at) : "—"}
                          {job.ended_at ? ` – ${formatDate(job.ended_at)}` : ""}
                        </p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: "#94a3b8", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        Korábbi
                      </span>
                    </div>
                  </div>
                ))}
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
