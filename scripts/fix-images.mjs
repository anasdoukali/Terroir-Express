#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";

const files = [
  "src/App.tsx",
  "src/Home.tsx",
  "src/Products.tsx",
  "src/ChefClub.tsx",
  "src/Awards.tsx",
  "src/Contact.tsx",
  "src/components/GastronomicCollections.tsx",
  "src/components/ChefClubCommunity.tsx",
  "src/components/SoulStatement.tsx",
];

// Make all imagery fully clear: remove dimming opacities + desaturation.
const replacements = [
  ["object-cover opacity-[0.9]", "object-cover opacity-100"],
  ["object-cover opacity-[0.92]", "object-cover opacity-100"],
  ["object-cover opacity-[0.95]", "object-cover opacity-100"],
  ["object-cover opacity-[0.85]", "object-cover opacity-100"],
  ["object-cover opacity-[0.8]", "object-cover opacity-100"],
  ["grayscale-[35%]", "grayscale-0"],
  ["grayscale-[20%]", "grayscale-0"],
];

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const before = content;
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  if (content !== before) {
    writeFileSync(file, content);
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  - ${file} (no changes)`);
  }
}
console.log("\nImages cleared.");
