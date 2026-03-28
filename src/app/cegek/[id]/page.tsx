export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";
import ServiceTypeBadge from "@/components/ui/ServiceTypeBadge";
import StatusBadge from "@/components/ui/StatusBadge";
import ChangesFeed from "@/components/ChangesFeed";
import { getCompanyById, getCompanyBuildings, getCompanyPeople } from "@/lib/db/companies";
import { getChangesByEntity } from "@/lib/db/changes";
import { serviceTypeLabels, positionCategoryLabels, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const company = await getCompanyById(id);
  if (!company) {
    return { title: "Ceg nem talalhato - FM Intel" };
  }
  return {
    title: `${company.name} - FM Intel`,
    description: company.description || `${company.name} ceginformaciok az FM Intel platformon.`,
  };
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  const [buildings, people, changes] = await Promise.all([
    getCompanyBuildings(id),
    getCompanyPeople(id),
    getChangesByEntity("company", id),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/cegek"
          className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-700 font-medium mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza a cegekhez
        </Link>

        {/* Company header */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {company.name}
            </h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ConfidenceBadge confidence={company.confidence_score} />
              <StatusBadge
                status={company.is_active ? "active" : "inactive"}
                variant="company"
              />
            </div>
          </div>

          {/* Service type badges */}
          {company.service_types && company.service_types.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {company.service_types.map((type) => (
                <ServiceTypeBadge key={type} type={type} showLong />
              ))}
            </div>
          )}

          {/* Description */}
          {company.description && (
            <p className="text-slate-600 leading-relaxed mb-6">
              {company.description}
            </p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {company.website && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Weboldal
                </span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-600 hover:text-accent-700 font-medium hover:underline truncate"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {company.headquarters_city && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Szekhelye
                </span>
                <span className="text-sm text-slate-700">
                  {company.headquarters_city}
                  {company.headquarters_address && `, ${company.headquarters_address}`}
                </span>
              </div>
            )}
            {company.founded_year && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Alapitva
                </span>
                <span className="text-sm text-slate-700">{company.founded_year}</span>
              </div>
            )}
            {company.employee_count_estimate && (
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Letszam (becsles)
                </span>
                <span className="text-sm text-slate-700">
                  ~{company.employee_count_estimate.toLocaleString("hu-HU")} fo
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Buildings managed by this company */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Kezelt ingatlanok
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({buildings.length})
            </span>
          </h2>

          {buildings.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">
              Nincsenek kapcsolodo ingatlanok.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {buildings.map((bm) => (
                <div
                  key={bm.id}
                  className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/ingatlanok/${bm.building_id}`}
                      className="text-sm font-semibold text-slate-800 hover:text-accent-600 transition-colors"
                    >
                      {bm.building?.name || "Ismeretlen ingatlan"}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {serviceTypeLabels[bm.management_role]}
                      {bm.start_date && ` \u00B7 ${formatDate(bm.start_date)}`}
                      {!bm.is_current && bm.end_date && ` - ${formatDate(bm.end_date)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {bm.is_current ? (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                        Aktualis
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        Lezart
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* People at this company */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Munkatarsak
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({people.length})
            </span>
          </h2>

          {people.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">
              Nincsenek kapcsolodo szemelyek.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {people.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/emberek/${job.person_id}`}
                      className="text-sm font-semibold text-slate-800 hover:text-accent-600 transition-colors"
                    >
                      {job.person?.full_name || "Ismeretlen szemely"}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {job.position_title}
                      {job.position_category && ` \u00B7 ${positionCategoryLabels[job.position_category]}`}
                      {job.start_date && ` \u00B7 ${formatDate(job.start_date)}`}
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
