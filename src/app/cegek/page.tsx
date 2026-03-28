export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import { getCompanies } from "@/lib/db/companies";
import type { ServiceType } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    serviceType?: string;
    status?: string;
  }>;
}

export default async function CegekPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const companies = await getCompanies({
    search: params.q || undefined,
    serviceType: (params.serviceType as ServiceType) || undefined,
    status:
      params.status === "active"
        ? true
        : params.status === "inactive"
        ? false
        : undefined,
  });

  const filters = [
    {
      name: "Szolgáltatás típusa",
      paramName: "serviceType",
      options: [
        { value: "fm", label: "Facility Management" },
        { value: "pm", label: "Property Management" },
        { value: "am", label: "Asset Management" },
      ],
    },
    {
      name: "Státusz",
      paramName: "status",
      options: [
        { value: "active", label: "Aktív" },
        { value: "inactive", label: "Inaktív" },
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Cégek</h1>
            <p className="text-slate-600">
              FM, PM és AM szolgáltatók a magyar kereskedelmi ingatlanpiacon
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
            <SearchBar
              placeholder="Keresés cégnév alapján..."
              defaultValue={params.q}
              paramName="q"
            />
            <FilterBar filters={filters} />
          </div>

          {/* Results */}
          {companies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
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
