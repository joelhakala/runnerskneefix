// M5 · the type of exercise mattered less than the dose (Hott 2019).
window.VIDEO = {
  duration: 17.5,
  build(stage) {
    const { svg, prog, ease, stext, beats, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s);
    const X = [240, 540, 840], names = ['HIPS', 'KNEES', 'JUST ACTIVE'];
    const cols = X.map((x, i) => {
      const g = svg('g', {}, scene);
      svg('rect', { x: x - 118, y: 690, width: 236, height: 92, rx: 46, fill: '#1B2740', stroke: '#7C8AA3', 'stroke-width': 4 }, g); stext(g, x, 752, names[i], { size: i === 2 ? 36 : 44 });
      return { g, bar: svg('rect', { x: x - 80, width: 160, rx: 14, fill: '#F4F7FB' }, g) };
    });
    const vs = stext(scene, 390, 756, 'vs', { size: 54, fill: C.coral });
    const goal = svg('g', {}, scene); svg('line', { x1: 90, x2: 990, y1: 900, y2: 900, stroke: C.lime, 'stroke-width': 8, 'stroke-dasharray': '26 18', 'stroke-linecap': 'round' }, goal);
    stext(goal, 540, 880, 'same improvement', { size: 40, fill: C.lime });
    const axis = stext(scene, 540, 1390, 'pain and function, 1 year later', { size: 36, fill: '#8A97AD', weight: 600 });
    const q = stext(scene, 540, 1160, '?', { size: 380, fill: C.coral });
    const coach = svg('g', {}, scene); svg('rect', { x: 105, y: 570, width: 870, height: 92, rx: 46, fill: C.lime }, coach); stext(coach, 540, 632, 'SAME COACHING ON LOAD', { size: 42, fill: C.ink });
    X.forEach(x => svg('line', { x1: x, x2: x, y1: 662, y2: 690, stroke: C.lime, 'stroke-width': 8 }, coach));
    const txt = beats(stage, [
      { a: 0, b: 2.5, cls: 'hook', html: 'Hip exercises or knee exercises for runner’s knee?', style: { fontSize: '88px' } },
      { a: 2.8, b: 5.9, html: 'A trial tested it.<br>112 people, 3 groups.' },
      { a: 6.2, b: 10.6, html: 'After one year:<br><span class="hl">no difference.</span>' },
      { a: 10.9, b: 14.7, cls: 'mid', html: 'All three got the same coaching on <span class="hl">how much to load</span>.', top: 250 },
    ]);
    const end = finish(stage, { at: 15, line: 'The exercise matters less than the <span class="hl">dose</span>.', cta: 'Send to a runner hunting the perfect exercise', src: 'Hott et al. 2019, front-of-knee pain. Exercise still helps; the type mattered less.' });
    const bar = progress(stage, 17.5);
    return t => {
      cols[2].g.setAttribute('opacity', prog(t, 2.9, 3.3)); cols[2].g.setAttribute('transform', `translate(${260 * (1 - ease.out(prog(t, 2.9, 3.5)))} 0)`);
      vs.setAttribute('opacity', (0.6 + 0.4 * Math.sin(t * 8)) * (1 - prog(t, 2.5, 2.8)));
      const h = 400 * ease.inOut(prog(t, 6.4, 9.4));
      cols.forEach((c, i) => { const hh = h * (1 + 0.03 * Math.sin(t * 5 + i * 2) * (1 - prog(t, 9, 9.4))); c.bar.setAttribute('y', 1300 - hh); c.bar.setAttribute('height', hh); });
      goal.setAttribute('opacity', prog(t, 9.3, 9.7)); axis.setAttribute('opacity', prog(t, 6.2, 6.6)); q.setAttribute('opacity', (0.75 + 0.25 * Math.sin(t * 7)) * (1 - prog(t, 2.4, 2.8))); coach.setAttribute('opacity', prog(t, 11.1, 11.6));
      fade(scene, t, null, 15); txt(t); end(t); bar(t);
    };
  },
};
