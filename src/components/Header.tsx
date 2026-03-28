"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/cegek", label: "Cégek" },
  { href: "/ingatlanok", label: "Ingatlanok" },
  { href: "/emberek", label: "Emberek" },
  { href: "/valtozasok", label: "Változások" },
  { href: "/modszertan", label: "Módszertan" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-brand-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center group-hover:bg-accent-400 transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              FM Intel
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Fő navigáció"
          >
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3.5 py-2 rounded-md transition-colors ${
                    active
                      ? "text-white bg-brand-800"
                      : "text-brand-200 hover:text-white hover:bg-brand-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-brand-200 hover:text-white hover:bg-brand-800 transition-colors"
            aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t border-brand-800 bg-brand-900 px-4 pb-4 pt-2"
          aria-label="Mobil navigáció"
        >
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                  active
                    ? "text-white bg-brand-800"
                    : "text-brand-200 hover:text-white hover:bg-brand-800/60"
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
