/**
 * Tests for ageBadge utility.
 * Run: npx ts-node --esm src/lib/ageBadge.test.ts
 */

import { ageBadgeConfig, type AgeExperienceLevel } from "./ageBadge";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

const levels: AgeExperienceLevel[] = [
  "45_beginner",
  "45_advanced",
  "50_active",
  "50_pro",
  "55_veteran",
];

// All levels must exist in config
for (const level of levels) {
  assert(level in ageBadgeConfig, `Level "${level}" must exist in ageBadgeConfig`);
}

// Each entry must have non-empty label and className
for (const level of levels) {
  const badge = ageBadgeConfig[level];
  assert(typeof badge.label === "string" && badge.label.length > 0, `${level}: label must be a non-empty string`);
  assert(typeof badge.className === "string" && badge.className.length > 0, `${level}: className must be a non-empty string`);
}

// Labels must contain the correct age prefix
assert(ageBadgeConfig["45_beginner"].label.includes("45+"), "45_beginner label must contain '45+'");
assert(ageBadgeConfig["45_advanced"].label.includes("45+"), "45_advanced label must contain '45+'");
assert(ageBadgeConfig["50_active"].label.includes("50+"), "50_active label must contain '50+'");
assert(ageBadgeConfig["50_pro"].label.includes("50+"), "50_pro label must contain '50+'");
assert(ageBadgeConfig["55_veteran"].label.includes("55+"), "55_veteran label must contain '55+'");

// Labels must be unique
const labels = levels.map((l) => ageBadgeConfig[l].label);
const uniqueLabels = new Set(labels);
assert(uniqueLabels.size === labels.length, "All age badge labels must be unique");

// Color checks: sky for 45+, violet for 50+, amber for 55+
assert(ageBadgeConfig["45_beginner"].className.includes("sky"), "45_beginner should use sky color");
assert(ageBadgeConfig["45_advanced"].className.includes("sky"), "45_advanced should use sky color");
assert(ageBadgeConfig["50_active"].className.includes("violet"), "50_active should use violet color");
assert(ageBadgeConfig["50_pro"].className.includes("violet"), "50_pro should use violet color");
assert(ageBadgeConfig["55_veteran"].className.includes("amber"), "55_veteran should use amber color");

// All classNames must include a border (consistent with other indicator badges)
for (const level of levels) {
  assert(ageBadgeConfig[level].className.includes("border"), `${level}: className must include 'border' for visual consistency`);
}

console.log("✓ All ageBadge tests passed");
