#!/usr/bin/env node
// Render social/og-image.html to public/assets/img/<OUT> at exactly 1200x630.
// /assets/ is cached for a year: when the design changes, bump OUT and the og:image tags.
//   npm run social      (set CHROMIUM=/path/to/chrome if no browser is found)
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const OUT = 'og-image-2.png';

const candidates = [
  process.env.CHROMIUM, '/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

(async () => {
  const executablePath = candidates.find(p => fs.existsSync(p));
  const args = process.getuid && process.getuid() === 0 ? ['--no-sandbox'] : [];
  const browser = await chromium.launch(executablePath ? { executablePath, args } : { channel: 'chrome', args });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'og-image.html'));
  await page.evaluate(() => document.fonts.ready);
  const fit = await page.evaluate(() => {
    const d = document.documentElement, img = document.querySelector('img');
    return { overflow: d.scrollWidth > 1200 || d.scrollHeight > 630,
             images: !img || (img.complete && img.naturalWidth > 0),
             fonts: document.fonts.check('500 16px "Oswald"') && document.fonts.check('600 16px "Inter"') };
  });
  if (fit.overflow || !fit.images || !fit.fonts) { console.error('render check failed:', fit); process.exit(1); }
  const out = path.join(__dirname, '..', 'public', 'assets', 'img', OUT);
  await page.screenshot({ path: out });
  await browser.close();
  console.log(`wrote ${path.relative(process.cwd(), out)} (${fs.statSync(out).size} bytes)`);
})().catch(e => { console.error(e); process.exit(1); });
