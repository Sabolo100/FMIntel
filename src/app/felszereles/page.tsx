export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByType } from "@/lib/articlesDb";
import { priceBadgeConfig } from "@/lib/priceBadge";

const categoryGroups = [
  { id: "orszaguti", label: "Országúti kerékpárok és alkatrészek" },
  { id: "mtb", label: "Mountain Bike felszerelés" },
  { id: "ciklokrossz", label: "Ciklokrossz felszerelés" },
  { id: "altalanos", label: "Általános kerékpáros felszerelés" },
] as const;

export default async function FelszerelesPage() {
  const equipmentArticles = await getArticlesByType("felszereles");
  const newEquipment = equipmentArticles.filter((e) => e.isNew);
  const premiumItems = equipmentArticles.filter((e) => e.priceBadge?.label === priceBadgeConfig.premium.label);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Felszerelés tesztek és tanácsok
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4">
              Felszerelés <span className="text-accent-400">okosan</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Objektív tesztek, összehasonlítók és vásárlási útmutatók. Tudatos döntések
              prémium felszerelésekről 45-60 éves kerékpárosok számára.
            </p>

            {/* Price tier legend */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 mr-1">Árkategóriák:</span>
              {Object.values(priceBadgeConfig).map((badge) => (
                <span key={badge.label} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Legújabb tesztek */}
        {newEquipment.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Legújabb tesztek és cikkek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newEquipment.map((item) => (
                <ArticleCard key={item.id} {...item} href={`/felszereles/${item.id}`} />
              ))}
            </div>
          </section>
        )}

        {/* Prémium tesztek kiemelve */}
        {premiumItems.length > 0 && (
          <section className="mb-14">
            <div className="rounded-2xl bg-gradient-to-br from-amber-950 via-amber-900 to-slate-900 p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💎</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Prémium kategória</h2>
                  <p className="text-amber-200/80 text-sm">A legjobb felszerelések részletes tesztelve</p>
                </div>
              </div>
              <p className="text-amber-100/70 text-sm leading-relaxed max-w-2xl">
                A 45-60 éves kerékpáros tapasztalattal és vásárlóerővel rendelkezik.
                Prémium tesztjeink segítenek a legjobb döntésben.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumItems.map((item) => (
                <ArticleCard key={item.id} {...item} href={`/felszereles/${item.id}`} />
              ))}
            </div>
          </section>
        )}

        {/* Kategória szerinti csoportok */}
        {categoryGroups.map(({ id, label }) => {
          const items = equipmentArticles.filter((e) => e.style === id);
          if (items.length === 0) return null;
          return (
            <section key={id} id={id} className="mb-14 scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
                {label}
                <span className="text-sm font-normal text-slate-500 ml-1">({items.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ArticleCard key={item.id} {...item} href={`/felszereles/${item.id}`} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Összes felszerelés */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-slate-400 rounded-full"></span>
            Összes felszerelés cikk
            <span className="text-sm font-normal text-slate-500 ml-1">({equipmentArticles.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {equipmentArticles.map((item) => (
              <ArticleCard key={item.id} {...item} href={`/felszereles/${item.id}`} />
            ))}
          </div>
        </section>

        {/* Fejlesztői útmutató */}
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-slate-400">
          <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm">
            Új felszerelés cikk hozzáadásához szúrj be egy{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">type: &quot;felszereles&quot;</code>{" "}
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
