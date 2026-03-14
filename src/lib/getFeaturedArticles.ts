import { articles, type Article } from "@/data/articles";

/**
 * Dynamikusan lekéri a főoldalon megjelenítendő kiemelt cikkeket.
 *
 * Logika:
 * 1. `featured: true` jelölt cikkek kerülnek előre (dátum szerint csökkenő sorrendben).
 * 2. Ha kevesebb mint `count` kiemelt cikk van, a legújabb többi cikk egészíti ki a listát.
 * 3. Az eredmény automatikusan frissül, amikor új cikk kerül az articles.ts-be.
 *
 * @param count - Visszaadandó cikkek száma (alapértelmezett: 3)
 * @returns A kiválasztott cikkek tömbje
 */
export function getFeaturedArticles(count: number = 3): Article[] {
  // Dátum szerint csökkenő sorrendbe rendezés (legújabb elöl)
  const byDateDesc = (a: Article, b: Article) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  const featured = articles
    .filter((a) => a.featured === true)
    .sort(byDateDesc);

  if (featured.length >= count) {
    return featured.slice(0, count);
  }

  // Kiegészítés a legújabb nem-kiemelt cikkekkel
  const featuredIds = new Set(featured.map((a) => a.id));
  const rest = articles
    .filter((a) => !featuredIds.has(a.id))
    .sort(byDateDesc);

  return [...featured, ...rest].slice(0, count);
}

/**
 * A cikk típusához tartozó részletes oldal URL-je.
 * Az articles.ts-ben lévő `type` mező alapján generálja az útvonalat.
 */
export function articleDetailHref(article: Article): string {
  switch (article.type) {
    case "edzesterv":
      return `/edzestervek/${article.id}`;
    case "felszereles":
      return `/felszereles/${article.id}`;
    case "cikk":
    default:
      return `/cikkek/${article.id}`;
  }
}
