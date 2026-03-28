import Header from "@/components/Header";
import Footer from "@/components/Footer";

const confidenceLevels = [
  {
    label: "Megerositett",
    score: "90-100%",
    color: "bg-green-100 text-green-700 border-green-200",
    description:
      "Tobb fuggetlen forrasbol igazolt adat. Hivatalos ceginformaciok, publikus nyilatkozatok vagy tobbszorosen megerositett hirek.",
  },
  {
    label: "Valoszinu",
    score: "70-89%",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    description:
      "Megbizhato forrasbol szarmazo informacio, amelyet legalabb egy masik forras is tamogat. Iparagi sajtokoezlemenyek, cegoldali frissitesek.",
  },
  {
    label: "Feltetelezett",
    score: "50-69%",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    description:
      "Egyetlen forrasbol szarmazo, meg nem megerositett adat. Iparagi pletykak, nem hivatalos forrasok.",
  },
  {
    label: "Bizonytalan",
    score: "0-49%",
    color: "bg-red-100 text-red-700 border-red-200",
    description:
      "Korlatos vagy nem ellenorzott informacio. Kozvetlen forras hianyaban, kovetkezteteseken alapulo adatok.",
  },
];

const entityTypes = [
  {
    title: "Cegek",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    description:
      "Facility management, property management es asset management szolgaltatok. Taroljuk a ceg alapadatait, szolgaltatasi tipusait, telephelyeit es kapcsolatait.",
  },
  {
    title: "Ingatlanok",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l5-5v18M10 21V6l7-3v18M19 21V5l2-1v17" />
      </svg>
    ),
    description:
      "Kereskedelmi ingatlanok: irodahazak, raktarak, logisztikai kozpontok es vegyes hasznalatu epuletek. Tipusok, osztalyok, teruletek es kezelesi szerzodese.",
  },
  {
    title: "Emberek",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    description:
      "Vezetok es donteshozok az FM/PM/AM szektorban. Karrier-utak, poziciok es cegkapcsolatok nyomon kovetese.",
  },
];

const dataSources = [
  {
    title: "Hirportalok",
    description: "Magyar es nemzetkozi ingatlanpiaci es uzleti hirportalok automatizalt figyelese.",
  },
  {
    title: "Cegweboldalak",
    description: "FM/PM/AM szolgaltatok hivatalos weboldalainak rendszeres ellenorzese valtozasokert.",
  },
  {
    title: "Ingatlanportalok",
    description: "Kereskedelmi ingatlan-adatbazisok es piaci elemzesek feldolgozasa.",
  },
  {
    title: "Ceginformacios adatbazisok",
    description: "Hivatalos cegnyilvantartasi adatok es penzugyi jelentsek integralaas.",
  },
  {
    title: "LinkedIn es szakmai profilok",
    description: "Publikus szakmai profilok figyelese szemelyi valtozasok detektalasara.",
  },
];

export default function ModszertanPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Modszertan</h1>
            <p className="text-slate-600">
              Hogyan gyujtjuk, ellenorizzuk es tartjuk naprakeszen a piaci adatokat
            </p>
          </div>

          {/* How does the system work */}
          <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Hogyan mukodik a rendszer?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A platform egy automatizalt kutatasi pipeline-on alapul, amely folyamatosan
              figyeli a magyar kereskedelmi ingatlanpiac FM (Facility Management),
              PM (Property Management) es AM (Asset Management) szektorat.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              A rendszer napi szinten vegigpasztalja az eloer meghatarozott forrasokat,
              azonositja az uj informaciokat, osszeveti a meglevo adatbazissal, es
              automatikusan frissiti a rekordokat. Minden valtozast naplozunk es
              bizonyossagi szinttel latunk el.
            </p>
            <p className="text-slate-600 leading-relaxed">
              A pipeline harom fo lepesbol all: <strong>adatgyujtes</strong> (forrasok
              bepasztazasa), <strong>normalizalas</strong> (strukturalt adatta alakitas) es{" "}
              <strong>integralas</strong> (meglevo adatbazissal valo osszefeses es frissites).
            </p>
          </div>

          {/* Data sources */}
          <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Adatforrasok</h2>
            <div className="space-y-4">
              {dataSources.map((source) => (
                <div
                  key={source.title}
                  className="flex items-start gap-3 p-4 bg-brand-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{source.title}</h3>
                    <p className="text-sm text-slate-600">{source.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence levels */}
          <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Bizonyossagi szintek
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Minden adatpontot bizonyossagi szinttel latunk el, amely jelzi, mennyire
              megbizhato az informacio. Ez segit a felhasznaloknak a donteshozatalban.
            </p>
            <div className="space-y-4">
              {confidenceLevels.map((level) => (
                <div
                  key={level.label}
                  className="flex items-start gap-4 p-4 rounded-lg border border-brand-50"
                >
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border flex-shrink-0 ${level.color}`}
                  >
                    {level.label} ({level.score})
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {level.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Update frequency */}
          <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Frissitesi gyakorisag
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A rendszer napi kutatasi ciklusokban mukodik. Minden nap automatikusan
              lefutnak a kovetkezo folyamatok:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hirportalok es forrasok automatikus bepasztazasa
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Uj informaciok azonositasa es strukturalasa
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Meglevo adatbazissal valo osszevetes es frissites
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Valtozasok naplozasa es ertesitesek generalasa
              </li>
            </ul>
          </div>

          {/* Entity types */}
          <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Entitas tipusok
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              A rendszer harom fo entitas tipust kovet nyomon, amelyek a magyar FM/PM/AM piac
              legfontosabb szereploit es objektumait reprezentaljak.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {entityTypes.map((entity) => (
                <div
                  key={entity.title}
                  className="p-5 bg-brand-50 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-3">
                    {entity.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{entity.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {entity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
