import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3101/', { waitUntil: 'networkidle' });
await p.waitForTimeout(3800);
const read = () => p.evaluate(() => {
  const P = document.querySelector('.sh-plate').getBoundingClientRect();
  const M = document.querySelector('.sh-media').getBoundingClientRect();
  const on = document.querySelector('.sh-panel.on') || document.querySelector('.sh-panel');
  const kids = [...on.children].map(k => k.getBoundingClientRect()).filter(r => r.height > 0);
  const top = Math.min(...kids.map(r => r.top)), bot = Math.max(...kids.map(r => r.bottom));
  return { plateH: Math.round(P.height), band: Math.round(M.height),
           copyTop: Math.round(top - P.top), copyBottom: Math.round(bot - P.top),
           gapBandToCopy: Math.round(top - M.bottom),
           gapCopyToPlateEnd: Math.round(P.bottom - bot),
           overlapsVideo: top < M.bottom };
});
console.log('panel 1:', await read());
await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.3));
await p.waitForTimeout(2200);
console.log('later panel:', await read());
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(2500);
await p.screenshot({ path: '/tmp/hero-new.png' });
await p.close(); await b.close();
