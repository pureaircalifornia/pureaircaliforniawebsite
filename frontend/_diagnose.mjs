// TEMP diagnostic (delete after). Why React doesn't mount under Puppeteer.
import path from 'path';
import express from 'express';
import puppeteer from 'puppeteer';

const BUILD_DIR = path.resolve('build');
const PORT = 3009;
const app = express();
app.use(express.static(BUILD_DIR));
app.get('*', (req, res) => res.sendFile(path.join(BUILD_DIR, 'index.html')));

const server = app.listen(PORT, async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[console.${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[PAGEERROR] ${e.message}`));
  page.on('requestfailed', r => logs.push(`[REQFAIL] ${r.url()} :: ${r.failure()?.errorText}`));

  for (const route of ['/', '/locations/van-nuys']) {
    logs.length = 0;
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 }).catch(e => logs.push(`[GOTO] ${e.message}`));
    await new Promise(r => setTimeout(r, 4000));
    const rootLen = await page.evaluate(() => document.querySelector('#root')?.innerHTML.length || 0);
    const hasH1 = await page.evaluate(() => !!document.querySelector('h1'));
    console.log(`\n===== ${route} =====  #root len: ${rootLen}  has<h1>: ${hasH1}`);
    console.log(logs.slice(0, 25).join('\n') || '(no console/error messages)');
  }
  await browser.close();
  server.close();
  process.exit(0);
});
