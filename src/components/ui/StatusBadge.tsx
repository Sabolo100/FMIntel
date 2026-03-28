interface StatusBadgeProps {
  status: string;
  variant?: "building" | "company";
}

const buildingStatusMap: Record<string, { label: string; className: string }> = {
  mukodo: {
    label: "Működő",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  fejlesztes_alatt: {
    label: "Fejlesztés alatt",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  tervezett: {
    label: "Tervezett",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  felujitas_alatt: {
    label: "Felújítás alatt",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  ures: {
    label: "Üres",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

const companyStatusMap: Record<string, { label: string; className: string }> = {
  active: {
    label: "Aktív",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  inactive: {
    label: "Inaktív",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  acquired: {
    label: "Felvásárolt",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  merged: {
    label: "Beolvadt",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  dissolved: {
    label: "Megszűnt",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

export default function StatusBadge({
  status,
  variant = "building",
}: StatusBadgeProps) {
  const statusMap = variant === "building" ? buildingStatusMap : companyStatusMap;
  const config = statusMap[status] ?? {
    label: status,
    className: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
