// M1 v2 · longest run of the last 30 days. Hook now names the runner and the knee.
window.VIDEO = { duration: 19.5, build(stage) {
  const { svg, film, opener, stext, track, fade, prog, ease, C } = K;
  const f = film(stage, { dur: 19.5, beats: [
    [0, 2.8, 'Runners: one run may explain your <span class="bad">knee pain</span>.'],
    [3.0, 6.2, 'A study tracked 5,200 runners over 588,000 runs.'],
    [6.4, 9.8, 'What mattered: your <span class="hl">longest run</span> of the last 30 days.'],
    [10.0, 13.2, 'Go 10–30% past it:<br><span class="bad">64% higher injury rate.</span>'],
    [13.4, 16.2, 'Double it:<br><span class="bad">128% higher.</span>'],
  ], end: { at: 16.5, line: 'Know your longest run.<br><span class="hl">Grow it in small steps.</span>', cta: 'Save this for Sunday', src: 'Frandsen et al. 2025, BJSM. All running injuries, observational.' } });
  const o = opener(f.scene), g = svg('g', {}, f.scene), km = [5, 0, 8, 0, 6, 0, 12, 0, 5, 8, 0, 6, 16, 0, 5, 0, 8, 6, 0, 10, 0, 5, 8, 0, 6, 0, 12, 0, 6, 0], base = 1320, px = 19;
  svg('line', { x1: 80, x2: 1000, y1: base, y2: base, stroke: '#2A3650', 'stroke-width': 6 }, g);
  const bars = km.map((k, i) => (k ? svg('rect', { x: 92 + i * 27, width: 20, rx: 7, fill: '#7C8AA3' }, g) : null));
  const line = svg('line', { x1: 80, x2: 1010, y1: base - 16 * px, y2: base - 16 * px, stroke: C.lime, 'stroke-width': 8, 'stroke-dasharray': '24 16', 'stroke-linecap': 'round' }, g), lab = stext(g, 92 + 12 * 27 + 10, base - 16 * px - 26, '16 km', { size: 46, fill: C.lime });
  const tb = svg('rect', { x: 925, width: 70, rx: 12, fill: '#F4F7FB' }, g), tr = svg('rect', { x: 925, width: 70, rx: 12, fill: C.coral }, g), tl = stext(g, 960, 0, '', { size: 46 });
  return t => {
    o.draw(t);
    bars.forEach((b, i) => { if (!b) return; const h = km[i] * px * ease.out(prog(t, 3.6 + i * 0.06, 4.0 + i * 0.06)); b.setAttribute('y', base - h); b.setAttribute('height', h); b.setAttribute('fill', km[i] === 16 && t > 7.1 ? C.lime : '#7C8AA3'); });
    line.setAttribute('opacity', prog(t, 7.3, 7.7)); lab.setAttribute('opacity', prog(t, 7.3, 7.7));
    const k = track(t, 0, [[10.7, 11.7, 20], [14.0, 15.0, 32]]), h = k * px, over = Math.max(0, k - 16) * px;
    tb.setAttribute('y', base - h); tb.setAttribute('height', h); tr.setAttribute('y', base - h); tr.setAttribute('height', over); tl.setAttribute('y', base - h - 24); tl.textContent = k > 1 ? Math.round(k) + ' km' : '';
    fade(g, t, 3.0); f.tick(t);
  };
} };
