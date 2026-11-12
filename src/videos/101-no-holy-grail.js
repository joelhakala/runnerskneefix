// M9 · sum of factors. Refutation: "there is one root cause" -> "several small factors add up".
window.VIDEO = {
  duration: 19,
  build(stage) {
    const { svg, prog, ease, stext, beats, stack, ring, finish, progress, fade, C } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), chipsG = svg('g', {}, s), scene = svg('g', {}, s);
    const chips = ['Foam roller', 'Glute bands', 'New shoes', 'Tape'].map((n, i) => {
      const y = 760 + i * 130;
      svg('rect', { x: 270, y: y - 62, width: 540, height: 100, rx: 50, fill: '#1B2740', stroke: '#7C8AA3', 'stroke-width': 4 }, chipsG);
      stext(chipsG, 540, y + 4, n, { size: 50, weight: 700 });
      return svg('line', { x1: 310, y1: y - 12, x2: 310, y2: y - 12, stroke: C.coral, 'stroke-width': 12, 'stroke-linecap': 'round' }, chipsG);
    });
    const B = [['long-run jump', 130], ['3 weeks off', 105], ['old sprain', 95], ['tight quads', 100], ['new shoes', 90]];
    const st = stack(scene, { blocks: B }), al = ring(scene);
    const txt = beats(stage, [
      { a: 0, b: 2.5, cls: 'hook', html: 'Tried <span class="bad">everything</span><br>for your knee?' },
      { a: 2.8, b: 8.0, html: 'Maybe there was never<br><span class="hl">one</span> cause.' },
      { a: 8.3, b: 12.0, html: 'No single block<br>crosses the line.' },
      { a: 12.3, b: 16.0, html: 'So no single fix removes it.<br><span class="hl">Two small changes do.</span>', cls: 'mid' },
    ]);
    const end = finish(stage, { at: 16.3, line: 'Stop hunting the one cause.<br><span class="hl">Shrink the stack.</span>', cta: 'Send to a runner who has tried everything', src: 'A model, not a diagnosis. Single risk factors rarely predict running injuries (Peterson 2022).' });
    const bar = progress(stage, 19);
    return t => {
      chips.forEach((c, i) => c.setAttribute('x2', 310 + 460 * ease.out(prog(t, 0.4 + i * 0.45, 0.65 + i * 0.45))));
      fade(chipsG, t, null, 2.8);
      const m = ease.inOut(prog(t, 8.3, 9.1)) - ease.inOut(prog(t, 12.2, 13.0));
      const sc = B.map((b, i) => ease.out(prog(t, 3.3 + i * 0.85, 3.7 + i * 0.85)) * ((i === 1 || i === 3) ? 1 - 0.62 * ease.inOut(prog(t, 13.6, 14.6)) : 1));
      const r = st.set(sc, m); fade(scene, t, 2.8, 16.3);
      al.g.setAttribute('opacity', r.hot ? 1 : 0); al.set(540, r.top - 120, 70, t);
      txt(t); end(t); bar(t);
    };
  },
};
