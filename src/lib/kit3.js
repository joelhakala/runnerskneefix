// Series v2 components: one caption zone, keyframed runner, physical metaphors (cup, bell). Loaded after kit2.js.
(() => {
  const K = window.K, { svg, div, prog, lerp, clamp, ease, C } = K, rad = d => d * Math.PI / 180;
  C.water = '#5CC8FF';
  // Periodic Catmull-Rom through [[phase, value], ...]
  const cyc = (keys, f) => {
    f = ((f % 1) + 1) % 1; const n = keys.length; let i = 0; while (i < n && keys[i][0] <= f) i++;
    const k = j => { const q = ((j % n) + n) % n; return [keys[q][0] + Math.floor(j / n), keys[q][1]]; };
    const p0 = k(i - 2), p1 = k(i - 1), p2 = k(i), p3 = k(i + 1), d = p2[0] - p1[0], u = (f - p1[0]) / d, u2 = u * u, u3 = u2 * u;
    const m1 = (p2[1] - p0[1]) / (p2[0] - p0[0]), m2 = (p3[1] - p1[1]) / (p3[0] - p1[0]);
    return (2 * u3 - 3 * u2 + 1) * p1[1] + (u3 - 2 * u2 + u) * d * m1 + (-2 * u3 + 3 * u2) * p2[1] + (u3 - u2) * d * m2;
  };
  // Run cycle keys: contact 0, down .15, toe-off .38, early swing .52, mid swing .68, late swing .85
  const HIP = [[0, 28], [0.15, 8], [0.38, -24], [0.52, -10], [0.68, 26], [0.85, 40]];
  const KNEE = [[0, 14], [0.15, 40], [0.38, 16], [0.52, 88], [0.68, 104], [0.85, 48]];
  const FOOT = [[0, 12], [0.08, 0], [0.28, -4], [0.38, -55], [0.52, -42], [0.68, -12], [0.85, 14]];

  class Runner {
    constructor(parent, { s = 1, body = '#F4F7FB', far = '#7C8AA3', shoe = C.lime } = {}) {
      const L = { torso: 205, neck: 16, head: 50, ua: 108, fa: 100, thigh: 178, shin: 172, foot: 66, limb: 44, trunk: 80 };
      for (const k in L) L[k] *= s; this.L = L; this.s = s; this.g = svg('g', {}, parent);
      const mk = (c, w) => svg('path', { fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, this.g);
      this.armF = mk(far, L.limb * 0.8); this.legF = mk(far, L.limb); this.shoeF = mk(far, L.limb * 0.86);
      this.trunk = mk(body, L.trunk); this.head = svg('circle', { r: L.head, fill: body }, this.g);
      this.eye = svg('circle', { r: 7 * s, fill: C.ink }, this.g); this.mouth = mk(C.ink, 6 * s);
      this.legN = mk(body, L.limb); this.shoeN = mk(shoe, L.limb * 0.86); this.armN = mk(body, L.limb * 0.8);
    }
    set(a) {
      const L = this.L, add = (p, ang, l) => ({ x: p.x + Math.sin(ang) * l, y: p.y + Math.cos(ang) * l });
      const pelvis = { x: a.x, y: 0 }, ln = rad(a.lean || 0), up = (p, l) => ({ x: p.x + Math.sin(ln) * l, y: p.y - Math.cos(ln) * l });
      const shoulder = up(pelvis, L.torso), head = up(shoulder, L.neck + L.head);
      const leg = (hip, knee, foot) => {
        const k = add(pelvis, rad(hip), L.thigh), an = add(k, rad(hip - knee), L.shin), f = rad(foot), d = { x: Math.cos(f), y: -Math.sin(f) };
        return { k, an, heel: { x: an.x - d.x * L.foot * 0.25, y: an.y - d.y * L.foot * 0.25 + L.limb * 0.1 }, toe: { x: an.x + d.x * L.foot * 0.8, y: an.y + d.y * L.foot * 0.8 + L.limb * 0.1 } };
      };
      const arm = (sh, el) => { const e = add(shoulder, rad(sh), L.ua); return [e, add(e, rad(sh + el), L.fa)]; };
      const N = leg(a.hipN, a.kneeN, a.footN || 0), F = leg(a.hipF, a.kneeF, a.footF || 0), aN = arm(a.shN || 0, a.elN || 0), aF = arm(a.shF || 0, a.elF || 0);
      const low = Math.max(N.heel.y, N.toe.y, F.heel.y, F.toe.y) + L.limb * 0.43, dy = (a.ground == null ? 0 : a.ground - low) - (a.lift || 0);
      const sh = p => ({ x: p.x, y: p.y + dy }), d = (...q) => q.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${(p.y + dy).toFixed(1)}`).join(' ');
      this.armF.setAttribute('d', d(shoulder, aF[0], aF[1])); this.legF.setAttribute('d', d(pelvis, F.k, F.an)); this.shoeF.setAttribute('d', d(F.heel, F.toe));
      this.trunk.setAttribute('d', d(pelvis, shoulder)); this.legN.setAttribute('d', d(pelvis, N.k, N.an)); this.shoeN.setAttribute('d', d(N.heel, N.toe)); this.armN.setAttribute('d', d(shoulder, aN[0], aN[1]));
      const h = sh(head), s = this.s, m = a.mood || 0;
      this.head.setAttribute('cx', h.x); this.head.setAttribute('cy', h.y); this.eye.setAttribute('cx', h.x + 20 * s); this.eye.setAttribute('cy', h.y - 8 * s);
      this.mouth.setAttribute('d', `M${h.x + 6 * s} ${h.y + 20 * s} Q${h.x + 20 * s} ${h.y + (20 + 12 * (1 - 2 * m)) * s} ${h.x + 34 * s} ${h.y + 20 * s}`);
      const mid = (p, q, u) => ({ x: lerp(p.x, q.x, u), y: lerp(p.y, q.y, u) + dy });
      return { pelvis: sh(pelvis), kneeN: sh(N.k), ankleN: sh(N.an), calfN: mid(N.k, N.an, 0.55), thighN: mid(pelvis, N.k, 0.55), head: h, shoulder: sh(shoulder) };
    }
    run(f, { x, ground, stride = 1, bend = 1, lean = 9, mood = 0 } = {}) {
      const leg = ph => { const q = ((ph % 1) + 1) % 1; return [9 + (cyc(HIP, q) - 9) * stride, cyc(KNEE, q) * (q < 0.4 ? bend : 1), cyc(FOOT, q)]; };
      const [hipN, kneeN, footN] = leg(f), [hipF, kneeF, footF] = leg(f + 0.5), h = ((f % 0.5) + 0.5) % 0.5;
      const lift = h > 0.38 ? 34 * this.s * stride * Math.sin(Math.PI * (h - 0.38) / 0.12) : 0, sw = 36 * stride * Math.cos(2 * Math.PI * f);
      return this.set({ x, ground, lift, lean: lean + 2 * Math.sin(4 * Math.PI * f), mood, hipN, kneeN, footN, hipF, kneeF, footF, shN: -sw + 6, elN: 86 - 0.25 * sw, shF: sw + 6, elF: 86 + 0.25 * sw });
    }
    stand({ x, ground, squat = 0, mood = 0 } = {}) {
      const q = squat; return this.set({ x, ground, mood, lean: 26 * q, hipN: 7 + 53 * q, kneeN: 5 + 102 * q, footN: 0, hipF: -7 + 65 * q, kneeF: 5 + 102 * q, footF: 0, shN: 14 + 50 * q, elN: 14, shF: -14 + 78 * q, elF: 14 });
    }
  }
  K.Runner = Runner; K._gait = { HIP, KNEE, FOOT, cyc };

  // Cup: what the knee can take. Water: what is asked of it. Overflow (coral) reads as pain.
  K.cup = (parent, { cx = 540, base = 1320, w = 400, h = 470 } = {}) => {
    const g = svg('g', {}, parent), stream = svg('rect', { fill: C.water, rx: 12 }, g), water = svg('path', { fill: C.water }, g);
    const spill = [svg('rect', { fill: C.coral, rx: 9 }, g), svg('rect', { fill: C.coral, rx: 9 }, g)], pud = svg('ellipse', { fill: C.coral, cy: base + 14 }, g);
    const glass = svg('path', { fill: 'none', stroke: '#F4F7FB', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return {
      g, set({ size = 1, level = 0, pour = 0, t = 0 }) {
        const H = h * size, hw = v => lerp(0.36, 0.5, v) * w * size, top = base - H, lv = clamp(level), y = base - H * lv - 3 * Math.sin(t * 5) * (lv > 0.02 ? 1 : 0);
        glass.setAttribute('d', `M${cx - hw(1)} ${top} L${cx - hw(0)} ${base} L${cx + hw(0)} ${base} L${cx + hw(1)} ${top}`);
        water.setAttribute('d', lv > 0.005 ? `M${cx - hw(lv) + 6} ${y} L${cx - hw(0) + 6} ${base - 6} L${cx + hw(0) - 6} ${base - 6} L${cx + hw(lv) - 6} ${y} Z` : '');
        water.setAttribute('fill', level > 1 ? '#8FB8E8' : C.water);
        stream.setAttribute('x', cx - 13); stream.setAttribute('width', 26 * pour); stream.setAttribute('y', 560); stream.setAttribute('height', Math.max(0, y - 560)); stream.setAttribute('opacity', pour);
        const ov = clamp((level - 1) * 6);
        spill.forEach((r, i) => { r.setAttribute('x', cx + (i ? 1 : -1) * (hw(1) + 12) - 9); r.setAttribute('width', 18 * ov); r.setAttribute('y', top - 4); r.setAttribute('height', (H + 14) * ov); });
        pud.setAttribute('cx', cx); pud.setAttribute('rx', (hw(0) + 110) * ov); pud.setAttribute('ry', 13 * ov);
        return { top, over: level > 1 };
      },
    };
  };
  // Bell: the alarm. k = how loud (0..1).
  K.bell = (parent, s = 1) => {
    const g = svg('g', {}, parent), b = svg('g', {}, g);
    svg('path', { d: 'M-42 30 Q-44 -44 0 -50 Q44 -44 42 30 L56 46 L-56 46 Z', fill: C.amber, stroke: C.amber, 'stroke-width': 8, 'stroke-linejoin': 'round' }, b); svg('circle', { cx: 0, cy: 60, r: 12, fill: C.amber }, b);
    const arcs = [[-1, 74], [1, 74], [-1, 104], [1, 104]].map(([d, r]) => svg('path', { d: `M${d * r * 0.8} ${-r * 0.55} Q${d * r * 1.15} 0 ${d * r * 0.8} ${r * 0.55}`, fill: 'none', stroke: C.amber, 'stroke-width': 9, 'stroke-linecap': 'round' }, g));
    return { g, set(x, y, k, t) { g.setAttribute('transform', `translate(${x} ${y}) scale(${s * (0.8 + 0.25 * k)})`); b.setAttribute('transform', `rotate(${16 * k * Math.sin(t * 20)})`); arcs.forEach((a, i) => a.setAttribute('opacity', k * (0.45 + 0.55 * Math.abs(Math.sin(t * 9 + i))))); g.setAttribute('opacity', 0.45 + 0.55 * k); } };
  };
  // Lower body from the front: viewer sees the runner's right leg on the left. Outside = away from the other leg.
  K.legsFront = (parent, cx = 540) => {
    const g = svg('g', {}, parent), leg = (x, c) => { svg('path', { d: `M${x} 640 L${x + (x < cx ? -8 : 8)} 950 L${x + (x < cx ? -4 : 4)} 1270`, fill: 'none', stroke: c, 'stroke-width': 112, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); svg('ellipse', { cx: x + (x < cx ? -6 : 6), cy: 1335, rx: 62, ry: 34, fill: x < cx ? C.lime : '#5A6880' }, g); };
    svg('rect', { x: cx - 175, y: 560, width: 350, height: 150, rx: 60, fill: '#7C8AA3' }, g); leg(cx + 95, '#7C8AA3'); leg(cx - 95, '#F4F7FB');
    const kx = cx - 103, ky = 950, spots = { front: [kx, ky], outside: [kx - 62, ky], inside: [kx + 62, ky], below: [kx, ky + 86] }, dot = svg('circle', { fill: C.coral }, g), ring = K.ring(g);
    return { g, hi(name, t) { const p = spots[name]; dot.setAttribute('opacity', p ? 0.95 : 0); ring.g.setAttribute('opacity', p ? 1 : 0); if (!p) return; dot.setAttribute('cx', p[0]); dot.setAttribute('cy', p[1]); dot.setAttribute('r', 30 + 4 * Math.sin(t * 8)); ring.set(p[0], p[1], 70, t); } };
  };
  // One film = one caption zone, one end card, one progress bar. beats: [[start, end, html], ...]; the first is the hook.
  K.film = (stage, { dur, beats, end }) => {
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s);
    beats.forEach((b, i) => {
      const chars = b[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length, need = chars / 20 + 0.3;
      if (b[1] - b[0] < need) console.warn(`[lint] beat ${i} shows ${(b[1] - b[0]).toFixed(1)}s but needs ${need.toFixed(1)}s for ${chars} chars`);
      if (i && b[0] < beats[i - 1][1]) console.warn(`[lint] beat ${i} overlaps the previous caption`);
    });
    window.__beats = { beats, end, dur };
    const els = beats.map((b, i) => div(i ? 'cap2' : 'hook2', b[2], stage, { top: '290px' })), fin = K.finish(stage, end), bar = K.progress(stage, dur);
    return { s, scene, tick(t) { beats.forEach((b, i) => K.show(els[i], t, b[0], b[1], { dy: 30, d: 0.3 })); K.fade(scene, t, null, end.at); fin(t); bar(t); } };
  };
  K.road = (parent, y) => { svg('line', { x1: 0, x2: 1080, y1: y, y2: y, stroke: '#2A3650', 'stroke-width': 6 }, parent); const d = svg('line', { x1: -300, x2: 1380, y1: y + 36, y2: y + 36, stroke: '#2A3650', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-dasharray': '70 150' }, parent); return px => d.setAttribute('stroke-dashoffset', px % 220); };
  // Opening shot shared by most videos: a runner on a road with a sore knee.
  K.opener = (scene, { ground = 1300, x = 520, s = 0.92, color = C.coral, skin = 'chunky' } = {}) => {
    const g = svg('g', {}, scene), road = K.road(g, ground), dr = K.skin(g, skin, skin === 'legs' ? 1.9 : s), pain = K.ring(g, color);
    return { g, draw(t, { until = 2.8, mood = 1, stride = 1 } = {}) { const P = dr(t * 1.42, { x, ground, mood, stride }); pain.set(P.kneeN.x, P.kneeN.y, 74 * s, t); road(t * 430); K.fade(g, t, null, until); return P; } };
  };
  // Value that eases to each target in turn: segs = [[start, end, target, pour?], ...]
  K.track = (t, v0, segs) => { let v = v0; for (const [a, b, to] of segs) { if (t >= b) v = to; else { if (t > a) v = lerp(v, to, ease.inOut(prog(t, a, b))); break; } } return v; };
  K.pouring = (t, segs) => (segs.some(s => s[3] && t > s[0] && t < s[1]) ? 1 : 0);
})();
