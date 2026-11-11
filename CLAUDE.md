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

## Rules
- Health content: every factual claim needs a source recorded in `content/videos.json`. Unverified = soften or drop.
  Always end with "Education only, not medical advice."
- Keep text inside the Reels safe zone: y 250..1500 px.
- Do not publish to Instagram without the owner's approval (status must be `approved`).
- Never put tokens in the repo; credentials live in the cloud environment `runnerskneefix`.
- Check rendered frames visually (contact sheet via ffmpeg) before committing a video.
- Commit rendered MP4s so the owner can review them; push to `main`.
