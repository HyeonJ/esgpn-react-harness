import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = 'docs/screenshots-v4';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'about-organization', path: '/about/organization' },
  { name: 'contest', path: '/contest' },
  { name: 'certification', path: '/certification' },
  { name: 'news', path: '/news' },
  { name: 'news-detail', path: '/news/1' },
  { name: 'gallery', path: '/gallery' },
  { name: 'contact', path: '/contact' },
];

const VIEWPORTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 },
];

mkdirSync(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const page of PAGES) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const tab = await context.newPage();
    await tab.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await tab.waitForTimeout(500);
    const filename = `${page.name}_${vp.name}.png`;
    await tab.screenshot({ path: path.join(OUTPUT_DIR, filename), fullPage: true });
    await context.close();
    process.stdout.write(`✓ ${filename}\n`);
  }
}

await browser.close();
console.log(`\nDone: ${PAGES.length * VIEWPORTS.length} screenshots in ${OUTPUT_DIR}/`);
