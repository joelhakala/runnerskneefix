// Ten ways to draw a run. One gait (K.gait) drives every skin, so the comparison is about the drawing, not the motion.
(() => {
  const K = window.K, { svg, div, lerp, clamp, C } = K, rad = d => d * Math.PI / 180, { HIP, KNEE, FOOT, cyc } = K._gait;
  K.gait = (f, { x = 540, ground = 1300, s = 1, stride = 1, lean = 9, L0 = {}, pose = null } = {}) => {
    const L = Object.assign({ torso: 205, neck: 16, head: 50, ua: 108, fa: 100, thigh: 178, shin: 172, foot: 66, limb: 44 }, L0); for (const k in L) L[k] *= s;
    const add = (p, a, l) => ({ x: p.x + Math.sin(a) * l, y: p.y + Math.cos(a) * l }), ln = rad(pose ? (pose.lean || 0) : lean + 2 * Math.sin(4 * Math.PI * f)), up = (p, l) => ({ x: p.x + Math.sin(ln) * l, y: p.y - Math.cos(ln) * l });
    const pelvis = { x, y: 0 }, shoulder = up(pelvis, L.torso), head = up(shoulder, L.neck + L.head);
    const leg = (ph, near) => { const q = ((ph % 1) + 1) % 1, po = pose && (near ? [pose.hipN, pose.kneeN, pose.footN || 0] : [pose.hipF, pose.kneeF, pose.footF || 0]), hip = po ? po[0] : 9 + (cyc(HIP, q) - 9) * stride, knee = po ? po[1] : cyc(KNEE, q), ft = rad(po ? po[2] : cyc(FOOT, q)), k = add(pelvis, rad(hip), L.thigh), an = add(k, rad(hip - knee), L.shin), d = { x: Math.cos(ft), y: -Math.sin(ft) };
      return { k, an, heel: { x: an.x - d.x * L.foot * 0.25, y: an.y - d.y * L.foot * 0.25 + L.limb * 0.1 }, toe: { x: an.x + d.x * L.foot * 0.8, y: an.y + d.y * L.foot * 0.8 + L.limb * 0.1 }, down: q < 0.38 }; };
    const sw = 36 * stride * Math.cos(2 * Math.PI * f), arm = (sh, el) => { const e = add(shoulder, rad(sh), L.ua); return [e, add(e, rad(sh + el), L.fa)]; };
    const N = leg(f, 1), F = leg(f + 0.5, 0), aN = pose ? arm(pose.shN, pose.elN) : arm(-sw + 6, 86 - 0.25 * sw), aF = pose ? arm(pose.shF, pose.elF) : arm(sw + 6, 86 + 0.25 * sw), h = ((f % 0.5) + 0.5) % 0.5;
    const lift = pose ? 0 : h > 0.38 ? 34 * s * stride * Math.sin(Math.PI * (h - 0.38) / 0.12) : 0, low = Math.max(N.heel.y, N.toe.y, F.heel.y, F.toe.y) + L.limb * 0.43, dy = ground - low - lift;
    const mv = p => { p.y += dy; return p; };
    [pelvis, shoulder, head, N.k, N.an, N.heel, N.toe, F.k, F.an, F.heel, F.toe, aN[0], aN[1], aF[0], aF[1]].forEach(mv);
    return { pelvis, shoulder, head, N, F, aN, aF, L, s, ground, kneeN: N.k, ankleN: N.an, calfN: { x: lerp(N.k.x, N.an.x, 0.55), y: lerp(N.k.y, N.an.y, 0.55) } };
  };
  const pl = (...p) => p.map((q, i) => `${i ? 'L' : 'M'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ');
  const mk = (g, c, w, extra = {}) => svg('path', Object.assign({ fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, extra), g);
  const at = (a, b, u) => ({ x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) });
  const taper = (a, b, w1, w2) => { const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l; return `M${a.x + nx * w1 / 2} ${a.y + ny * w1 / 2} L${b.x + nx * w2 / 2} ${b.y + ny * w2 / 2} L${b.x - nx * w2 / 2} ${b.y - ny * w2 / 2} L${a.x - nx * w1 / 2} ${a.y - ny * w1 / 2} Z`; };
  const face = (g, s) => { const e = svg('circle', { r: 7 * s, fill: C.ink }, g), m = mk(g, C.ink, 6 * s); return (h, mood = 0) => { e.setAttribute('cx', h.x + 20 * s); e.setAttribute('cy', h.y - 8 * s); m.setAttribute('d', `M${h.x + 6 * s} ${h.y + 20 * s} Q${h.x + 20 * s} ${h.y + (20 + 12 * (1 - 2 * mood)) * s} ${h.x + 34 * s} ${h.y + 20 * s}`); }; };

  const SKIN = {
    // A: the current keyframed stick figure, as the baseline
    stick(g) { const r = new K.Runner(g, { s: 1 }); return (f, o) => r.run(f, o); },
    // B: chunky character with shirt, shorts, skin and hair
    chunky(g, s = 1) {
      const skin = '#F2C9A0', skinD = '#B8936F', shirt = C.lime, shorts = '#2B4C9B', shortsD = '#1F3872';
      const aF = mk(g, skinD, 34 * s), lF = mk(g, skinD, 54 * s), shF = mk(g, shortsD, 70 * s), soF = mk(g, '#9AA8BF', 46 * s), tr = mk(g, shirt, 118 * s), shN = mk(g, shorts, 72 * s);
      const hd = svg('circle', { r: 58 * s, fill: skin }, g), hair = svg('path', { fill: '#3B2A20' }, g), fc = face(g, s), lN = mk(g, skin, 56 * s), soN = mk(g, '#F4F7FB', 48 * s), sl = mk(g, shirt, 46 * s), aN = mk(g, skin, 36 * s);
      return (f, o) => { const P = K.gait(f, Object.assign({ s }, o)), hp = at(P.pelvis, P.shoulder, 0.08);
        aF.setAttribute('d', pl(P.shoulder, P.aF[0], P.aF[1])); lF.setAttribute('d', pl(P.pelvis, P.F.k, P.F.an)); shF.setAttribute('d', pl(P.pelvis, at(P.pelvis, P.F.k, 0.42))); soF.setAttribute('d', pl(P.F.heel, P.F.toe));
        tr.setAttribute('d', pl(hp, at(P.pelvis, P.shoulder, 0.92))); lN.setAttribute('d', pl(P.pelvis, P.N.k, P.N.an)); shN.setAttribute('d', pl(P.pelvis, at(P.pelvis, P.N.k, 0.42))); soN.setAttribute('d', pl(P.N.heel, P.N.toe));
        hd.setAttribute('cx', P.head.x); hd.setAttribute('cy', P.head.y); const r = 58 * s; hair.setAttribute('d', `M${P.head.x - r} ${P.head.y + 6 * s} A${r} ${r} 0 0 1 ${P.head.x + r * 0.7} ${P.head.y - r * 0.72} Q${P.head.x} ${P.head.y - r * 0.2} ${P.head.x - r} ${P.head.y + 6 * s} Z`); fc(P.head, o && o.mood);
        sl.setAttribute('d', pl(P.shoulder, at(P.shoulder, P.aN[0], 0.45))); aN.setAttribute('d', pl(at(P.shoulder, P.aN[0], 0.4), P.aN[0], P.aN[1])); return P; };
    },
    // C: single-colour athletic silhouette with tapered limbs and a ponytail
    silhouette(g, s = 1, col = '#F4F7FB') {
      const parts = Array.from({ length: 12 }, () => svg('path', { fill: col, stroke: col, 'stroke-width': 6 * s, 'stroke-linejoin': 'round' }, g)), hd = svg('ellipse', { rx: 44 * s, ry: 50 * s, fill: col }, g), pony = mk(g, col, 26 * s), feet = [mk(g, col, 34 * s), mk(g, col, 34 * s)];
      return (f, o) => { const P = K.gait(f, Object.assign({ s }, o)), Q = K.gait(f - 0.07, Object.assign({ s }, o)), w = [78, 60, 46, 30, 60, 46, 46, 30, 36, 28, 26, 20].map(v => v * s);
        const seg = [[P.pelvis, P.shoulder, 84 * s, 100 * s], [P.pelvis, P.N.k, w[1], w[2]], [P.N.k, P.N.an, w[2], w[3]], [P.pelvis, P.F.k, w[1], w[2]], [P.F.k, P.F.an, w[2], w[3]], [P.shoulder, P.aN[0], w[8], w[9]], [P.aN[0], P.aN[1], w[10], w[11]], [P.shoulder, P.aF[0], w[8], w[9]], [P.aF[0], P.aF[1], w[10], w[11]], [P.shoulder, P.head, 40 * s, 40 * s]];
        parts.forEach((p, i) => p.setAttribute('d', seg[i] ? taper(...seg[i]) : ''));
        hd.setAttribute('cx', P.head.x); hd.setAttribute('cy', P.head.y); pony.setAttribute('d', `M${P.head.x - 36 * s} ${P.head.y - 16 * s} Q${P.head.x - 80 * s} ${Q.head.y - 6 * s} ${Q.head.x - 104 * s} ${Q.head.y + 34 * s}`);
        feet[0].setAttribute('d', pl(P.N.heel, P.N.toe)); feet[1].setAttribute('d', pl(P.F.heel, P.F.toe)); return P; };
    },
    // D: rubber-hose noodle limbs, big head, bouncy
    noodle(g, s = 1) {
      const far = '#7C8AA3', aF = mk(g, far, 34 * s), lF = mk(g, far, 44 * s), soF = mk(g, far, 54 * s), tr = mk(g, '#F4F7FB', 96 * s), hd = svg('circle', { r: 72 * s, fill: '#F4F7FB' }, g), fc = face(g, s * 1.3), lN = mk(g, '#F4F7FB', 46 * s), soN = mk(g, C.lime, 58 * s), aN = mk(g, '#F4F7FB', 36 * s);
      const bend = (a, k, b) => { const m = at(a, b, 0.5), c = { x: k.x + (k.x - m.x) * 0.9, y: k.y + (k.y - m.y) * 0.9 }; return `M${a.x} ${a.y} Q${c.x} ${c.y} ${b.x} ${b.y}`; };
      return (f, o) => { const P = K.gait(f, Object.assign({ s, L0: { head: 72, neck: 6 } }, o)), b = { x: P.pelvis.x - 26 * s, y: lerp(P.pelvis.y, P.shoulder.y, 0.5) };
        aF.setAttribute('d', bend(P.shoulder, P.aF[0], P.aF[1])); lF.setAttribute('d', bend(P.pelvis, P.F.k, P.F.an)); soF.setAttribute('d', pl(P.F.heel, P.F.toe)); tr.setAttribute('d', `M${P.pelvis.x} ${P.pelvis.y} Q${b.x} ${b.y} ${P.shoulder.x} ${P.shoulder.y}`);
        hd.setAttribute('cx', P.head.x); hd.setAttribute('cy', P.head.y); fc(P.head, o && o.mood); lN.setAttribute('d', bend(P.pelvis, P.N.k, P.N.an)); soN.setAttribute('d', pl(P.N.heel, P.N.toe)); aN.setAttribute('d', bend(P.shoulder, P.aN[0], P.aN[1])); return P; };
    },
    // E: close-up, hips down. The knee is the subject.
    legs(g, s = 1.9) {
      const skin = '#F2C9A0', skinD = '#B8936F', lF = mk(g, skinD, 54 * s), shF = mk(g, '#1F3872', 70 * s), soF = mk(g, '#9AA8BF', 46 * s), top = mk(g, C.lime, 118 * s), lN = mk(g, skin, 56 * s), shN = mk(g, '#2B4C9B', 72 * s), soN = mk(g, '#F4F7FB', 48 * s), ring = K.ring(g);
      return (f, o) => { const P = K.gait(f, Object.assign({ s }, o));
        lF.setAttribute('d', pl(P.pelvis, P.F.k, P.F.an)); shF.setAttribute('d', pl(P.pelvis, at(P.pelvis, P.F.k, 0.42))); soF.setAttribute('d', pl(P.F.heel, P.F.toe)); top.setAttribute('d', pl(at(P.pelvis, P.shoulder, 0.1), at(P.pelvis, P.shoulder, 0.5)));
        lN.setAttribute('d', pl(P.pelvis, P.N.k, P.N.an)); shN.setAttribute('d', pl(P.pelvis, at(P.pelvis, P.N.k, 0.42))); soN.setAttribute('d', pl(P.N.heel, P.N.toe)); ring.set(P.N.k.x, P.N.k.y, 80, f / 1.5); return P; };
    },
    // F: X-ray leg. Bones and kneecap inside a translucent leg.
    xray(g, s = 1.8) {
      const soft = [mk(g, '#F4F7FB', 112 * s, { opacity: 0.1 }), mk(g, '#F4F7FB', 112 * s, { opacity: 0.2 })], bone = [0, 1].map(i => ({ fe: mk(g, '#F4F7FB', 26 * s, { opacity: i ? 1 : 0.35 }), ti: mk(g, '#F4F7FB', 22 * s, { opacity: i ? 1 : 0.35 }), ft: mk(g, '#F4F7FB', 16 * s, { opacity: i ? 1 : 0.35 }), c: [0, 1, 2].map(() => svg('circle', { fill: '#F4F7FB', opacity: i ? 1 : 0.35 }, g)) }));
      const pat = svg('ellipse', { rx: 15 * s, ry: 22 * s, fill: C.lime }, g);
      return (f, o) => { const P = K.gait(f, Object.assign({ s }, o));
        [P.F, P.N].forEach((lg, i) => { soft[i].setAttribute('d', pl(P.pelvis, lg.k, lg.an)); const b = bone[i], a = at(P.pelvis, lg.k, 0.06), k1 = at(P.pelvis, lg.k, 0.93), k2 = at(lg.k, lg.an, 0.07);
          b.fe.setAttribute('d', pl(a, k1)); b.ti.setAttribute('d', pl(k2, lg.an)); b.ft.setAttribute('d', pl(lg.an, lg.toe));
          [[a, 20], [k1, 24], [k2, 22]].forEach(([p, r], j) => { b.c[j].setAttribute('cx', p.x); b.c[j].setAttribute('cy', p.y); b.c[j].setAttribute('r', r * s); }); });
        let nx = 2 * P.N.k.x - P.pelvis.x - P.N.an.x, ny = 2 * P.N.k.y - P.pelvis.y - P.N.an.y; const l = Math.hypot(nx, ny); if (l < 8 * s) { nx = 1; ny = 0; } else { nx /= l; ny /= l; }
        pat.setAttribute('cx', P.N.k.x + nx * 34 * s); pat.setAttribute('cy', P.N.k.y + ny * 34 * s); pat.setAttribute('transform', `rotate(${Math.atan2(P.N.an.x - P.pelvis.x, -(P.N.an.y - P.pelvis.y)) * 180 / Math.PI + 180} ${P.N.k.x + nx * 34 * s} ${P.N.k.y + ny * 34 * s})`); return P; };
    },
    // G: front view, running toward the camera
    front(g) {
      const far = '#7C8AA3', legs = [mk(g, '#F4F7FB', 70), mk(g, '#F4F7FB', 70)], feet = [svg('ellipse', { fill: C.lime }, g), svg('ellipse', { fill: C.lime }, g)], arms = [mk(g, far, 44), mk(g, far, 44)], tr = svg('rect', { width: 230, height: 300, rx: 90, fill: '#F4F7FB' }, g), hd = svg('circle', { r: 78, fill: '#F4F7FB' }, g), eyes = [svg('circle', { r: 9, fill: C.ink }, g), svg('circle', { r: 9, fill: C.ink }, g)], mo = mk(g, C.ink, 8), hands = [svg('circle', { r: 30, fill: '#F4F7FB' }, g), svg('circle', { r: 30, fill: '#F4F7FB' }, g)];
      return (f, { x = 540, ground = 1300 }) => { const a = 2 * Math.PI * f, bob = 26 * Math.abs(Math.sin(a)), sway = 14 * Math.sin(a), cx = x + sway, top = ground - 760 - bob;
        tr.setAttribute('x', cx - 115); tr.setAttribute('y', top + 150); hd.setAttribute('cx', cx); hd.setAttribute('cy', top + 70); eyes.forEach((e, i) => { e.setAttribute('cx', cx + (i ? 26 : -26)); e.setAttribute('cy', top + 60); }); mo.setAttribute('d', `M${cx - 22} ${top + 96} Q${cx} ${top + 114} ${cx + 22} ${top + 96}`);
        [0, 1].forEach(i => { const sgn = i ? 1 : -1, ph = Math.sin(a + (i ? Math.PI : 0)), up = Math.max(0, ph), hip = { x: cx + sgn * 62, y: top + 430 }, foot = { x: x + sgn * (58 - 26 * up), y: ground - 30 - 250 * up }, knee = { x: hip.x + sgn * (18 + 34 * up), y: lerp(hip.y, foot.y, 0.5) - 40 * up };
          legs[i].setAttribute('d', pl(hip, knee, foot)); feet[i].setAttribute('cx', foot.x); feet[i].setAttribute('cy', foot.y + 14); feet[i].setAttribute('rx', 48 + 26 * up); feet[i].setAttribute('ry', 30 + 34 * up);
          const sh = { x: cx + sgn * 128, y: top + 190 }, el = { x: sh.x + sgn * 26, y: sh.y + 130 }, hn = { x: el.x - sgn * 50, y: el.y - 20 + 110 * ph }; arms[i].setAttribute('d', pl(sh, el, hn)); hands[i].setAttribute('cx', hn.x); hands[i].setAttribute('cy', hn.y); hands[i].setAttribute('r', 30 - 6 * ph); });
        return null; };
    },
    // H: mascot. A round body with a face and short legs.
    mascot(g, s = 0.62) {
      const far = '#7FA31F', lF = mk(g, far, 46), soF = mk(g, '#7C8AA3', 50), aF = mk(g, far, 38), body = svg('ellipse', { rx: 190, ry: 200, fill: C.lime }, g), eyes = [svg('circle', { r: 20, fill: C.ink }, g), svg('circle', { r: 20, fill: C.ink }, g)], hl = [svg('circle', { r: 7, fill: '#F4F7FB' }, g), svg('circle', { r: 7, fill: '#F4F7FB' }, g)], mo = mk(g, C.ink, 12), lN = mk(g, C.lime, 48), soN = mk(g, '#F4F7FB', 52), aN = mk(g, C.lime, 40);
      return (f, o) => { const P = K.gait(f, Object.assign({ s, L0: { torso: 150, foot: 100, limb: 70 }, lean: 5 }, o)), c = { x: P.pelvis.x + 14, y: P.pelvis.y - 150 }, sq = 1 + 0.05 * Math.sin(4 * Math.PI * f);
        lF.setAttribute('d', pl(P.pelvis, P.F.k, P.F.an)); soF.setAttribute('d', pl(P.F.heel, P.F.toe)); lN.setAttribute('d', pl(P.pelvis, P.N.k, P.N.an)); soN.setAttribute('d', pl(P.N.heel, P.N.toe));
        body.setAttribute('cx', c.x); body.setAttribute('cy', c.y); body.setAttribute('rx', 190 * sq); body.setAttribute('ry', 200 / sq);
        eyes.forEach((e, i) => { e.setAttribute('cx', c.x + 50 + i * 80); e.setAttribute('cy', c.y - 40); hl[i].setAttribute('cx', c.x + 56 + i * 80); hl[i].setAttribute('cy', c.y - 47); }); mo.setAttribute('d', `M${c.x + 50} ${c.y + 30} Q${c.x + 95} ${c.y + 80} ${c.x + 140} ${c.y + 30}`);
        const sw = Math.cos(2 * Math.PI * f), arm = (e, k) => e.setAttribute('d', pl({ x: c.x - 20, y: c.y + 30 }, { x: c.x - 20 + 120 * k, y: c.y + 120 }, { x: c.x + 30 + 190 * k, y: c.y + 60 - 40 * Math.abs(k) })); arm(aF, sw); arm(aN, -sw); return P; };
    },
    // J: shoes only, with a ripple at each footstrike
    shoes(g, s = 1.7) {
      const rip = [0, 1, 2, 3].map(() => svg('ellipse', { fill: 'none', stroke: C.coral, 'stroke-width': 10 }, g)), mkShoe = (c, o) => ({ sole: mk(g, '#F4F7FB', 30 * s, { opacity: o }), up: mk(g, c, 62 * s, { opacity: o }), cuff: mk(g, '#7C8AA3', 50 * s, { opacity: o }) }), sF = mkShoe('#7FA31F', 0.7), sN = mkShoe(C.lime, 1);
      const draw = (sh, lg) => { sh.cuff.setAttribute('d', ''); sh.up.setAttribute('d', pl(lg.heel, lg.toe)); sh.sole.setAttribute('d', pl({ x: lg.heel.x, y: lg.heel.y + 26 * s }, { x: lg.toe.x, y: lg.toe.y + 26 * s })); };
      return (f, o) => { const P = K.gait(f, Object.assign({ s }, o)); draw(sF, P.F); draw(sN, P.N);
        rip.forEach((r, i) => { const q = ((f * 2 - i * 0.5) % 2 + 2) % 2, u = clamp(q / 0.9), x = (i % 2 ? P.pelvis.x + 60 * s : P.pelvis.x + 40 * s) - 520 * (q / 2); r.setAttribute('cx', x); r.setAttribute('cy', P.ground + 6); r.setAttribute('rx', 30 + 150 * u); r.setAttribute('ry', 8 + 26 * u); r.setAttribute('opacity', q < 0.9 ? 1 - u : 0); }); return P; };
    },
  };
  K.skin = (g, kind, s) => SKIN[kind](g, s);
  // Standing or squatting pose for any gait-driven skin: K.standing(q) -> pose angles (q = 0 standing, 1 deep squat)
  K.standing = (q = 0) => ({ lean: 26 * q, hipN: 7 + 53 * q, kneeN: 5 + 102 * q, footN: 0, hipF: -7 + 65 * q, kneeF: 5 + 102 * q, footF: 0, shN: 14 + 50 * q, elN: 14, shF: -14 + 78 * q, elF: 14 });
  const STYLES = { A: ['stick', 'Stick figure (current)'], B: ['chunky', 'Chunky character'], C: ['silhouette', 'Athletic silhouette'], D: ['noodle', 'Rubber-hose'], E: ['legs', 'Legs close-up'], F: ['xray', 'X-ray leg'], G: ['front', 'Front view'], H: ['mascot', 'Mascot'], I: ['trail', 'Motion trail'], J: ['shoes', 'Shoes only'] };
  K.runDemo = (stage, key) => {
    const [kind, name] = STYLES[key], s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), g = svg('g', {}, s), ground = kind === 'legs' || kind === 'xray' || kind === 'shoes' ? 1400 : 1300, road = K.road(g, ground);
    const t1 = div('cap2', `${key} · ${name}`, stage, { top: '300px' }); t1.style.opacity = 1;
    if (kind === 'trail') { const ghosts = [0.12, 0.22, 0.38, 0.6, 1].map(o => { const gg = svg('g', { opacity: o }, g); return SKIN.silhouette(gg, 0.72); }); return t => { road(0); ghosts.forEach((dr, i) => { const tt = t - (4 - i) * 0.1, x = ((tt / 4 * 1500 + 1500) % 1500) - 210; dr(tt * 1.5, { x, ground }); }); }; }
    const dr = SKIN[kind](g);
    return t => { road(t * (kind === 'front' ? 0 : 430) * (kind === 'legs' || kind === 'xray' || kind === 'shoes' ? 1.8 : 1)); dr(t * 1.5, { x: kind === 'legs' || kind === 'xray' || kind === 'shoes' ? 500 : 520, ground }); };
  };
})();
