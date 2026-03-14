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
