// Tiny deterministic animation kit: every frame is a pure function of time t (seconds).
window.K = (() => {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const ease = {
    out: x => 1 - Math.pow(1 - x, 3),
    inOut: x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    back: x => 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2),
  };
  const NS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const div = (cls, html, parent, style = {}) => {
    const e = document.createElement('div');
    e.className = cls;
    e.innerHTML = html;
    Object.assign(e.style, style);
    parent.appendChild(e);
    return e;
  };
  // Fade/slide an element in at time a and (optionally) out at time b.
  const show = (el, t, a, b = Infinity, { dy = 50, d = 0.4, pop = false } = {}) => {
    const i = (pop ? ease.back : ease.out)(prog(t, a, a + d));
    const o = b === Infinity ? 0 : prog(t, b, b + 0.25);
    el.style.opacity = clamp(prog(t, a, a + d * 0.6)) * (1 - o);
    el.style.transform = pop ? `scale(${lerp(0.7, 1, i)})` : `translateY(${(1 - i) * dy}px)`;
  };
  const rad = d => (d * Math.PI) / 180;
  const dir = a => [Math.sin(a), Math.cos(a)]; // 0 = down, + = forward (right)
  const add = (p, v, l) => ({ x: p.x + v[0] * l, y: p.y + v[1] * l });

  class Figure {
    constructor(parent, { s = 1, near = '#F4F7FB', far = '#7C8AA3' } = {}) {
      const L = { torso: 230, neck: 22, head: 54, ua: 125, fa: 115, thigh: 190, shin: 185, foot: 60, limb: 46, trunk: 80 };
      for (const k in L) L[k] *= s;
      this.L = L;
      this.g = svg('g', {}, parent);
      const mk = (c, w) => svg('path', { fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, this.g);
      this.armF = mk(far, L.limb * 0.85);
      this.legF = mk(far, L.limb);
      this.trunk = mk(near, L.trunk);
      this.head = svg('circle', { r: L.head, fill: near }, this.g);
      this.legN = mk(near, L.limb);
      this.armN = mk(near, L.limb * 0.85);
    }
    // Forward kinematics from joint angles (degrees). Optional pose.ground pins the lowest foot to that y.
    fk(p) {
      const L = this.L;
      const pelvis = { x: p.x, y: p.y || 0 };
      const up = [Math.sin(rad(p.lean || 0)), -Math.cos(rad(p.lean || 0))];
      const shoulder = add(pelvis, up, L.torso);
      const head = add(shoulder, up, L.neck + L.head);
      const leg = (hip, knee) => {
        const a = rad(hip), b = rad(hip - knee);
        const k = add(pelvis, dir(a), L.thigh);
        const an = add(k, dir(b), L.shin);
        const toe = add(an, [Math.cos(b), -Math.sin(b)], L.foot);
        return [k, an, toe];
      };
      const arm = (sh, el) => {
        const e = add(shoulder, dir(rad(sh)), L.ua);
        return [e, add(e, dir(rad(sh + el)), L.fa)];
      };
      const [kneeN, ankleN, toeN] = leg(p.hipN, p.kneeN);
      const [kneeF, ankleF, toeF] = leg(p.hipF, p.kneeF);
      const [elbowN, handN] = arm(p.shN || 0, p.elN || 0);
      const [elbowF, handF] = arm(p.shF || 0, p.elF || 0);
      const pts = { pelvis, shoulder, head, kneeN, ankleN, toeN, kneeF, ankleF, toeF, elbowN, handN, elbowF, handF };
      if (p.ground != null) {
        const low = Math.max(ankleN.y, toeN.y, ankleF.y, toeF.y) + L.limb / 2;
        const dy = p.ground - low;
        for (const k in pts) pts[k] = { x: pts[k].x, y: pts[k].y + dy };
      }
      return pts;
    }
    draw(P) {
      const d = (...a) => a.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      this.armF.setAttribute('d', d(P.shoulder, P.elbowF, P.handF));
      this.legF.setAttribute('d', d(P.pelvis, P.kneeF, P.ankleF, P.toeF));
      this.trunk.setAttribute('d', d(P.pelvis, P.shoulder));
      this.head.setAttribute('cx', P.head.x);
      this.head.setAttribute('cy', P.head.y);
      this.legN.setAttribute('d', d(P.pelvis, P.kneeN, P.ankleN, P.toeN));
      this.armN.setAttribute('d', d(P.shoulder, P.elbowN, P.handN));
      return P;
    }
    set(pose) { return this.draw(this.fk(pose)); }
  }

  // Running gait. phase in cycles; A = thigh swing amplitude, stanceKnee = peak knee bend while loaded.
  const runPose = (phase, { A = 32, stanceKnee = 40, lean = 7, x, ground }) => {
    const leg = ph => {
      const f = ((ph % 1) + 1) % 1;
      const hip = A * Math.cos(2 * Math.PI * f) + 8;
      const knee = f < 0.5 ? 12 + (stanceKnee - 12) * Math.sin(Math.PI * f / 0.5) : 12 + 92 * Math.sin(Math.PI * (f - 0.5) / 0.5);
      return [hip, knee];
    };
    const [hipN, kneeN] = leg(phase), [hipF, kneeF] = leg(phase + 0.5);
    const sw = 38 * Math.cos(2 * Math.PI * phase);
    return { x, ground, lean, hipN, kneeN, hipF, kneeF, shN: -sw, elN: 85, shF: sw, elF: 85 };
  };

  // Two-bone IK: joint between a and b with bone lengths l1, l2; side = +1/-1 picks the bend direction.
  const ik = (a, b, l1, l2, side = 1) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01);
    const along = (l1 * l1 - l2 * l2 + dist * dist) / (2 * dist);
    const h = Math.sqrt(Math.max(0, l1 * l1 - along * along));
    const ux = dx / dist, uy = dy / dist;
    return { x: a.x + ux * along + side * uy * h, y: a.y + uy * along - side * ux * h };
  };

  // Pulsing marker (e.g. sore knee).
  const pulse = (parent, color) => {
    const g = svg('g', {}, parent);
    const ring = svg('circle', { fill: 'none', stroke: color, 'stroke-width': 8 }, g);
    const dot = svg('circle', { fill: color }, g);
    return {
      g,
      set(p, t, { r = 34, color: c } = {}) {
        const k = (t * 1.4) % 1;
        for (const e of [ring, dot]) { e.setAttribute('cx', p.x); e.setAttribute('cy', p.y); }
        if (c) { ring.setAttribute('stroke', c); dot.setAttribute('fill', c); }
        dot.setAttribute('r', r);
        ring.setAttribute('r', r + 50 * k);
        ring.setAttribute('opacity', 1 - k);
      },
    };
  };

  const ground = (parent, y) => {
    svg('line', { x1: 0, x2: 1080, y1: y, y2: y, stroke: '#2A3650', 'stroke-width': 6 }, parent);
    const dash = svg('line', { x1: -200, x2: 1280, y1: y + 34, y2: y + 34, stroke: '#2A3650', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-dasharray': '70 150' }, parent);
    return { move: px => dash.setAttribute('stroke-dashoffset', px % 220) };
  };

  const endCard = (stage, line) =>
    div('end', `<div class="endline">${line}</div><div class="brand">Runners<span class="hl">Knee</span>Fix</div>`, stage);

  return { clamp, lerp, prog, ease, svg, div, show, Figure, runPose, ik, pulse, ground, endCard, C: { lime: '#C6F432', coral: '#FF5A4F', amber: '#FFC233', ink: '#0B1220' } };
})();
