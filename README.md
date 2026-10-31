# THE GAME DECK

Six handcrafted browser games on one deck — and the playbook for how the catalog grows.

**▶ Open the deck:** https://siddhant-pardeshi.github.io/game-deck/

## What's on the deck

| Game | Genre | Play |
| --- | --- | --- |
| **Voltwing GP** | Neon hovercar racing | https://siddhant-pardeshi.github.io/voltwing-gp/ |
| **Saucer Siege** | Arcade shooting | https://siddhant-pardeshi.github.io/saucer-siege/ |
| **Aurora Pilot** | Flying | https://siddhant-pardeshi.github.io/aurora-pilot/ |
| **Ripcurrent** | Surfing | https://siddhant-pardeshi.github.io/ripcurrent-surf/ |
| **Metro Dash** | Endless runner | https://siddhant-pardeshi.github.io/metro-dash/ |
| **Ember Isles** | Open-world RPG | https://siddhant-pardeshi.github.io/ember-isles-rpg/ |

Every game: free, no install, no login, plays on phones and desktops, saves progress locally, fully playable muted.

## The shared kit

All six games run on the same four modules — a layered SVG mascot engine with a real animation state machine, a WebAudio synth (every note of music and every effect is generated at runtime; zero audio files), a fixed-timestep core with unified keyboard/touch input, and a responsive shell (menu, how-to, settings, pause, results, touch controls). One shared kit, six different souls.

The recipe for adding game seven through game one-thousand: **[docs/GAME_FACTORY.md](docs/GAME_FACTORY.md)**.

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000/game-deck/
```

## License

MIT. All games, art, characters and music are original work. Inspired by classic arcades; not affiliated with or endorsed by any studio or publisher.
