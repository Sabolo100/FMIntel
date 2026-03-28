export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";
import Timeline from "@/components/ui/Timeline";
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
  if (!person) {
    return { title: "Szemely nem talalhato - FM Intel" };
  }
  return {
    title: `${person.full_name} - FM Intel`,
    description: person.bio || `${person.full_name} profilja az FM Intel platformon.`,
  };
}

export default async function PersonProfilePage({ params }: PageProps) {
  const { id } = await params;
  const person = await getPersonById(id);

  if (!person) {
    notFound();
  }

  const [jobs, changes] = await Promise.all([
    getPersonJobs(id),
    getChangesByEntity("person", id),
  ]);

  const currentJob = jobs.find((j) => j.is_current);

  const timelineItems = jobs.map((job) => ({
    title: job.company?.name || "Ismeretlen ceg",
    subtitle: `${job.position_title}${job.position_category ? ` \u00B7 ${positionCategoryLabels[job.position_category]}` : ""}`,
    date: job.start_date
      ? `${formatDate(job.start_date)}${job.end_date ? ` - ${formatDate(job.end_date)}` : ""}`
      : undefined,
    active: job.is_current,
    badge: job.is_current ? (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
        Jelenlegi
      </span>
    ) : undefined,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/emberek"
          className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-700 font-medium mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza a szereplokhoz
        </Link>

        {/* Person header */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {person.full_name}
            </h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ConfidenceBadge confidence={person.confidence_score} />
              {person.is_active ? (
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-green-100 text-green-700 border-green-200">
                  Aktiv
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-slate-100 text-slate-500 border-slate-200">
                  Inaktiv
                </span>
              )}
            </div>
          </div>

          {/* Current position and company */}
          {(person.current_position || currentJob) && (
            <div className="mb-4">
              <p className="text-slate-600">
                {person.current_position || currentJob?.position_title}
                {currentJob?.company && (
                  <>
                    {" \u2014 "}
                    <Link
                      href={`/cegek/${currentJob.company_id}`}
                      className="text-accent-600 hover:text-accent-700 font-medium hover:underline"
                    >
                      {currentJob.company.name}
                    </Link>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Bio */}
          {person.bio && (
            <p className="text-slate-600 leading-relaxed mb-6">
              {person.bio}
            </p>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {person.linkedin_url && (
              <a
                href={person.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn profil
              </a>
            )}
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {person.email}
              </a>
            )}
          </div>
        </section>

        {/* Career path */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Karrierut
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({jobs.length})
            </span>
          </h2>

          {jobs.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">
              Nincsenek rogzitett munkak.
            </p>
          ) : (
            <>
              {/* Timeline view */}
              <Timeline items={timelineItems} />

              {/* Detailed list with links */}
              <div className="mt-6 divide-y divide-slate-100">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/cegek/${job.company_id}`}
                        className="text-sm font-semibold text-slate-800 hover:text-accent-600 transition-colors"
                      >
                        {job.company?.name || "Ismeretlen ceg"}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.position_title}
                        {job.position_category && ` \u00B7 ${positionCategoryLabels[job.position_category]}`}
                      </p>
                      <p className="text-xs text-slate-400">
                        {job.start_date ? formatDate(job.start_date) : "\u2014"}
                        {job.end_date ? ` - ${formatDate(job.end_date)}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {job.is_current ? (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                          Jelenlegi
                        </span>
                      ) : (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                          Korabbi
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Changes */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Valtozasok
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({changes.length})
            </span>
          </h2>
          <ChangesFeed changes={changes} showAll />
        </section>
      </main>

      <Footer />
    </div>
  );
}
