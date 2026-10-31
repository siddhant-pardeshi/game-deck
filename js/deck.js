/* GAME DECK — catalog data + card rendering + hero mascot */
(function () {
  'use strict';

  const GAMES = [
    {
      id: 'voltwing-gp',
      glyph: '🏎️',
      name: 'VOLTWING <em>GP</em>',
      genre: 'Hovercar racing',
      blurb: 'A rebuilt electric hypercar, five rival drones, and a dusk circuit strung with boost gates. Three laps, one boost cell, no brakes.',
      acc: '#7EE8FF', acc2: '#FF6EC7',
      line: 'Welcome to the dusk circuit, pilot. Thread the gates.'
    },
    {
      id: 'saucer-siege',
      glyph: '🛸',
      name: 'SAUCER <em>SIEGE</em>',
      genre: 'Arcade shooting',
      blurb: 'Saucer waves are probing Sector 7. Chain kills for a burning multiplier, grab shield and tri-shot pods, and drop the mothership.',
      acc: '#7DF9C6', acc2: '#FF7A9E',
      line: 'Scopes are hot. The saucers found the sector.'
    },
    {
      id: 'aurora-pilot',
      glyph: '✈️',
      name: 'AURORA <em>PILOT</em>',
      genre: 'Flying',
      blurb: 'The dawn mail run through a canyon of gold. Thread rings, manage fuel, chase the light through four skies.',
      acc: '#FFD08A', acc2: '#8AD4FF',
      line: 'Throttle up — follow the gold.'
    },
    {
      id: 'ripcurrent-surf',
      glyph: '🌊',
      name: 'RIP<em>CURRENT</em>',
      genre: 'Surfing',
      blurb: 'Evening glass at the point. Carve the face, launch off the lip, survive the tube before the sun goes down.',
      acc: '#4ED8C8', acc2: '#FFC46B',
      line: 'The point is working. Paddle out.'
    },
    {
      id: 'metro-dash',
      glyph: '🚇',
      name: 'METRO <em>DASH</em>',
      genre: 'Endless runner',
      blurb: 'The last train left without you. Take the rooftops — three lanes, moving trains, and missions that pay for dinner.',
      acc: '#FFB84D', acc2: '#6BD0FF',
      line: 'Roof deck is open. Watch the gantries.'
    },
    {
      id: 'ember-isles-rpg',
      glyph: '🏮',
      name: 'EMBER <em>ISLES</em>',
      genre: 'Open-world RPG',
      blurb: 'One small warm island. Collect sunfruit, light the beacon braziers in order, and carry the lantern into the dark cave.',
      acc: '#FFB35C', acc2: '#7FD8BE',
      line: 'Everything here glows a little, even us.'
    }
  ];

  const deck = document.getElementById('deck');
  deck.innerHTML = GAMES.map(g => `
    <article class="card" style="--c-acc:${g.acc};--c-acc2:${g.acc2}">
      <div class="glyph" aria-hidden="true">${g.glyph}</div>
      <h3>${g.name}</h3>
      <span class="genre">${g.genre}</span>
      <p>${g.blurb}</p>
      <a class="play" href="https://siddhant-pardeshi.github.io/${g.id}/">▶ Play free</a>
      <span class="repo"><a href="https://github.com/siddhant-pardeshi/${g.id}">source</a></span>
    </article>`).join('');

  /* hero mascot with a rotating line pack */
  Mascot.mount(document.getElementById('mascot-hero'), {
    name: 'The Deck',
    accent: '#7EE8FF',
    lines: {
      welcome: ['Pick a world. I will meet you inside it.', 'Six doors, one deck. Race you in.'],
      return: ['Back for another round? They kept your saves.', 'The deck missed you. I checked every game.'],
      poke: ['Tickles.', 'That is the star charm. Careful, it sparkles.']
    }
  });
  Mascot.react('welcome');

  /* mascot comments when you hover a card (desktop only) */
  if (window.matchMedia('(pointer:fine)').matches) {
    deck.addEventListener('mouseover', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      const g = GAMES.find(x => card.querySelector('h3').textContent.includes(x.name.replace(/<[^>]+>/g, '').replace('SAUCER', 'SAUCER').split(' ')[0]));
      if (g && Mascot.state === 'idle' && !card.__hinted) {
        card.__hinted = true;
        Mascot.say(g.line, 3200);
        Mascot.play('point', { once: true });
      }
    });
  }
})();
