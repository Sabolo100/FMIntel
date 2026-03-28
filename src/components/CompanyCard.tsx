import Link from "next/link";
import type { Company } from "@/lib/types";
import ServiceTypeBadge from "@/components/ui/ServiceTypeBadge";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";

interface CompanyCardProps {
  company: Company;
  buildingCount?: number;
  peopleCount?: number;
}

export default function CompanyCard({
  company,
  buildingCount,
  peopleCount,
}: CompanyCardProps) {
  return (
    <Link
      href={`/cegek/${company.id}`}
      className="block bg-white rounded-xl border border-brand-100 p-5 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-bold text-brand-900 group-hover:text-accent-600 transition-colors leading-snug">
          {company.name}
        </h3>
        <ConfidenceBadge confidence={company.confidence} showLabel={false} />
      </div>

      {/* Service type badges */}
      {company.service_types && company.service_types.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {company.service_types.map((type) => (
            <ServiceTypeBadge key={type} type={type} />
          ))}
        </div>
      )}

      {/* Description */}
      {company.description && (
        <p className="text-sm text-brand-600 leading-relaxed line-clamp-2 mb-4">
          {company.description}
        </p>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-4 text-xs text-brand-400 pt-3 border-t border-brand-50">
        {company.headquarters_city && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {company.headquarters_city}
          </span>
        )}
        {typeof buildingCount === "number" && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17"
              />
            </svg>
            {buildingCount} ingatlan
          </span>
        )}
        {typeof peopleCount === "number" && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            {peopleCount} fo
          </span>
        )}
      </div>
    </Link>
  );
}
