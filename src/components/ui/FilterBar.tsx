"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDef {
  name: string;
  paramName: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterDef[];
}

export default function FilterBar({ filters }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (paramName: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }

      // Reset to page 1 on filter change
      params.delete("page");

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "?");
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => {
        const currentValue = searchParams.get(filter.paramName) ?? "";
        return (
          <div key={filter.paramName} className="flex flex-col gap-1">
            <label
              htmlFor={`filter-${filter.paramName}`}
              className="text-xs font-medium text-brand-500 uppercase tracking-wider"
            >
              {filter.name}
            </label>
            <select
              id={`filter-${filter.paramName}`}
              value={currentValue}
              onChange={(e) => handleChange(filter.paramName, e.target.value)}
              className="text-sm bg-white border border-brand-200 rounded-lg px-3 py-2 text-brand-800 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors min-w-[140px]"
            >
              <option value="">Osszes</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
