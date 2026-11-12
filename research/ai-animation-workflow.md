# What people who make animation with AI report (2026-11-12)

Seven searches. Sources are mostly practitioner blogs, skill repositories and vendor pages; the only peer-reviewed
material is on render-feedback loops for code-generated animation. Treat everything except that row as anecdote.

## Owner's style choices (run-style test, 2026-11-12)
Liked: B chunky character, D rubber-hose, E legs close-up, F X-ray leg. No verdict on A; C, G, H, I, J not marked.
Use per situation: B or D for story beats, E when the knee is the subject, F for anatomy.

## Code-driven animation (what we do)

| Practice | Who reports it | Strength |
|---|---|---|
| Have the agent write the script or storyboard and wait for approval before any code | Remotion prompt collections; Manim skill workflows | anecdote, repeated |
| Brief with numbers: length, aspect ratio, scene order, style, safe zones, minimum font sizes | Remotion guides | anecdote, repeated |
| One sentence for the visual thesis, then 3-6 scenes | Manim skill | anecdote |
| Render the smallest version first (about 3 s), then the full video | Remotion guides; Manim skill | anecdote, repeated |
| Change one thing per iteration | Remotion guides | anecdote |
| Turn scenes into reusable components | Remotion guides | anecdote |
| Keep a lessons file of every trap hit, with root causes | anything2explainer repo | anecdote |
| The gap is pedagogy, not syntax: agents know the library but not how to build an "aha" | Karmarkar, seven Manim videos | one author, matches our round 1 |
| Feed render results back to the model; self-correction without external feedback barely helps | ManimAgent (arXiv 2604.18364) | research |
| Working code still produces overlap and overflow; a vision critic on screenshots finds it, but deterministic geometry checks fix layout more reliably | PhysicsSolutionAgent, OmniManim, SGA (arXiv) | research |
| Ground the agent in the library's current docs to stop invented functions | PhysicsSolutionAgent; Remotion skills | research + anecdote |
| Drive every animation from the frame number, never from CSS or wall-clock time | Remotion skill rules | convention (we already do) |

## Generative video (alternative route for characters)

| Practice | Who reports it | Strength |
|---|---|---|
| Lock a reference sheet of the character before animating; drift is the main failure | sprite and anime workflow guides | vendor/anecdote |
| Image-to-video holds a look across a series better than text-to-video | faceless-series guides | vendor/anecdote |
| Prompt the motion ("running loop, locked camera"), not the character | sprite guides | vendor/anecdote |
| Extract about 8 evenly spaced frames from a generated run clip to make a loop | sprite guides | vendor/anecdote |
| Storyboard stills first, then motion; keep aspect ratio identical across reference, storyboard and video | ComfyUI workflow page | vendor |
| Match the prompt syntax to the model; layer camera, physics and action | 2026 prompting guides | vendor, unverified |

Not found: an authoritative source on keeping a 2D cartoon character consistent across shots; anything specific on Rive or Lottie.

## What we adopt

1. Brief -> storyboard stills -> owner approval -> 3-second test -> full render. (Round 2 skipped the middle steps.)
2. Deterministic checks in the renderer beyond the caption lint: every text and key shape inside the safe zone, no overlaps.
3. `research/feedback/` stays the lessons file; each round adds root causes, not only symptoms.
4. Character work is separated from scene work: skins live in `src/lib/kit4.js` and scenes pick one.
5. Open option, not started: generate a run loop for the chosen character with an image-to-video model and use the
   frames as a sprite inside our code-driven scenes. Needs a video model and a credential the session does not have.

## Brief template for the owner (what makes my output better)

- Belief update: from -> to, one sentence each.
- Viewer: who, and what they already believe.
- Hook: the exact first sentence, or the feeling it must give.
- One visual: the single metaphor or picture the video is built on.
- Character style: B, D, E or F.
- Must include / must not include.
- A reference: a video or image whose feel you want, and what about it.
- Length and number of beats, if you care.
