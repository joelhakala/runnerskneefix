// M1 · actionable: single-session spikes relative to the longest run of the last 30 days (Frandsen 2025).
window.VIDEO = {
  duration: 18.5,
  build(stage) {
    const { svg, prog, lerp, ease, stext, beats, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s);
    const km = [5, 0, 8, 0, 6, 0, 12, 0, 5, 8, 0, 6, 16, 0, 5, 0, 8, 6, 0, 10, 0, 5, 8, 0, 6, 0, 12, 0, 6, 0], base = 1280, px = 19;
    svg('line', { x1: 90, x2: 990, y1: base, y2: base, stroke: '#2A3650', 'stroke-width': 5 }, scene);
    km.forEach((k, i) => k && svg('rect', { x: 100 + i * 27, y: base - k * px, width: 19, height: k * px, rx: 6, fill: k === 16 ? C.lime : '#7C8AA3' }, scene));
    stext(scene, 500, base + 58, 'your last 30 days', { size: 36, fill: '#8A97AD', weight: 700 });
    const line = svg('g', {}, scene); svg('line', { x1: 90, x2: 1010, y1: base - 16 * px, y2: base - 16 * px, stroke: C.lime, 'stroke-width': 7, 'stroke-dasharray': '24 16', 'stroke-linecap': 'round' }, line);
    stext(line, 90, base - 16 * px - 24, 'longest run: 16 km', { size: 40, fill: C.lime, anchor: 'start' });
    const today = svg('g', {}, scene), tb = svg('rect', { x: 935, width: 60, rx: 10, fill: '#F4F7FB' }, today), tr = svg('rect', { x: 935, width: 60, rx: 10, fill: C.coral }, today);
    const tl = stext(today, 965, 0, '', { size: 44 }), risk = stext(today, 905, 0, '', { size: 64, fill: C.coral, anchor: 'end' });
    stext(today, 965, base + 58, 'today', { size: 36, weight: 700 });
    const txt = beats(stage, [
      { a: 0, b: 2.6, cls: 'hook', html: 'Counting weekly miles? Maybe the <span class="bad">wrong number.</span>', style: { fontSize: '92px' } },
      { a: 2.9, b: 6.7, cls: 'mid', html: '5,200 runners. 588,000 runs. Injury risk tracked <span class="hl">one run.</span>' },
      { a: 7, b: 9.6, cls: 'mid', html: 'Go 10–30% past your longest: <span class="bad">64% higher injury rate.</span>' },
      { a: 9.9, b: 12.3, html: 'Double it:<br><span class="bad">128% higher.</span>' },
      { a: 12.6, b: 15.4, cls: 'mid', html: 'Before your next long run: what is your longest in the <span class="hl">last 30 days?</span>' },
    ]);
    const end = finish(stage, { at: 15.7, line: 'Grow the long run in <span class="hl">small steps</span>.', cta: 'Save this for Sunday', src: 'Frandsen et al. 2025, BJSM. All running injuries, observational.' });
    const bar = progress(stage, 18.5);
    return t => {
      line.setAttribute('opacity', prog(t, 4.6, 5.1));
      const k = lerp(0, 20, ease.out(prog(t, 7.1, 8.2))) + 12 * ease.inOut(prog(t, 9.9, 11)) - 16.5 * ease.inOut(prog(t, 12.6, 13.6));
      const h = k * px, over = Math.max(0, k - 16) * px;
      tb.setAttribute('y', base - h); tb.setAttribute('height', h); tr.setAttribute('y', base - h); tr.setAttribute('height', over);
      tl.setAttribute('y', base - h - 22); tl.textContent = k > 0.5 ? Math.round(k) + ' km' : '';
      risk.setAttribute('y', base - h + over / 2 + 22); risk.textContent = k > 31 ? '+128%' : k > 17.5 ? '+64%' : ''; risk.setAttribute('opacity', t < 12.6 ? 1 : 0);
      today.setAttribute('opacity', prog(t, 6.9, 7.2)); fade(scene, t, null, 15.7); txt(t); end(t); bar(t);
    };
  },
};
