// M7 · running style redistributes load between joints (Kulmala 2013). The message is the trade-off, not "run forefoot".
window.VIDEO = {
  duration: 19,
  build(stage) {
    const { svg, prog, lerp, ease, stext, beats, Figure, runPose, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s);
    svg('line', { x1: 0, x2: 1080, y1: 1290, y2: 1290, stroke: '#2A3650', 'stroke-width': 6 }, scene);
    const fig = new Figure(scene, { s: 0.82 });
    const mk = () => svg('circle', { fill: 'none', 'stroke-width': 12 }, scene), rh = mk(), rk = mk(), ra = mk();
    const lk = stext(scene, 0, 0, 'knee', { size: 40, anchor: 'start' }), la = stext(scene, 0, 0, 'ankle', { size: 40, anchor: 'start' }), lh = stext(scene, 0, 0, 'hip', { size: 40, anchor: 'start', fill: '#8A97AD' });
    svg('line', { x1: 200, x2: 880, y1: 1385, y2: 1385, stroke: '#2A3650', 'stroke-width': 16, 'stroke-linecap': 'round' }, scene);
    const knob = svg('circle', { cy: 1385, r: 26, fill: '#F4F7FB' }, scene);
    stext(scene, 200, 1450, 'heel-first, long stride', { size: 32, fill: '#8A97AD', weight: 700, anchor: 'start' }); stext(scene, 880, 1450, 'forefoot, quick steps', { size: 32, fill: '#8A97AD', weight: 700, anchor: 'end' });
    const mAt = t => 0.4 - 0.4 * ease.inOut(prog(t, 7.4, 8.4)) + ease.inOut(prog(t, 11.9, 13.1));
    let cache = { t: 0, p: 0 };
    const phase = t => { if (t < cache.t) cache = { t: 0, p: 0 }; let { t: x, p } = cache; for (; x < t; x += 1 / 120) p += lerp(158, 180, mAt(x)) / 120 / 120; cache = { t: x, p }; return p; };
    const txt = beats(stage, [
      { a: 0, b: 2.8, cls: 'hook', html: 'Why your <span class="bad">knee</span>, and not your ankle or hip?', style: { fontSize: '92px' } },
      { a: 3.1, b: 7.2, cls: 'mid', html: 'Every step, load is shared between joints. <span class="hl">How you run sets the split.</span>' },
      { a: 7.5, b: 11.7, html: 'Heel-first, long stride:<br><span class="bad">more to the knee.</span>' },
      { a: 12, b: 15.7, html: 'Forefoot, quick steps:<br>less knee, <span class="warn">more Achilles.</span>' },
    ]);
    const end = finish(stage, { at: 16, line: 'Load doesn’t vanish.<br><span class="hl">It moves.</span>', cta: 'Save before you change your stride', src: 'Kulmala et al. 2013. Change technique slowly.' });
    const bar = progress(stage, 19);
    return t => {
      const m = mAt(t), P = fig.set(runPose(phase(t), { x: 500, ground: 1290, A: lerp(40, 26, m), stanceKnee: lerp(52, 34, m), lean: lerp(4, 9, m) }));
      const put = (c, p, r, col) => { c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', r); c.setAttribute('stroke', col); };
      const pk = 1 + 0.06 * Math.sin(t * 9);
      put(rh, P.pelvis, 52, '#7C8AA3'); put(rk, P.kneeN, lerp(96, 50, m) * pk, m < 0.6 ? C.coral : C.lime); put(ra, P.ankleN, lerp(46, 92, m), m < 0.6 ? '#7C8AA3' : C.amber);
      const lab = (e, p, r) => { e.setAttribute('x', p.x + r + 22); e.setAttribute('y', p.y + 14); };
      lab(lk, P.kneeN, lerp(96, 50, m)); lab(la, P.ankleN, lerp(46, 92, m)); lab(lh, P.pelvis, 52);
      knob.setAttribute('cx', 200 + 680 * m); fade(scene, t, null, 16); txt(t); end(t); bar(t);
    };
  },
};
