// Usage: node tools/storyboard.cjs <video-id> [...]  -> content/storyboards/<id>.jpg (one still per beat) + check report.
// Step 2 of the workflow: the owner approves the storyboard before a full render.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
(async () => {
  const browser = await chromium.launch(), root = path.join(__dirname, '..'), report = {};
  for (const id of process.argv.slice(2)) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 0.5 });
    await page.goto('file://' + path.join(root, 'src', 'player.html') + '?v=' + id);
    await page.waitForFunction('window.__ready === true', null, { timeout: 15000 });
    const info = await page.evaluate('window.__beats');
    if (!info) { console.log(`${id}: no beats exposed (not a K.film video)`); await page.close(); continue; }
    const times = info.beats.map(b => b[0] + 0.78 * (b[1] - b[0])).concat([info.end.at + 1.2]), tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-')), problems = [];
    for (let i = 0; i < times.length; i++) {
      await page.evaluate(([t, label]) => { window.__render(t); let b = document.getElementById('sb'); if (!b) { b = document.createElement('div'); b.id = 'sb'; b.style.cssText = 'position:absolute;left:30px;top:30px;font:800 64px Inter,sans-serif;color:#0B1220;background:#C6F432;border-radius:16px;padding:8px 24px;z-index:9'; document.body.appendChild(b); } b.textContent = label; }, [times[i], `${i + 1}/${times.length}  ${times[i].toFixed(1)}s`]);
      for (const p of await page.evaluate(() => window.__check())) problems.push(`beat ${i + 1}: ${p}`);
      await page.screenshot({ path: path.join(tmp, String(i).padStart(2, '0') + '.png') });
    }
    const out = path.join(root, 'content', 'storyboards', id + '.jpg');
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '1', '-i', path.join(tmp, '%02d.png'), '-vf', `scale=360:-1,tile=${times.length}x1`, '-frames:v', '1', '-q:v', '3', out]);
    report[id] = problems; console.log(`${id}: ${times.length} stills -> ${out}${problems.length ? '\n  ' + problems.join('\n  ') : '  (checks pass)'}`);
    await page.close();
  }
  fs.writeFileSync(path.join(root, 'content', 'storyboards', 'report.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
})();
