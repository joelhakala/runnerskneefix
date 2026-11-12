# Animation principles: stop, hold, learn

2026-11-12. Eight searches; abstracts and secondary sources. Evidence is uneven: the learning research is solid, the
platform signals come from Instagram's head, and the "hook" lore is practitioner opinion.

## Evidence

| Area | Finding | Source | Strength |
|---|---|---|---|
| Learn | Refutation (state the misconception, say why it is wrong, give the replacement) beats plain explanation: g = 0.41, 44 comparisons | Schroeder & Kucera 2022 | strong |
| Learn | Showing common misconceptions inside a science video raises learning | Muller 2008 (PhD, via secondary sources) | moderate |
| Learn | A correction must fill the causal gap with an alternative explanation | Debunking Handbook 2020 | consensus document |
| Learn | Guessing before the answer helps memory for that content: g = 0.54; little transfer | Prequestion meta-analysis 2024 | strong for the specific item |
| Learn | Coherence, signaling, segmenting, spatial contiguity: d about 0.4-0.9 in Mayer's lab; independent estimate g = 0.37 | Mayer 2017/2021; independent meta-analysis | moderate |
| Learn | Metaphors change pain beliefs and catastrophizing; no single metaphor is proven best | Gallagher 2013 (RCT); Louw 2019 | moderate |
| Hold/reach | Top ranking signals for Reels: watch time, likes, sends; sends per reach correlates most with reach | Mosseri, Jan 2025 and 2024 Q&A, via secondary reports | platform statement |
| Stop | "Decide in 1.3 s", "3-second rule", retention benchmarks | Blogs; primary sources not found | weak |
| Stop | Share of silent viewing on Reels | No verified Instagram figure; 74-85% figures are Facebook-era and self-reported | weak |
| Hold | Curiosity gap as a hook | Practitioner data only; no peer-reviewed test on short video found | weak |

## Rules used in series 1xx

Stop
1. Frame 0 carries the whole hook: text and a moving subject, no fade-in. (weak evidence, cheap to do)
2. The hook is the viewer's own belief or question, in forum language. (refutation + anecdote data)
3. One red pulsing element on frame 0 means pain.

Hold
4. Open a question in the hook, answer it at 60-70% of the runtime.
5. One sentence per beat, about ten words, a visual change at least every three seconds. (segmenting, coherence)
6. 17-20 seconds, thin progress bar, no decoration.
7. Silent-first: every meaning is on screen.

Learn
8. Refutation order: old belief -> why it fails -> replacement that fills the gap.
9. Labels sit next to what they name; one highlighted element per beat. (contiguity, signaling)
10. One metaphor per video from a fixed vocabulary: two lines, stack, alarm ring, knee map.
11. End on one action and a "send to..." prompt. (sends)
12. Confidence, source and disclaimer on the end card.

## Not done yet
- Prediction prompts ("guess first") are only implicit in question hooks; an explicit A/B guess is untested.
- No audio. Music or voice would be a separate test.
- None of this is validated on our own audience; the first posts are the experiment.

## Rules added after owner feedback, round 1 (2026-11-12)

Full notes: `research/feedback/2026-11-12-series1.md`. Where these conflict with rules 1-12, these win.

13. Runner context on frame 0: the hook names running or the runner and the knee, and a running figure or road is visible.
14. One reading position. All captions appear in the same place; never two text blocks to read at once.
    Replaces "labels next to what they name" (rule 9): point with motion or colour, label at most one thing per beat.
15. One focus per beat. For every beat, name the single point the eye should be on; nothing else moves.
16. Teach the visual before using it: introduce each element alone, with its name, before the point is made.
    Prefer physical metaphors that need no teaching (tyre) over abstract charts.
17. No undefined terms. "Alarm", "ready", "load" get one plain sentence the first time they appear in a video.
18. Every chart has a title that states the takeaway.
19. Finish the thought: the hook's question gets a complete answer and one thing to do.
20. Hook sentences are plain and complete; test by reading them aloud once.
21. Safe zones are checked on a rendered frame with the Reels overlay, not assumed.

## Process changes

- Storyboard before render: one still per beat with the focus point marked, reviewed by the owner. A full render comes after.
- Automatic check in the renderer: fail when more than one caption block is visible in the same frame.
- The running figure is rebuilt before it is used again.
