// M1 · not a flaw, a mismatch.
window.VIDEO = {
  duration: 18,
  build(stage) {
    const { svg, prog, lerp, ease, sm, steps, stext, beats, chart, Figure, runPose, pulse, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s), fg = svg('g', {}, scene);
    svg('line', { x1: -900, x2: 900, y1: 0, y2: 0, stroke: '#2A3650', 'stroke-width': 6 }, fg);
    const fig = new Figure(fg, { s: 0.8 }), knee = pulse(fg, C.coral);
    const tags = [['weak glutes', 215, 760], ['bad tracking', 860, 800], ['flat feet', 205, 1085], ['wrong shoes', 870, 1075]].map(([n, x, y]) => {
      const g = svg('g', {}, scene);
      svg('rect', { x: x - 165, y: y - 52, width: 330, height: 84, rx: 42, fill: '#1B2740', stroke: C.coral, 'stroke-width': 4 }, g);
      stext(g, x, y + 4, n, { size: 40, weight: 700 }); return { g, x, y };
    });
    const A = chart(s, { y: 1320, h: 440 }), B = chart(s, { y: 1320, h: 440 });
    const capA = u => 0.46 + 0.1 * u, loadA = u => 0.3 + 0.08 * u + 0.5 * (sm(u, 0.5, 0.58) - sm(u, 0.72, 0.8));
    const loadB = u => 0.25 + 0.32 * steps(u, 4), capB = u => 0.34 + 0.32 * steps(u - 0.06, 4);
    const txt = beats(stage, [
      { a: 0, b: 2.5, cls: 'hook', html: 'Told your knee pain is <span class="bad">weak glutes?</span>' },
      { a: 2.8, b: 5.8, cls: 'mid', html: 'Studies keep hunting for the one flaw. <span class="hl">It rarely predicts</span> who gets hurt.' },
      { a: 6.1, b: 10.8, cls: 'mid', html: 'Pain shows up when load jumps past what your knee is <span class="hl">ready for</span>.' },
      { a: 11.1, b: 14.8, html: 'And “ready” is trainable.<br><span class="hl">Step by step.</span>' },
    ]);
    const end = finish(stage, { at: 15.1, line: 'Not a flaw.<br><span class="hl">A mismatch.</span>', cta: 'Follow to learn how to close the gap', src: 'Neal 2019 · Peterson 2022 · Frandsen 2025' });
    const bar = progress(stage, 18);
    return t => {
      const k = ease.inOut(prog(t, 5.8, 6.6));
      fg.setAttribute('transform', `translate(540 ${lerp(1260, 850, k)}) scale(${lerp(1, 0.42, k)})`);
      const P = fig.set(runPose(t * 1.38, { x: 0, ground: 0, A: 34, stanceKnee: 44, lean: 6 }));
      const a = A.set(prog(t, 6.6, 10.4), capA, loadA, t); B.set(prog(t, 11.3, 14.6), capB, loadB, t);
      knee.set(P.kneeN, t, { r: t < 6 || a.hot ? 30 : 16, color: t > 11 ? C.lime : C.coral });
      tags.forEach((g, i) => { const f = prog(t, 2.9 + i * 0.55, 3.6 + i * 0.55), w = 6 * Math.sin(t * 3 + i * 2); g.g.setAttribute('transform', `translate(0 ${w + 900 * f * f}) rotate(${(i % 2 ? 1 : -1) * 28 * f} ${g.x} ${g.y})`); g.g.setAttribute('opacity', 1 - f); });
      fade(A.g, t, 6.3, 11.1); fade(B.g, t, 11.1, 15.1); fade(scene, t, null, 15.1);
      txt(t); end(t); bar(t);
    };
  },
};
