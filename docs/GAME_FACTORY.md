# The Game Factory

How games get added to the deck — and how the catalog scales past these first six without falling apart.

The deck is built on one shared **game kit**. Every game copies the same four modules and adds exactly one file of its own: `js/game.js`. That single-file constraint is what keeps quality high and output fast: there is one way to do input, one way to do audio, one way to do the mascot, one way to do menus.

## Kit contents

| Module | Role |
| --- | --- |
| `js/mascot.js` | Layered SVG character + animation state machine (`Mascot.mount / react / say / play`) |
| `js/audio.js` | WebAudio synth: step-sequenced songs, SFX bank, loop nodes, ducking (`Audio.defineSong / sfx / loop`) |
| `js/core.js` | Fixed-timestep loop, DPR-aware canvas, unified keyboard/joystick/swipe input, storage, screens, toasts, particles (`Kit.*`) |
| `js/shell.js` | Menu / how-to / settings / pause / results screens, touch UI, topbar, mascot dock, audio unlock |
| `css/shell.css` | All chrome styling, themed per game via CSS custom properties |
| `js/learn.js` | The teaching layer: concept cards, mastery tracking, Codex screen (`Learn.define / nextCard / show / summary`) |

## The learning layer (learn for real, never quiz-slap)

Every game carries a curriculum bank in `js/learn-data.js` mapped to a track of the studio catalog — and it must hook into the game's own mechanics, never appear as unrelated trivia pasted over the action:

| Game | Track | Mechanic-true hook |
| --- | --- | --- |
| Voltwing GP | Git essentials | Pit boards between laps; a correct read patches the boost cell |
| Saucer Siege | Debugging & security bug classes | Between-wave debriefs; saucers wear bug-class labels |
| Aurora Pilot | Networking layers | Stage briefings as the sky crosses each layer of the stack |
| Ripcurrent | Git survival moves | Buoy commands in the swell; board briefings between sets |
| Metro Dash | Scam radar + HTTP status codes | Billboard teaches real-vs-phishing; end-of-run debrief |
| Ember Isles | Working with AI assistants | Data-slate pickups open cards; NPCs reference slate topics |

Rules: cards surface at natural micro-breaks, are always skippable, never block the action, reward correct answers in the game's own economy, explain every wrong answer in one line, and persist per-topic mastery (3 correct = mastered) shown in the menu's Concept Codex.

## The `window.GAME` contract

A game tells the shell who it is and what to do:

```js
window.GAME = {
  brand, kicker, title, tagline,          // menu copy
  best: { key, display, lowerBetter },    // personal-best persistence
  controls: [{ key, text }],              // how-to-play rows
  touch: { joy, buttons, swipe },         // touch control layout
  mascot: { name, accent, lines, cooldowns },  // line packs per event
  menuSong,
  onStart, onRestart, onPause, onResume, onQuit
};
```

Mascot events are semantic strings (`welcome`, `start`, `win`, `fail`, `crash`, `combo`, `low`, `stage`, `mission`…). Each game supplies its own line pack; the mascot engine owns cooldowns, variant rotation, and interruption priority so no game can make the character spam.

## Recipe: a new game, start to live

1. **Scaffold** — copy the kit into `games/<repo>/`, model `index.html` on an existing one, write a `theme.css` palette (four custom properties define the whole mood).
2. **Build one `game.js`** — tuning constants, world state, `update(dt)`, `render(ctx,G)`, HUD chips, two `Audio.defineSong` entries, attract mode, `window.GAME`.
3. **Play rules** — playable in under 5 s from Play, winnable and losable, fully touch-playable and keyboard-playable, pause freezes everything.
4. **Verify** — `node --check`, then a browser pass: menu animates, first minute plays, no console errors, screenshots taken.
5. **Document** — `README.md` (pitch, play link, controls, mascot), `docs/HOW_TO_PLAY.md`, `docs/mascot-guide.md`, `docs/QA.md` (what was tested, what wasn't), `LICENSE`.
6. **Publish** — one GitHub repo per game, GitHub Pages from `main`, repo description + website field set, catalog card added to the deck.

## Scaling rules (why this reaches 1000 cleanly)

- **Waves, not floods.** New games ship in waves of ~6, each wave QA'd as a set. A wave that looks templated is rejected before publish — shared kit, different soul.
- **Genre matrix first, reskins never.** Each new game must introduce a mechanic the deck doesn't have yet (deck-vs-deck: racing → shooting → flight → surf → runner → RPG → rhythm → puzzle → strategy → roguelite…). Only after the mechanic space is covered do sequels/variants get made, and they change physics or economy, not just palette.
- **Content is data.** Tracks, waves, maps and quests live in plain JS data structures at the top of each `game.js`, so level packs are additive diffs, not rewrites.
- **Everything is honest.** QA docs record what was tested and what wasn't. No fake metrics, no fabricated screenshots, no placeholder buttons — ever.

## Status of the 1000-game goal

Wave 1 (six games) is the foundation. Each subsequent session can pick up this file, pick an uncovered mechanic from the matrix, and ship the next wave with the same bar. That is how a catalog gets to four digits — by never lowering the bar to get there faster.
