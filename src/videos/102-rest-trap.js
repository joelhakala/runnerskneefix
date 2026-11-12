// M4 · the rest trap (hypothesis-level: wording uses "may").
window.VIDEO = {
  duration: 19,
  build(stage) {
    const { svg, prog, sm, steps, beats, chart, finish, progress, fade } = K;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage);
    const A = chart(s, { loadLabel: 'your running' }), B = chart(s, { loadLabel: 'your running' });
    const capA = u => 0.5 - 0.2 * sm(u, 0.27, 0.56), loadA = u => 0.58 * (1 - sm(u, 0.23, 0.27)) + 0.58 * sm(u, 0.63, 0.67);
    const loadB = u => 0.18 + 0.3 * steps(u, 3), capB = u => 0.3 + 0.3 * steps(u - 0.06, 3);
    const txt = beats(stage, [
      { a: 0, b: 2.9, cls: 'hook', html: 'Rested for weeks.<br><span class="bad">Pain back</span><br>on run one?', style: { fontSize: '96px' } },
      { a: 3.2, b: 5.4, html: 'Rest quiets the pain.' },
      { a: 5.6, b: 8.0, html: 'It may also lower what your knee is <span class="hl">ready for</span>.', cls: 'mid' },
      { a: 8.3, b: 11.9, html: 'Same old run.<br><span class="bad">Now it’s too much.</span>' },
      { a: 12.2, b: 16.0, html: 'Instead of zero: go just under the line. <span class="hl">Then build.</span>', cls: 'mid' },
    ]);
    const end = finish(stage, { at: 16.3, line: 'Don’t stop.<br><span class="hl">Dose.</span>', cta: 'Save this for your comeback', src: 'A hypothesis built on load-management research (Esculier 2018).' });
    const bar = progress(stage, 19);
    return t => {
      A.set(0.2 + 0.03 * prog(t, 0, 3) + 0.37 * prog(t, 3, 8) + 0.34 * prog(t, 8, 11), capA, loadA, t);
      B.set(prog(t, 12.4, 15.8), capB, loadB, t);
      fade(A.g, t, null, 12.2); fade(B.g, t, 12.2, 16.3);
      txt(t); end(t); bar(t);
    };
  },
};
