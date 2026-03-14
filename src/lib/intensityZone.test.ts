import { intensityZoneConfig, type IntensityZoneLevel } from "./intensityZone";

// All expected zone keys
const allZones: IntensityZoneLevel[] = ["z1", "z2", "z3", "z4", "z5"];

// Each zone must have zone, description, and className fields
for (const key of allZones) {
  const zone = intensityZoneConfig[key];

  if (!zone) {
    throw new Error(`Missing zone config for: ${key}`);
  }
  if (!zone.zone) {
    throw new Error(`Zone label missing for: ${key}`);
  }
  if (!zone.description) {
    throw new Error(`Description missing for: ${key}`);
  }
  if (!zone.className) {
    throw new Error(`className missing for: ${key}`);
  }
}

// Zone labels must match expected pattern (Z1–Z5)
const expectedLabels: Record<IntensityZoneLevel, string> = {
  z1: "Z1",
  z2: "Z2",
  z3: "Z3",
  z4: "Z4",
  z5: "Z5",
};

for (const [key, expectedLabel] of Object.entries(expectedLabels) as [IntensityZoneLevel, string][]) {
  const actual = intensityZoneConfig[key].zone;
  if (actual !== expectedLabel) {
    throw new Error(`Expected zone label "${expectedLabel}" for key "${key}", got "${actual}"`);
  }
}

// Z2 should use green styling (most common for endurance / 45-60 age group)
if (!intensityZoneConfig.z2.className.includes("green")) {
  throw new Error("Z2 zone should use green styling for endurance indicator");
}

// Z5 should use red styling (max effort)
if (!intensityZoneConfig.z5.className.includes("red")) {
  throw new Error("Z5 zone should use red styling for max effort indicator");
}

// All zones must have unique labels
const labels = allZones.map((k) => intensityZoneConfig[k].zone);
const uniqueLabels = new Set(labels);
if (uniqueLabels.size !== labels.length) {
  throw new Error("Intensity zone labels must all be unique");
}

// All zones must have unique classNames
const classNames = allZones.map((k) => intensityZoneConfig[k].className);
const uniqueClassNames = new Set(classNames);
if (uniqueClassNames.size !== classNames.length) {
  throw new Error("Intensity zone classNames must all be unique");
}

console.log("✓ intensityZone: all tests passed");
