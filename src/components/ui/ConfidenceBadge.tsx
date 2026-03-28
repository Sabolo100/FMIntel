interface ConfidenceBadgeProps {
  confidence: number;
  showLabel?: boolean;
}

function getConfidenceConfig(confidence: number) {
  if (confidence >= 0.8) {
    return {
      label: "Megerositve",
      className: "bg-green-100 text-green-700 border-green-200",
    };
  }
  if (confidence >= 0.6) {
    return {
      label: "Valoszinu",
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
  }
  if (confidence >= 0.4) {
    return {
      label: "Feltetelezett",
      className: "bg-orange-100 text-orange-700 border-orange-200",
    };
  }
  return {
    label: "Bizonytalan",
    className: "bg-red-100 text-red-700 border-red-200",
  };
}

export default function ConfidenceBadge({
  confidence,
  showLabel = true,
}: ConfidenceBadgeProps) {
  const config = getConfidenceConfig(confidence);
  const percentage = Math.round(confidence * 100);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${config.className}`}
      title={`Megbizhatosag: ${percentage}%`}
    >
      {showLabel ? config.label : `${percentage}%`}
    </span>
  );
}
