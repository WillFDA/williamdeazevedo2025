// Renders scripts/editorial/covers.html into public/articles/<slug>/cover.webp.
// Playwright is not a project dependency and drives the local Google Chrome:
//   bun add --no-save playwright && bun scripts/editorial/render-covers.mjs
// Pass `--out <dir>` to write previews instead of overwriting the covers.
import { mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";
import sharp from "sharp";

const scale = 2;
const root = path.resolve(import.meta.dirname, "../..");
const outIndex = process.argv.indexOf("--out");
const outDir =
  outIndex === -1 ? null : path.resolve(process.argv[outIndex + 1]);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  deviceScaleFactor: scale,
  viewport: { height: 675, width: 1200 },
});
await page.goto(
  pathToFileURL(path.join(import.meta.dirname, "covers.html")).href
);
await page.evaluate(() => document.fonts.ready);

const covers = await page.$$eval("section[data-slug]", (sections) =>
  sections.map((section) => {
    const { height, left, top, width } = section.getBoundingClientRect();
    return {
      height,
      left: left + scrollX,
      slug: section.dataset.slug,
      top: top + scrollY,
      width,
    };
  })
);
const sheet = await page.screenshot({ fullPage: true });
await browser.close();

await Promise.all(
  covers.map(async ({ height, left, slug, top, width }) => {
    const file = outDir
      ? path.join(outDir, `${slug}.webp`)
      : path.join(root, "public/articles", slug, "cover.webp");
    mkdirSync(path.dirname(file), { recursive: true });
    const info = await sharp(sheet)
      .extract({
        height: height * scale,
        left: left * scale,
        top: top * scale,
        width: width * scale,
      })
      .resize(1600, 900)
      .webp({ quality: 82 })
      .toFile(file);
    console.log(`${slug}: ${info.width}x${info.height}, ${info.size} bytes`);
  })
);
