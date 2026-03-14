/**
 * Tests for getFeaturedArticles and articleDetailHref utilities.
 * Run: npx ts-node --esm src/lib/getFeaturedArticles.test.ts
 */

import { getFeaturedArticles, articleDetailHref } from "./getFeaturedArticles";
import { articles } from "../data/articles";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

// ─── getFeaturedArticles ───────────────────────────────────────────────────

// Default count returns 3 items
const result3 = getFeaturedArticles(3);
assert(result3.length === 3, "getFeaturedArticles(3) should return exactly 3 articles");

// Custom count is respected
const result1 = getFeaturedArticles(1);
assert(result1.length === 1, "getFeaturedArticles(1) should return exactly 1 article");

const result5 = getFeaturedArticles(5);
assert(result5.length === 5, "getFeaturedArticles(5) should return exactly 5 articles");

// No duplicates in result
const ids3 = result3.map((a) => a.id);
const uniqueIds3 = new Set(ids3);
assert(uniqueIds3.size === ids3.length, "getFeaturedArticles result must have no duplicate IDs");

// Featured articles must appear before non-featured ones
const featuredInData = articles.filter((a) => a.featured === true);
if (featuredInData.length >= 3) {
  // All 3 results should be featured
  for (const article of result3) {
    assert(article.featured === true, `Article ${article.id} should be featured when 3+ featured articles exist`);
  }
} else {
  // The first N results (up to featuredInData.length) should be featured
  const featuredIds = new Set(featuredInData.map((a) => a.id));
  for (let i = 0; i < featuredInData.length; i++) {
    assert(featuredIds.has(result3[i].id), `Position ${i}: featured article should come before non-featured`);
  }
}

// Results are sorted by date descending within their group
const featuredResults = result3.filter((a) => a.featured === true);
for (let i = 1; i < featuredResults.length; i++) {
  const prev = new Date(featuredResults[i - 1].date).getTime();
  const curr = new Date(featuredResults[i].date).getTime();
  assert(prev >= curr, `Featured articles should be sorted newest first (index ${i - 1} vs ${i})`);
}

// All returned articles exist in the original articles array
const allIds = new Set(articles.map((a) => a.id));
for (const article of result3) {
  assert(allIds.has(article.id), `Returned article ${article.id} must exist in articles array`);
}

// ─── articleDetailHref ─────────────────────────────────────────────────────

// cikk → /cikkek/:id
const cikkArticle = articles.find((a) => a.type === "cikk");
assert(cikkArticle !== undefined, "There must be at least one 'cikk' article");
assert(
  articleDetailHref(cikkArticle!) === `/cikkek/${cikkArticle!.id}`,
  `cikk type should generate /cikkek/${cikkArticle!.id}`,
);

// edzesterv → /edzestervek/:id
const edzestervArticle = articles.find((a) => a.type === "edzesterv");
assert(edzestervArticle !== undefined, "There must be at least one 'edzesterv' article");
assert(
  articleDetailHref(edzestervArticle!) === `/edzestervek/${edzestervArticle!.id}`,
  `edzesterv type should generate /edzestervek/${edzestervArticle!.id}`,
);

// felszereles → /felszereles/:id
const felszerelesArticle = articles.find((a) => a.type === "felszereles");
assert(felszerelesArticle !== undefined, "There must be at least one 'felszereles' article");
assert(
  articleDetailHref(felszerelesArticle!) === `/felszereles/${felszerelesArticle!.id}`,
  `felszereles type should generate /felszereles/${felszerelesArticle!.id}`,
);

// Known IDs should route to correct paths
const c1 = articles.find((a) => a.id === "c1")!;
assert(articleDetailHref(c1) === "/cikkek/c1", "c1 should route to /cikkek/c1");

const e1 = articles.find((a) => a.id === "e1")!;
assert(articleDetailHref(e1) === "/edzestervek/e1", "e1 should route to /edzestervek/e1");

const f1 = articles.find((a) => a.id === "f1")!;
assert(articleDetailHref(f1) === "/felszereles/f1", "f1 should route to /felszereles/f1");

// ─── Featured articles include c1, e1, f1 ─────────────────────────────────

const featuredIds = new Set(getFeaturedArticles(articles.length).map((a) => a.id));
assert(featuredIds.has("c1"), "c1 (featured: true) should be returned by getFeaturedArticles");
assert(featuredIds.has("e1"), "e1 (featured: true) should be returned by getFeaturedArticles");
assert(featuredIds.has("f1"), "f1 (featured: true) should be returned by getFeaturedArticles");

console.log("✓ All getFeaturedArticles tests passed");
