// Format: character comparison. Claim: +10% step rate -> ~14% lower peak patellofemoral joint force (Lenhart 2014).
window.VIDEO = {
  duration: 19,
  build(stage) {
    const { svg, div, show, prog, lerp, ease, Figure, runPose, pulse, ground, endCard, C } = K;
    const G = 1240;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage);
    const scene = svg('g', {}, s);
    const gr = ground(scene, G);
    const fig = new Figure(scene, { s: 0.8 });
    const knee = pulse(scene, C.coral);

    const hook = div('hook', 'Knee pain<br>when you <span class="bad">run?</span>', stage, { top: '270px' });
    const hook2 = div('sub', 'Try this before you quit running.', stage, { top: '520px' });
    const capA = div('cap', 'Long, slow strides<br><span class="bad">load the kneecap</span>', stage, { top: '290px' });
    const capB = div('cap', 'Take <span class="hl">quicker,<br>shorter</span> steps', stage, { top: '290px' });
    const capC = div('cap', 'Count your steps for 1 min.<br><span class="hl">Add 5–10%.</span>', stage, { top: '270px' });
    const capC2 = div('sub', 'Same speed. Just shorter steps.', stage, { top: '530px' });

    const panel = div('panel', `
      <div style="display:flex;justify-content:space-between;align-items:flex-end">
        <div style="text-align:left"><div class="foot" style="font-size:32px">STEPS / MIN</div><div id="spm" style="font-size:96px;font-weight:900;line-height:1">160</div></div>
        <div style="text-align:right"><div class="foot" style="font-size:32px">KNEECAP LOAD</div><div id="load" style="font-size:96px;font-weight:900;line-height:1">100%</div></div>
      </div>
      <div style="height:26px;border-radius:13px;background:#24314D;margin-top:22px;overflow:hidden"><div id="bar" style="height:100%;border-radius:13px"></div></div>`,
      stage, { top: '1300px' });
    const spm = panel.querySelector('#spm'), load = panel.querySelector('#load'), bar = panel.querySelector('#bar');
    const end = endCard(stage, 'Save this for<br>your next run');
    const foot = div('foot', 'Lenhart et al. 2014, healthy runners: +10% step rate ≈ 14% lower peak kneecap joint force.<br>Education only, not medical advice.', stage, { top: '1380px' });

    // Integrate cadence so the gait phase stays continuous while the step rate changes.
    const k = t => ease.inOut(prog(t, 8, 9.5));
    const phaseAt = t => { let p = 0; const dt = 1 / 120; for (let x = 0; x < t; x += dt) p += dt * lerp(160, 176, k(x)) / 120; return p; };

    return t => {
      const m = k(t);
      const P = fig.set(runPose(phaseAt(t), { x: 540, ground: G, A: lerp(38, 27, m), stanceKnee: lerp(50, 36, m), lean: lerp(4, 8, m) }));
      knee.set(P.kneeN, t, { r: lerp(30, 22, m), color: m > 0.5 ? C.lime : C.coral });
      gr.move(t * 420);
      scene.setAttribute('opacity', 1 - prog(t, 16.4, 16.8));

      show(hook, t, 0, 3, { d: 0.01 });
      show(hook2, t, 0.9, 3);
      show(capA, t, 3.3, 7.8);
      show(capB, t, 8.2, 12.6);
      show(capC, t, 13, 16.3);
      show(capC2, t, 13.8, 16.3);
      show(panel, t, 3.6, 12.8);
      const val = lerp(100, 86, m);
      spm.textContent = Math.round(lerp(160, 176, m));
      load.textContent = Math.round(val) + '%';
      const col = m > 0.5 ? C.lime : C.coral;
      load.style.color = col; bar.style.background = col; bar.style.width = val + '%';
      show(end, t, 16.8, Infinity, { pop: true });
      show(foot, t, 17.2);
    };
  },
};
