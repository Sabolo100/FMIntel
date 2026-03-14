/**
 * Tests for the "Új" (New) badge configuration.
 * Run with: npx ts-node --esm src/lib/newBadge.test.ts
 */

import { newBadgeConfig } from "./newBadge";

let passed = 0;
let failed = 0;

function assert(condition: boolean, description: string): void {
  if (condition) {
    console.log(`  ✓ ${description}`);
    passed++;
  } else {
    console.error(`  ✗ ${description}`);
    failed++;
  }
}

console.log("newBadge tests:");

assert(typeof newBadgeConfig === "object", "newBadgeConfig is an object");
assert(newBadgeConfig.label === "Új", 'label is "Új"');
assert(typeof newBadgeConfig.label === "string" && newBadgeConfig.label.length > 0, "label is a non-empty string");
assert(typeof newBadgeConfig.className === "string" && newBadgeConfig.className.length > 0, "className is a non-empty string");
assert(newBadgeConfig.className.includes("green"), "className uses green colour");
assert(newBadgeConfig.className.includes("text-white"), "className has white text for contrast");

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) process.exit(1);
