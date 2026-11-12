// M3/M2 · knee osteoarthritis is not automatically a stop sign (Lo 2018, observational: the video says so).
window.VIDEO = {
  duration: 18.5,
  build(stage) {
    const { svg, prog, ease, stext, beats, Figure, runPose, ring, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), A = svg('g', {}, s), B = svg('g', {}, s), D = svg('g', {}, s);
    svg('line', { x1: 0, x2: 1080, y1: 1290, y2: 1290, stroke: '#2A3650', 'stroke-width': 6 }, A);
    const fig = new Figure(A, { s: 0.82 }), al = ring(A, C.amber), stop = svg('g', {}, A);
    const oct = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + i * Math.PI / 4; return `${820 + 125 * Math.cos(a)},${830 + 125 * Math.sin(a)}`; }).join(' ');
    svg('polygon', { points: oct, fill: C.coral, stroke: '#F4F7FB', 'stroke-width': 8 }, stop); stext(stop, 820, 848, 'STOP', { size: 62 });
    const ppl = []; for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) ppl.push(svg('circle', { cx: 360 + i * 180, cy: 760 + j * 180, r: 62, fill: i === 1 && j === 1 ? C.lime : '#7C8AA3' }, B));
    stext(B, 540, 1330, 'about 1 in 9 kept running', { size: 44, fill: C.lime });
    svg('path', { d: 'M150 1260 H950 M150 1260 V720', fill: 'none', stroke: '#2A3650', 'stroke-width': 6, 'stroke-linecap': 'round' }, D);
    const l1 = svg('path', { fill: 'none', stroke: '#7C8AA3', 'stroke-width': 14, 'stroke-linecap': 'round' }, D), l2 = svg('path', { fill: 'none', stroke: C.lime, 'stroke-width': 14, 'stroke-linecap': 'round' }, D);
    stext(D, 150, 1320, 'year 0', { size: 36, fill: '#8A97AD', anchor: 'start', weight: 700 }); stext(D, 950, 1320, 'year 4', { size: 36, fill: '#8A97AD', anchor: 'end', weight: 700 });
    stext(D, 170, 700, 'knee changes on X-ray', { size: 36, fill: '#8A97AD', anchor: 'start', weight: 700 });
    const tg = svg('g', {}, D); stext(tg, 930, 905, 'non-runners', { size: 40, fill: '#C9D3E3', anchor: 'end' }); stext(tg, 930, 1085, 'runners', { size: 40, fill: C.lime, anchor: 'end' });
    const txt = beats(stage, [
      { a: 0, b: 2.8, cls: 'hook', html: 'Knee arthritis.<br>Told to <span class="bad">stop running?</span>' },
      { a: 3.1, b: 7.7, cls: 'mid', html: 'A 4-year study followed 1,203 people over 50 with knee arthritis.' },
      { a: 8, b: 12.7, cls: 'mid', html: 'The runners’ knees did <span class="hl">not get worse faster.</span> Their pain eased more often.' },
      { a: 13, b: 15.5, cls: 'mid', html: 'They chose to run, so this isn’t proof. <span class="warn">Ask your own clinician.</span>' },
    ]);
    const end = finish(stage, { at: 15.8, line: 'Arthritis is not automatically a <span class="hl">stop sign</span>.', cta: 'Send to a runner who was told to quit', src: 'Lo et al. 2018, Osteoarthritis Initiative. Observational.' });
    const bar = progress(stage, 18.5);
    return t => {
      const P = fig.set(runPose(t * 1.3, { x: 400, ground: 1290, A: 30, stanceKnee: 40, lean: 6 })); al.set(P.kneeN.x, P.kneeN.y, 80, t);
      stop.setAttribute('transform', `rotate(${5 * Math.sin(t * 4)} 820 830)`); fade(A, t, null, 3);
      ppl.forEach((c, i) => c.setAttribute('opacity', prog(t, 3.3 + i * 0.12, 3.5 + i * 0.12))); fade(B, t, 3, 7.9);
      const p = ease.inOut(prog(t, 8.3, 10.6)), x = 150 + 800 * p;
      l1.setAttribute('d', `M150 1200 L${x} ${1200 - 250 * p}`); l2.setAttribute('d', `M150 1222 L${x} ${1222 - 250 * p}`); tg.setAttribute('opacity', prog(t, 10.4, 10.9));
      fade(D, t, 7.9, 15.8); txt(t); end(t); bar(t);
    };
  },
};
