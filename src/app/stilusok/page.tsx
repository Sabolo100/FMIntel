import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";
import type { ArticleStyle } from "@/data/articles";

const styles = [
  {
    id: "orszaguti" as ArticleStyle,
    title: "Országúti kerékpározás",
    tag: "Road",
    tagline: "Aszfalt, sebesség, teljesítmény",
    description:
      "Az aszfalt szimfóniája — az országúti kerékpározás a sebesség, a technika és az állóképesség egyedi ötvözete. 45-60 évesen ez a sport különösen jutalmaz: a tapasztalat és a tudatos edzésmunka legyőzi a fiatalabb lábakat.",
    highlights: ["Teljesítményoptimalizálás életkor felett", "Bike fitting és ergonómia", "Gran Fondo és versenyfelkészülés", "Carbon kerékpárok világa"],
    color: "brand",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-brand-950 via-brand-900 to-slate-900",
    accentColor: "text-brand-400",
    borderColor: "border-brand-500",
    bgLight: "bg-brand-50",
    iconBg: "bg-brand-100 text-brand-600",
    tagBg: "bg-brand-100 text-brand-700",
  },
  {
    id: "mtb" as ArticleStyle,
    title: "Mountain Bike",
    tag: "MTB",
    tagline: "Terep, kaland, szabadság",
    description:
      "A mountain bike a természet kihívása — erdei ösvények, sziklás szakaszok és lejtők, ahol a technika és a bátorság legalább annyit számít, mint az erő. 45+ évesen az MTB különleges örömöt ad: minden tekerés felfedezés.",
    highlights: ["Tereptechnika és biztonság", "Hardtail vs. fullsuspension", "Útvonaltervezés Magyarországon", "Trail és enduro felszerelés"],
    color: "accent",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
    gradient: "from-orange-950 via-orange-900 to-slate-900",
    accentColor: "text-accent-400",
    borderColor: "border-accent-500",
    bgLight: "bg-accent-50",
    iconBg: "bg-accent-100 text-accent-600",
    tagBg: "bg-accent-100 text-accent-700",
  },
  {
    id: "ciklokrossz" as ArticleStyle,
    title: "Ciklokrossz",
    tag: "CX",
    tagline: "Ősz, sár, verseny, szenvedély",
    description:
      "A ciklokrossz az ősz-tél sportja — verseny, sár, akadályok és fergeteges hangulat. Tömörített intenzitás 30-60 perces futamokban. 45-55 évesen sokan fedezik fel ezt a sportot, és azonnal beleszeretnek.",
    highlights: ["CX technika kezdőknek és haladóknak", "Kerékpár és felszerelés választás", "Versenyfelkészülés és taktika", "Magyar CX bajnokság és versenysorozat"],
    color: "green",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    gradient: "from-green-950 via-green-900 to-slate-900",
    accentColor: "text-green-400",
    borderColor: "border-green-500",
    bgLight: "bg-green-50",
    iconBg: "bg-green-100 text-green-600",
    tagBg: "bg-green-100 text-green-700",
  },
] as const;

export default function StilusokPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Page Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
              Kerékpározási stílusok
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-4">
              Válaszd a <span className="text-accent-400">stílusod</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Legyen szó aszfaltról, erdei ösvényről vagy keresztterepről — minden
              kerékpározási stílushoz megtalálod a tökéletes tartalmakat, edzésterveket
              és felszerelés-tanácsokat.
            </p>
          </div>
        </div>
      </section>

      {/* Style navigation anchors */}
      <nav className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 no-scrollbar">
            {styles.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors py-1"
              >
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${s.tagBg}`}>
                  {s.tag}
                </span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Style sections */}
      {styles.map((style) => {
        const styleArticles = articles.filter((a) => a.style === style.id);
        return (
          <section key={style.id} id={style.id} className="py-16 md:py-20 scroll-mt-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Style header */}
              <div className={`rounded-2xl bg-gradient-to-br ${style.gradient} text-white p-8 md:p-10 mb-10`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/15`}>
                    {style.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 border border-white/30 ${style.accentColor}`}>
                        {style.tag}
                      </span>
                      <span className={`text-sm ${style.accentColor}`}>{style.tagline}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">{style.title}</h2>
                    <p className="text-white/80 leading-relaxed max-w-2xl">{style.description}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {style.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                      <svg className="w-3.5 h-3.5 text-white/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-white/90">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Articles for this style */}
              {styleArticles.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      {style.title} tartalmak
                      <span className="ml-2 text-sm font-normal text-slate-500">({styleArticles.length} bejegyzés)</span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {styleArticles.map((article) => (
                      <ArticleCard key={article.id} {...article} href={`/cikkek/${article.id}`} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p>Hamarosan érkeznek tartalmak ebben a kategóriában.</p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
}
