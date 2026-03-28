import type { ServiceType } from "@/lib/types";

interface ServiceTypeBadgeProps {
  type: ServiceType;
  showLong?: boolean;
}

const serviceConfig: Record<
  ServiceType,
  { short: string; long: string; className: string }
> = {
  fm: {
    short: "FM",
    long: "Facility Management",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  pm: {
    short: "PM",
    long: "Property Management",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  am: {
    short: "AM",
    long: "Asset Management",
    className: "bg-accent-100 text-accent-700 border-accent-200",
  },
};

export default function ServiceTypeBadge({
  type,
  showLong = false,
}: ServiceTypeBadgeProps) {
  const config = serviceConfig[type];

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.className}`}
    >
      {config.short}
      {showLong && (
        <span className="font-normal ml-0.5">{config.long}</span>
      )}
    </span>
  );
}
