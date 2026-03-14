import { priceBadgeConfig } from "@/lib/priceBadge";
import { recoveryTimeConfig } from "@/lib/recoveryTime";
import { intensityZoneConfig } from "@/lib/intensityZone";
import { ageBadgeConfig } from "@/lib/ageBadge";
import type { RecoveryTime } from "@/lib/recoveryTime";
import type { IntensityZone } from "@/lib/intensityZone";
import type { AgeBadge } from "@/lib/ageBadge";
import type { PriceBadge } from "@/lib/priceBadge";
import type { GearLevel } from "@/lib/gearLevel";

export type ArticleStyle = "orszaguti" | "mtb" | "ciklokrossz" | "altalanos";
export type ArticleType = "cikk" | "edzesterv" | "felszereles";

export type Article = {
  id: string;
  type: ArticleType;
  style: ArticleStyle;
  category: string;
  title: string;
  excerpt: string;
  wordCount: number;
  date: string;
  categoryColor: string;
  badge: { label: string; className: string } | null;
  priceBadge?: PriceBadge | null;
  featured?: boolean;
  recoveryTime?: RecoveryTime | null;
  isNew?: boolean;
  intensityZone?: IntensityZone | null;
  ageBadge?: AgeBadge | null;
  gearLevel?: GearLevel | null;
  content?: string[];
  // Edzésterv-specifikus mezők
  weeksDuration?: number;
  sessionsPerWeek?: number;
  difficulty?: "kezdő" | "középhaladó" | "haladó";
};

/**
 * Az összes tartalom (cikk, edzésterv, felszerelés).
 * Új bejegyzés hozzáadásához szúrj be egy új objektumot ebbe a tömbhöz.
 */
export const articles: Article[] = [
  // ─────────────────────────────
  // CIKKEK
  // ─────────────────────────────
  {
    id: "c1",
    type: "cikk",
    style: "altalanos",
    category: "Egészség",
    title: "Nyújtás és regeneráció 45+ kerékpárosoknak",
    excerpt:
      "Miért különösen fontos a rendszeres nyújtás 45 év felett? Hatékony nyújtási rutinok és regenerációs technikák aktív bringásoknak.",
    wordCount: 1400,
    date: "2026-02-28",
    categoryColor: "bg-rose-100 text-rose-700",
    badge: { label: "Tipp", className: "bg-rose-600 text-white" },
    isNew: true,
    ageBadge: ageBadgeConfig["45_beginner"],
    recoveryTime: recoveryTimeConfig.light,
    gearLevel: "basic",
    content: [
      "45 év felett a test regenerációs képessége észrevehetően lassul – ezt minden tapasztalt kerékpáros a saját bőrén érzi. Ami fiatalon egy éjszakát vett igénybe, most két-három napot igényel. Ez nem gyengeség, hanem egyszerű biológiai tény: az izomszövetek javítása, a gyulladások csillapítása és az ízületek felkészítése a következő edzésre hosszabb időt kíván. A jó hír: a megfelelő nyújtási és regenerációs rutin sokat segíthet ezen a folyamaton.",
      "A kerékpározás mint sport rendkívül egyoldalú terhelést jelent a testre. A hajlított testtartás megrövidíti a mellizmokat és a csípőhajlítókat, a folyamatos lábmozgás pedig a combhajlítókat és a vádlikat terheli erősen. Ezért különösen fontos, hogy minden tekerés után legalább 10-15 percet szánjunk a nyújtásra. A statikus nyújtás ideális levezetésként: tartsd a pozíciót 30-45 másodpercig, és lélegezz mélyen, hogy a vér átjárja az izomszövetet.",
      "A legfontosabb nyújtandó izomcsoportok kerékpárosoknak: a combhajlítók (hamstrings), a csípőhajlítók (iliopsoas), a vádlik (gastrocnemius és soleus), a mellizom és a nyak hátsó izma. A csípőhajlító nyújtásához állj egyenes háttal térdre, a hátsó lábat kinyújtva; ez az ún. harcos póz kiváló kiindulópontja. A vádlit falnak támaszkodva nyújthatod: társd szét a lábaid, a hátsó lábat tartsd egyenesen, és hajolj a fal felé lassan.",
      "A nyújtáson túl a regeneráció más eszközei is rendelkezésre állnak. A habhengerrel (foam roller) végzett önmasszázs – különösen az IT-szalag, a vádli és a combhajlítók területén – hatékonyan oldja a feszültséget és javítja a vérkeringést. Hideg-meleg váltózuhany szintén segít: a hideg víz csökkenti a gyulladást, a meleg ellazítja az izmokat. Egy héten egyszer érdemes könnyű úszást vagy jóga-foglalkozást is beiktatni aktív regenerációként.",
      "Ne feledkezz meg az alvás szerepéről sem: a legtöbb izomépítés és javítás éjszaka, alvás közben történik. 45 év felett legalább 7-8 óra minőségi alvás elengedhetetlen a megfelelő felépüléshez. Ha jellemzően fáradtan ébredsz, vagy az izomfájdalom a szokásosnál tovább tart, az egyértelmű jele, hogy több pihenőre van szükséged. Hallgass a testedre – a regeneráció a kerékpáros edzés szerves része, nem luxus.",
    ],
  },
  {
    id: "c2",
    type: "cikk",
    style: "ciklokrossz",
    category: "Ciklokrossz",
    title: "Ciklokrossz kezdőknek: minden amit tudnod kell",
    excerpt:
      "Az őszi-téli szezon legemocionalitásabb sportága. Hogyan kezdj el ciklokrosszozni 45-50 évesen, és mit kell tudni a versenyzésről?",
    wordCount: 1800,
    date: "2026-01-15",
    categoryColor: "bg-green-100 text-green-700",
    badge: { label: "Útmutató", className: "bg-green-600 text-white" },
    ageBadge: ageBadgeConfig["45_beginner"],
    gearLevel: "mid",
    intensityZone: intensityZoneConfig.z3,
    content: [
      "A ciklokrossz az egyik legsokszínűbb kerékpársport: rövid, 40-60 perces versenyeken fű, sár, homok és fakorlátok váltogatják egymást, miközben a versenyzők kerékpárjukon hajtanak, majd akadályoknál leugranak és futnak. Bár a sport neve alapján riasztónak tűnhet, a valóságban kiváló lehetőséget kínál az őszi-téli szezonban is aktív maradni – sőt, a 45-55 éves korosztályban erős versenysereg versenyez szerte Magyarországon és Európában.",
      "Az első kérdés mindig: kell-e speciális kerékpár? Az igazi CX-bringák geometriájukban és gumijukban különböznek az országúti kerékpároktól: alacsonyabb állvány, szélesebb gumiprofilok (33-40 mm), és a keret alul elegendő sárlerakódásnak hagy helyet. Kezdőknek nem szükséges azonnal profi géppel érkezni – egy gravel bike vagy akár egy jó állapotban lévő öreg cross-kerékpár is megfelel az első szezonra. A legfontosabb beruházás a jó minőségű sisak és a megfelelő cipő.",
      "A ciklokrossz technikák közül a legfontosabb a le- és felszállás mesterfokon. Akadálynál (hurdle) a kerékpáros a bal lábbal a pedálra támaszkodva jobb lábát átveti a kerékpár felett, majd fut a kerékpárjával, és a másik oldalon ismét felugrik. Ez a mozdulat 45-50 évesen is megtanulható – ajánlott füvön gyakorolni lassan, majd fokozatosan gyorsítani. A lényeg: ne kapkodd el, a technika fontosabb a sebességnél.",
      "Edzésmódszertanilag a ciklokrossz intenzív, Z4-es tartományban zajló terheléseket kíván. A heti programba érdemes 1-2 intervallum-edzést beiktatni (pl. 5×3 perces erőfeszítések 2 perc pihenővel), kiegészítve egy hosszabb, Z2-es tempójú alapozó edzéssel. 45 év felett különösen ügyelj a regenerációs napokra: két kemény edzés között legalább egy teljes pihenőnap javasolt. Ne feledkezz meg a törzserősítő gyakorlatokról sem – erős core nélkül a CX-versenyek nagyon megterhelők lehetnek.",
      "Az első versenyre való felkészülésnél a legjobb döntés egy helyi rendezvényen, amatőr kategóriában rajthoz állni. A magyar ciklokrossz naptár szeptember végétől január végéig tart, és rengeteg kezdőbarát versenyt tartalmaz. Ne feledd: a ciklokrossz elsősorban szórakozás, közösség és sárban lubickolás – a komolyabb versenyzés majd jön, ha megvan hozzá a kedv és az alap.",
    ],
  },
  {
    id: "c3",
    type: "cikk",
    style: "orszaguti",
    category: "Technika",
    title: "Országúti kerékpár beállítása: bike fitting alapok",
    excerpt:
      "A helyes beállítás megvédi az ízületeidet és javítja a teljesítményed. Bike fitting útmutató 45-60 éves kerékpárosoknak.",
    wordCount: 2000,
    date: "2026-01-20",
    categoryColor: "bg-brand-100 text-brand-700",
    badge: { label: "Technika", className: "bg-brand-600 text-white" },
    ageBadge: ageBadgeConfig["45_advanced"],
    gearLevel: "mid",
    content: [
      "A bike fitting – vagyis a kerékpár testhez igazítása – az egyik legfontosabb befektetés, amit egy 45-60 éves kerékpáros megtehet. A helytelen beállítás nem csupán kényelmetlenséget okoz: hosszú távon térdfájdalomhoz, nyaki gerincproblémákhoz és csípőpanaszokhoz vezet. Egy professzionális bike fitting akár 1-3 órát vesz igénybe, de az eredmény megéri: jobban megy a kerékpár, kevésbé fáradsz el, és az ízületeid hálásak lesznek.",
      "A nyeregmagasság a legtöbb kerékpáros által ismert beállítás, mégis sokan rosszul csinálják. Túl alacsony nyereg esetén a térd túlterhelődik a pedálnyomás csúcsán, túl magas esetén az ülőcsontok és a csípő szenvednek. Az ökölszabály: alap pedalozási pozícióban (a pedál legalsó pontján) a térd enyhén behajlított maradjon – körülbelül 25-30 fokos szögben. A kor előrehaladtával sok kerékpáros egy kicsivel alacsonyabb nyerget preferál, hogy a csípő ne billegjen oldalt.",
      "A kormánymagasság és a nyújtás (reach) szintén kritikus. 45 év felett a legtöbb kerékpáros számára a felemelt kormány kényelmesebb, mert csökkenti a nyak és a hát terhelését. Ha derékfájásod van tekerés közben, valószínűleg túl messze van a kormány, vagy túl mélyen van a kormánycsövön. Egy cm-es változás a kormánymagasságban drámaian eltérő érzést adhat – érdemes türelemmel kísérletezni vagy szakemberhez fordulni.",
      "A cipő-pedál kapcsolat (cleat beállítás) az egyik legelhanyagoltabb terület, pedig a térdpanaszok jó részét ez okozza. A cipőtalpon lévő 'klikk' rögzítőt (cleatet) úgy kell beállítani, hogy a pedál tengelye nagyjából a nagy lábujj tőízülete alá essen, és a sarkak ne kényszeredett pozícióban legyenek. Ha a térdeid befelé vagy kifelé mutatnak pedálozás közben, a cleatok szöge szorul korrekcióra. Különösen valgus térdű (X-lábú) embereknél fontos ez az igazítás.",
      "Összességében a bike fitting nem egyszeri esemény, hanem folyamat. Ahogy öregszünk, a test változik: rugalmasság csökken, izomegyensúly eltolódik, régi sérülések megjelennek. Érdemes évente egyszer átnézni a beállításokat, főleg ha szezon után hosszabb szünetet tartottál, vagy ha edzési volumenedben nagy változás állt be. Egy jó bike fitter nem csupán a kerékpárt állítja be, hanem a testet is elemzi – megéri olyan szakembert keresni, aki biomechanikához is ért.",
    ],
  },
  {
    id: "c4",
    type: "cikk",
    style: "mtb",
    category: "MTB",
    title: "MTB technika: lejtőn való haladás biztonságosan",
    excerpt:
      "Lejtős szakaszokon a megfelelő testtartás és fékhasználat életmentő lehet. MTB lejtőtechnika középkorú kerékpárosoknak.",
    wordCount: 1300,
    date: "2026-02-10",
    categoryColor: "bg-accent-100 text-accent-700",
    badge: { label: "Technika", className: "bg-accent-500 text-white" },
    isNew: true,
    ageBadge: ageBadgeConfig["45_beginner"],
    intensityZone: intensityZoneConfig.z3,
    gearLevel: "mid",
    content: [
      "A lejtős terepen való haladás az MTB egyik legizgalmasabb, ugyanakkor legkockázatosabb eleme. Különösen igaz ez 45-50 éves bringásokra, akiknek a reflexei már nem olyan gyorsak, mint fiatalon, és egy elesés sokkal komolyabb következményekkel járhat. A jó hír: a helyes technika megtanulható bármely életkorban, és egy jól beállított testtartással a lejtők kezelése nemcsak biztonságosabbá, hanem élvezetesebbé is válik.",
      "Az alapvető lejtőtechnika a súlypont hátra és le tolása. Amint meredek ereszkedőre érsz, csúsztasd hátra a csípődet a nyereg fölé vagy mögé, és engedj mélyre az ülőcsontokra támaszkodva. A könyök és a térd rugós pozícióban legyen – ezek a test természetes amortizátorai. Kerüld a merev, egyenes karokat: ha a kerék egyenetlenségen megy át, a merev test az egyensúlyvesztést gyorsítja. Engedékeny, rugalmas tartással viszont a testeddel fel tudod venni az apróbb akadályok lökéseit.",
      "A fékhasználat lejtőn kulcskérdés. Az első féket (elülső kerék) a legnagyobb erővel kell óvatosan adagolni: túl hirtelen húzva rövidzárlatot okozhat és a kerékpár eleje megcsúszik. A hátsó féket agresszívabban lehet használni, de az sem jó, ha teljesen blokkolt kerékkel csúszol lefelé – elveszíted az irányítást. Az ideális: mindkét féket egyenletesen adagolva lassíts, és inkább előbb kezdj el fékezi, mint hogy kapkodj az utolsó pillanatban.",
      "A tekintet előre irányítása talán a leglényegesebb és legnehezebben tanulható elem. Ösztönösen az ember a kerék előtti egy méterre néz, holott legalább 3-5 méterre előre kellene tekinteni. Ez időt ad a döntésre: merre vegyük a kanyart, melyik követ kell elkerülni, hol kell lassítani. Eddzük ezt tudatosan: minden edzésen próbáljuk meg a tekintetünket távolabbra emelni, és hamarosan természetessé válik.",
      "Végül: megfelelő felszerelés nélkül a technika sem ér sokat. Vedd fel a teli arcvédős sisakot (full-face helmetet) meredekebb terepen – nem életbiztosítás, de komoly védelmet ad elesés esetén. A térdvédők és a könyökvédők 45 év felett már nem szégyellnivalók: a profi versenyzők is hordják, és az ízületek védelme mindenképpen fontosabb a stílusnál. Soha ne menj le olyan lejtőn, amelyet nem tekintettél meg előbb gyalog.",
    ],
  },
  {
    id: "c5",
    type: "cikk",
    style: "altalanos",
    category: "Táplálkozás",
    title: "Táplálkozás hosszú tekerések előtt és után",
    excerpt:
      "Helyes energiafeltoeltés és regeneráció étrenddel. Mikor és mit egyél, hogy maximalizáld a teljesítményedet és gyorsítsd a felépülést.",
    wordCount: 1600,
    date: "2026-03-01",
    categoryColor: "bg-lime-100 text-lime-700",
    badge: { label: "Táplálkozás", className: "bg-lime-600 text-white" },
    isNew: true,
    ageBadge: ageBadgeConfig["50_active"],
    recoveryTime: recoveryTimeConfig.moderate,
    content: [
      "A kerékpározás energiaigényes sport – egy 2-3 órás közepes intenzitású tekerés akár 1200-1800 kcal-t is elégethet. 45-55 éves sportolóknál az anyagcsere lassulásával a szénhidrát-felhasználás és a zsírégetés aránya is változik, ezért a táplálkozás tervezése különösen fontos. A jó hír: néhány egyszerű alapelvet követve hatékonyan pótolhatod az energiát, gyorsíthatod a regenerációt és javíthatod a teljesítményedet.",
      "Tekerés előtt 2-3 órával érdemes egy szénhidrátban gazdag, könnyen emészthető ételt fogyasztani: teljes kiőrlésű tészta, rizs, kenyér és gyümölcs mind jó választás. Kerüld a sok rostot és zsírt tartalmazó ételeket, mert ezek lassítják az emésztést és gyomorgörcsöt okozhatnak terhelés alatt. Ha 1 óránál kevesebb van az edzésig, egy kisebb snack (banán, energiaszelet, rizskeksz) is elegendő. Ne edzz teljesen éhgyomorra, különösen nem 2 óránál hosszabb tekerés előtt – a vércukoresés kellemetlen és veszélyes lehet.",
      "Edzés közben az első 60-75 perc általában fedezi az izomglikogén-tartalék. Ezt követően szükséges a pótlás: óránként 40-60 g szénhidrátot javasolt bevinni – ez lehet energiagél, izotóniás ital, datolya, banán vagy más könnyen emészthető forma. A hidratálás sem elhanyagolható: óránként legalább 500-750 ml folyadékot (vizet vagy izotóniás italt) kellene inni, melegben ennél is többet. Elektrolit-kiegészítés (nátrium, magnézium) hosszú tekeréseken és melegben különösen fontos.",
      "Edzés után az első 30-45 perc az ún. 'anabolikus ablak': ebben az időszakban a szervezet a leghatékonyabban szívja fel a tápanyagokat az izomépítéshez és -javításhoz. Egy fehérje- és szénhidrát-tartalmú étkezés vagy ital (pl. tejeskávé, fehérjetúró gyümölccsel, főtt tojás kenyérrel) ekkor a legértékesebb. 45 év felett a fehérjebevitel különösen fontos a regenerációhoz: napi 1,4-1,7 g/testsúlykg fehérje javasolt aktívan sportoló középkorúaknak.",
      "Néhány általánosan elterjedt tévhit érdemes eloszlatni. Az egyik: 'ha fogyni akarok, edzés után ne egyek.' Ez rossz stratégia – a regeneráció elmarad, izomtömeg csökken, és a következő edzésen teljesítményed romlik. A másik: 'alkohol nem árt a regenerációhoz.' Sajnos árt: az alkohol gátolja a fehérjeszintézist és a glikogén-feltöltést. Egy pohár bor alkalomszerűen belefér, de edzés utáni este rendszeres alkoholfogyasztás hosszú távon rontja az eredményeket.",
    ],
  },
  {
    id: "c6",
    type: "cikk",
    style: "mtb",
    category: "MTB",
    title: "Top 5 MTB útvonal a Balaton-felvidéken",
    excerpt:
      "Lenyűgöző tájak, változatos terep és kihívó szakaszok. A legjobb mountain bike útvonalak a Bakony szívében.",
    wordCount: 1200,
    date: "2026-01-05",
    categoryColor: "bg-green-100 text-green-700",
    badge: { label: "Tipp", className: "bg-green-600 text-white" },
    isNew: true,
    recoveryTime: recoveryTimeConfig.light,
    intensityZone: intensityZoneConfig.z3,
    ageBadge: ageBadgeConfig["45_beginner"],
    gearLevel: "mid",
    content: [
      "A Balaton-felvidék és a Bakony az ország egyik legszebb MTB paradicsoma: változatos terep, erdős ösvények, szőlőtőkés hegyoldalak és lenyűgöző balatoni panorámák várják a bringásokat. Az alábbi öt útvonal kifejezetten középkorú, tapasztalt vagy féltapasztalt mountain bikereknek ajánlott – technikai szempontból kezelhetők, ugyanakkor kellő kihívást nyújtanak.",
      "**1. Badacsony-kör (22 km, 550 m szintemelkedés):** A Badacsony bazalthegyének megkerülése vegyes terepet kínál: erdei singletrackek, szőlősorok között kanyargó dűlőutak és rövid, meredek felkapaszkodók váltogatják egymást. A tetőn fantasztikus kilátás nyílik a Balatonra és a Tapolcai-medencére. Érdemes reggel indulni, mielőtt a turisták felélénkülnek az ösvényeken.",
      "**2. Kab-hegy Trail (18 km, 620 m szintemelkedés):** A Bakony egyik legmagasabb pontja körül kialakított útvonal hosszú erdei singletrackjeiről ismert. A felfelé vezető szakasz erőteljes, de a leereszkedő részen szárnyalni fogsz a dzsungelszerű erdőben. Javasolt felszerelés: teljesuspension kerékpár és jó fékkompresszió a hosszú lejjátékon.",
      "**3. Tihany–Örvényes-kör (27 km, 380 m szintemelkedés):** A Tihanyi-félsziget sajátos, vulkanikus tájképű ösvényei egyedülálló élményt nyújtanak. A terep viszonylag szelíd, ezért a körültekintőbb bringásoknak is ajánlható. A félsziget csúcsáról mindkét irányban látható a Balaton – a kilátás önmagáért megéri az utat.",
      "**4. Veszprém–Betekints-völgy erdei kör (24 km, 480 m szintemelkedés):** A völgy bejáratától induló kör Veszprém erdős határában kanyarog, gyönyörű lombos erdőkön át. Az útvonal jól karbantartott, és sárban sem válik járhatatlanná, ami esős időszakban különös értéket jelent. A visszaúton érdemes betérni Veszprém óvárosába egy regeneráló ebédre. **5. Balatongyörök–Tátika-vár kör (15 km, 440 m szintemelkedés):** Rövid, de meredek kihívás a Keszthely közelében emelkedő Tátika-várhoz. A vár romjai egyedülálló díszletet adnak a pihenőnek, a leereszkedő erdei singletrack pedig kifejezetten szórakoztató. Ideális félnapos programnak balatongyöröki vagy keszthelyi bázisról.",
    ],
  },
  {
    id: "c7",
    type: "cikk",
    style: "orszaguti",
    category: "Országúti",
    title: "Gran Fondo felkészülés: stratégia és taktika",
    excerpt:
      "Egy Gran Fondo nem sprint, hanem stratégia. Tempógazdálkodás, táplálkozás és mentális felkészülés nagy távolságú versenyekre.",
    wordCount: 1700,
    date: "2026-02-18",
    categoryColor: "bg-brand-100 text-brand-700",
    badge: { label: "Verseny", className: "bg-brand-600 text-white" },
    isNew: true,
    ageBadge: ageBadgeConfig["50_active"],
    intensityZone: intensityZoneConfig.z3,
    gearLevel: "mid",
    content: [
      "A Gran Fondo – a nagytávolságú kerékpáros tömegverseny – az elmúlt évtizedben az 50+ korosztály egyik legnépszerűbb célkitűzésévé vált Európában és Magyarországon egyaránt. Egy 100-160 kilométeres, 2000-3000 méteres szintemelkedéssel teli verseny azonban komoly előkészítést igényel, különösen, ha az ember már nem 30 éves. A titok nem a maximális sebesség, hanem az okos tempógazdálkodás.",
      "Az alapozás a legfontosabb fázis, amely 8-12 héttel a verseny előtt kezdődik. Ebben az időszakban az edzések nagy részét (70-80%-át) Z2-es tartományban – könnyű, könnyed tempóban – kell végezni. Ez fejleszti az aerob alapot, amelyre a verseny hossza épül. Sok kerékpáros hibázza el, hogy túl keményen edz az alapozásban, elfárad, majd a versenyre nem marad elegendő energia. Türelem és fegyelem: ezek az alapozás kulcsszavai.",
      "Tempógazdálkodás verseny közben a siker másik kritikus eleme. Az első 30-40 kilométert szinte mindenki gyorsan indul – az adrenalintól, a tömegtől és az eufóriától hajtva. Ez tipikus hiba: aki az első órában a képességei felett teljesít, az utolsó 40 kilométerben fizetni fogja az árát. Ökölszabályként: az első felét legfeljebb 85%-os erőfeszítéssel tedd meg, és tartsd meg a maradékot a végére. Számítógépes vagy pászmafigyelő (power meter) sokat segíthet ebben.",
      "Táplálkozási stratégiát is érdemes előre kidolgozni. Hosszú versenyen nem szabad megvárni az éhség jelentkezését – mire éhes vagy, már elkéstél. Az első gél vagy banán 45-60 perccel az indulás után esedékes, majd 20-30 percenként kell pótolni az energiát. A felállomásokon ne időzz sokat: vegyed fel a szükséges dolgokat és haladj. Ha a verseny boltot tartalmaz, előre ismerd meg a kínálatot – ne a versenyen próbálj ki új ételeket.",
      "Mentális felkészülés szintén elengedhetetlen. Egy Gran Fondo nem az izmaiddal, hanem a fejeddel hangolódik össze. Legyenek képzelt határköveink: 'az első 50 km-t csak tekerünk, a 80 km-nél értékeljük az állapotot, a 120 km-nél kezdünk el erőltetni.' Ha nehéz pillanatokban elfog a kétség, gondolj arra, hogy minden kemény percet az edzésen már megéltél – a verseny csak megismétli azt. A Gran Fondo célvonalon való áthaladás 50 év felett az egyik legemlékezetesebb élmény, amit a sport nyújthat.",
    ],
  },
  {
    id: "c8",
    type: "cikk",
    style: "ciklokrossz",
    category: "Ciklokrossz",
    title: "CX technika: akadályok átlépése és hordozás",
    excerpt:
      "A ciklokrossz egyik legfontosabb technikája az akadályok kezelése. Hogyan gyakorold a leugrást, futást és hordozást hatékonyan?",
    wordCount: 1100,
    date: "2026-02-22",
    categoryColor: "bg-green-100 text-green-700",
    badge: { label: "Technika", className: "bg-green-600 text-white" },
    isNew: true,
    ageBadge: ageBadgeConfig["45_advanced"],
    intensityZone: intensityZoneConfig.z4,
    gearLevel: "mid",
    content: [
      "A ciklokrossz versenyeken az egyik legnagyobb kihívást az akadályok jelentik: a pályán elhelyezett fakorlátok, homokos vagy sáros szakaszok leugrást, futást és visszaszállást tesznek szükségessé. Ez a technika tanulható, de komoly begyakorlást igényel – különösen, ha valaki nem nőtt fel BMX-ezéssel vagy MTB-vel. A jó hír: egy-két szezon következetes edzéssel minden korosztályban profi szintű akadálytechnikát lehet elsajátítani.",
      "A leugrás technikája: amikor az akadályhoz érsz, csökkentsd a sebességed, és csinálj egy rövid lendületet. Bal lábbal a pedálon maradva (a pedál vízszintes, 3 óra pozícióban), a jobb lábat vesd át a nyereg felett, majd talpalj le. A kerékpárt a jobb kézzel markolod, a bal kézzel a kormányon tartod – ez a klasszikus 'egy kéz a vázon' hordozási pozíció. Ügyelj arra, hogy kerékpárodat ne emeld fel kényszeredetten: lazán, energiatakarékosan vidd.",
      "A felszállás az akadály után szintén technikát igényel. A legtöbb versenyző bal lábbal löki el magát, majd a jobb lábat veti fel a nyereg fölé, bal lábbal pedálra lép, és egy erős lépéssel meglendíti a kerékpárt. Fontos, hogy ne állj meg a felszállás közben – a mozgó kerékpárra felszállni könnyebb, mint az állóra. Eddzük ezt a mozdulatot füvön, állítólag hetekbe telik az automatizmussá válás.",
      "A sárban és homokban való haladás szintén külön figyelmet érdemel. Sárban a legkisebb kerékpározható gumi (tubeless, 33-40 mm, tüskés profil) segít a legtöbbet – de ha a sár vastag és ragacsos, futni hatékonyabb, mint tekerékkel ragacskodva szenvdni. Homokban meredekszemelni nem célszerű: nagy fogású gumirakás, alacsony nyomás és egyenletes pedálozás teszi lehetővé az áthaladást anélkül, hogy a kerék megcsúszik.",
      "Végül: a CX-technikát nem az edzőteremben, hanem a pályán kell tanulni. Keress egy helyi CX edzésosztályt, ahol tapasztalt versenyzők adnak visszajelzést a mozdulataidra. A legtöbb klub szívesen fogadja az újabb korosztályt – a ciklokrossz közössége befogadó és barátságos. Érdemes egy dedikált technika-edzést begyakorolni hetente, ahol kizárólag a leugrás-felszállás-hordozás ciklust ismétled: 20-30 percnyi ilyen gyakorlás gyorsabban fejleszt, mint hetekig versenyeken tapogatózni.",
    ],
  },

  // ─────────────────────────────
  // EDZÉSTERVEK
  // ─────────────────────────────
  {
    id: "e1",
    type: "edzesterv",
    style: "altalanos",
    category: "Edzésterv",
    title: "Kerékpáros alapozó program 50 év felett",
    excerpt:
      "Hogyan kezdd el vagy folytasd a kerékpározást biztonságosan? Átfogó 8 hetes edzésterv tapasztalt bringásoknak.",
    wordCount: 1600,
    date: "2026-02-01",
    categoryColor: "bg-brand-100 text-brand-700",
    badge: { label: "Ajánlott 50+", className: "bg-brand-600 text-white" },
    featured: true,
    recoveryTime: recoveryTimeConfig.intense,
    intensityZone: intensityZoneConfig.z2,
    ageBadge: ageBadgeConfig["50_active"],
    gearLevel: "basic",
    weeksDuration: 8,
    sessionsPerWeek: 3,
    difficulty: "kezdő",
  },
  {
    id: "e2",
    type: "edzesterv",
    style: "mtb",
    category: "MTB Edzés",
    title: "MTB állóképességi edzésterv: 6 hetes program",
    excerpt:
      "Terep-specifikus edzések, erőfejlesztés és állóképesség növelése mountain bike kerékpárosoknak. Heti 3-4 edzés.",
    wordCount: 1900,
    date: "2026-01-10",
    categoryColor: "bg-accent-100 text-accent-700",
    badge: { label: "MTB", className: "bg-accent-500 text-white" },
    recoveryTime: recoveryTimeConfig.moderate,
    intensityZone: intensityZoneConfig.z3,
    ageBadge: ageBadgeConfig["45_advanced"],
    gearLevel: "mid",
    weeksDuration: 6,
    sessionsPerWeek: 4,
    difficulty: "középhaladó",
  },
  {
    id: "e3",
    type: "edzesterv",
    style: "ciklokrossz",
    category: "CX Edzés",
    title: "Ciklokrossz felkészülési program: 10 hét",
    excerpt:
      "Őszi ciklokrossz szezonnra felkészülő edzésterv. Intervallumok, technikai edzések és erőfejlesztés.",
    wordCount: 2100,
    date: "2026-02-15",
    categoryColor: "bg-green-100 text-green-700",
    badge: { label: "CX", className: "bg-green-600 text-white" },
    isNew: true,
    recoveryTime: recoveryTimeConfig.intense,
    intensityZone: intensityZoneConfig.z4,
    ageBadge: ageBadgeConfig["45_advanced"],
    gearLevel: "mid",
    weeksDuration: 10,
    sessionsPerWeek: 4,
    difficulty: "középhaladó",
  },
  {
    id: "e4",
    type: "edzesterv",
    style: "altalanos",
    category: "Téli Edzés",
    title: "Téli edzés beltérben: roller edzésterv kezdőknek",
    excerpt:
      "Ne hagyd abba a télen! Hatékony roller-edzés program, amely megőrzi a fittségedet a hideg hónapokban.",
    wordCount: 1400,
    date: "2025-12-01",
    categoryColor: "bg-slate-100 text-slate-700",
    badge: { label: "Téli", className: "bg-slate-600 text-white" },
    recoveryTime: recoveryTimeConfig.light,
    intensityZone: intensityZoneConfig.z2,
    ageBadge: ageBadgeConfig["45_beginner"],
    gearLevel: "basic",
    weeksDuration: 8,
    sessionsPerWeek: 3,
    difficulty: "kezdő",
  },
  {
    id: "e5",
    type: "edzesterv",
    style: "orszaguti",
    category: "Edzésterv",
    title: "Maratonnra felkészülés: 12 hetes orszaguti program",
    excerpt:
      "Gran Fondo vagy bike maraton? 12 hetes felkészítő program 45-55 éves bringásoknak, amely biztonságosan növeli a terhelést.",
    wordCount: 2400,
    date: "2026-02-20",
    categoryColor: "bg-brand-100 text-brand-700",
    badge: { label: "Maraton", className: "bg-brand-600 text-white" },
    isNew: true,
    featured: true,
    recoveryTime: recoveryTimeConfig.intense,
    intensityZone: intensityZoneConfig.z3,
    ageBadge: ageBadgeConfig["50_active"],
    gearLevel: "mid",
    weeksDuration: 12,
    sessionsPerWeek: 4,
    difficulty: "középhaladó",
  },
  {
    id: "e6",
    type: "edzesterv",
    style: "mtb",
    category: "MTB Edzés",
    title: "Erő és robbanékonyság fejlesztése MTB-seknek",
    excerpt:
      "Gimnáziumi és kerékpáros edzések kombinációja. Hogyan fejlessz robbanékonyságot és törzserőt a pályán való jobb teljesítményért.",
    wordCount: 1700,
    date: "2026-03-05",
    categoryColor: "bg-accent-100 text-accent-700",
    badge: { label: "Erőedzés", className: "bg-accent-500 text-white" },
    isNew: true,
    recoveryTime: recoveryTimeConfig.moderate,
    intensityZone: intensityZoneConfig.z4,
    ageBadge: ageBadgeConfig["45_advanced"],
    gearLevel: "mid",
    weeksDuration: 6,
    sessionsPerWeek: 3,
    difficulty: "középhaladó",
  },

  // ─────────────────────────────
  // FELSZERELÉS
  // ─────────────────────────────
  {
    id: "f1",
    type: "felszereles",
    style: "orszaguti",
    category: "Felszerelés",
    title: "A legjobb carbon országúti kerékpárok 2024-ben",
    excerpt:
      "Prémium carbon kerékpárok összehasonlítása: Specialized, Trek, Canyon és Colnago modellek részletes elemzése.",
    wordCount: 2400,
    date: "2026-01-25",
    categoryColor: "bg-accent-100 text-accent-700",
    badge: { label: "Tesztelt", className: "bg-accent-500 text-white" },
    priceBadge: priceBadgeConfig.premium,
    isNew: true,
    ageBadge: ageBadgeConfig["45_advanced"],
    gearLevel: "pro",
  },
  {
    id: "f2",
    type: "felszereles",
    style: "mtb",
    category: "MTB Felszerelés",
    title: "Fullsuspension MTB kerékpárok tesztje 2024",
    excerpt:
      "Trail és enduro fullsuspension kerékpárok teszte: melyik az ideális választás 50 év felett terepen tekerőknek?",
    wordCount: 2800,
    date: "2026-02-05",
    categoryColor: "bg-accent-100 text-accent-700",
    badge: { label: "Teszt", className: "bg-accent-500 text-white" },
    priceBadge: priceBadgeConfig.premium,
    isNew: true,
    ageBadge: ageBadgeConfig["50_active"],
    gearLevel: "pro",
  },
  {
    id: "f3",
    type: "felszereles",
    style: "altalanos",
    category: "Védőfelszerelés",
    title: "Kerékpáros sisak összehasonlító: Top 7 modell",
    excerpt:
      "Biztonság és kényelem kompromisszuma nélkül. A legjobb sisakok 45-60 éves kerékpárosok számára minden diszciplínában.",
    wordCount: 1800,
    date: "2026-01-30",
    categoryColor: "bg-rose-100 text-rose-700",
    badge: { label: "Teszt", className: "bg-rose-600 text-white" },
    priceBadge: priceBadgeConfig.mid,
    ageBadge: ageBadgeConfig["45_beginner"],
    gearLevel: "mid",
  },
  {
    id: "f4",
    type: "felszereles",
    style: "altalanos",
    category: "Ruházat",
    title: "Kerékpáros ruházat téli túrákhoz",
    excerpt:
      "Rétegzős öltözés és téli speciális felszerelések. Meleg maradj, de ne izzadj: a téli kerékpáros ruházat titkai.",
    wordCount: 1500,
    date: "2025-11-15",
    categoryColor: "bg-slate-100 text-slate-700",
    badge: { label: "Tél", className: "bg-slate-600 text-white" },
    priceBadge: priceBadgeConfig.mid,
    ageBadge: ageBadgeConfig["45_beginner"],
    gearLevel: "basic",
  },
  {
    id: "f5",
    type: "felszereles",
    style: "ciklokrossz",
    category: "CX Felszerelés",
    title: "Ciklokrossz kerékpár vásárlási útmutató",
    excerpt:
      "Mi a különbség a CX és a gravel bike között? Mire figyelj az első ciklokrossz kerékpár vásárlásakor?",
    wordCount: 2000,
    date: "2026-03-10",
    categoryColor: "bg-green-100 text-green-700",
    badge: { label: "Útmutató", className: "bg-green-600 text-white" },
    priceBadge: priceBadgeConfig.mid,
    isNew: true,
    ageBadge: ageBadgeConfig["45_beginner"],
    gearLevel: "mid",
  },
  {
    id: "f6",
    type: "felszereles",
    style: "altalanos",
    category: "Kerékpár-kiegészítők",
    title: "Kerékpáros számítógép és GPS: melyiket válaszd?",
    excerpt:
      "Garmin, Wahoo, Bryton: a legfontosabb kerékpáros számítógépek és GPS-ek összehasonlítása. Melyik illik a te edzésmódszeredhez?",
    wordCount: 1600,
    date: "2026-02-25",
    categoryColor: "bg-sky-100 text-sky-700",
    badge: { label: "Teszt", className: "bg-sky-600 text-white" },
    priceBadge: priceBadgeConfig.mid,
    isNew: true,
    ageBadge: ageBadgeConfig["50_active"],
    gearLevel: "mid",
  },
  {
    id: "f7",
    type: "felszereles",
    style: "orszaguti",
    category: "Kerékpár alkatrész",
    title: "Di2 vs mechanikus váltó: megéri az elektronika?",
    excerpt:
      "Shimano Di2, SRAM eTap, Campagnolo EPS – az elektronikus váltók világa. Érdemes-e befektetni 45-60 évesen?",
    wordCount: 2100,
    date: "2026-03-12",
    categoryColor: "bg-brand-100 text-brand-700",
    badge: { label: "Összehasonlító", className: "bg-brand-600 text-white" },
    priceBadge: priceBadgeConfig.premium,
    isNew: true,
    ageBadge: ageBadgeConfig["45_advanced"],
    gearLevel: "pro",
  },
];
