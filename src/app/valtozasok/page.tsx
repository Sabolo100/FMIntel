export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangesFeed from "@/components/ChangesFeed";
import FilterBar from "@/components/ui/FilterBar";
import { getRecentChanges, getChangesByType } from "@/lib/db/changes";
import type { ChangeType } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    changeType?: string;
  }>;
}

export default async function ValtozasokPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let changes;
  if (params.changeType) {
    changes = await getChangesByType(params.changeType as ChangeType, 100);
  } else {
    changes = await getRecentChanges(100);
  }

  const filters = [
    {
      name: "Valtozas tipusa",
      paramName: "changeType",
      options: [
        { value: "new_entity", label: "Uj entitas" },
        { value: "updated_entity", label: "Frissitett entitas" },
        { value: "new_management", label: "Uj kezelesi szerzodes" },
        { value: "ended_management", label: "Megszunt kezeles" },
        { value: "personnel_move", label: "Szemelyi valtozas" },
        { value: "company_relation", label: "Cegkapcsolat valtozas" },
        { value: "data_correction", label: "Adatjavitas" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Valtozasok
            </h1>
            <p className="text-slate-600">
              Piaci mozgasok, szemelyi valtozasok es adatfrissitesek idorendi sorrendben
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <FilterBar filters={filters} />
          </div>

          {/* Changes feed */}
          <div className="bg-white rounded-xl border border-brand-100 p-5">
            <ChangesFeed changes={changes} showAll />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
