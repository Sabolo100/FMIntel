/**
 * Tests for recoveryTime utility.
 * Run with: npx ts-node --esm src/lib/recoveryTime.test.ts
 * or as part of a jest/vitest suite when configured.
 */
import { recoveryTimeConfig } from "./recoveryTime";
import type { RecoveryLevel } from "./recoveryTime";

// Simple assertion helper (no test framework required)
function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`  PASS: ${message}`);
}

function runTests(): void {
  console.log("recoveryTime tests");

  const levels: RecoveryLevel[] = ["light", "moderate", "intense"];

  // All levels must be defined
  for (const level of levels) {
    assert(level in recoveryTimeConfig, `recoveryTimeConfig has "${level}" level`);
  }

  // Label checks
  assert(
    recoveryTimeConfig.light.label === "24ó regeneráció",
    'light label is "24ó regeneráció"'
  );
  assert(
    recoveryTimeConfig.moderate.label === "36ó pihenő",
    'moderate label is "36ó pihenő"'
  );
  assert(
    recoveryTimeConfig.intense.label === "48ó regeneráció",
    'intense label is "48ó regeneráció"'
  );

  // Each level must have both label and className
  for (const level of levels) {
    const entry = recoveryTimeConfig[level];
    assert(
      typeof entry.label === "string" && entry.label.length > 0,
      `${level}.label is non-empty string`
    );
    assert(
      typeof entry.className === "string" && entry.className.length > 0,
      `${level}.className is non-empty string`
    );
  }

  // Sanity: intense recovery is longer than light
  const lightHours = parseInt(recoveryTimeConfig.light.label, 10);
  const intenseHours = parseInt(recoveryTimeConfig.intense.label, 10);
  assert(intenseHours > lightHours, "intense recovery hours > light recovery hours");

  console.log("\nAll recoveryTime tests passed.");
}

runTests();
