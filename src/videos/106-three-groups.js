// M5 v2 · three groups, told as three runners in lanes reaching the same finish line.
window.VIDEO = { duration: 21.5, build(stage) {
  const { svg, film, opener, Runner, fade, prog, lerp, ease, C } = K;
  const f = film(stage, { dur: 21.5, beats: [
    [0, 2.6, 'Runner’s knee: train the <span class="bad">hips</span> or the <span class="bad">knees?</span>'],
    [2.8, 5.6, 'A trial split 112 people<br>into three groups.'],
    [5.8, 10.6, 'One trained hips. One trained knees. One just stayed active.'],
    [10.8, 14.4, 'A year later, all three had improved <span class="hl">the same</span>.'],
    [14.6, 18.2, 'What they shared: coaching on <span class="hl">how much to do</span>.'],
  ], end: { at: 18.5, line: 'The exercise matters less than the <span class="hl">dose</span>.', cta: 'Send to a runner hunting the perfect exercise', src: 'Hott et al. 2019, front-of-knee pain. Exercise still helps; the type mattered less.' } });
  const o = opener(f.scene), lanes = svg('g', {}, f.scene), G = [860, 1100, 1340];
  G.forEach(y => svg('line', { x1: 80, x2: 1000, y1: y, y2: y, stroke: '#2A3650', 'stroke-width': 6 }, lanes));
  const fin = svg('line', { x1: 900, x2: 900, y1: 640, y2: 1350, stroke: C.lime, 'stroke-width': 14, 'stroke-dasharray': '26 20' }, lanes);
  const rs = G.map(() => { const g = svg('g', {}, lanes); return { g, dr: K.skin(g, 'chunky', 0.38) }; });
  return t => {
    o.draw(t); const go = ease.inOut(prog(t, 11.5, 13.8)), x = lerp(210, 830, go), moving = t > 11.5 && t < 13.8;
    rs.forEach((r, i) => {
      if (moving) r.dr(t * 1.6 + i * 0.13, { x, ground: G[i], mood: 0.3 }); else r.dr(0, { x, ground: G[i], mood: t > 13.8 ? 0 : 0.7, pose: K.standing(0) });
      const a = 6.5 + i * 1.3, on = t > a && t < a + 1.25, intro = t > 5.8 && t < 10.6; r.g.setAttribute('opacity', (intro && !on ? 0.3 : 1) * prog(t, 3.4 + i * 0.4, 3.7 + i * 0.4));
    });
    fin.setAttribute('opacity', prog(t, 10.8, 11.2)); fade(lanes, t, 2.8); f.tick(t);
  };
} };
