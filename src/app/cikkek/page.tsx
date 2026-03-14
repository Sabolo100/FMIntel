import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";
import type { ArticleStyle, ArticleType } from "@/data/articles";

// Szűrő opciók
const typeFilters: { value: ArticleType | "osszes"; label: string }[] = [
  { value: "osszes", label: "Összes" },
  { value: "cikk", label: "Cikkek" },
  { value: "edzesterv", label: "Edzéstervek" },
  { value: "felszereles", label: "Felszerelés" },
];

const styleFilters: { value: ArticleStyle | "osszes"; label: string }[] = [
  { value: "osszes", label: "Minden stílus" },
  { value: "orszaguti", label: "Országúti" },
  { value: "mtb", label: "MTB" },
  { value: "ciklokrossz", label: "Ciklokrossz" },
  { value: "altalanos", label: "Általános" },
];

// Rendezés: legújabb elöl
const allArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const newArticles = allArticles.filter((a) => a.isNew);
const featuredArticles = allArticles.filter((a) => a.featured);

export default function CikkekPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page Hero */}
      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 text-white py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-700/50 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
              Összes tartalom
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4">
              Cikkek és <span className="text-accent-400">tartalmak</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Edzéstervek, technikacikkek, felszerelés-tesztek és életmód-tippek
              45-60 éves kerékpárosoknak. Minden tartalom az életkorodhoz igazítva.
            </p>
          </div>

          {/* Stat badges */}
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              { value: allArticles.filter((a) => a.type === "cikk").length.toString(), label: "Cikk" },
              { value: allArticles.filter((a) => a.type === "edzesterv").length.toString(), label: "Edzésterv" },
              { value: allArticles.filter((a) => a.type === "felszereles").length.toString(), label: "Felszerelés teszt" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-center">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Kiemelt cikkek */}
        {featuredArticles.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-500 rounded-full inline-block"></span>
              Kiemelt tartalmak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} {...article} href={`/cikkek/${article.id}`} />
              ))}
            </div>
          </section>
        )}

        {/* Újdonságok */}
        {newArticles.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full inline-block"></span>
              Legújabb cikkek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newArticles.map((article) => (
                <ArticleCard key={article.id} {...article} href={`/cikkek/${article.id}`} />
              ))}
            </div>
          </section>
        )}

        {/* Típus szerinti szekciók */}
        {typeFilters.slice(1).map(({ value: type, label }) => {
          const typeArticles = allArticles.filter((a) => a.type === type);
          if (typeArticles.length === 0) return null;
          return (
            <section key={type} id={type} className="mb-14 scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-6 bg-brand-500 rounded-full inline-block"></span>
                  {label}
                  <span className="text-sm font-normal text-slate-500 ml-1">({typeArticles.length})</span>
                </h2>
              </div>

              {/* Stílus alapú csoportosítás */}
              {styleFilters.slice(1).map(({ value: style, label: styleLabel }) => {
                const filtered = typeArticles.filter((a) => a.style === style);
                if (filtered.length === 0) return null;
                return (
                  <div key={style} className="mb-8">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      {styleLabel}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filtered.map((article) => (
                        <ArticleCard key={article.id} {...article} href={`/cikkek/${article.id}`} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}

        {/* Új cikk hozzáadása – fejlesztői útmutató */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-slate-400">
          <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm">
            Új cikk hozzáadásához szúrj be egy bejegyzést a{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">src/data/articles.ts</code>{" "}
            fájlba.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
