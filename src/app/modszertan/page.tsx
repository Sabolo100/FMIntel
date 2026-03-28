import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pipelineSteps = [
  {
    num: "01",
    title: "Adatgyűjtés",
    subtitle: "FETCH",
    description:
      "Automatizált spider-ek naponta végigpásztázzák az előre meghatározott forrásokat — hírportálokat, cégweboldalakat, ingatlan-adatbázisokat és szakmai profilokat. Az összegyűjtött nyers tartalom strukturálatlan szövegként kerül a pipeline-ba.",
    color: "#0284c7",
  },
  {
    num: "02",
    title: "Normalizálás",
    subtitle: "NORMALIZE",
    description:
      "AI-alapú extraction layer azonosítja az entitásokat (cég, ingatlan, személy), kinyeri a releváns attribútumokat, és egységesített strukturált rekordokká alakítja az adatokat. Duplikációszűrés névnormalizálással.",
    color: "#0d9488",
  },
  {
    num: "03",
    title: "Integrálás",
    subtitle: "INTEGRATE",
    description:
      "Az új rekordok összevétése a meglévő adatbázissal. Egyező entitásoknál frissítés és bizonyossági szint újraszámítás. Minden változás naplózásra kerül, teljes auditnyom megőrzéssel.",
    color: "#4f46e5",
  },
];

const confidenceLevels = [
  {
    label: "Megerősített",
    score: 95,
    range: "90–100%",
    hex: "#16a34a",
    description:
      "Több független forrásból igazolt. Hivatalos céginformációk, publikus nyilatkozatok vagy többszörösen megerősített hírek.",
  },
  {
    label: "Valószínű",
    score: 79,
    range: "70–89%",
    hex: "#65a30d",
    description:
      "Megbízható forrásból, legalább egy másik forrás által is támogatva. Iparági sajtóközlemények, cégoldali frissítések.",
  },
  {
    label: "Feltételezett",
    score: 59,
    range: "50–69%",
    hex: "#d97706",
    description:
      "Egyetlen forrásból, még nem megerősített. Iparági hírek, nem hivatalos közlések.",
  },
  {
    label: "Bizonytalan",
    score: 30,
    range: "0–49%",
    hex: "#dc2626",
    description:
      "Korlátolt vagy nem ellenőrzött információ. Következtetéseken alapuló, megerősítésre váró adatok.",
  },
];

const entityTypes = [
  {
    label: "FM · PM · AM",
    title: "Cégek",
    stat: "~400+",
    statLabel: "nyomon követett vállalat",
    description:
      "Facility management, property management és asset management szolgáltatók teljes profiljukkal: szolgáltatástípusok, portfólió méret, kontaktszemélyek és változáshistória.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    label: "IRODA · RAKTÁR · LOGISZTIKA",
    title: "Ingatlanok",
    stat: "~1 200+",
    statLabel: "kereskedelmi ingatlan",
    description:
      "Irodaházak, raktárak, logisztikai központok. Minden rekordhoz típus, épületkategória (A+–C), bérelhető terület és aktuális FM/PM/AM megbízott.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    label: "VEZETŐ · DÖNTÉSHOZÓ",
    title: "Emberek",
    stat: "~800+",
    statLabel: "szakmai szereplő",
    description:
      "Iparági vezetők és döntéshozók teljes karrierútjukkal. Pozícióváltások, cégkapcsolatok és aktuális megbízatások valós idejű követése.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const dataSources = [
  { title: "Hírportálok", sub: "portfolio.hu · property-magazine.eu · fn.hu", icon: "📡" },
  { title: "FM/PM/AM cégweboldalak", sub: "Rendszeres crawl, változásdetekció", icon: "🏢" },
  { title: "Ingatlanportálok", sub: "CBRE · JLL · Cushman & Wakefield", icon: "🗺️" },
  { title: "Céginformációs adatbázisok", sub: "Cégbíróság, KSH, e-cégjegyzék", icon: "🗂️" },
  { title: "Szakmai profilok", sub: "LinkedIn publikus adatok", icon: "👤" },
];

export default function ModszertanPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20" style={{ background: "#ffffff" }}>
        {/* blueprint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(2,132,199,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(2,132,199,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* radial fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(2,132,199,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{
                color: "#0284c7",
                borderColor: "rgba(2,132,199,0.25)",
                background: "rgba(2,132,199,0.07)",
              }}
            >
              RENDSZER DOKUMENTÁCIÓ
            </span>
          </div>

          <h1
            className="font-black leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "#0f172a",
              letterSpacing: "-0.03em",
              fontFamily: "'Georgia', serif",
            }}
          >
            Módszertan
          </h1>

          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "#64748b" }}
          >
            Hogyan gyűjtjük, ellenőrizzük és tartjuk naprakészen a magyar
            kereskedelmi ingatlanpiac FM · PM · AM szektorának adatait — napi
            automatizált kutatási ciklusokban.
          </p>

          {/* stats row */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { n: "Napi", label: "frissítési ciklus" },
              { n: "3", label: "pipeline lépés" },
              { n: "4", label: "bizonyossági szint" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl font-black mb-1"
                  style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
                >
                  {s.n}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#f0f5fb" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "#0284c7" }}>
              01 — Pipeline
            </span>
            <h2 className="text-2xl font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>
              Hogyan működik a rendszer?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.num}
                className="relative rounded-2xl p-8 bg-white"
                style={{ border: "1px solid #e2e8f0" }}
              >
                {/* connector line */}
                {i < 2 && (
                  <div
                    aria-hidden
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px"
                    style={{ background: "#cbd5e1" }}
                  />
                )}

                <div
                  className="text-xs font-mono tracking-widest mb-2"
                  style={{ color: step.color }}
                >
                  {step.subtitle}
                </div>
                <div
                  className="text-6xl font-black leading-none mb-4"
                  style={{
                    color: "rgba(0,0,0,0.05)",
                    fontFamily: "'Georgia', serif",
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#0f172a" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  {step.description}
                </p>

                <div
                  className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}, transparent)`,
                    opacity: 0.5,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTITY TYPES ─────────────────────────────────── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "#0284c7" }}>
              02 — Entitások
            </span>
            <h2 className="text-2xl font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>
              Mit követünk nyomon?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {entityTypes.map((e) => (
              <div
                key={e.title}
                className="rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <div
                    className="text-xs font-mono tracking-widest mb-4"
                    style={{ color: "#94a3b8" }}
                  >
                    {e.label}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(2,132,199,0.1)",
                      color: "#0284c7",
                    }}
                  >
                    {e.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#0f172a" }}
                  >
                    {e.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                    {e.description}
                  </p>
                </div>
                <div
                  className="mt-auto pt-5 border-t"
                  style={{ borderColor: "#e2e8f0" }}
                >
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#0284c7", fontFamily: "'Georgia', serif" }}
                  >
                    {e.stat}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: "#94a3b8" }}>
                    {e.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFIDENCE LEVELS ────────────────────────────── */}
      <section className="py-20" style={{ background: "#f0f5fb" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "#0284c7" }}>
              03 — Adatminőség
            </span>
            <h2 className="text-2xl font-bold" style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}>
              Bizonyossági szintek
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-sm leading-relaxed" style={{ color: "#64748b" }}>
            Minden adatpontot bizonyossági szinttel látunk el, amely jelzi az
            információ megbízhatóságát. A szint alapja a forrásszám, a
            forrás megbízhatósága és a megerősítési státusz.
          </p>

          <div className="space-y-4">
            {confidenceLevels.map((level) => (
              <div
                key={level.label}
                className="rounded-2xl p-6 bg-white"
                style={{ border: "1px solid #e2e8f0" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* label + score */}
                  <div className="sm:w-48 flex-shrink-0">
                    <div
                      className="text-base font-bold mb-0.5"
                      style={{ color: level.hex }}
                    >
                      {level.label}
                    </div>
                    <div
                      className="text-xs font-mono tracking-widest"
                      style={{ color: "#94a3b8" }}
                    >
                      {level.range}
                    </div>
                  </div>

                  {/* bar */}
                  <div className="flex-1">
                    <div
                      className="relative h-2 rounded-full overflow-hidden mb-3"
                      style={{ background: "#f1f5f9" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${level.score}%`,
                          background: `linear-gradient(90deg, ${level.hex}66, ${level.hex})`,
                        }}
                      />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA SOURCES + FREQUENCY ─────────────────────── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Sources */}
            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "#0284c7" }}>
                  04 — Források
                </span>
              </div>
              <h2
                className="text-2xl font-bold mb-8"
                style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
              >
                Adatforrások
              </h2>
              <div className="space-y-0">
                {dataSources.map((src, i) => (
                  <div
                    key={src.title}
                    className="flex items-start gap-4 py-4"
                    style={{
                      borderBottom:
                        i < dataSources.length - 1
                          ? "1px solid #f1f5f9"
                          : "none",
                    }}
                  >
                    <span className="text-2xl leading-none mt-0.5">{src.icon}</span>
                    <div>
                      <div
                        className="font-semibold text-sm mb-1"
                        style={{ color: "#1e293b" }}
                      >
                        {src.title}
                      </div>
                      <div
                        className="text-xs font-mono"
                        style={{ color: "#94a3b8" }}
                      >
                        {src.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "#0284c7" }}>
                  05 — Frissítés
                </span>
              </div>
              <h2
                className="text-2xl font-bold mb-8"
                style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
              >
                Napi ciklus
              </h2>

              <div className="relative pl-6">
                {/* vertical line */}
                <div
                  aria-hidden
                  className="absolute left-0 top-2 bottom-2 w-px"
                  style={{ background: "rgba(2,132,199,0.2)" }}
                />

                {[
                  { time: "01:00", label: "Forrás-crawl", desc: "Hírportálok és weboldalak automatikus bepásztázása" },
                  { time: "03:00", label: "Extrakció", desc: "AI-alapú entitás- és attribútum-kinyerés" },
                  { time: "05:00", label: "Deduplikáció", desc: "Névnormalizálással, fuzzy match-eléssel" },
                  { time: "06:00", label: "Integráció", desc: "DB frissítés, változásnaplózás, bizonyossági szint frissítés" },
                ].map((item) => (
                  <div key={item.time} className="relative mb-8 last:mb-0">
                    {/* dot */}
                    <div
                      aria-hidden
                      className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2"
                      style={{
                        background: "#ffffff",
                        borderColor: "#0284c7",
                      }}
                    />
                    <div
                      className="text-xs font-mono mb-1"
                      style={{ color: "#0284c7" }}
                    >
                      {item.time}
                    </div>
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: "#1e293b" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-xs leading-relaxed"
                      style={{ color: "#94a3b8" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────── */}
      <section
        className="py-12"
        style={{ background: "#f0f5fb", borderTop: "1px solid #e2e8f0" }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex gap-4 items-start">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
              style={{ background: "rgba(2,132,199,0.1)", color: "#0284c7" }}
            >
              i
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              A platform adatai automatizált kutatáson alapulnak és tájékoztató
              jellegűek. Bár minden tőlünk telhetőt megteszünk az adatok
              pontosságáért, a felhasználás előtt az érzékeny döntéshozatali
              helyzetekben javasolt a közvetlen forrásból való megerősítés.
              Az adatok rendszeres frissítése ellenére a valós helyzettől való
              eltérés lehetséges.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
