// M6 · location tells which tissue is loaded, not what is broken.
window.VIDEO = {
  duration: 19.5,
  build(stage) {
    const { svg, beats, kneeFront, finish, progress, fade } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage), scene = svg('g', {}, s), map = kneeFront(scene, 540, 990, 2.1);
    const Z = [['front', 2.8, 6.2], ['outside', 6.5, 9.8], ['below', 10.1, 13.2], ['inside', 13.5, 16.4]];
    const sub = (a, b, html) => ({ a, b, cls: 'sub', top: 1350, html });
    const txt = beats(stage, [
      { a: 0, b: 2.5, cls: 'hook', html: 'Where exactly does your knee <span class="bad">hurt?</span>' },
      { a: 2.8, b: 6.2, html: '<span class="bad">Front.</span><br>Around the kneecap.' }, sub(3.1, 6.2, 'Most common in runners. Usually load, not “bad tracking”.'),
      { a: 6.5, b: 9.8, html: '<span class="bad">Outside.</span>' }, sub(6.8, 9.8, 'Probably not a band rubbing on bone. Tissue under it may get squeezed.'),
      { a: 10.1, b: 13.2, html: '<span class="bad">Below the kneecap.</span>' }, sub(10.4, 13.2, 'A tendon. It responds to steady, progressive loading.'),
      { a: 13.5, b: 16.4, html: '<span class="bad">Inside.</span>' }, sub(13.8, 16.4, 'Over 50, most meniscus tears seen on MRI cause no symptoms.'),
    ]);
    const end = finish(stage, { at: 16.7, line: 'Different spots. Same rule:<br><span class="hl">match load to ready.</span>', cta: 'Comment your spot. We’ll cover it next', src: 'Taunton 2002 · Fairclough 2007 · Englund 2008' });
    const bar = progress(stage, 19.5);
    return t => {
      const cur = Z.find(z => t >= z[1] && t < z[2] + 0.3);
      map.hi(t < 2.8 ? Z[Math.floor(t / 0.35) % 4][0] : cur ? cur[0] : null, t);
      fade(scene, t, null, 16.7); txt(t); end(t); bar(t);
    };
  },
};
