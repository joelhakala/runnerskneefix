// M2 · pain is an alarm, not a damage report.
window.VIDEO = {
  duration: 18,
  build(stage) {
    const { svg, prog, lerp, ease, stext, beats, dial, ring, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), grid = svg('g', {}, s), two = svg('g', {}, s);
    const cells = [];
    for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) {
      const x = 152 + i * 135, y = 690 + j * 150;
      svg('rect', { x, y, width: 96, height: 124, rx: 40, fill: 'none', stroke: '#7C8AA3', 'stroke-width': 4 }, grid);
      cells.push(svg('circle', { cx: x + 48 + (i % 2 ? 10 : -8), cy: y + 62 + (j % 2 ? -14 : 12), r: 13, fill: C.amber }, grid));
    }
    const knee = x => { svg('rect', { x: x - 110, y: 680, width: 220, height: 330, rx: 100, fill: 'none', stroke: '#7C8AA3', 'stroke-width': 7 }, two); [[-30, 780], [36, 850], [-12, 925]].forEach(([dx, y]) => svg('circle', { cx: x + dx, cy: y, r: 16, fill: C.amber }, two)); };
    const al = ring(two); knee(310); knee(770);
    stext(two, 310, 1085, 'hurts', { size: 46, fill: C.coral }); stext(two, 770, 1085, 'fine', { size: 46, fill: C.lime });
    const dl = dial(two, 540, 1340, 150, 'ALARM SENSITIVITY');
    const txt = beats(stage, [
      { a: 0, b: 2.8, cls: 'hook', html: '<span class="warn">97%</span> of pain-free knees show “abnormal” findings on MRI', style: { fontSize: '80px' } },
      { a: 3.1, b: 7.8, html: 'Same picture.<br><span class="bad">One hurts.</span> One doesn’t.' },
      { a: 8.1, b: 12.8, html: 'Pain works like an <span class="bad">alarm</span>.<br>Not a damage report.' },
      { a: 13.1, b: 15.5, cls: 'mid', html: 'Sharp pain, swelling, locking or giving way? <span class="warn">Get it checked.</span>' },
    ]);
    const end = finish(stage, { at: 15.8, line: 'Hurt is not the<br>same as <span class="hl">harm</span>.', cta: 'Send to someone scared of their scan', src: 'Horga et al. 2020: 230 knees of adults without symptoms.' });
    const bar = progress(stage, 18);
    return t => {
      cells.forEach((c, k) => c.setAttribute('opacity', k === 17 ? 0 : (k < 12 || t > (k - 12) * 0.1 + 0.1 ? 1 : 0)));
      fade(grid, t, null, 3.0); fade(two, t, 3.0, 15.8);
      const k = t < 8 ? 0.45 : lerp(0.45, 0.95, ease.inOut(prog(t, 8.4, 10.2))) - 0.8 * ease.inOut(prog(t, 10.6, 12.6));
      dl.set(k); dl.g.setAttribute('opacity', prog(t, 8.0, 8.4));
      al.set(310, 845, 90 + 150 * k, t);
      txt(t); end(t); bar(t);
    };
  },
};
