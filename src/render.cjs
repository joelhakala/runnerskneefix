// Usage: node src/render.cjs <video-id> [...]   -> videos/<id>.mp4 (1080x1920, 30 fps)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const FPS = 30;

(async () => {
  const ids = process.argv.slice(2);
  const browser = await chromium.launch();
  for (const id of ids) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    page.on('console', m => { if (m.type() === 'warning') console.log(`[${id}] ${m.text()}`); });
    page.on('pageerror', e => { console.error(`[${id}]`, e.message); process.exitCode = 1; });
    await page.goto('file://' + path.join(__dirname, 'player.html') + '?v=' + id);
    await page.waitForFunction('window.__ready === true', null, { timeout: 15000 });
    const duration = await page.evaluate('window.VIDEO.duration');
    const out = path.join(__dirname, '..', 'videos', id + '.mp4');
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', FPS, '-i', '-',
      '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-shortest',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-c:a', 'aac', '-b:a', '96k',
      '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round(duration * FPS), problems = new Map();
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.__render(t), i / FPS);
      if (i % 10 === 0) for (const p of await page.evaluate(() => window.__check())) if (!problems.has(p.replace(/\d+/g, '#'))) problems.set(p.replace(/\d+/g, '#'), `${p} at ${(i / FPS).toFixed(1)}s`);
      const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
    await page.close();
    for (const v of problems.values()) console.log(`[${id}] [check] ${v}`);
    console.log(`${id}: ${n} frames -> ${out}`);
  }
  await browser.close();
})();
