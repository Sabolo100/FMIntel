"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/stilusok", label: "Stílusok" },
  { href: "/cikkek", label: "Cikkek" },
  { href: "/edzestervek", label: "Edzéstervek" },
  { href: "/felszereles", label: "Felszerelés" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="5.5" cy="17.5" r="3.5" strokeWidth="2" />
                <circle cx="18.5" cy="17.5" r="3.5" strokeWidth="2" />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0M9 17.5l2-5 3-2 2-4"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">Onjaro</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Fő navigáció">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                    active
                      ? "text-brand-600 bg-brand-50"
                      : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-brand-600 hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2" aria-label="Mobil navigáció">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                  active
                    ? "text-brand-600 bg-brand-50"
                    : "text-slate-700 hover:text-brand-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
