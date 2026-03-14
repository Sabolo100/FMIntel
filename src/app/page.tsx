import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { calculateReadTime } from "@/lib/readTime";
import { priceBadgeConfig } from "@/lib/priceBadge";

const categories = [
  {
    id: "orszaguti",
    title: "Országúti kerékpározás",
    description:
      "Technika, felszerelés és edzéstervek az aszfalt szerelmeseinek. Teljesítményoptimalizálás 45+ évesen.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: "brand",
    tag: "Road",
  },
  {
    id: "mtb",
    title: "Mountain Bike",
    description:
      "Terep, technika és kaland. MTB tippek és útvonalak kezdőknek és tapasztalt bringásoknak.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
        />
      </svg>
    ),
    color: "accent",
    tag: "MTB",
  },
  {
    id: "ciklokrossz",
    title: "Ciklokrossz",
    description:
      "Az őszi-téli szezon izgalma. Verseny, felkészülés és felszerelés-tanácsok ciklokrossz rajongóknak.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    color: "green",
    tag: "CX",
  },
];

const features = [
  {
    title: "Életkorhoz igazított edzéstervek",
    description:
      "Regeneráció, ízületvédelem és teljesítményoptimalizálás 45-60 éves korosztály számára tervezett programokkal.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: "Prémium felszerelés-tanácsok",
    description:
      "Objektív vélemények és összehasonlítások a legjobb kerékpáros felszerelésekről. Tudatos vásárlói döntések.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    title: "Közösség és motiváció",
    description:
      "Csatlakozz hasonló gondolkodású kerékpárosokhoz. Tapasztalatcsere, közös tekerések és inspiráció.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Egészség és életmód",
    description:
      "Táplálkozási tippek, regenerációs technikák és az egyensúly megteremtése munka, család és sport között.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

type ArticleBadge = {
  label: string;
  className: string;
} | null;

const latestArticles: {
  category: string;
  title: string;
  excerpt: string;
  wordCount: number;
  categoryColor: string;
  badge: ArticleBadge;
  priceBadge?: { label: string; className: string } | null;
  featured?: boolean;
}[] = [
  {
    category: "Edzésterv",
    title: "Kerékpáros alapozó program 50 év felett",
    featured: true,
    excerpt:
      "Hogyan kezdd el vagy folytasd a kerékpározást biztonságosan? Átfogó 8 hetes edzésterv tapasztalt bringásoknak.",
    wordCount: 1600,
    categoryColor: "bg-brand-100 text-brand-700",
    badge: {
      label: "Ajánlott 50+",
      className: "bg-brand-600 text-white",
    },
    priceBadge: null,
  },
  {
    category: "Felszerelés",
    title: "A legjobb carbon országúti kerékpárok 2024-ben",
    excerpt:
      "Prémium carbon kerékpárok összehasonlítása: Specialized, Trek, Canyon és Colnago modellek részletes elemzése.",
    wordCount: 2400,
    categoryColor: "bg-accent-100 text-accent-700",
    badge: {
      label: "Tesztelt",
      className: "bg-accent-500 text-white",
    },
    priceBadge: priceBadgeConfig.premium,
  },
  {
    category: "MTB",
    title: "Top 5 MTB útvonal a Balaton-felvidéken",
    excerpt:
      "Lenyűgöző tájak, változatos terep és kihívó szakaszok. A legjobb mountain bike útvonalak a Bakony szívében.",
    wordCount: 1200,
    categoryColor: "bg-green-100 text-green-700",
    badge: {
      label: "Tipp",
      className: "bg-green-600 text-white",
    },
    priceBadge: null,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-800/50 border border-brand-700/50 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
              Magyar kerékpársport-portál
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              Kerékpározz{" "}
              <span className="text-accent-400">szenvedéllyel,</span>{" "}
              tekeress okosan
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Edzéstervek, felszerelés-tanácsok és tippek 45-60 éves kerékpárosoknak.
              Országúti, MTB és ciklokrossz — a te tempódban, a te életkorodhoz igazítva.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#tartalmak"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Fedezd fel a tartalmakat
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#edzestervek"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Edzéstervek
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-white/10">
              {[
                { value: "45–60", label: "Célkorosztály (év)" },
                { value: "3", label: "Kerékpározási stílus" },
                { value: "100%", label: "Magyar tartalom" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section id="tartalmak" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Válaszd a stílusod
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Legyen szó aszfaltról, erdei ösvényről vagy keresztterepről — minden
              kerékpározási stílushoz megtalálod a tökéletes tartalmakat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      cat.color === "brand"
                        ? "bg-brand-100 text-brand-600"
                        : cat.color === "accent"
                        ? "bg-accent-100 text-accent-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {cat.icon}
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      cat.color === "brand"
                        ? "bg-brand-50 text-brand-600"
                        : cat.color === "accent"
                        ? "bg-accent-50 text-accent-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {cat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cat.description}</p>

                <div className="mt-4 flex items-center gap-1 text-brand-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Tovább</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Miért az Onjaro?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Olyan tartalmakat hozunk létre, amelyek figyelembe veszik az életkorodat,
              az élettapasztalatod és a valós igényeid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section id="edzestervek" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Legújabb cikkek
              </h2>
              <p className="text-slate-600">
                Friss tartalmak kerékpáros életmódhoz és sporthoz
              </p>
            </div>
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
            >
              Összes cikk
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <article
                key={article.title}
                className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {article.featured && (
                  <div className="absolute top-[22px] right-[-28px] w-28 bg-accent-500 text-white text-xs font-bold text-center py-1 rotate-45 shadow-sm z-10">
                    Kiemelt
                  </div>
                )}
                {/* Placeholder image area */}
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="5.5" cy="17.5" r="3.5" strokeWidth="1.5" />
                      <circle cx="18.5" cy="17.5" r="3.5" strokeWidth="1.5" />
                      <path
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4"
                      />
                    </svg>
                  </div>
                  {article.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${article.badge.className}`}
                    >
                      {article.badge.label}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.categoryColor}`}
                    >
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" strokeWidth="1.75" strokeLinecap="round" />
                        <path strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                      </svg>
                      {calculateReadTime(article.wordCount)} olvasás
                    </span>
                  </div>
                  {article.priceBadge && (
                    <div className="mb-3">
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.priceBadge.className}`}
                      >
                        {article.priceBadge.label}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700 transition-colors"
                  >
                    Olvasd el
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Indulj el a helyes irányba
          </h2>
          <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
            Csatlakozz a magyar kerékpáros közösséghez és fedezd fel, hogyan hozhatsz ki
            többet a tekerésből 45-60 évesen.
          </p>
          <a
            href="#tartalmak"
            className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Tartalmak felfedezése
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
