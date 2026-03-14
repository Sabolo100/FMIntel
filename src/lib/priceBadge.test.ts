/**
 * Tests for priceBadge utility.
 * Run with: npx ts-node --esm src/lib/priceBadge.test.ts
 * or as part of a jest/vitest suite when configured.
 */
import { priceBadgeConfig } from "./priceBadge";
import type { PriceTier } from "./priceBadge";

// Simple assertion helper (no test framework required)
function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`  PASS: ${message}`);
}

function runTests(): void {
  console.log("priceBadge tests");

  // All three tiers must be defined
  const tiers: PriceTier[] = ["budget", "mid", "premium"];
  for (const tier of tiers) {
    assert(tier in priceBadgeConfig, `priceBadgeConfig has "${tier}" tier`);
  }

  // Budget tier
  assert(
    priceBadgeConfig.budget.label === "💰 Budget",
    'budget label is "💰 Budget"'
  );
  assert(
    priceBadgeConfig.budget.className.includes("emerald"),
    "budget uses emerald colour"
  );

  // Mid tier
  assert(
    priceBadgeConfig.mid.label === "⭐ Középkategória",
    'mid label is "⭐ Középkategória"'
  );
  assert(
    priceBadgeConfig.mid.className.includes("sky"),
    "mid uses sky colour"
  );

  // Premium tier
  assert(
    priceBadgeConfig.premium.label === "💎 Prémium",
    'premium label is "💎 Prémium"'
  );
  assert(
    priceBadgeConfig.premium.className.includes("amber"),
    "premium uses amber colour"
  );

  // Each badge must have both label and className
  for (const tier of tiers) {
    const badge = priceBadgeConfig[tier];
    assert(typeof badge.label === "string" && badge.label.length > 0, `${tier}.label is non-empty string`);
    assert(typeof badge.className === "string" && badge.className.length > 0, `${tier}.className is non-empty string`);
  }

  console.log("\nAll priceBadge tests passed.");
}

runTests();
