// M3/M2 v2 · knee osteoarthritis is not automatically a stop sign (Lo 2018, observational; the video says so).
window.VIDEO = { duration: 20.5, build(stage) {
  const { svg, film, opener, Runner, fade, prog, ease, C } = K;
  const f = film(stage, { dur: 20.5, beats: [
    [0, 2.8, 'Knee arthritis.<br>Told to <span class="bad">stop running?</span>'],
    [3.0, 6.6, 'A study followed 1,203 people with knee arthritis for 4 years.'],
    [6.8, 9.6, 'Some kept running.<br>Most didn’t.'],
    [9.8, 13.6, 'After 4 years, the runners’ knees were <span class="hl">no worse</span>.'],
    [13.8, 17.2, 'They chose to run, so it isn’t proof. <span class="warn">Ask your clinician.</span>'],
  ], end: { at: 17.5, line: 'Arthritis is not automatically a <span class="hl">stop sign</span>.', cta: 'Send to a runner who was told to quit', src: 'Lo et al. 2018, Osteoarthritis Initiative. Observational.' } });
  const o = opener(f.scene, { color: C.amber }), g = svg('g', {}, f.scene), gl = svg('g', {}, g), gr = svg('g', {}, g);
  svg('line', { x1: 110, x2: 490, y1: 1060, y2: 1060, stroke: '#2A3650', 'stroke-width': 6 }, gl); svg('line', { x1: 590, x2: 970, y1: 1060, y2: 1060, stroke: '#2A3650', 'stroke-width': 6 }, gr);
  const r1 = K.skin(gl, 'chunky', 0.52), r2 = K.skin(gr, 'chunky', 0.52);
  const meter = (p, x) => { svg('rect', { x, y: 1150, width: 300, height: 56, rx: 28, fill: '#24314D' }, p); return svg('rect', { x, y: 1150, height: 56, rx: 28, fill: C.amber }, p); }, m1 = meter(gl, 150), m2 = meter(gr, 630);
  const eq = svg('path', { d: 'M505 1166 h70 M505 1192 h70', stroke: C.lime, 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  return t => {
    o.draw(t); r1(t * 1.5, { x: 300, ground: 1060, mood: 0.1 }); r2(0, { x: 780, ground: 1060, mood: 0.4, pose: K.standing(0) });
    const w = 56 + 110 * ease.inOut(prog(t, 10.6, 12.6)); m1.setAttribute('width', w); m2.setAttribute('width', w);
    gl.setAttribute('opacity', prog(t, 3.6, 3.9) * (t > 8.5 && t < 9.6 ? 0.35 : 1)); gr.setAttribute('opacity', prog(t, 4.2, 4.5) * (t > 7.4 && t < 8.5 ? 0.35 : 1));
    m1.parentNode && [m1, m2].forEach(m => { m.previousSibling.setAttribute('opacity', prog(t, 9.8, 10.2)); m.setAttribute('opacity', prog(t, 9.8, 10.2)); }); eq.setAttribute('opacity', prog(t, 12.7, 13.0));
    fade(g, t, 3.0); f.tick(t);
  };
} };
