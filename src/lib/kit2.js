// Components shared by the 1xx series. Loaded after kit.js.
(() => {
  const K = window.K, { svg, div, prog, lerp, clamp, ease, C } = K;
  // show(): elements that start at t<=0 are fully visible on frame 0 (the cover frame must carry the hook).
  K.show = (el, t, a, b = Infinity, { dy = 50, d = 0.4, pop = false } = {}) => {
    const pin = a <= 0 ? 1 : prog(t, a, a + d), i = (pop ? ease.back : ease.out)(pin);
    const o = b === Infinity ? 0 : prog(t, b, b + 0.22);
    el.style.opacity = (a <= 0 ? 1 : clamp(prog(t, a, a + d * 0.6))) * (1 - o);
    el.style.transform = pop ? `scale(${lerp(0.7, 1, i)})` : `translateY(${(1 - i) * dy}px)`;
  };
  K.sm = (u, a, b) => { const x = clamp((u - a) / (b - a)); return x * x * (3 - 2 * x); };
  K.steps = (u, n, w = 0.06) => { let s = 0; for (let i = 0; i < n; i++) s += K.sm(u, 0.1 + i * (0.8 / n), 0.1 + i * (0.8 / n) + w); return s / n; };
  K.stext = (p, x, y, s, o = {}) => {
    const e = svg('text', { x, y, 'text-anchor': o.anchor || 'middle', 'font-family': 'Inter', 'font-weight': o.weight || 800, 'font-size': o.size || 44, fill: o.fill || '#F4F7FB', 'letter-spacing': o.ls || 0 }, p);
    e.textContent = s; return e;
  };
  // Timed captions: [{a, b, html, cls, top, style}]
  K.beats = (stage, list) => {
    const els = list.map(b => div(b.cls || 'cap', b.html, stage, Object.assign({ top: (b.top || 280) + 'px' }, b.style || {})));
    return t => list.forEach((b, i) => K.show(els[i], t, b.a, b.b == null ? Infinity : b.b, b.o || {}));
  };
  K.progress = (stage, dur) => {
    const w = div('', '<div style="height:100%;width:0;background:#C6F432;border-radius:3px"></div>', stage, { top: '1496px', height: '6px', background: '#24314D', borderRadius: '3px', opacity: 0.9 });
    return t => { w.firstChild.style.width = 100 * clamp(t / dur) + '%'; };
  };
  // Two lines: readiness (lime) vs load (white). Red appears only where load is above readiness.
  K.chart = (parent, { x = 110, y = 1300, w = 860, h = 760, capLabel = 'ready for', loadLabel = 'asked of it' } = {}) => {
    const g = svg('g', {}, parent);
    svg('line', { x1: x, x2: x + w, y1: y, y2: y, stroke: '#2A3650', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    const over = svg('path', { fill: C.coral, opacity: 0.5 }, g);
    const mk = c => svg('path', { fill: 'none', stroke: c, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    const pc = mk(C.lime), pl = mk('#F4F7FB'), dot = svg('circle', {}, g);
    const lc = K.stext(g, x, 0, capLabel, { size: 36, fill: C.lime, anchor: 'start' }), ll = K.stext(g, x, 0, loadLabel, { size: 36, anchor: 'start' });
    const px = u => x + w * u, py = v => y - h * v, N = 200;
    return {
      g,
      set(p, cap, load, t = 0) {
        let dc = '', dl = '', dv = '', hot = false; const n = Math.max(1, Math.round(N * clamp(p)));
        for (let i = 0; i <= n; i++) {
          const u = i / N, c = cap(u), l = load(u), X = px(u).toFixed(1);
          dc += `${i ? 'L' : 'M'}${X} ${py(c).toFixed(1)}`; dl += `${i ? 'L' : 'M'}${X} ${py(l).toFixed(1)}`;
          if (l > c) dv += `M${X} ${py(l).toFixed(1)}V${py(c).toFixed(1)}h${(w / N + 0.7).toFixed(1)}V${py(l).toFixed(1)}Z`;
          if (i === n) { hot = l > c; dot.setAttribute('cx', X); dot.setAttribute('cy', py(l)); }
        }
        pc.setAttribute('d', dc); pl.setAttribute('d', dl); over.setAttribute('d', dv);
        dot.setAttribute('fill', hot ? C.coral : '#F4F7FB'); dot.setAttribute('r', hot ? 20 + 6 * Math.sin(t * 9) : 15);
        const up = cap(0) >= load(0);
        lc.setAttribute('y', py(cap(0)) + (up ? -30 : 56)); ll.setAttribute('y', py(load(0)) + (up ? 56 : -30));
        return { hot };
      },
    };
  };
  // Stack of factors against the readiness line. m: 0 = stacked, 1 = side by side.
  K.stack = (parent, { cx = 540, w = 420, base = 1290, lineY = 800, blocks, lineLabel = 'what your knee is ready for' }) => {
    const g = svg('g', {}, parent);
    const rs = blocks.map(() => svg('rect', { rx: 16, fill: '#1B2740', stroke: '#7C8AA3', 'stroke-width': 4 }, g));
    const ts = blocks.map(b => K.stext(g, 0, 0, b[0], { size: 34, weight: 700 }));
    svg('line', { x1: 90, x2: 990, y1: lineY, y2: lineY, stroke: C.lime, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
    K.stext(g, 990, lineY - 22, lineLabel, { size: 32, fill: C.lime, anchor: 'end', weight: 700 });
    return {
      g, lineY,
      set(sc, m = 0) {
        const n = blocks.length, rw = (900 - (n - 1) * 16) / n; let y = base, sum = 0;
        blocks.forEach((b, i) => {
          const h = b[1] * sc[i]; y -= h; sum += h;
          const X = lerp(cx - w / 2, 90 + i * (rw + 16), m), Y = lerp(y, base - h, m), W = lerp(w, rw, m);
          rs[i].setAttribute('x', X); rs[i].setAttribute('y', Y + 3); rs[i].setAttribute('width', W); rs[i].setAttribute('height', Math.max(0, h - 6));
          rs[i].setAttribute('opacity', h > 4 ? 1 : 0);
          ts[i].setAttribute('x', X + W / 2); ts[i].setAttribute('y', Y + h / 2 + 12); ts[i].setAttribute('font-size', lerp(34, 21, m)); ts[i].setAttribute('opacity', h > 48 ? 1 : 0);
        });
        const hot = m < 0.5 && base - sum < lineY;
        rs.forEach(r => r.setAttribute('stroke', hot ? C.coral : '#7C8AA3'));
        return { hot, top: base - sum };
      },
    };
  };
  // Front view of a knee with four pain zones.
  K.kneeFront = (parent, cx, cy, s = 2.2) => {
    const g = svg('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, parent);
    const bone = d => svg('path', { d, fill: 'none', stroke: '#7C8AA3', 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    bone('M-40 -155 L-40 -50 Q-55 -30 -47 -3 L47 -3 Q55 -30 40 -50 L40 -155');
    bone('M-35 155 L-35 53 Q-51 35 -45 11 L45 11 Q51 35 35 53 L35 155');
    const z = {
      front: svg('ellipse', { cx: 0, cy: -25, rx: 30, ry: 34 }, g), outside: svg('rect', { x: -77, y: -60, width: 26, height: 96, rx: 13 }, g),
      below: svg('rect', { x: -14, y: 15, width: 28, height: 52, rx: 12 }, g), inside: svg('rect', { x: 51, y: -11, width: 28, height: 32, rx: 12 }, g),
    };
    return { g, z, hi(name, t) { for (const k in z) { z[k].setAttribute('fill', k === name ? C.coral : '#2A3650'); z[k].setAttribute('opacity', k === name ? 0.7 + 0.3 * Math.sin(t * 7) : 0.9); } } };
  };
  K.dial = (parent, cx, cy, r, label) => {
    const g = svg('g', {}, parent);
    svg('path', { d: `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`, fill: 'none', stroke: '#2A3650', 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
    const arc = svg('path', { fill: 'none', stroke: C.coral, 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
    const nd = svg('line', { x1: cx, y1: cy, x2: cx, y2: cy - r + 40, stroke: '#F4F7FB', 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
    svg('circle', { cx, cy, r: 20, fill: '#F4F7FB' }, g);
    if (label) K.stext(g, cx, cy + 74, label, { size: 34, fill: '#8A97AD', weight: 700, ls: 2 });
    return { g, set(k) { const a = Math.PI * (1 - k); nd.setAttribute('transform', `rotate(${-90 + 180 * k} ${cx} ${cy})`); arc.setAttribute('d', `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a)} ${cy - r * Math.sin(a)}`); } };
  };
  K.ring = (parent, color = C.coral) => {
    const g = svg('g', {}, parent), a = svg('circle', { fill: 'none', stroke: color, 'stroke-width': 9 }, g), b = svg('circle', { fill: 'none', stroke: color, 'stroke-width': 9 }, g);
    return { g, set(x, y, r, t, c) { [a, b].forEach((e, i) => { const q = (t * 1.3 + i * 0.5) % 1; e.setAttribute('cx', x); e.setAttribute('cy', y); e.setAttribute('r', r * (0.55 + 0.75 * q)); e.setAttribute('opacity', 1 - q); if (c) e.setAttribute('stroke', c); }); } };
  };
  K.finish = (stage, { at, line, cta, src }) => {
    const e = div('end', `<div class="endline">${line}</div><div class="brand">Runners<span class="hl">Knee</span>Fix</div>${cta ? `<div class="cta">${cta}</div>` : ''}`, stage, { top: '560px' });
    const f = div('foot', `${src ? src + '<br>' : ''}Education only, not medical advice.`, stage, { top: '1370px' });
    return t => { K.show(e, t, at, Infinity, { pop: true }); K.show(f, t, at + 0.4); };
  };
  K.fade = (g, t, a, b) => g.setAttribute('opacity', (a == null ? 1 : prog(t, a, a + 0.3)) * (b == null ? 1 : 1 - prog(t, b - 0.3, b)));
})();
