// M1 v2 · not one flaw; a sudden jump overflows the cup, and the cup is trainable.
window.VIDEO = { duration: 20, build(stage) {
  const { svg, film, opener, cup, track, pouring, fade, prog, ease, C } = K;
  const f = film(stage, { dur: 20, beats: [
    [0, 2.6, 'Runner’s knee:<br>is it your <span class="bad">weak glutes?</span>'],
    [2.8, 6.3, 'Glutes, flat feet, shoes: studies can’t pin it on <span class="hl">one flaw</span>.'],
    [6.5, 10.0, 'Picture your knee as a cup. A <span class="bad">sudden jump</span> overflows it.'],
    [10.2, 13.6, 'How much it can take<br>is <span class="hl">trainable</span>.'],
    [13.8, 17.0, 'Build up in small steps,<br>and the same run fits.'],
  ], end: { at: 17.3, line: 'Not a flaw.<br><span class="hl">Too much, too soon.</span>', cta: 'Follow for how to build up', src: 'Neal 2019 · Peterson 2022 · Frandsen 2025' } });
  const o = opener(f.scene), cg = svg('g', {}, f.scene), c = cup(cg);
  const X = [3.7, 4.5, 5.3].map(() => svg('path', { d: 'M-34 -34 L34 34 M34 -34 L-34 34', stroke: C.coral, 'stroke-width': 16, 'stroke-linecap': 'round', fill: 'none' }, o.g));
  const L = [[7.6, 8.6, 1.25, 1], [10.4, 11.0, 0.62, 0], [11.2, 13.0, 0.45, 0], [14.6, 15.6, 0.93, 1]], S = [[11.2, 13.0, 1.3]];
  return t => {
    const P = o.draw(t, { until: 6.4 }), at = [P.pelvis, P.ankleN, { x: P.ankleN.x + 46, y: P.ankleN.y + 24 }];
    X.forEach((x, i) => { const k = ease.back(prog(t, 3.7 + i * 0.8, 3.95 + i * 0.8)); x.setAttribute('transform', `translate(${at[i].x} ${at[i].y}) scale(${k})`); x.setAttribute('opacity', k > 0.02 ? 1 : 0); });
    c.set({ level: track(t, 0, L), size: track(t, 1, S), pour: pouring(t, L), t }); fade(cg, t, 6.5); f.tick(t);
  };
} };
