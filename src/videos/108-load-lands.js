// M7 v2 · one glow at a time: knee first, then calf. Message is the trade-off, not "run forefoot".
window.VIDEO = { duration: 20, build(stage) {
  const { svg, film, Runner, road, track, prog, C } = K;
  const f = film(stage, { dur: 20, beats: [
    [0, 2.8, 'Why does running hurt your <span class="bad">knee</span>, not your ankle?'],
    [3.0, 6.2, 'Every step, your leg absorbs your body weight.'],
    [6.4, 9.8, 'Long, heavy strides:<br>the <span class="bad">knee</span> takes more.'],
    [10.0, 13.2, 'Shorter, quicker steps:<br>the knee takes <span class="hl">less</span>.'],
    [13.4, 16.6, 'But your calf and Achilles take <span class="warn">more</span>.'],
  ], end: { at: 16.9, line: 'Load doesn’t vanish.<br><span class="hl">It moves.</span>', cta: 'Save before you change your stride', src: 'Kulmala et al. 2013. Change technique slowly.' } });
  const rd = road(f.scene, 1300), glowK = svg('circle', { 'stroke-width': 10 }, f.scene), glowC = svg('circle', { 'stroke-width': 10, fill: C.amber, stroke: C.amber, 'fill-opacity': 0.3 }, f.scene), r = new Runner(f.scene, { s: 0.92 });
  const ST = [[6.9, 7.9, 1.3], [10.5, 11.5, 0.72]]; let cache = { t: 0, p: 0, d: 0 };
  const phase = t => { if (t < cache.t) cache = { t: 0, p: 0, d: 0 }; let { t: x, p, d } = cache; for (; x < t; x += 1 / 120) { const s = track(x, 1, ST), hz = 1.42 - 0.66 * (s - 1); p += hz / 120; d += hz * s * 300 / 120; } cache = { t: x, p, d }; return cache; };
  return t => {
    const st = track(t, 1, ST), ph = phase(t), P = r.run(ph.p, { x: 520, ground: 1300, stride: st, bend: 0.75 + 0.35 * st, mood: st > 1.1 ? 0.9 : t > 10.5 ? 0.1 : 0.5 }); rd(ph.d);
    const rk = track(t, 78, [[6.9, 7.9, 130], [10.5, 11.5, 52], [13.6, 14.4, 40]]) * (1 + 0.05 * Math.sin(t * 9)), col = t > 11 ? C.lime : C.coral;
    glowK.setAttribute('cx', P.kneeN.x); glowK.setAttribute('cy', P.kneeN.y); glowK.setAttribute('r', rk); glowK.setAttribute('stroke', col); glowK.setAttribute('fill', col); glowK.setAttribute('fill-opacity', 0.28); glowK.setAttribute('opacity', 1 - 0.6 * prog(t, 13.6, 14.2));
    glowC.setAttribute('cx', P.calfN.x); glowC.setAttribute('cy', P.calfN.y + 40); glowC.setAttribute('r', track(t, 0, [[13.9, 14.9, 112]]) * (1 + 0.05 * Math.sin(t * 9)));
    f.tick(t);
  };
} };
