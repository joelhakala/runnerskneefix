// M3 · wear -> adaptation. Observational data: the video says "association, not proof".
window.VIDEO = {
  duration: 17.5,
  build(stage) {
    const { svg, div, show, prog, lerp, ease, clamp, stext, beats, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), tyre = svg('g', {}, s), tis = svg('g', {}, s), bars = svg('g', {}, s);
    const rubber = svg('circle', { cx: 540, cy: 940, fill: 'none', stroke: '#3A4763' }, tyre), tread = svg('circle', { cx: 540, cy: 940, fill: 'none', stroke: '#F4F7FB', 'stroke-width': 10, 'stroke-dasharray': '34 26' }, tyre);
    svg('circle', { cx: 540, cy: 940, r: 150, fill: 'none', stroke: '#7C8AA3', 'stroke-width': 8 }, tyre);
    const spokes = svg('path', { d: 'M540 800V1080M400 940H680', stroke: '#7C8AA3', 'stroke-width': 8, 'stroke-linecap': 'round' }, tyre);
    const odo = stext(tyre, 540, 1330, '', { size: 60, fill: '#8A97AD' });
    const band = svg('rect', { x: 220, width: 640, rx: 30, fill: C.lime, opacity: 0.9 }, tis), ball = svg('circle', { r: 46, fill: '#F4F7FB' }, tis);
    stext(tis, 540, 1390, 'living tissue', { size: 44, fill: C.lime }); const ld = stext(tis, 0, 0, 'load', { size: 40, anchor: 'start' });
    const mkBar = (x, c) => svg('rect', { x: x - 110, width: 220, rx: 14, fill: c }, bars);
    const b1 = mkBar(330, C.lime), b2 = mkBar(750, '#7C8AA3');
    const v1 = stext(bars, 330, 0, '3.5%', { size: 84, fill: C.lime }), v2 = stext(bars, 750, 0, '10.2%', { size: 84 });
    stext(bars, 330, 1275, 'recreational', { size: 40, weight: 700 }); stext(bars, 330, 1325, 'runners', { size: 40, weight: 700 }); stext(bars, 750, 1275, 'non-runners', { size: 40, weight: 700 });
    const note = div('note', 'Association, not proof. Elite level: 13.3%.', stage, { top: '1400px' });
    const txt = beats(stage, [
      { a: 0, b: 2.5, cls: 'hook', html: '“Running will <span class="bad">wear out</span> your knees.”' },
      { a: 2.8, b: 6.2, html: 'A tyre gets thinner<br>with every mile.' },
      { a: 6.5, b: 10.2, html: 'Living tissue does the opposite. <span class="hl">It adapts to load.</span>' },
      { a: 10.5, b: 14.7, html: 'Hip and knee arthritis:' },
    ]);
    const end = finish(stage, { at: 15, line: 'Knees aren’t <span class="hl">tyres</span>.', cta: 'Send to whoever says running ruins knees', src: 'Alentorn-Geli et al. 2017: 114,829 people.' });
    const bar = progress(stage, 17.5);
    return t => {
      const th = lerp(86, 16, ease.inOut(prog(t, 2.6, 6.1)));
      rubber.setAttribute('r', 150 + th / 2); rubber.setAttribute('stroke-width', th); tread.setAttribute('r', 150 + th); tread.setAttribute('stroke-dashoffset', -t * 420);
      spokes.setAttribute('transform', `rotate(${t * 200} 540 940)`); odo.textContent = (Math.round(lerp(0, 60000, prog(t, 2.6, 6.1)) / 1000) * 1000).toLocaleString('en-US') + ' km';
      odo.setAttribute('opacity', prog(t, 2.6, 3)); fade(tyre, t, null, 6.4);
      const u = Math.max(0, t - 6.7) / 0.85, n = Math.min(4, Math.floor(u)), f = u - Math.floor(u), hT = 70 + 34 * (n + (u < 4 ? ease.out(clamp(f * 2.5)) * 0 : 0)) + (u >= 0 && u < 4 ? 0 : 0);
      const h = 70 + 34 * Math.min(4, n + (u < 4 ? 0 : 0)), top = 1180 - h;
      band.setAttribute('y', top); band.setAttribute('height', h);
      const by = u < 4 ? top - 46 - 300 * 4 * f * (1 - f) : top - 46; ball.setAttribute('cx', 540); ball.setAttribute('cy', by); ld.setAttribute('x', 610); ld.setAttribute('y', by + 14);
      fade(tis, t, 6.4, 10.4);
      const g = ease.out(prog(t, 10.8, 12.2)), h1 = 144 * g, h2 = 420 * g;
      b1.setAttribute('y', 1200 - h1); b1.setAttribute('height', h1); b2.setAttribute('y', 1200 - h2); b2.setAttribute('height', h2);
      v1.setAttribute('y', 1200 - h1 - 30); v2.setAttribute('y', 1200 - h2 - 30); fade(bars, t, 10.5, 15);
      show(note, t, 12.4, 14.7); txt(t); end(t); bar(t);
    };
  },
};
