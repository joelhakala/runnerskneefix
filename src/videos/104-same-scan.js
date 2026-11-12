// M2 v2 · a scan finding does not explain pain. Hook rewritten to speak to a runner.
window.VIDEO = { duration: 20, build(stage) {
  const { svg, film, opener, ring, fade, prog, C } = K;
  const f = film(stage, { dur: 20, beats: [
    [0, 2.7, 'Runners: scared of your <span class="bad">knee scan?</span>'],
    [2.9, 6.1, 'Researchers scanned 230 knees that had <span class="hl">no pain at all</span>.'],
    [6.3, 9.7, '<span class="warn">97%</span> showed something<br>“abnormal” anyway.'],
    [9.9, 13.6, 'So a finding on a scan<br>doesn’t explain the pain.'],
    [13.8, 17.0, 'Sharp pain, swelling, locking, giving way? <span class="warn">Get it checked.</span>'],
  ], end: { at: 17.3, line: 'A scan finding<br>is not a <span class="hl">verdict</span>.', cta: 'Send to a runner worried about a scan', src: 'Horga et al. 2020: 230 knees of adults without symptoms.' } });
  const o = opener(f.scene), grid = svg('g', {}, f.scene), two = svg('g', {}, f.scene), cells = [];
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { const x = 152 + i * 135, y = 620 + j * 150;
    cells.push([svg('rect', { x, y, width: 96, height: 124, rx: 40, fill: 'none', stroke: '#7C8AA3', 'stroke-width': 5 }, grid), svg('circle', { cx: x + 48 + (i % 2 ? 10 : -8), cy: y + 62 + (j % 2 ? -14 : 12), r: 14, fill: C.amber }, grid)]); }
  const al = ring(two), knee = x => { svg('rect', { x: x - 120, y: 660, width: 240, height: 360, rx: 110, fill: 'none', stroke: '#F4F7FB', 'stroke-width': 9 }, two); [[-30, 770], [38, 850], [-12, 930]].forEach(([dx, y]) => svg('circle', { cx: x + dx, cy: y, r: 18, fill: C.amber }, two)); };
  knee(300); knee(780);
  return t => {
    o.draw(t);
    cells.forEach((c, k) => { c[0].setAttribute('opacity', prog(t, 3.5 + k * 0.05, 3.6 + k * 0.05)); c[1].setAttribute('opacity', k === 17 ? 0 : prog(t, 7.0 + k * 0.055, 7.1 + k * 0.055)); });
    fade(grid, t, 2.9, 9.9); fade(two, t, 9.9); al.g.setAttribute('opacity', prog(t, 10.7, 11.1)); al.set(300, 840, 230, t); f.tick(t);
  };
} };
