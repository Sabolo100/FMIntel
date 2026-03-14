/**
 * Tests for gearLevel utility.
 * Run with: npx ts-node --esm src/lib/gearLevel.test.ts
 * or as part of a jest/vitest suite when configured.
 */
import { gearLevelConfig, getGearLevelBadge } from "./gearLevel";
import type { GearLevel } from "./gearLevel";

// Simple assertion helper (no test framework required)
function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`  PASS: ${message}`);
}

function runTests(): void {
  console.log("gearLevel tests");

  // All three levels must be defined
  const levels: GearLevel[] = ["basic", "mid", "pro"];
  for (const level of levels) {
    assert(level in gearLevelConfig, `gearLevelConfig has "${level}" level`);
  }

  // basic level
  assert(
    gearLevelConfig.basic.label === "🚲 Alapfelszerelés",
    'basic label is "🚲 Alapfelszerelés"'
  );
  assert(
    gearLevelConfig.basic.className.includes("teal"),
    "basic uses teal colour"
  );

  // mid level
  assert(
    gearLevelConfig.mid.label === "🚲 Közepes",
    'mid label is "🚲 Közepes"'
  );
  assert(
    gearLevelConfig.mid.className.includes("amber"),
    "mid uses amber colour"
  );

  // pro level
  assert(
    gearLevelConfig.pro.label === "🚲 Profi szint",
    'pro label is "🚲 Profi szint"'
  );
  assert(
    gearLevelConfig.pro.className.includes("violet"),
    "pro uses violet colour"
  );

  // Each badge must have both label and className as non-empty strings
  for (const level of levels) {
    const badge = gearLevelConfig[level];
    assert(
      typeof badge.label === "string" && badge.label.length > 0,
      `${level}.label is non-empty string`
    );
    assert(
      typeof badge.className === "string" && badge.className.length > 0,
      `${level}.className is non-empty string`
    );
  }

  // All labels must start with the bicycle emoji
  for (const level of levels) {
    assert(
      gearLevelConfig[level].label.startsWith("🚲"),
      `${level}.label starts with bicycle emoji`
    );
  }

  // getGearLevelBadge returns the same object as config lookup
  for (const level of levels) {
    const badge = getGearLevelBadge(level);
    assert(
      badge.label === gearLevelConfig[level].label,
      `getGearLevelBadge("${level}") returns correct label`
    );
    assert(
      badge.className === gearLevelConfig[level].className,
      `getGearLevelBadge("${level}") returns correct className`
    );
  }

  // Labels must be unique
  const labels = levels.map((l) => gearLevelConfig[l].label);
  const uniqueLabels = new Set(labels);
  assert(uniqueLabels.size === levels.length, "all gear level labels are unique");

  // ClassNames must be unique
  const classNames = levels.map((l) => gearLevelConfig[l].className);
  const uniqueClassNames = new Set(classNames);
  assert(uniqueClassNames.size === levels.length, "all gear level classNames are unique");

  console.log("\nAll gearLevel tests passed.");
}

runTests();
