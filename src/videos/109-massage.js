// M8 · "Does X fix runner's knee?" pilot. Forum counts are labelled as a forum sample, not a study.
window.VIDEO = {
  duration: 18,
  build(stage) {
    const { svg, div, show, prog, lerp, ease, stext, beats, Figure, ring, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), A = svg('g', {}, s), B = svg('g', {}, s);
    svg('line', { x1: 0, x2: 1080, y1: 1290, y2: 1290, stroke: '#2A3650', 'stroke-width': 6 }, A);
    const fig = new Figure(A, { s: 0.82 }), al = ring(A), hand = svg('circle', { r: 44, fill: 'none', stroke: C.lime, 'stroke-width': 12 }, A);
    const win = svg('g', {}, A); svg('rect', { x: 240, y: 1370, width: 600, height: 26, rx: 13, fill: '#24314D' }, win);
    const wbar = svg('rect', { x: 240, y: 1370, height: 26, rx: 13, fill: C.lime }, win); stext(win, 540, 1450, 'WINDOW', { size: 36, fill: C.lime, ls: 4 });
    stext(B, 330, 660, 'saved me', { size: 46, fill: C.lime }); stext(B, 750, 660, 'did nothing', { size: 46, fill: '#8A97AD' });
    const dots = []; for (let i = 0; i < 7; i++) {
      dots.push([svg('circle', { cx: 330, cy: 740 + i * 82, r: 30, fill: C.lime }, B), svg('circle', { cx: 750, cy: 740 + i * 82, r: 30, fill: '#7C8AA3' }, B), stext(B, 400, 756 + i * 82, '+ more', { size: 38, anchor: 'start', weight: 700 })]);
    }
    const note = div('note', 'Forum sample, not a study.', stage, { top: '1400px' });
    const txt = beats(stage, [
      { a: 0, b: 2.4, cls: 'hook', html: 'Does <span class="hl">massage</span> fix runner’s knee?' },
      { a: 2.7, b: 6.2, cls: 'mid', html: 'Runners on forums: <span class="hl">7 say it saved them.</span> 7 say it did nothing.' },
      { a: 6.5, b: 10.2, cls: 'mid', html: 'Look closer: 5 of the 7 were <span class="hl">also doing something else.</span>' },
      { a: 10.5, b: 14.7, cls: 'mid', html: 'Massage turns the alarm down for a while. <span class="hl">That’s a window.</span>' },
    ]);
    const end = finish(stage, { at: 15, line: 'Not a fix. A window.<br><span class="hl">Use it.</span>', cta: 'Send to your foam-roller friend', src: 'Forum sample of 48 threads. Trial evidence for massage here is uncertain (Collins 2018).' });
    const bar = progress(stage, 18);
    return t => {
      const q = t > 12 ? 0.5 - 0.5 * Math.cos((t - 12) * 4.2) : 0;
      const P = fig.set({ x: 520, ground: 1290, lean: 22 * q, hipN: 3 + 62 * q, kneeN: 4 + 100 * q, hipF: -3 + 62 * q, kneeF: 4 + 100 * q, shN: 4 + 60 * q, elN: 8, shF: -4 + 60 * q, elF: 8 });
      const u = 0.5 + 0.5 * Math.sin(t * 5), calm = ease.inOut(prog(t, 10.9, 12.2));
      hand.setAttribute('cx', lerp(P.pelvis.x, P.kneeN.x, 0.25 + 0.6 * u) + 40); hand.setAttribute('cy', lerp(P.pelvis.y, P.kneeN.y, 0.25 + 0.6 * u)); hand.setAttribute('opacity', t < 12.2 ? 1 : 0);
      al.set(P.kneeN.x, P.kneeN.y, lerp(130, 44, calm), t);
      win.setAttribute('opacity', prog(t, 12, 12.4)); wbar.setAttribute('width', 600 * (1 - prog(t, 12.2, 15.4)));
      A.setAttribute('opacity', (1 - prog(t, 2.4, 2.7)) + prog(t, 10.3, 10.6) * (1 - prog(t, 14.7, 15)));
      dots.forEach((d, i) => { d[0].setAttribute('opacity', prog(t, 2.9 + i * 0.18, 3.0 + i * 0.18)); d[1].setAttribute('opacity', prog(t, 4.3 + i * 0.18, 4.4 + i * 0.18)); d[2].setAttribute('opacity', i < 5 ? prog(t, 6.9 + i * 0.3, 7.1 + i * 0.3) : 0); });
      fade(B, t, 2.7, 10.4); show(note, t, 3.4, 10.2); txt(t); end(t); bar(t);
    };
  },
};
