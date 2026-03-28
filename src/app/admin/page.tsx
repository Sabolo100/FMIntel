export const revalidate = 0;

import Link from "next/link";
import { getDashboardStats } from "@/lib/db/stats";

export default async function AdminPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-brand-100 shadow-sm p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Admin felulet
        </h1>
        <p className="text-slate-500 mb-8">Hamarosan</p>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-brand-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-brand-900">
              {stats.companiesCount}
            </p>
            <p className="text-xs text-brand-500">Ceg</p>
          </div>
          <div className="bg-brand-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-brand-900">
              {stats.buildingsCount}
            </p>
            <p className="text-xs text-brand-500">Ingatlan</p>
          </div>
          <div className="bg-brand-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-brand-900">
              {stats.peopleCount}
            </p>
            <p className="text-xs text-brand-500">Ember</p>
          </div>
          <div className="bg-brand-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-brand-900">
              {stats.changesThisMonth}
            </p>
            <p className="text-xs text-brand-500">Valtozas (ho)</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Vissza a fooldalra
        </Link>
      </div>
    </div>
  );
}
