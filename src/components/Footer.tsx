export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand-600 rounded-md flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-white font-bold text-lg">Onjaro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Magyar kerékpársport-portál tapasztalt kerékpárosok számára. Edzéstervek,
              felszerelés-tanácsok és közösség.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Tartalmak</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Edzéstervek
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Felszerelés-tanácsok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Regeneráció és egészség
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Útvonaltervek
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Kerékpáros típusok</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Országúti kerékpározás
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mountain Bike (MTB)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Ciklokrossz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-sm text-center">
          <p>&copy; {currentYear} Onjaro. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}
