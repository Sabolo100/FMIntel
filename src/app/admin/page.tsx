export const revalidate = 0;

import Link from "next/link";
import { getDashboardStats } from "@/lib/db/stats";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Vezérlőpult</h1>
        <p className="text-sm text-slate-500 mt-1">
          Adatbázis áttekintés és gyors műveletek
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          href="/admin/entities?table=companies"
          className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
        >
          <p className="text-3xl font-bold text-slate-900">
            {stats.companiesCount}
          </p>
          <p className="text-sm text-slate-500 mt-1">Cég</p>
        </Link>
        <Link
          href="/admin/entities?table=buildings"
          className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
        >
          <p className="text-3xl font-bold text-slate-900">
            {stats.buildingsCount}
          </p>
          <p className="text-sm text-slate-500 mt-1">Ingatlan</p>
        </Link>
        <Link
          href="/admin/entities?table=people"
          className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
        >
          <p className="text-3xl font-bold text-slate-900">
            {stats.peopleCount}
          </p>
          <p className="text-sm text-slate-500 mt-1">Személy</p>
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-3xl font-bold text-slate-900">
            {stats.changesThisMonth}
          </p>
          <p className="text-sm text-slate-500 mt-1">Változás (hónap)</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Gyors műveletek
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/entities?table=companies"
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Cégek kezelése</p>
              <p className="text-xs text-slate-500">Szerkesztés, törlés, összevonás</p>
            </div>
          </Link>
          <Link
            href="/admin/prompts"
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Promptok szerkesztése</p>
              <p className="text-xs text-slate-500">AI keresési és kinyerési promptok</p>
            </div>
          </Link>
          <Link
            href="/admin/tips"
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Research tippek</p>
              <p className="text-xs text-slate-500">URL-ek, cégnevek megadása</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
