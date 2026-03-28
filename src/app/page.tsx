export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
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
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-700/50 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
              Piaci intelligencia platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              FM/PM/AM{" "}
              <span className="text-accent-400">Piaci Intelligencia</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              A magyar kereskedelmi ingatlanpiac facility management, property management
              és asset management szektorinak átfogó adatbázisa. Cégek, ingatlanok,
              szakemberek és piaci változások egy helyen.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/cegek"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Cégek böngészése
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/modszertan"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Hogyan működik?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Cégek"
              value={stats.companiesCount}
              href="/cegek"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              }
            />
            <StatCard
              label="Ingatlanok"
              value={stats.buildingsCount}
              href="/ingatlanok"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17" />
                </svg>
              }
            />
            <StatCard
              label="Emberek"
              value={stats.peopleCount}
              href="/emberek"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
            />
            <StatCard
              label="Változások e hónapban"
              value={stats.changesThisMonth}
              href="/valtozasok"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Recent Changes */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Legutóbbi változások
              </h2>
              <p className="text-slate-600 text-sm">
                A legfrissebb piaci mozgások és adatfrissítések
              </p>
            </div>
            <Link
              href="/valtozasok"
              className="hidden md:inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
            >
              Összes változás
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-brand-100 p-5">
            <ChangesFeed changes={recentChanges} />
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Fedezd fel az adatbázist
            </h2>
            <p className="text-slate-600 text-sm">
              Válassz egy kategóriát és kezdj el böngészni
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/cegek"
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                Cégek
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                FM, PM és AM szolgáltatók a magyar piacon. Cégadatok, szolgáltatási típusok és kapcsolatok.
              </p>
              <div className="mt-4 flex items-center gap-1 text-brand-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Tovább</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            <Link
              href="/ingatlanok"
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-accent-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-accent-600 transition-colors">
                Ingatlanok
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kereskedelmi ingatlanok: irodák, raktárak, logisztikai központok. Típusok, osztályok és kezelés.
              </p>
              <div className="mt-4 flex items-center gap-1 text-accent-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Tovább</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            <Link
              href="/emberek"
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                Szakmai szereplők
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vezetők és döntéshozók az FM/PM/AM szektorban. Karrier-utak és cégkapcsolatok.
              </p>
              <div className="mt-4 flex items-center gap-1 text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Tovább</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Hogyan működik?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Automatizált kutatási pipeline-unk folyamatosan figyeli a magyar kereskedelmi
            ingatlanpiac FM/PM/AM szektorát. Hír- és cégadatokból építjük az adatbázist,
            amelyet bizonyossági szintekkel minősítve teszünk elérhetővé.
          </p>
          <Link
            href="/modszertan"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Részletes módszertan
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
