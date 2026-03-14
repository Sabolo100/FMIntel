import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import { calculateReadTime } from "@/lib/readTime";
import { newBadgeConfig } from "@/lib/newBadge";
import { gearLevelConfig } from "@/lib/gearLevel";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return articles
    .filter((a) => a.type === "felszereles")
    .map((article) => ({ slug: article.id }));
}

export function generateMetadata({ params }: Props) {
  const article = articles.find(
    (a) => a.id === params.slug && a.type === "felszereles"
  );
  if (!article) return { title: "Felszerelés cikk nem található" };
  return {
    title: `${article.title} – Onjaro`,
    description: article.excerpt,
  };
}

const styleLabel: Record<string, string> = {
  orszaguti: "Országúti",
  mtb: "MTB",
  ciklokrossz: "Ciklokrossz",
  altalanos: "Általános",
};

export default function FelszerelesDetailPage({ params }: Props) {
  const article = articles.find(
    (a) => a.id === params.slug && a.type === "felszereles"
  );

  if (!article) {
    notFound();
  }

  const readTime = calculateReadTime(article.wordCount);
  const formattedDate = new Date(article.date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Vissza gomb */}
        <div className="mb-8">
          <Link
            href="/felszereles"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Vissza a felszerelésekhez
          </Link>
        </div>

        <article>
          {/* Kép placeholder */}
          <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="5.5" cy="17.5" r="3.5" strokeWidth="1.5" />
                <circle cx="18.5" cy="17.5" r="3.5" strokeWidth="1.5" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4" />
              </svg>
            </div>

            {/* Kiemelt ribbon */}
            {article.featured && (
              <div className="absolute top-[22px] right-[-28px] w-28 bg-accent-500 text-white text-xs font-bold text-center py-1 rotate-45 shadow-sm z-10">
                Kiemelt
              </div>
            )}

            {/* Badge a képen */}
            {article.badge && (
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${article.badge.className}`}>
                {article.badge.label}
              </span>
            )}
            {article.isNew && (
              <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${newBadgeConfig.className}`}>
                {newBadgeConfig.label}
              </span>
            )}
          </div>

          {/* Meta sor */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.categoryColor}`}>
              {article.category}
            </span>
            <span className="text-xs text-slate-400">
              Felszerelés · {styleLabel[article.style] ?? article.style}
            </span>
            <span className="text-xs text-slate-400">{formattedDate}</span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" strokeWidth="1.75" strokeLinecap="round" />
                <path strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
              </svg>
              {readTime} olvasás
            </span>
          </div>

          {/* Cím */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-5">
            {article.title}
          </h1>

          {/* Badge-ek */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.priceBadge && (
              <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.priceBadge.className}`}>
                {article.priceBadge.label}
              </span>
            )}
            {article.ageBadge && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${article.ageBadge.className}`}
                title="Célkorosztály"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {article.ageBadge.label}
              </span>
            )}
            {article.gearLevel && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${gearLevelConfig[article.gearLevel].className}`}
                title="Felszerelés szint"
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="5.5" cy="17.5" r="2.5" strokeWidth="1.5" />
                  <circle cx="18.5" cy="17.5" r="2.5" strokeWidth="1.5" />
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4" />
                </svg>
                {gearLevelConfig[article.gearLevel].label}
              </span>
            )}
          </div>

          {/* Bevezető / kivonat */}
          <div className="prose prose-slate max-w-none">
            <p className="text-base text-slate-700 leading-relaxed border-l-4 border-brand-400 pl-4 mb-8 italic">
              {article.excerpt}
            </p>

            {/* Tartalom */}
            {article.content && article.content.length > 0 ? (
              <div className="space-y-5 text-slate-700 leading-relaxed">
                {article.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Ez a cikk hamarosan teljes terjedelmében elérhető lesz. Az összefoglaló már most olvasható fent.
                </p>
                <p>
                  A tartalmat kifejezetten <strong>45-60 éves kerékpárosok</strong> számára állítottuk össze,
                  figyelembe véve a korosztály vásárlóerejét, igényeit és a kerékpározás iránti szenvedélyét.
                </p>
              </div>
            )}
          </div>
        </article>

        {/* Vissza gomb (alul is) */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <Link
            href="/felszereles"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Vissza az összes felszerelés cikkhez
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
