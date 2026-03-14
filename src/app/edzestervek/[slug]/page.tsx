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

const trainingPlans = articles.filter((a) => a.type === "edzesterv");

export function generateStaticParams() {
  return trainingPlans.map((plan) => ({ slug: plan.id }));
}

export function generateMetadata({ params }: Props) {
  const plan = trainingPlans.find((a) => a.id === params.slug);
  if (!plan) return { title: "Edzésterv nem található" };
  return {
    title: `${plan.title} – Onjaro`,
    description: plan.excerpt,
  };
}

const styleLabel: Record<string, string> = {
  orszaguti: "Országúti",
  mtb: "MTB",
  ciklokrossz: "Ciklokrossz",
  altalanos: "Általános",
};

const difficultyLabel: Record<string, string> = {
  kezdő: "Kezdő",
  középhaladó: "Középhaladó",
  haladó: "Haladó",
};

const difficultyColors: Record<string, string> = {
  kezdő: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  középhaladó: "bg-amber-100 text-amber-700 border border-amber-200",
  haladó: "bg-red-100 text-red-700 border border-red-200",
};

export default function EdzestervDetailPage({ params }: Props) {
  const plan = trainingPlans.find((a) => a.id === params.slug);

  if (!plan) {
    notFound();
  }

  const readTime = calculateReadTime(plan.wordCount);
  const formattedDate = new Date(plan.date).toLocaleDateString("hu-HU", {
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
            href="/edzestervek"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Vissza az edzéstervekhez
          </Link>
        </div>

        <article>
          {/* Kép placeholder */}
          <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-900 to-slate-800 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-brand-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>

            {/* Kiemelt ribbon */}
            {plan.featured && (
              <div className="absolute top-[22px] right-[-28px] w-28 bg-accent-500 text-white text-xs font-bold text-center py-1 rotate-45 shadow-sm z-10">
                Kiemelt
              </div>
            )}

            {/* Badge a képen */}
            {plan.badge && (
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${plan.badge.className}`}>
                {plan.badge.label}
              </span>
            )}
            {plan.isNew && (
              <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${newBadgeConfig.className}`}>
                {newBadgeConfig.label}
              </span>
            )}
          </div>

          {/* Meta sor */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${plan.categoryColor}`}>
              {plan.category}
            </span>
            <span className="text-xs text-slate-400">
              Edzésterv · {styleLabel[plan.style] ?? plan.style}
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
            {plan.title}
          </h1>

          {/* Edzésterv összefoglaló kártyák */}
          {(plan.weeksDuration || plan.sessionsPerWeek || plan.difficulty) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 bg-white rounded-2xl border border-slate-200 p-4">
              {plan.weeksDuration && (
                <div className="flex flex-col items-center text-center p-2">
                  <svg className="w-5 h-5 text-brand-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
                    <path strokeWidth="1.5" strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span className="text-xl font-bold text-slate-900">{plan.weeksDuration}</span>
                  <span className="text-xs text-slate-500">hét</span>
                </div>
              )}
              {plan.sessionsPerWeek && (
                <div className="flex flex-col items-center text-center p-2">
                  <svg className="w-5 h-5 text-brand-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xl font-bold text-slate-900">{plan.sessionsPerWeek}×</span>
                  <span className="text-xs text-slate-500">edzés / hét</span>
                </div>
              )}
              {plan.difficulty && (
                <div className="flex flex-col items-center text-center p-2">
                  <svg className="w-5 h-5 text-brand-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColors[plan.difficulty]}`}>
                    {difficultyLabel[plan.difficulty] ?? plan.difficulty}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">szint</span>
                </div>
              )}
            </div>
          )}

          {/* Badge-ek */}
          <div className="flex flex-wrap gap-2 mb-6">
            {plan.recoveryTime && (
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${plan.recoveryTime.className}`}
                title="Ajánlott regenerációs idő">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {plan.recoveryTime.label}
              </span>
            )}
            {plan.intensityZone && (
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${plan.intensityZone.className}`}
                title={plan.intensityZone.description}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {plan.intensityZone.zone} – {plan.intensityZone.description}
              </span>
            )}
            {plan.ageBadge && (
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${plan.ageBadge.className}`}
                title="Célkorosztály">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {plan.ageBadge.label}
              </span>
            )}
            {plan.gearLevel && (
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${gearLevelConfig[plan.gearLevel].className}`}
                title="Felszerelés szint">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="5.5" cy="17.5" r="2.5" strokeWidth="1.5" />
                  <circle cx="18.5" cy="17.5" r="2.5" strokeWidth="1.5" />
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4" />
                </svg>
                {gearLevelConfig[plan.gearLevel].label}
              </span>
            )}
          </div>

          {/* Bevezető / kivonat */}
          <div className="prose prose-slate max-w-none">
            <p className="text-base text-slate-700 leading-relaxed border-l-4 border-brand-400 pl-4 mb-8 italic">
              {plan.excerpt}
            </p>

            {/* Tartalom */}
            {plan.content && plan.content.length > 0 ? (
              <div className="space-y-5 text-slate-700 leading-relaxed">
                {plan.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Ez az edzésterv hamarosan teljes terjedelmében elérhető lesz. Az összefoglaló már most olvasható fent.
                </p>
                <p>
                  A programot kifejezetten <strong>45-60 éves kerékpárosok</strong> számára állítottuk össze,
                  figyelembe véve a korosztály fizikai sajátosságait, az ízületek védelmét és a regeneráció
                  fontosságát.
                </p>
              </div>
            )}
          </div>
        </article>

        {/* Vissza gomb (alul is) */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <Link
            href="/edzestervek"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Vissza az összes edzéstervhez
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
