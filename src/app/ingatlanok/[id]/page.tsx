export const revalidate = 0;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";
import StatusBadge from "@/components/ui/StatusBadge";
import Timeline from "@/components/ui/Timeline";
import ChangesFeed from "@/components/ChangesFeed";
import { getBuildingById, getBuildingManagement } from "@/lib/db/buildings";
import { getChangesByEntity } from "@/lib/db/changes";
import {
  buildingTypeLabels,
  buildingStatusLabels,
  serviceTypeLabels,
  formatDate,
  formatArea,
} from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const building = await getBuildingById(id);
  if (!building) {
    return { title: "Ingatlan nem talalhato - FM Intel" };
  }
  return {
    title: `${building.name} - FM Intel`,
    description: building.description || `${building.name} ingatlan reszletek az FM Intel platformon.`,
  };
}

export default async function BuildingProfilePage({ params }: PageProps) {
  const { id } = await params;
  const building = await getBuildingById(id);

  if (!building) {
    notFound();
  }

  const [management, changes] = await Promise.all([
    getBuildingManagement(id),
    getChangesByEntity("building", id),
  ]);

  const timelineItems = management.map((m) => ({
    title: m.company?.name || "Ismeretlen ceg",
    subtitle: `${serviceTypeLabels[m.management_role]}${m.start_date ? ` \u00B7 ${formatDate(m.start_date)}` : ""}${m.end_date ? ` - ${formatDate(m.end_date)}` : ""}`,
    date: m.is_current ? "Jelenlegi" : formatDate(m.end_date),
    active: m.is_current,
    badge: m.is_current ? (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
        Aktiv
      </span>
    ) : undefined,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/ingatlanok"
          className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-700 font-medium mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vissza az ingatlanokhoz
        </Link>

        {/* Building header */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {building.name}
            </h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ConfidenceBadge confidence={building.confidence_score} />
            </div>
          </div>

          {/* Type, class, status badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-blue-100 text-blue-700 border-blue-200">
              {buildingTypeLabels[building.building_type]}
            </span>
            {building.building_class && (
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-indigo-100 text-indigo-700 border-indigo-200">
                {building.building_class} kategoria
              </span>
            )}
            <StatusBadge status={building.status} variant="building" />
          </div>

          {/* Address */}
          <p className="text-slate-600 mb-6">
            {building.address}, {building.city}
            {building.district && ` (${building.district})`}
            {building.postal_code && ` - ${building.postal_code}`}
          </p>

          {/* Description */}
          {building.description && (
            <p className="text-slate-600 leading-relaxed mb-6">
              {building.description}
            </p>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Terulet
              </span>
              <span className="text-lg font-bold text-slate-800">
                {formatArea(building.gla_sqm)}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Szintek
              </span>
              <span className="text-lg font-bold text-slate-800">
                {building.floors_above != null ? building.floors_above : "\u2014"}
                {building.floors_below != null && building.floors_below > 0 && (
                  <span className="text-sm font-normal text-slate-400">
                    {" "}/ -{building.floors_below}
                  </span>
                )}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Epitesi ev
              </span>
              <span className="text-lg font-bold text-slate-800">
                {building.year_built ?? "\u2014"}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">
                Felujitas eve
              </span>
              <span className="text-lg font-bold text-slate-800">
                {building.year_renovated ?? "\u2014"}
              </span>
            </div>
          </div>
        </section>

        {/* Management (FM/PM/AM) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Kezelok
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({management.length})
            </span>
          </h2>

          {management.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">
              Nincsenek kapcsolodo kezeloi adatok.
            </p>
          ) : (
            <>
              {/* Timeline view */}
              <Timeline items={timelineItems} />

              {/* Detailed list with links */}
              <div className="mt-6 divide-y divide-slate-100">
                {management.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/cegek/${m.company_id}`}
                        className="text-sm font-semibold text-slate-800 hover:text-accent-600 transition-colors"
                      >
                        {m.company?.name || "Ismeretlen ceg"}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {serviceTypeLabels[m.management_role]}
                        {m.start_date && ` \u00B7 ${formatDate(m.start_date)}`}
                        {m.end_date && ` - ${formatDate(m.end_date)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {m.is_current ? (
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
