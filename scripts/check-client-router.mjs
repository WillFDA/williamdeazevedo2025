// Build guard-rail: the interactive components rely on the view-transition
// lifecycle events (astro:page-load, astro:before-swap, …) to (re)initialise
// and clean up after every client-side navigation. Those events ONLY fire when
// <ClientRouter /> is mounted. If someone removes the router but leaves the
// listeners behind, they silently stop firing and components quietly break
// (no error) — exactly the regression this project already hit once.
//
// This script fails the build when lifecycle events are used in src/ without a
// <ClientRouter /> anywhere in the project. If the router is present, it passes.
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const SRC_DIR = new URL("../src", import.meta.url).pathname;
const SCANNED_EXTENSIONS = [".astro", ".ts", ".tsx", ".js", ".mjs"];
const LIFECYCLE_EVENTS = [
  "astro:page-load",
  "astro:after-swap",
  "astro:before-swap",
  "astro:before-preparation",
  "astro:after-preparation",
];

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...walk(fullPath));
    } else if (SCANNED_EXTENSIONS.some((ext) => fullPath.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk(SRC_DIR);
const usesClientRouter = files.some((file) => {
  const content = readFileSync(file, "utf-8");
  return content.includes("ClientRouter");
});

const offenders = [];
for (const file of files) {
  const content = readFileSync(file, "utf-8");
  const found = LIFECYCLE_EVENTS.filter((event) => content.includes(event));
  if (found.length > 0) offenders.push({ file, events: found });
}

if (offenders.length > 0 && !usesClientRouter) {
  console.error(
    "\n✗ View-transition lifecycle events are used without <ClientRouter />.\n" +
      "  These events only fire when the client router is mounted, so the\n" +
      "  listeners below would silently never run and their components would\n" +
      "  break after navigation.\n\n" +
      "  Either re-add <ClientRouter /> (src/layout/Layout.astro) or migrate\n" +
      "  these scripts to direct initialisation / native page events.\n"
  );
  for (const { file, events } of offenders) {
    console.error(`  - ${file.replace(SRC_DIR, "src")}: ${events.join(", ")}`);
  }
  console.error("");
  process.exit(1);
}

console.log(
  usesClientRouter
    ? "✓ ClientRouter present — view-transition lifecycle events are safe."
    : "✓ No view-transition lifecycle events in use."
);
