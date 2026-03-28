export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonCard from "@/components/PersonCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import { getPeople } from "@/lib/db/people";
import type { PositionCategory } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    positionCategory?: string;
  }>;
}

export default async function EmberekPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const people = await getPeople({
    search: params.q || undefined,
    positionCategory: (params.positionCategory as PositionCategory) || undefined,
  });

  const filters = [
    {
      name: "Pozíció kategória",
      paramName: "positionCategory",
      options: [
        { value: "ceo", label: "Vezérigazgató (CEO)" },
        { value: "coo", label: "Operatív igazgató (COO)" },
        { value: "cfo", label: "Pénzügyi igazgató (CFO)" },
        { value: "cto", label: "Technológiai igazgató (CTO)" },
        { value: "fm_director", label: "FM igazgató" },
        { value: "pm_director", label: "PM igazgató" },
        { value: "am_director", label: "AM igazgató" },
        { value: "fm_manager", label: "FM menedzser" },
        { value: "pm_manager", label: "PM menedzser" },
        { value: "am_manager", label: "AM menedzser" },
        { value: "regional_director", label: "Regionális igazgató" },
        { value: "country_manager", label: "Országigazgató" },
        { value: "head_of_operations", label: "Üzemeltetési vezető" },
        { value: "head_of_technical", label: "Műszaki vezető" },
        { value: "board_member", label: "Igazgatósági tag" },
        { value: "partner", label: "Partner" },
        { value: "business_development", label: "Üzletfejlesztés" },
        { value: "leasing_manager", label: "Bérbeadási menedzser" },
        { value: "other", label: "Egyéb" },
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
              Szakmai szereplők
            </h1>
            <p className="text-slate-600">
              Vezetők és döntéshozók az FM/PM/AM szektorban
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
            <SearchBar
              placeholder="Keresés név alapján..."
              defaultValue={params.q}
              paramName="q"
            />
            <FilterBar filters={filters} />
          </div>

          {/* Results */}
          {people.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {people.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-12 h-12 text-brand-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">
                Nincs találat
              </h3>
              <p className="text-sm text-slate-500">
                Próbáld módosítani a keresési feltételeket vagy a szűrőket.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
