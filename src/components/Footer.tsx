import Link from "next/link";

const navLinks = [
  { href: "/cegek", label: "Cégek" },
  { href: "/ingatlanok", label: "Ingatlanok" },
  { href: "/emberek", label: "Emberek" },
  { href: "/valtozasok", label: "Változások" },
  { href: "/modszertan", label: "Módszertan" },
];

const dataSources = [
  "Nyilvános cégadatok",
  "Ingatlanpiaci jelentések",
  "Sajtóközlemények",
  "LinkedIn adatok",
  "Iparági publikációk",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center group-hover:bg-accent-400 transition-colors">
                <svg
                  className="w-4.5 h-4.5 text-white"
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
              <span className="text-white font-bold text-lg">FM Intel</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              FM Intel - Magyar FM/PM/AM piaci intelligencia platform.
              Facility management, property management es asset management
              adatok, elemzesek es piaci trendek egy helyen.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigacio
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Adatforrasok
            </h3>
            <ul className="space-y-2.5 text-sm">
              {dataSources.map((source) => (
                <li key={source} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-6 text-sm text-center text-brand-400">
          <p>&copy; {currentYear} FM Intel. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}
