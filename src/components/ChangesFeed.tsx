import type { Change, ChangeType, EntityType } from "@/lib/types";
import { changeTypeLabels, formatDate } from "@/lib/utils";

interface ChangesFeedProps {
  changes: Change[];
  showAll?: boolean;
}

function ChangeIcon({ type }: { type: ChangeType }) {
  const baseClass = "w-4 h-4 flex-shrink-0";

  switch (type) {
    case "new_entity":
      return (
        <svg className={`${baseClass} text-green-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      );
    case "updated_entity":
      return (
        <svg className={`${baseClass} text-blue-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      );
    case "personnel_move":
      return (
        <svg className={`${baseClass} text-purple-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
    case "new_management":
      return (
        <svg className={`${baseClass} text-accent-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
        </svg>
      );
    case "ended_management":
      return (
        <svg className={`${baseClass} text-orange-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9" />
        </svg>
      );
    case "company_relation":
      return (
        <svg className={`${baseClass} text-indigo-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.373" />
        </svg>
      );
    case "data_correction":
      return (
        <svg className={`${baseClass} text-slate-500`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 21h18" />
        </svg>
      );
    default:
      return (
        <svg className={`${baseClass} text-slate-400`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

function entityLink(entityType: EntityType, entityId: string): string {
  switch (entityType) {
    case "company":
      return `/cegek/${entityId}`;
    case "building":
      return `/ingatlanok/${entityId}`;
    case "person":
      return `/emberek/${entityId}`;
    default:
      return "#";
  }
}

const entityTypeLabels: Record<EntityType, string> = {
  company: "Cég",
  building: "Ingatlan",
  person: "Személy",
};

export default function ChangesFeed({ changes, showAll = false }: ChangesFeedProps) {
  const displayChanges = showAll ? changes : changes.slice(0, 10);

  if (displayChanges.length === 0) {
    return (
      <div className="text-center py-8 text-brand-400 text-sm">
        Nincsenek változások a megadott időszakban.
      </div>
    );
  }

  return (
    <div className="divide-y divide-brand-100">
      {displayChanges.map((change) => (
        <div
          key={change.id}
          className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0"
        >
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
            <ChangeIcon type={change.change_type} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm text-brand-800">
                  <span className="font-medium">
                    {changeTypeLabels[change.change_type]}
                  </span>
                  <span className="text-brand-400 mx-1.5">&middot;</span>
                  <a
                    href={entityLink(change.entity_type, change.entity_id)}
                    className="text-accent-600 hover:text-accent-700 font-medium hover:underline"
                  >
                    {entityTypeLabels[change.entity_type]}
                  </a>
                </p>
                {change.change_summary && (
                  <p className="text-sm text-brand-500 mt-0.5 line-clamp-2">
                    {change.change_summary}
                  </p>
                )}
              </div>
              <time className="text-xs text-brand-400 whitespace-nowrap flex-shrink-0">
                {formatDate(change.detected_at)}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
