"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  paramName?: string;
}

export default function SearchBar({
  placeholder = "Kereses...",
  defaultValue,
  paramName = "q",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = defaultValue ?? searchParams.get(paramName) ?? "";

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const value = inputRef.current?.value.trim() ?? "";
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }

      // Reset to page 1 on new search
      params.delete("page");

      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : "?");
    },
    [router, searchParams, paramName]
  );

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <svg
          className="w-4.5 h-4.5 text-brand-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        name={paramName}
        defaultValue={currentValue}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-900 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-500 hover:text-accent-600 transition-colors"
        aria-label="Kereses inditasa"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </form>
  );
}
