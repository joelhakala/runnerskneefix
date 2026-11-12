# Production workflow (adopted 2026-11-12)

Based on what practitioners report works when directing AI to make animation (`research/ai-animation-workflow.md`)
and on two feedback rounds. Applies to every video, including rounds Claude runs on its own initiative.

| Step | What happens | Output | Gate |
|---|---|---|---|
| 1. Brief | Belief update (from -> to), viewer, hook sentence, the one visual, character style (B chunky, D rubber-hose, E legs close-up, F X-ray), sources and confidence | record in `content/videos.json` | Claude checks it against `research/model.md` |
| 2. Storyboard | One still per beat, rendered from the real scene code: `node tools/storyboard.cjs <id>` | `content/storyboards/<id>.jpg` + `report.json` | automatic checks pass; **owner approves** on the storyboard page |
| 3. Test clip | First 3 seconds rendered and looked at as consecutive frames | scratch only | Claude checks motion |
| 4. Full render | `node src/render.cjs <id>`; the renderer runs the layout checks every 10 frames | `videos/<id>.mp4` | no `[check]` or `[lint]` lines |
| 5. Review | Owner watches on the review page, sets a verdict, dictates notes | `feedback_*` collection | owner verdict |
| 6. Lessons | Notes and root causes logged; new rules folded into the principles | `research/feedback/<date>.md`, `research/animation-principles.md` | - |
| 7. Publish | Only with status `approved` | Instagram | owner approval |

Rules of the loop:
- One change per iteration when fixing; re-run the storyboard after each.
- Automatic checks (in `src/player.html`, `window.__check`): one text block at a time, text inside the safe zone
  (y 250-1500), caption height, scene not overlapping the caption, scene not below the safe zone. `K.film` adds
  reading-time and caption-overlap lint.
- Characters are skins on one gait (`src/lib/kit4.js`: `K.skin(g, kind, scale)`, `K.standing(q)`); scenes choose a skin.
- When Claude runs a round alone it may do steps 1-3 and prepare step 2 for approval. It does not skip the owner gates
  at steps 2, 5 and 7 unless the owner has said so for that round.
