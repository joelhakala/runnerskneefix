// M3 v2 · wear -> adaptation. Chart title now states the takeaway; no loose labels.
window.VIDEO = { duration: 18, build(stage) {
  const { svg, film, Runner, stext, fade, prog, lerp, ease, C } = K;
  const f = film(stage, { dur: 18, beats: [
    [0, 2.6, '“Running will <span class="bad">wear out</span> your knees.”'],
    [2.8, 6.0, 'A tyre gets thinner<br>with every mile.'],
    [6.2, 9.6, 'Living tissue does the opposite. <span class="hl">It adapts to load.</span>'],
    [9.8, 14.6, 'Hip and knee arthritis: runners have <span class="hl">less</span>, not more.'],
  ], end: { at: 14.9, line: 'Knees aren’t <span class="hl">tyres</span>.', cta: 'Send to whoever says running ruins knees', src: 'Alentorn-Geli 2017: 114,829 people. Association, not proof. Elite level: 13.3%.' } });
  const tyre = svg('g', {}, f.scene), tis = svg('g', {}, f.scene), bars = svg('g', {}, f.scene);
  const rubber = svg('circle', { cx: 540, cy: 980, fill: 'none', stroke: '#3A4763' }, tyre), tread = svg('circle', { cx: 540, cy: 980, fill: 'none', stroke: '#F4F7FB', 'stroke-width': 12, 'stroke-dasharray': '40 30' }, tyre);
  svg('circle', { cx: 540, cy: 980, r: 190, fill: 'none', stroke: '#7C8AA3', 'stroke-width': 10 }, tyre);
  const spokes = svg('path', { d: 'M540 800V1160M360 980H720', stroke: '#7C8AA3', 'stroke-width': 10, 'stroke-linecap': 'round' }, tyre);
  const band = svg('rect', { x: 200, width: 680, rx: 34, fill: C.lime }, tis), ball = svg('circle', { r: 54, fill: '#F4F7FB' }, tis);
  const b1 = svg('rect', { x: 200, width: 260, rx: 16, fill: C.lime }, bars), b2 = svg('rect', { x: 620, width: 260, rx: 16, fill: '#7C8AA3' }, bars);
  const v1 = stext(bars, 330, 0, '3.5%', { size: 80, fill: C.ink }), v2 = stext(bars, 750, 0, '10.2%', { size: 80, fill: C.ink });
  const r1 = K.skin(bars, 'chunky', 0.34), g2 = svg('g', { opacity: 0.75 }, bars), r2 = K.skin(g2, 'chunky', 0.34);
  return t => {
    const th = lerp(110, 20, ease.inOut(prog(t, 3.4, 5.8)));
    rubber.setAttribute('r', 190 + th / 2); rubber.setAttribute('stroke-width', th); tread.setAttribute('r', 190 + th); tread.setAttribute('stroke-dashoffset', -t * 460); spokes.setAttribute('transform', `rotate(${t * 200} 540 980)`); fade(tyre, t, null, 6.2);
    const u = Math.max(0, t - 7.0) / 0.62, n = Math.min(4, Math.floor(u)), fr = u - Math.floor(u), h = 80 + 40 * n, top = 1240 - h;
    band.setAttribute('y', top); band.setAttribute('height', h); ball.setAttribute('cx', 540); ball.setAttribute('cy', u < 4 ? top - 54 - 1300 * fr * (1 - fr) : top - 54); fade(tis, t, 6.2, 9.8);
    const g = ease.out(prog(t, 10.9, 12.2)), h1 = 150 * g, h2 = 437 * g;
    b1.setAttribute('y', 1320 - h1); b1.setAttribute('height', h1); b2.setAttribute('y', 1320 - h2); b2.setAttribute('height', h2);
    v1.setAttribute('y', 1320 - h1 / 2 + 28); v2.setAttribute('y', 1320 - h2 + 110); v1.setAttribute('opacity', prog(t, 12.0, 12.3)); v2.setAttribute('opacity', prog(t, 12.0, 12.3));
    r1(t * 1.5, { x: 330, ground: 1320 - h1 - 6, mood: 0 }); r2(0, { x: 750, ground: 1320 - h2 - 6, mood: 0.5, pose: K.standing(0) }); fade(bars, t, 9.8); f.tick(t);
  };
} };
