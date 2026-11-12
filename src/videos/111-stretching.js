// M8 v2 · stretching mostly moves the point where the body says stop. Hook now names runners and knee pain.
window.VIDEO = { duration: 20, build(stage) {
  const { svg, film, opener, fade, prog, lerp, ease, C } = K;
  const f = film(stage, { dur: 20, beats: [
    [0, 2.8, 'Runners: does <span class="hl">stretching</span> fix knee pain?'],
    [3.0, 6.0, 'Stretch for weeks and you do reach further.'],
    [6.2, 9.4, 'But the muscle is <span class="hl">barely longer</span>.'],
    [9.6, 13.2, 'What moved is the point where your body says <span class="bad">“stop”</span>.'],
    [13.4, 16.6, 'So it feels looser for a while, and tightness can return.'],
  ], end: { at: 16.9, line: 'Stretch if it feels good.<br><span class="hl">Add strength work too.</span>', cta: 'Send to the stretcher in your run club', src: 'Weppler & Magnusson 2010. Small changes in stiffness can occur.' } });
  const o = opener(f.scene), g = svg('g', {}, f.scene), X0 = 130, rest = 470;
  for (let i = 0; i <= 14; i++) svg('line', { x1: X0 + i * 58, x2: X0 + i * 58, y1: 1105, y2: i % 2 ? 1127 : 1150, stroke: '#7C8AA3', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  svg('rect', { x: X0 - 34, y: 860, width: 34, height: 220, rx: 9, fill: '#7C8AA3' }, g);
  const band = svg('rect', { x: X0, rx: 55, fill: '#F4F7FB' }, g), grip = svg('circle', { cy: 970, r: 46, fill: 'none', stroke: '#F4F7FB', 'stroke-width': 14 }, g);
  const stop = svg('line', { y1: 790, y2: 1170, stroke: C.coral, 'stroke-linecap': 'round', 'stroke-dasharray': '24 18' }, g);
  const br = svg('path', { d: `M${X0} 1215 v30 h${rest} v-30`, fill: 'none', stroke: C.lime, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  return t => {
    o.draw(t);
    const lim = lerp(600, 780, ease.inOut(prog(t, 3.7, 5.8))), cy = (t % 1.5) / 1.5, pull = cy < 0.45 ? ease.out(cy / 0.45) : cy < 0.6 ? 1 : 1 - ease.inOut((cy - 0.6) / 0.4), len = lerp(rest, lim, pull);
    band.setAttribute('width', len); band.setAttribute('height', lerp(120, 86, pull)); band.setAttribute('y', lerp(910, 927, pull)); grip.setAttribute('cx', X0 + len + 34);
    const sx = X0 + lim + 88 + (t > 10.2 && t < 13 ? 5 * Math.sin(t * 16) : 0); stop.setAttribute('x1', sx); stop.setAttribute('x2', sx); stop.setAttribute('stroke-width', pull > 0.97 || (t > 10.2 && t < 13) ? 20 : 11);
    br.setAttribute('opacity', prog(t, 6.9, 7.3)); fade(g, t, 3.0); f.tick(t);
  };
} };
