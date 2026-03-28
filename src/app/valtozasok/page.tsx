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
      name: "Változás típusa",
      paramName: "changeType",
      options: [
        { value: "new_entity", label: "Új entitás" },
        { value: "updated_entity", label: "Frissített entitás" },
        { value: "new_management", label: "Új kezelési szerződés" },
        { value: "ended_management", label: "Megszűnt kezelés" },
        { value: "personnel_move", label: "Személyi változás" },
        { value: "company_relation", label: "Cégkapcsolat változás" },
        { value: "data_correction", label: "Adatjavítás" },
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
              Változások
            </h1>
            <p className="text-slate-600">
              Piaci mozgások, személyi változások és adatfrissítések időrendi sorrendben
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
