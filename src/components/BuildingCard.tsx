import Link from "next/link";
import type { Building } from "@/lib/types";
import StatusBadge from "@/components/ui/StatusBadge";
import { buildingTypeLabels, formatArea } from "@/lib/utils";

interface BuildingCardProps {
  building: Building;
}

export default function BuildingCard({ building }: BuildingCardProps) {
  return (
    <Link
      href={`/ingatlanok/${building.id}`}
      className="block bg-white rounded-xl border border-brand-100 p-5 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-bold text-brand-900 group-hover:text-accent-600 transition-colors leading-snug">
          {building.name}
        </h3>
        <StatusBadge status={building.status} variant="building" />
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-brand-50 text-brand-700 border-brand-200">
          {buildingTypeLabels[building.building_type] ?? building.building_type}
        </span>
        {building.building_class && (
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
            {building.building_class}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-4">
        <p className="text-sm text-brand-600 flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-brand-400 flex-shrink-0"
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
          <span className="truncate">
            {building.address}, {building.city}
          </span>
        </p>
        {building.total_area_sqm && (
          <p className="text-sm text-brand-600 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-brand-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
            {formatArea(building.total_area_sqm)}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-brand-400 pt-3 border-t border-brand-50">
        {building.year_built && (
          <span>Építési év: {building.year_built}</span>
        )}
        {building.floors && (
          <span>{building.floors} emelet</span>
        )}
      </div>
    </Link>
  );
}
