export const revalidate = 0;

/**
 * Homepage
 *
 * BANNER IMAGE GENERATION PROMPT (/public/banners/home.jpg):
 * "Aerial night photography of Budapest city center, illuminated modern glass office
 *  towers and commercial buildings, long exposure light trails on streets, deep navy
 *  blue sky, golden and cyan light reflections, sharp architectural lines, editorial
 *  cinematic color grade, 16:5 panoramic crop, hyper-realistic photography style"
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangesFeed from "@/components/ChangesFeed";
import Link from "next/link";
import { getDashboardStats } from "@/lib/db/stats";
import { getRecentChanges } from "@/lib/db/changes";

export default async function HomePage() {
  const [stats, recentChanges] = await Promise.all([
    getDashboardStats(),
    getRecentChanges(5),
  ]);

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      {/* ── HERO / BANNER ──────────────────────────────────── */}
      {/* IMAGE: /public/banners/home.jpg — see prompt above */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#ffffff",
          backgroundImage: "url('/banners/home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          minHeight: 340,
        }}
      >
        {/* Image overlay */}
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(240,245,251,0.88)" }} />

        {/* Blueprint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(2,132,199,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(2,132,199,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2,132,199,0.09) 0%, transparent 70%)",
          }}
        />

        {/* Decorative faint "HU" letters — country marker */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-8 top-6 font-black select-none hidden lg:block"
          style={{
            fontSize: "11rem",
            lineHeight: 1,
            color: "rgba(2,132,199,0.04)",
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.05em",
          }}
        >
          HU
        </div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
              style={{
                color: "#0284c7",
                borderColor: "rgba(2,132,199,0.25)",
                background: "rgba(2,132,199,0.07)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#0284c7" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#0284c7" }} />
              </span>
              Piaci intelligencia platform
            </span>
          </div>

          <h1
            className="font-black leading-none mb-5"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5rem)",
              color: "#0f172a",
              letterSpacing: "-0.03em",
              fontFamily: "'Georgia', serif",
              maxWidth: "16ch",
            }}
          >
            FM · PM · AM{" "}
            <span style={{ color: "#0284c7" }}>Piaci Intelligencia</span>
          </h1>

          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "#475569" }}
          >
            A magyar kereskedelmi ingatlanpiac facility management, property management
            és asset management szektorának átfogó adatbázisa. Cégek, ingatlanok,
            szakemberek és piaci változások — egy helyen, naprakészen.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/cegek"
              className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: "#0284c7",
                color: "#ffffff",
              }}
            >
              Cégek böngészése
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/modszertan"
              className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm border transition-all"
              style={{
                color: "#0284c7",
                borderColor: "rgba(2,132,199,0.3)",
                background: "rgba(2,132,199,0.05)",
              }}
            >
              Hogyan működik?
            </Link>
          </div>
        </div>

        {/* Stats strip at the bottom of hero */}
        <div
          className="relative"
          style={{ borderTop: "1px solid rgba(2,132,199,0.1)", background: "rgba(240,245,251,0.7)" }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sky-100">
              {[
                { value: stats.companiesCount, label: "Cég", href: "/cegek" },
                { value: stats.buildingsCount, label: "Ingatlan", href: "/ingatlanok" },
                { value: stats.peopleCount, label: "Szakmai szereplő", href: "/emberek" },
                { value: stats.changesThisMonth, label: "Változás e hónapban", href: "/valtozasok" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="group px-6 py-4 text-center transition-colors"
                  style={{ borderColor: "rgba(2,132,199,0.1)" }}
                >
                  <div
                    className="text-2xl font-black mb-0.5 group-hover:text-[#0284c7] transition-colors"
                    style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
                  >
                    {typeof s.value === "number"
                      ? s.value.toLocaleString("hu-HU")
                      : s.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                    {s.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENT CHANGES ─────────────────────────────────── */}
      <section className="py-16" style={{ background: "#f0f5fb" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono tracking-[0.15em] uppercase mb-2 block" style={{ color: "#0284c7" }}>
                FRISS ADATOK
              </span>
              <h2
                className="text-2xl font-bold"
                style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
              >
                Legutóbbi változások
              </h2>
            </div>
            <Link
              href="/valtozasok"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "#0284c7" }}
            >
              Összes változás
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div
            className="bg-white rounded-2xl p-6"
            style={{ border: "1px solid #e2e8f0" }}
          >
            {/* Decorative change-type legend */}
            <div className="flex flex-wrap gap-2 mb-5 pb-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
              {[
                { dot: "#22c55e", label: "Új entitás" },
                { dot: "#3b82f6", label: "Frissítés" },
                { dot: "#a855f7", label: "Személyi mozgás" },
                { dot: "#f59e0b", label: "Kezelési változás" },
              ].map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5 text-xs font-mono" style={{ color: "#94a3b8" }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.dot }} />
                  {t.label}
                </span>
              ))}
            </div>
            <ChangesFeed changes={recentChanges} />
          </div>
        </div>
      </section>

      {/* ── QUICK NAVIGATION ───────────────────────────────── */}
      <section className="py-16" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-[0.15em] uppercase mb-2 block" style={{ color: "#0284c7" }}>
              ADATBÁZIS
            </span>
            <h2
              className="text-2xl font-bold"
              style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
            >
              Fedezd fel az adatbázist
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cégek */}
            <Link
              href="/cegek"
              className="group rounded-2xl p-7 flex flex-col gap-5 transition-all"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#94a3b8" }}>
                  FM · PM · AM
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(2,132,199,0.1)", color: "#0284c7" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>
                  Cégek
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  FM, PM és AM szolgáltatók a magyar piacon. Cégadatok, szolgáltatási típusok és kapcsolatok.
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold mt-auto" style={{ color: "#0284c7" }}>
                Böngészés
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Ingatlanok */}
            <Link
              href="/ingatlanok"
              className="group rounded-2xl p-7 flex flex-col gap-5 transition-all"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#94a3b8" }}>
                  IRODA · RAKTÁR · LOGISZTIKA
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>
                  Ingatlanok
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  Kereskedelmi ingatlanok: irodák, raktárak, logisztikai központok. Típusok, osztályok és kezelés.
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold mt-auto" style={{ color: "#0d9488" }}>
                Böngészés
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Emberek */}
            <Link
              href="/emberek"
              className="group rounded-2xl p-7 flex flex-col gap-5 transition-all"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>
                <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#94a3b8" }}>
                  VEZETŐ · DÖNTÉSHOZÓ
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(79,70,229,0.1)", color: "#4f46e5" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#0f172a" }}>
                  Szakmai szereplők
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  Vezetők és döntéshozók az FM/PM/AM szektorban. Karrier-utak és cégkapcsolatok.
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold mt-auto" style={{ color: "#4f46e5" }}>
                Böngészés
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS CTA ──────────────────────────────── */}
      <section
        className="py-14"
        style={{ background: "#f0f5fb", borderTop: "1px solid #e2e8f0" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono tracking-[0.15em] uppercase mb-2" style={{ color: "#0284c7" }}>
                MÓDSZERTAN
              </div>
              <h2 className="text-xl font-bold mb-1" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>
                Hogyan működik a rendszer?
              </h2>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: "#64748b" }}>
                Automatizált kutatási pipeline-unk napi ciklusokban figyeli az FM/PM/AM szektort.
                Bizonyossági szintekkel minősített, auditálható adatbázis.
              </p>
            </div>
            <Link
              href="/modszertan"
              className="flex-shrink-0 inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm border transition-all"
              style={{
                color: "#0284c7",
                borderColor: "rgba(2,132,199,0.3)",
                background: "rgba(2,132,199,0.05)",
              }}
            >
              Részletes módszertan
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
