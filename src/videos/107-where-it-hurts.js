// M6 v2 · location. Front view of both legs so outside and inside are unambiguous; one caption at a time.
window.VIDEO = { duration: 19.5, build(stage) {
  const { film, legsFront } = K;
  const f = film(stage, { dur: 19.5, beats: [
    [0, 2.6, 'Runners: <span class="bad">where</span> exactly does your knee hurt?'],
    [2.8, 6.0, 'Front, around the kneecap?<br>The classic runner’s knee.'],
    [6.2, 9.4, 'Outer side? Often tissue<br>under the IT band.'],
    [9.6, 12.8, 'Just below the kneecap?<br>Usually the tendon.'],
    [13.0, 16.2, 'Inner side? Often the inner joint line or tendons.'],
  ], end: { at: 16.5, line: 'Different spots, one rule:<br><span class="hl">build up gradually.</span>', cta: 'Comment your spot. We’ll cover it next', src: 'Taunton 2002 · Fairclough 2007' } });
  const legs = legsFront(f.scene), Z = [['front', 2.8, 6.2], ['outside', 6.2, 9.6], ['below', 9.6, 13.0], ['inside', 13.0, 16.5]], names = ['front', 'outside', 'below', 'inside'];
  return t => { const cur = Z.find(z => t >= z[1] + 0.6 && t < z[2]); legs.hi(t < 2.8 ? names[Math.floor(t / 0.45) % 4] : cur ? cur[0] : null, t); f.tick(t); };
} };
