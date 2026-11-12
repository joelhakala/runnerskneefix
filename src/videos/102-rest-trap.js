// M4 v2 · the rest trap, told with a cup that shrinks. Hypothesis-level: wording uses "may".
window.VIDEO = { duration: 21.5, build(stage) {
  const { svg, film, opener, cup, track, pouring, fade } = K;
  const f = film(stage, { dur: 21.5, beats: [
    [0, 2.8, 'Rested your knee.<br><span class="bad">Pain back on run one?</span>'],
    [3.0, 5.8, 'Think of your knee as a cup.<br>Running fills it.'],
    [6.0, 8.6, 'Rest empties the cup.<br>The pain goes quiet.'],
    [8.8, 11.6, 'But an unused cup<br>may slowly <span class="bad">shrink</span>.'],
    [11.8, 14.6, 'Same old run. Smaller cup.<br><span class="bad">It spills.</span>'],
    [14.8, 18.4, 'Run a little less instead,<br>and the cup <span class="hl">grows back</span>.'],
  ], end: { at: 18.7, line: 'Don’t stop.<br><span class="hl">Dose.</span>', cta: 'Save this for your comeback', src: 'A hypothesis built on load-management research (Esculier 2018).' } });
  const o = opener(f.scene), cg = svg('g', {}, f.scene), c = cup(cg);
  const L = [[3.9, 5.2, 1.08, 1], [6.7, 7.9, 0.04, 0], [12.5, 13.4, 1.3, 1], [15.3, 16.0, 0.78, 0]], S = [[9.5, 11.0, 0.68], [16.2, 17.8, 1.0]];
  return t => { o.draw(t); c.set({ level: track(t, 0, L), size: track(t, 1, S), pour: pouring(t, L), t }); fade(cg, t, 2.8); f.tick(t); };
} };
