import React from "react";

interface TimelineItem {
  date?: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  active?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  if (items.length === 0) return null;

  return (
    <div className="relative">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Vertical line */}
            {!isLast && (
              <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-brand-200" />
            )}

            {/* Dot */}
            <div className="relative flex-shrink-0 mt-1">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  item.active
                    ? "border-accent-500 bg-accent-500"
                    : "border-brand-300 bg-white"
                }`}
              >
                {item.active && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold leading-snug ${
                      item.active ? "text-brand-900" : "text-brand-700"
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="text-sm text-brand-500 mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.badge}
                  {item.date && (
                    <time className="text-xs text-brand-400 whitespace-nowrap">
                      {item.date}
                    </time>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
