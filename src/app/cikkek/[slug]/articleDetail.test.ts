/**
 * Tests for article detail page slug lookup.
 * Run with: npx ts-node --esm src/app/cikkek/[slug]/articleDetail.test.ts
 * or as part of a jest/vitest suite when configured.
 */
import { articles } from "@/data/articles";

// Simple assertion helper (no test framework required)
function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`  PASS: ${message}`);
}

function runTests(): void {
  console.log("articleDetail slug lookup tests");

  // Finds an existing article by id
  const c1 = articles.find((a) => a.id === "c1");
  assert(c1 !== undefined, 'finds article with id "c1"');
  assert(
    c1?.title === "Nyújtás és regeneráció 45+ kerékpárosoknak",
    "c1 has the correct title"
  );

  // Returns undefined for a non-existent slug
  const missing = articles.find((a) => a.id === "does-not-exist");
  assert(missing === undefined, "returns undefined for unknown slug");

  // generateStaticParams equivalent: one entry per article
  const params = articles.map((a) => ({ slug: a.id }));
  assert(params.length === articles.length, "params count matches article count");
  assert(
    params.every((p) => typeof p.slug === "string"),
    "all params have string slugs"
  );

  // Every article id is unique (no duplicate slugs)
  const ids = articles.map((a) => a.id);
  const uniqueIds = new Set(ids);
  assert(uniqueIds.size === ids.length, "all article ids are unique");

  // All articles have non-empty id, title and excerpt
  for (const article of articles) {
    assert(
      article.id.trim().length > 0,
      `article "${article.id}" has non-empty id`
    );
    assert(
      article.title.trim().length > 0,
      `article "${article.id}" has non-empty title`
    );
    assert(
      article.excerpt.trim().length > 0,
      `article "${article.id}" has non-empty excerpt`
    );
  }

  console.log("\nAll articleDetail tests passed.");
}

runTests();
