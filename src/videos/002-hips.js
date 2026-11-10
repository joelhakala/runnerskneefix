// Format: exercise demo. Claim: combined hip + knee exercise is preferred over knee exercise alone (Collins et al. 2018 consensus).
window.VIDEO = {
  duration: 20,
  build(stage) {
    const { svg, div, show, prog, lerp, ease, Figure, ik, pulse, endCard, C } = K;
    const G = 1230;
    const s = svg('svg', { viewBox: '0 0 1080 1920' }, stage);
    const scene = svg('g', {}, s);
    svg('line', { x1: 0, x2: 1080, y1: G, y2: G, stroke: '#2A3650', 'stroke-width': 6 }, scene);
    const fig = new Figure(scene, { s: 0.8 });
    const floor = svg('g', {}, scene);
    const fig2 = new Figure(floor, { s: 1.2 });
    const L = fig2.L;
    const mark = pulse(scene, C.coral);

    const hook = div('hook', 'Runner’s knee?<br><span class="bad">Don’t just<br>train the knee.</span>', stage, { top: '250px', fontSize: '96px' });
    const capA = div('cap', 'Experts recommend<br><span class="hl">hip + knee</span> exercises<br>over knee work alone', stage, { top: '270px' });
    const capB = div('cap', 'Start here:<br><span class="hl">Glute bridge</span>', stage, { top: '290px' });
    const cue1 = div('sub', 'Squeeze glutes, lift hips', stage, { top: '1310px' });
    const cue2 = div('sub', 'Hold 2 seconds at the top', stage, { top: '1310px' });
    const cue3 = div('sub', 'Ribs down. Don’t arch your back.', stage, { top: '1310px' });
    const dose = div('cap', '<span class="hl">2–3 sets of 10–15</span><br>every other day', stage, { top: '290px' });
    const reps = div('hook', '', stage, { top: '1400px', fontSize: '80px' });
    const end = endCard(stage, 'Follow for the<br>knee half of the plan');
    const foot = div('foot', 'Collins et al. 2018, consensus statement on exercise therapy for patellofemoral pain.<br>Education only, not medical advice.', stage, { top: '1380px' });

    const stand = t => fig.set({ x: 540, ground: G, lean: 0, hipN: 3, kneeN: 4, hipF: -3, kneeF: 4, shN: 4, elN: 8, shF: -4, elF: 8 });

    // Bridge drawn from joint points: shoulders and feet stay on the floor, hips hinge up.
    const bridge = lift => {
      const sh = { x: 225, y: G - L.trunk / 2 };
      const a = (lerp(2, 27, lift) * Math.PI) / 180;
      const pelvis = { x: sh.x + L.torso * Math.cos(a), y: sh.y - L.torso * Math.sin(a) - 2 };
      const ankleN = { x: sh.x + L.torso + L.thigh * 1.4, y: G - L.limb / 2 };
      const ankleF = { x: ankleN.x + 34, y: ankleN.y };
      const toe = p => ({ x: p.x + L.foot, y: p.y });
      const hand = { x: sh.x + L.ua + L.fa, y: G - L.limb * 0.42 };
      const elbow = { x: sh.x + L.ua, y: G - L.limb * 0.42 };
      return fig2.draw({
        pelvis, shoulder: sh, head: { x: sh.x - L.neck - L.head - 6, y: G - L.head },
        kneeN: ik(pelvis, ankleN, L.thigh, L.shin, 1), ankleN, toeN: toe(ankleN),
        kneeF: ik(pelvis, ankleF, L.thigh, L.shin, 1), ankleF, toeF: toe(ankleF),
        elbowN: elbow, handN: hand, elbowF: elbow, handF: hand,
      });
    };

    const T0 = 7.6, REP = 3.2; // each rep: 1s up, 1.2s hold, 1s down
    const liftAt = t => { const x = (t - T0) % REP; return t < T0 ? 0 : x < 1 ? ease.inOut(x) : x < 2.2 ? 1 : ease.inOut(1 - (x - 2.2)); };

    return t => {
      let P;
      fig.g.setAttribute('opacity', t < 7 ? 1 : 0);
      floor.setAttribute('opacity', t < 7 ? 0 : 1);
      if (t < 7) {
        P = stand(t);
        const toHip = ease.inOut(prog(t, 2.2, 2.9));
        mark.set({ x: lerp(P.kneeN.x, P.pelvis.x, toHip), y: lerp(P.kneeN.y, P.pelvis.y, toHip) }, t, { r: 30, color: toHip > 0.5 ? C.lime : C.coral });
      } else {
        const lift = liftAt(t);
        P = bridge(lift);
        mark.set(P.pelvis, t, { r: 26 + 12 * lift, color: C.lime });
      }
      // quick cut between standing and floor scene
      scene.setAttribute('opacity', Math.min(1, Math.abs(t - 7) / 0.25) * (1 - prog(t, 17.2, 17.5)));

      show(hook, t, 0, 3.2, { d: 0.01 });
      show(capA, t, 3.5, 6.8);
      show(capB, t, 7.2, 13.6);
      show(cue1, t, 7.8, 10.4);
      show(cue2, t, 10.7, 13.6);
      show(cue3, t, 13.9, 17);
      show(dose, t, 13.9, 17);
      const n = t < T0 ? 0 : Math.floor((t - T0) / REP) + (((t - T0) % REP) > 1 ? 1 : 0);
      reps.innerHTML = `<span class="hl">${Math.max(n, 0)}</span> <span style="font-size:44px;color:#8A97AD">REPS</span>`;
      show(reps, t, 8.4, 17);
      show(end, t, 17.5, Infinity, { pop: true });
      show(foot, t, 17.9);
    };
  },
};
