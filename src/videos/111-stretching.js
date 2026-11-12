// M8 · stretching mostly raises stretch tolerance rather than muscle length (Weppler & Magnusson 2010).
window.VIDEO = {
  duration: 18,
  build(stage) {
    const { svg, prog, lerp, ease, stext, beats, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s), X0 = 130, rest = 470;
    for (let i = 0; i <= 14; i++) svg('line', { x1: X0 + i * 58, x2: X0 + i * 58, y1: 1085, y2: i % 2 ? 1105 : 1125, stroke: '#7C8AA3', 'stroke-width': 5, 'stroke-linecap': 'round' }, scene);
    svg('rect', { x: X0 - 30, y: 860, width: 30, height: 200, rx: 8, fill: '#7C8AA3' }, scene);
    const band = svg('rect', { x: X0, y: 905, height: 110, rx: 55, fill: '#F4F7FB' }, scene), grip = svg('circle', { cy: 960, r: 44, fill: 'none', stroke: '#F4F7FB', 'stroke-width': 12 }, scene);
    const alarm = svg('g', {}, scene), al = svg('line', { y1: 800, y2: 1150, stroke: C.coral, 'stroke-width': 10, 'stroke-dasharray': '22 16', 'stroke-linecap': 'round' }, alarm), at = stext(alarm, 0, 770, 'alarm', { size: 44, fill: C.coral });
    const restG = svg('g', {}, scene); svg('path', { d: `M${X0} 1190 v24 h${rest} v-24`, fill: 'none', stroke: C.lime, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, restG);
    stext(restG, X0 + rest / 2, 1275, 'resting length: about the same', { size: 38, fill: C.lime });
    const wk = stext(scene, 540, 1400, '', { size: 56, fill: '#8A97AD' });
    const txt = beats(stage, [
      { a: 0, b: 2.4, cls: 'hook', html: 'Does stretching make a muscle <span class="hl">longer?</span>' },
      { a: 2.7, b: 6.7, html: 'After weeks of stretching<br>you reach further.' },
      { a: 7, b: 11.2, cls: 'mid', html: 'But the muscle is barely longer. <span class="bad">Your alarm moved.</span>' },
      { a: 11.5, b: 14.7, cls: 'mid', html: 'That’s why it feels good, and why tightness can come back.' },
    ]);
    const end = finish(stage, { at: 15, line: 'Stretching turns the alarm down.<br><span class="hl">Pair it with loading.</span>', cta: 'Send to the stretcher in your run club', src: 'Weppler & Magnusson 2010. Small changes in stiffness can occur.' });
    const bar = progress(stage, 18);
    return t => {
      const lim = lerp(600, 780, ease.inOut(prog(t, 2.9, 6.4))), cyc = (t % 1.5) / 1.5, pull = cyc < 0.45 ? ease.out(cyc / 0.45) : cyc < 0.6 ? 1 : 1 - ease.inOut((cyc - 0.6) / 0.4);
      const len = lerp(rest, lim, pull), hit = pull > 0.97;
      band.setAttribute('width', len); band.setAttribute('height', lerp(110, 80, pull)); band.setAttribute('y', lerp(905, 920, pull)); grip.setAttribute('cx', X0 + len + 30);
      al.setAttribute('x1', X0 + lim + 80); al.setAttribute('x2', X0 + lim + 80); al.setAttribute('stroke-width', hit ? 18 : 10); at.setAttribute('x', X0 + lim + 80);
      alarm.setAttribute('transform', t > 7.2 && t < 11 ? `translate(${4 * Math.sin(t * 14)} 0)` : '');
      wk.textContent = t > 2.7 && t < 7 ? 'week ' + Math.round(lerp(1, 8, prog(t, 2.9, 6.4))) : ''; restG.setAttribute('opacity', prog(t, 7.3, 7.8));
      fade(scene, t, null, 15); txt(t); end(t); bar(t);
    };
  },
};
