// M8 v2 · "Does massage fix it?" Defines the alarm in one sentence and finishes the thought.
window.VIDEO = { duration: 20.5, build(stage) {
  const { svg, film, opener, Runner, ring, bell, track, fade, prog, lerp, C } = K;
  const f = film(stage, { dur: 20.5, beats: [
    [0, 2.6, 'Does <span class="hl">massage</span> fix runner’s knee?'],
    [2.8, 5.8, 'It can feel much better<br>right afterwards.'],
    [6.0, 9.8, 'Why? Pain works like an <span class="warn">alarm</span>. Massage turns it down.'],
    [10.0, 13.2, 'Nothing else changed, so it often <span class="bad">creeps back</span>.'],
    [13.4, 17.2, 'So use the quiet spell to <span class="hl">build the leg up</span>.'],
  ], end: { at: 17.5, line: 'Massage: a window,<br><span class="hl">not a fix</span>.', cta: 'Send to your foam-roller friend', src: 'Short-term relief is real (Wilke 2020). The window idea is a hypothesis.' } });
  const o = opener(f.scene), g = svg('g', {}, f.scene); svg('line', { x1: 0, x2: 1080, y1: 1300, y2: 1300, stroke: '#2A3650', 'stroke-width': 6 }, g);
  const pain = ring(g), r = new Runner(g, { s: 0.92 }), hand = svg('circle', { r: 46, fill: 'none', stroke: C.lime, 'stroke-width': 14 }, g), bl = bell(g, 1.1);
  return t => {
    o.draw(t);
    const k = track(t, 1, [[3.8, 5.2, 0.15], [6.6, 7.0, 1], [7.8, 9.2, 0.12], [10.6, 12.6, 0.9], [13.6, 14.4, 0.15]]), q = t > 14.2 && t < 17.3 ? 0.5 - 0.5 * Math.cos((t - 14.2) * 4.1) : 0;
    const P = r.stand({ x: 470, ground: 1300, squat: q, mood: k > 0.5 ? 1 : 0 }), u = 0.5 + 0.5 * Math.sin(t * 5);
    hand.setAttribute('cx', lerp(P.pelvis.x, P.kneeN.x, 0.2 + 0.6 * u) + 44); hand.setAttribute('cy', lerp(P.pelvis.y, P.kneeN.y, 0.2 + 0.6 * u)); hand.setAttribute('opacity', prog(t, 3.3, 3.6) * (1 - prog(t, 9.4, 9.8)));
    pain.set(P.kneeN.x, P.kneeN.y, 20 + 70 * k, t); bl.set(P.kneeN.x + 250, P.kneeN.y - 150, k, t); bl.g.setAttribute('opacity', prog(t, 6.6, 6.9) * (0.45 + 0.55 * k));
    fade(g, t, 2.8); f.tick(t);
  };
} };
