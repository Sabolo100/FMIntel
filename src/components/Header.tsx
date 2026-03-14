export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
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
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Fő navigáció">
            <a
              href="#tartalmak"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Tartalmak
            </a>
            <a
              href="#edzestervek"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Edzéstervek
            </a>
            <a
              href="#felszereles"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Felszerelés
            </a>
            <a
              href="#kozosseg"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
            >
              Közösség
            </a>
          </nav>

          {/* Mobile menu button (placeholder) */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-brand-600 hover:bg-slate-100 transition-colors"
            aria-label="Menü megnyitása"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
