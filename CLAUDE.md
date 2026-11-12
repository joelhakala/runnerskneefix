# RunnersKneeFix

Goal: a ~99% AI-run digital business. Step 1: learn to make good Instagram content (short animated
videos helping runners get rid of knee pain) and collect data on what works.

## Pipeline
- `src/lib/kit.js`: animation kit (stick-figure rig, gait, IK, text helpers). Every frame is a pure function of `t`.
- `src/videos/<id>.js`: one video each (`window.VIDEO = { duration, build(stage) -> render(t) }`).
- `node src/render.cjs <id> [...]`: renders `videos/<id>.mp4` (1080x1920, 30 fps, silent audio track).
- `content/videos.json`: one record per video (format, hook, claim, source, status, feedback, metrics).

## Content model
- `research/model.md` is the source of truth: zeitgeist map, evidence table, the mismatch model and the
  belief-update list. Each video delivers exactly one belief update (from -> to) from that list and states
  nothing stronger than the confidence level recorded there. Update the model when new evidence comes in.

- `docs/sisaltomalli.html` is the owner-facing page (published artifact https://claude.ai/artifact/V5CiMbL2aCRb7WQ7FRadoE):
  knee map, when/where layers, forum anecdotes, remedy map, ten belief models (M1-M10; M9 "sum of factors, no holy grail"
  is the umbrella model and product promise; M10 "explanations are models, not truth" applies to our own model too),
  scripts (K1-K7, K9, K10) and visual demos. Workflow: belief model -> script ->
  owner comments -> animation -> publish -> data -> next version of the same model. Never render an animation
  whose script the owner has not seen. Scope is the whole knee (front, outside, below, inside, noise/wear).

- `research/remedies.json`: coded forum data points per remedy (helped / in combination / not helped / worse).
  Extend it with `tools/forum/` scripts; never commit raw forum posts or rows from private groups, only aggregated counts.
  Logged-in sources (Facebook groups, Juoksufoorumi) come from the owner via Claude in Chrome; the extraction prompt is in `tools/forum/chrome-prompt.md`. Series format "Does X fix runner's knee?":
  what runners report -> what studies say -> which dial it turns (load, readiness, sensitivity, distribution) -> when it is worth it.
- `research/animation-principles.md`: the twelve stop/hold/learn rules and their evidence strength; every new video follows them.
  Series 1xx (`src/videos/101..112`, components in `src/lib/kit2.js`) is the reference implementation; captions in `content/captions.md`.
- `docs/videoarvio.html` is the review page (artifact https://claude.ai/artifact/XUhZPf4hbVm21NJ4nXkjHq, videos published as
  files under `v/`): the owner sets a verdict (publish / fix / reject) and a note per video. Read them with ArtifactData,
  collection `feedback` (doc id = video id, plus `_general`), when the owner says the feedback is ready.
- Humility rule: show the confidence level, present explanations as models, correct publicly when the model changes.

## Rules
- Health content: every factual claim needs a source recorded in `content/videos.json`. Unverified = soften or drop.
  Always end with "Education only, not medical advice."
- Keep text inside the Reels safe zone: y 250..1500 px.
- Do not publish to Instagram without the owner's approval (status must be `approved`).
- Never put tokens in the repo; credentials live in the cloud environment `runnerskneefix`.
- Check rendered frames visually (contact sheet via ffmpeg) before committing a video.
- Commit rendered MP4s so the owner can review them; push to `main`.
