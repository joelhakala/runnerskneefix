// Format: infographic (traffic light). General pain-monitoring guidance; no numeric thresholds claimed.
window.VIDEO = {
  duration: 19,
  build(stage) {
    const { svg, div, show, prog, lerp, ease, endCard, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage);
    const scene = svg('g', {}, s);
    const cx = 540, cy = 1010, R = 330;
    const pt = (deg, r = R) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
    const arc = (a, b, color) => {
      const [x1, y1] = pt(a), [x2, y2] = pt(b);
      return svg('path', { d: `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}`, fill: 'none', stroke: color, 'stroke-width': 74, 'stroke-linecap': 'butt' }, scene);
    };
    const zones = [arc(180, 238, C.lime), arc(242, 298, C.amber), arc(302, 360, C.coral)];
    const needle = svg('g', {}, scene);
    svg('path', { d: `M${cx - 16} ${cy} L${cx} ${cy - R + 60} L${cx + 16} ${cy} Z`, fill: '#F4F7FB' }, needle);
    svg('circle', { cx, cy, r: 34, fill: '#F4F7FB' }, needle);
    const lbl = svg('text', { x: cx, y: cy + 110, 'text-anchor': 'middle', 'font-size': 40, 'font-weight': 700, fill: '#8A97AD', 'font-family': 'Inter', 'letter-spacing': 4 }, scene);
    lbl.textContent = 'KNEE PAIN DURING YOUR RUN';

    const hook = div('hook', 'Should you <span class="bad">run through</span> knee pain?', stage, { top: '260px' });
    const mk = (cls, title, body) => div('panel', `<div class="cap ${cls}">${title}</div><div class="sub" style="margin-top:14px">${body}</div>`, stage, { top: '1190px' });
    const cards = [
      mk('hl', 'Green: keep running', 'Mild, stays mild,<br>gone soon after the run'),
      mk('warn', 'Yellow: cut back', 'Builds as you run, or<br>still sore the next day'),
      mk('bad', 'Red: stop, get it checked', 'Sharp pain, swelling,<br>limping or locking'),
    ];
    const end = endCard(stage, 'Total rest is rarely the fix.<br><span class="hl">Find the dose your<br>knee tolerates.</span>');
    end.style.top = '520px';
    const foot = div('foot', 'General guidance for runner’s knee (patellofemoral pain).<br>Education only, not medical advice.', stage, { top: '1380px' });

    const times = [3.2, 7.4, 11.6, 15.8];
    const angles = [-60, 0, 60];
    return t => {
      // needle: idle wobble during hook, then step through zones
      let a = -60 + 60 * (0.5 + 0.5 * Math.sin(t * 2.2)) * (t < 3 ? 1 : 0);
      if (t >= 3) {
        a = angles[0];
        for (let i = 1; i < 3; i++) a = lerp(a, angles[i], ease.back(prog(t, times[i] - 0.3, times[i] + 0.4)));
        if (t < 3.6) a = lerp(-60 + 60 * (0.5 + 0.5 * Math.sin(3 * 2.2)), angles[0], ease.out(prog(t, 3, 3.6)));
        a += 2.5 * Math.sin(t * 9);
      }
      needle.setAttribute('transform', `rotate(${a} ${cx} ${cy})`);
      const active = t < times[0] ? -1 : t < times[1] ? 0 : t < times[2] ? 1 : 2;
      zones.forEach((z, i) => z.setAttribute('opacity', active === -1 || active === i ? 1 : 0.22));
      scene.setAttribute('opacity', 1 - prog(t, 15.5, 15.8));
      show(hook, t, 0, 15.4, { d: 0.01 });
      cards.forEach((c, i) => show(c, t, times[i], times[i + 1] - 0.4));
      show(end, t, 15.9, Infinity, { pop: true });
      show(foot, t, 16.4);
    };
  },
};
