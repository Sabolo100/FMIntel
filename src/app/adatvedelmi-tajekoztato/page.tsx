import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Adatvédelmi tájékoztató — FM Intel",
  description: "FM Intel adatvédelmi tájékoztató és cookie szabályzat",
};

export default function AdatvedelmiTajekoztato() {
  const updated = "2026. április 9.";

  return (
    <div className="min-h-screen" style={{ background: "#f0f5fb" }}>
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
        {/* Header */}
        <div className="mb-10">
          <span
            className="inline-block text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border mb-5"
            style={{ color: "#0284c7", borderColor: "rgba(2,132,199,0.25)", background: "rgba(2,132,199,0.07)" }}
          >
            Jogi dokumentum
          </span>
          <h1
            className="font-black leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0f172a", letterSpacing: "-0.03em", fontFamily: "'Georgia', serif" }}
          >
            Adatvédelmi tájékoztató
          </h1>
          <p style={{ color: "#64748b" }}>Utoljára frissítve: {updated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-8" style={{ color: "#334155" }}>

          <Section title="1. Az adatkezelő adatai">
            <p>
              <strong>Szolgáltatás neve:</strong> FM Intel — Magyar FM/PM/AM Piaci Intelligencia Platform<br />
              <strong>Weboldal:</strong> fmintel.hu<br />
              <strong>Az adatkezelővel kapcsolatos kérdésekkel forduljon hozzánk az oldalon megadott elérhetőségek egyikén.</strong>
            </p>
          </Section>

          <Section title="2. Az adatvédelmi tájékoztató célja">
            <p>
              Ez az adatvédelmi tájékoztató ismerteti, hogy az FM Intel platform hogyan gyűjt, használ fel és véd
              személyes adatokat a platform használata során. A tájékoztató az Európai Unió általános adatvédelmi
              rendeletének (GDPR — 2016/679/EU rendelet) és a vonatkozó magyar jogszabályoknak megfelelően készült.
            </p>
          </Section>

          <Section title="3. Gyűjtött adatok köre">
            <p>Az FM Intel platform az alábbi adatokat kezeli:</p>
            <ul>
              <li>
                <strong>Nyilvánosan elérhető üzleti adatok:</strong> cégek neve, székhelye, weboldalai,
                üzleti leírása, ingatlankezelési tevékenysége — kizárólag nyilvános forrásokból (cégjegyzék,
                sajtóközlemények, iparági kiadványok, vállalati weboldalak).
              </li>
              <li>
                <strong>Szakmai profiladatok:</strong> ingatlanpiaci szakemberek neve, beosztása, munkáltatója,
                nyilvános LinkedIn profilja — kizárólag nyilvánosan elérhető forrásokból.
              </li>
              <li>
                <strong>Ingatlanadatok:</strong> kereskedelmi ingatlanok neve, helyszíne, paraméterei,
                kezelési adatai — nyilvánosan elérhető forrásokból.
              </li>
            </ul>
            <p>
              A platform <strong>nem gyűjt</strong> felhasználói fiókhoz kötött személyes adatot, nem tárol
              jelszavakat, fizetési adatokat vagy érzékeny személyes adatokat.
            </p>
          </Section>

          <Section title="4. LinkedIn adatintegráció">
            <p>
              Az FM Intel platform LinkedIn API-t használ tartalmak megosztásához. Az integrációval kapcsolatban:
            </p>
            <ul>
              <li>A platform kizárólag az oldalon megjelent nyilvánosan elérhető szakmai adatokat osztja meg LinkedIn-en keresztül.</li>
              <li>A LinkedIn API-on keresztül a platform <strong>nem gyűjt</strong> és nem tárol LinkedIn-felhasználók személyes adatait.</li>
              <li>A LinkedIn adatkezelési gyakorlatáról a LinkedIn adatvédelmi szabályzata tartalmaz tájékoztatást: <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#0284c7" }}>linkedin.com/legal/privacy-policy</a></li>
            </ul>
          </Section>

          <Section title="5. Adatkezelés célja és jogalapja">
            <p>Az adatkezelés célja: ingatlanpiaci és facility management piaci intelligencia nyújtása szakmai felhasználók számára.</p>
            <p>Jogalap: <strong>jogos érdek</strong> (GDPR 6. cikk (1) f) pont) — az üzleti célú, nyilvánosan elérhető
              szakmai adatok feldolgozása és megjelenítése, amely az érintettek szakmai tevékenységével összefüggő,
              nyilvánosan vállalt szerepeikre korlátozódik.</p>
          </Section>

          <Section title="6. Adatok forrása">
            <p>Az FM Intel kizárólag az alábbi nyilvános forrásokat használja:</p>
            <ul>
              <li>Cégbírósági adatok és cégjegyzék (e-cegjegyzek.hu)</li>
              <li>Vállalati weboldalak és sajtóközlemények</li>
              <li>Iparági konferenciák és rendezvények nyilvános programjai</li>
              <li>Ingatlanpiaci kiadványok és jelentések</li>
              <li>Nyilvánosan elérhető szakmai profilok</li>
            </ul>
          </Section>

          <Section title="7. Adattovábbítás">
            <p>
              Az FM Intel személyes adatokat harmadik félnek nem ad el, nem ad át kereskedelmi célra.
              Adattovábbítás kizárólag az alábbi esetekben történik:
            </p>
            <ul>
              <li>Jogszabályi kötelezettség teljesítése esetén</li>
              <li>Technikai szolgáltatók felé (tárhelyszolgáltató, adatbázis-szolgáltató), akik adatfeldolgozóként járnak el és megfelelő adatvédelmi garanciákat nyújtanak</li>
            </ul>
          </Section>

          <Section title="8. Adatmegőrzési idő">
            <p>
              A nyilvánosan elérhető üzleti és szakmai adatokat a platform mindaddig tárolja, amíg az adott
              üzleti entitás aktív és az adatok relevánsak. Az adatok pontosságát rendszeresen felülvizsgáljuk.
            </p>
          </Section>

          <Section title="9. Az érintett jogai">
            <p>Az érintett személyek az alábbi jogokkal rendelkeznek:</p>
            <ul>
              <li><strong>Hozzáférési jog:</strong> tájékoztatást kérhet a kezelt adatairól</li>
              <li><strong>Helyesbítési jog:</strong> pontatlan adatok javítását kérheti</li>
              <li><strong>Törlési jog:</strong> kérheti adatai törlését</li>
              <li><strong>Tiltakozási jog:</strong> tiltakozhat adatai kezelése ellen</li>
              <li><strong>Korlátozási jog:</strong> kérheti az adatkezelés korlátozását</li>
            </ul>
            <p>
              Jogai gyakorlásához kérjük, vegye fel velünk a kapcsolatot az oldalon megadott elérhetőségeken.
              Panasz esetén a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) fordulhat:
              <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" style={{ color: "#0284c7" }}> naih.hu</a>
            </p>
          </Section>

          <Section title="10. Sütik (cookie-k)">
            <p>
              Az FM Intel weboldal kizárólag a működéshez szükséges technikai sütiket (session cookie-kat) használ.
              Harmadik fél sütik, nyomkövető sütik vagy marketing célú sütik nem kerülnek elhelyezésre.
            </p>
          </Section>

          <Section title="11. Biztonság">
            <p>
              Az adatokat SSL/TLS titkosítású kapcsolaton keresztül, biztonságos felhőalapú infrastruktúrán tároljuk.
              Rendszeres biztonsági felülvizsgálatot végzünk az adatok védelme érdekében.
            </p>
          </Section>

          <Section title="12. Tájékoztató módosítása">
            <p>
              Fenntartjuk a jogot, hogy ezt a tájékoztatót bármikor módosítsuk. A módosításokról az oldalon
              tájékoztatást adunk. Az oldal folyamatos használata a módosítások elfogadását jelenti.
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="font-bold mb-3"
        style={{ fontSize: "1.1rem", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}
      >
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: "#475569" }}>
        {children}
      </div>
    </section>
  );
}
