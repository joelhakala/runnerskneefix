// M9 v2 · sum of factors, told with the cup. Standalone: teaches the cup before using it.
window.VIDEO = { duration: 22, build(stage) {
  const { svg, film, opener, cup, track, pouring, fade } = K;
  const f = film(stage, { dur: 22, beats: [
    [0, 2.7, 'Runner’s knee.<br>Tried <span class="bad">everything?</span>'],
    [2.9, 5.4, 'Think of your knee<br>as a <span class="hl">cup</span>.'],
    [5.6, 8.3, 'Everything you ask of it<br>gets poured in.'],
    [8.5, 12.8, 'A long run. A break.<br>An old sprain. New shoes.'],
    [13.0, 15.9, 'No single pour spills it.<br><span class="bad">Together they do.</span>'],
    [16.1, 19.1, 'So there’s no single fix.<br><span class="hl">Pour a little less of two.</span>'],
  ], end: { at: 19.4, line: 'Stop hunting<br>the <span class="hl">one cause</span>.', cta: 'Send to a runner who has tried everything', src: 'A model, not a diagnosis. Peterson 2022; cup analogy after G. Lehman.' } });
  const o = opener(f.scene), cg = svg('g', {}, f.scene), c = cup(cg);
  const L = [[6.3, 7.0, 0.3, 1], [9.3, 9.8, 0.52, 1], [10.1, 10.6, 0.74, 1], [10.9, 11.4, 0.96, 1], [11.7, 12.2, 1.16, 1], [16.9, 18.0, 0.8, 0]];
  return t => { o.draw(t); c.set({ level: track(t, 0, L), pour: pouring(t, L), t }); fade(cg, t, 2.8); f.tick(t); };
} };
