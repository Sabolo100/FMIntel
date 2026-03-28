export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuildingCard from "@/components/BuildingCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import { getBuildings, searchBuildings } from "@/lib/db/buildings";
import type { BuildingType, BuildingClass, BuildingStatus } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    buildingType?: string;
    buildingClass?: string;
    status?: string;
  }>;
}

export default async function IngatlanokPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let buildings;
  if (params.q) {
    buildings = await searchBuildings(params.q);
  } else {
    buildings = await getBuildings({
      buildingType: (params.buildingType as BuildingType) || undefined,
      buildingClass: (params.buildingClass as BuildingClass) || undefined,
      status: (params.status as BuildingStatus) || undefined,
    });
  }

  const filters = [
    {
      name: "Ingatlan tipusa",
      paramName: "buildingType",
      options: [
        { value: "iroda", label: "Iroda" },
        { value: "raktar", label: "Raktar" },
        { value: "logisztikai", label: "Logisztikai" },
        { value: "vegyes", label: "Vegyes hasznalatu" },
      ],
    },
    {
      name: "Osztaly",
      paramName: "buildingClass",
      options: [
        { value: "A+", label: "A+" },
        { value: "A", label: "A" },
        { value: "B+", label: "B+" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
      ],
    },
    {
      name: "Statusz",
      paramName: "status",
      options: [
        { value: "mukodo", label: "Mukodo" },
        { value: "fejlesztes_alatt", label: "Fejlesztes alatt" },
        { value: "tervezett", label: "Tervezett" },
        { value: "felujitas_alatt", label: "Felujitas alatt" },
        { value: "ures", label: "Ures" },
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Ingatlanok</h1>
            <p className="text-slate-600">
              Kereskedelmi ingatlanok a magyar piacon: irodak, raktarak, logisztikai kozpontok
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
            <SearchBar
              placeholder="Kereses nev vagy cim alapjan..."
              defaultValue={params.q}
              paramName="q"
            />
            <FilterBar filters={filters} />
          </div>

          {/* Results */}
          {buildings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {buildings.map((building) => (
                <BuildingCard key={building.id} building={building} />
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
                Nincs talalat
              </h3>
              <p className="text-sm text-slate-500">
                Probald modositani a keresesi felteteleket vagy a szuroket.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
