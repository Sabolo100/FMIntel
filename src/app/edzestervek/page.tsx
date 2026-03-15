export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByType } from "@/lib/articlesDb";
import { intensityZoneConfig } from "@/lib/intensityZone";

const styleGroups = [
  { id: "orszaguti", label: "Országúti", color: "brand" },
  { id: "mtb", label: "Mountain Bike", color: "accent" },
  { id: "ciklokrossz", label: "Ciklokrossz", color: "green" },
  { id: "altalanos", label: "Általános / Téli", color: "slate" },
] as const;

const difficultyColors: Record<string, string> = {
  kezdő: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  középhaladó: "bg-amber-100 text-amber-700 border border-amber-200",
  haladó: "bg-red-100 text-red-700 border border-red-200",
};

export default async function EdzestervekPage() {
  const trainingPlans = await getArticlesByType("edzesterv");
  const featured = trainingPlans.filter((p) => p.featured);
  const newPlans = trainingPlans.filter((p) => p.isNew);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 text-white py-16 md:py-22">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-700/50 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Edzéstervek
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4">
              Edzéstervek{" "}
              <span className="text-accent-400">45-60 éveseknek</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Életkorhoz igazított programok, amelyek figyelembe veszik a regenerációt,
              az ízületek terhelhetőségét és a munkával-családdal való egyensúlyt.
            </p>

            {/* Intensity zone legend */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-slate-400 self-center mr-1">Pulzuszónák:</span>
              {Object.entries(intensityZoneConfig).map(([key, zone]) => (
                <span key={key} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${zone.className}`}>
                  {zone.zone} – {zone.description}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Kiemelt edzéstervek */}
        {featured.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-500 rounded-full"></span>
              Kiemelt edzéstervek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="h-2 bg-gradient-to-r from-brand-500 to-accent-500" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${plan.categoryColor}`}>
                        {plan.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-accent-100 text-accent-700 border border-accent-200">
                        ⭐ Kiemelt
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{plan.excerpt}</p>

                    {/* Plan meta */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.weeksDuration && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
                            <path strokeWidth="1.5" strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          {plan.weeksDuration} hét
                        </span>
                      )}
                      {plan.sessionsPerWeek && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {plan.sessionsPerWeek}× / hét
                        </span>
                      )}
                      {plan.difficulty && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[plan.difficulty]}`}>
                          {plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)}
                        </span>
                      )}
                      {plan.intensityZone && (
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${plan.intensityZone.className}`}
                          title={plan.intensityZone.description}>
                          ❤ {plan.intensityZone.zone}
                        </span>
                      )}
                      {plan.ageBadge && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${plan.ageBadge.className}`}>
                          👤 {plan.ageBadge.label}
                        </span>
                      )}
                    </div>

                    <a href={`/edzestervek/${plan.id}`} className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700 transition-colors">
                      Edzésterv megnyitása
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Újdonságok */}
        {newPlans.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Új edzéstervek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newPlans.map((plan) => (
                <ArticleCard key={plan.id} {...plan} href={`/edzestervek/${plan.id}`} />
              ))}
            </div>
          </section>
        )}

        {/* Stílus szerinti csoportok */}
        {styleGroups.map(({ id, label }) => {
          const plans = trainingPlans.filter((p) => p.style === id);
          if (plans.length === 0) return null;
          return (
            <section key={id} id={id} className="mb-14 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
                {label} edzéstervek
                <span className="text-sm font-normal text-slate-500 ml-1">({plans.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <ArticleCard key={plan.id} {...plan} href={`/edzestervek/${plan.id}`} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Minden edzésterv */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-slate-400 rounded-full"></span>
            Összes edzésterv
            <span className="text-sm font-normal text-slate-500 ml-1">({trainingPlans.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingPlans.map((plan) => (
              <ArticleCard key={plan.id} {...plan} href={`/edzestervek/${plan.id}`} />
            ))}
          </div>
        </section>

        {/* Fejlesztői útmutató */}
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-slate-400">
          <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm">
            Új edzésterv hozzáadásához szúrj be egy{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">type: &quot;edzesterv&quot;</code>{" "}
            bejegyzést a{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">Supabase articles</code>{" "}
            táblába.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
