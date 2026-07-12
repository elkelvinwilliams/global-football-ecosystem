/* =====================================================================
   GLOBAL FOOTBALL ECOSYSTEM — Player passport demo
   Renders four switchable demo passports from data. All players, clubs
   and academies are fictional. Dependency-free; respects reduced motion.
   ===================================================================== */
(function () {
  'use strict';

  var dash = document.getElementById('passportDash');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.passport-switch [role="tab"]'));
  if (!dash || !tabs.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PLAYERS = {
    amara: {
      initials: 'AD',
      name: 'Amara Diallo',
      meta: [
        ['Age', '16'], ['Position', 'Forward'], ['Foot', 'Right'],
        ['Height', '1.78 m'], ['Academy', 'Étoile de Dakar'], ['Passport ID', 'GFE-SN-40217']
      ],
      tiles: [
        ['31', 'Verified matches this season'], ['19', 'Goals'],
        ['8', 'Assists'], ['96th', 'Combine sprint percentile (U-17)']
      ],
      barsTitle: 'Combine benchmarks · global U-17 forwards',
      bars: [['Pace', 96], ['Pressing', 91], ['Dribbling', 88], ['Finishing', 84], ['Aerial duels', 62]],
      timeline: [
        ['May 2026', 'Selected — West Africa U-17 regional combine, Accra'],
        ['Feb 2026', 'Term benchmark: top decile for pace & pressing (global U-17 peers)'],
        ['Sep 2025', 'Joined Étoile de Dakar academy · education plan registered'],
        ['Mar 2025', 'Passport created by registered grassroots coach, Thiès']
      ],
      footage: [
        ['Combine full match · Accra', 'Certified'],
        ['League semi-final · 90 min', 'Certified'],
        ['Technical assessment reel', 'Certified']
      ],
      safeguarding: [
        ['Guardian access', 'Active · 2 guardians'],
        ['Club approaches (logged)', '3 · all visible'],
        ['Agent mandates', 'None on record']
      ],
      worth: { amount: '€850K', trend: '+38% this term', note: 'Top 2% of global U-17 forwards' },
      ai: [
        ['Top speed (tracked)', '34.6 km/h'],
        ['Sprints per 90', '27'],
        ['xG per 90', '0.68'],
        ['Preferred attacking zone', 'Left half-space']
      ],
      reps: [
        ['Agent', 'None — guardian-managed'],
        ['Social media', 'NorthBank Social · 214K followers'],
        ['Commercial deals', 'None on record']
      ]
    },

    mateus: {
      initials: 'MR',
      name: 'Mateus Rocha',
      meta: [
        ['Age', '17'], ['Position', 'Midfielder'], ['Foot', 'Left'],
        ['Height', '1.74 m'], ['Academy', 'Recife Futuro FC'], ['Passport ID', 'GFE-BR-88412']
      ],
      tiles: [
        ['28', 'Verified matches this season'], ['6', 'Goals'],
        ['12', 'Assists'], ['94th', 'Progressive-pass percentile (U-18)']
      ],
      barsTitle: 'Combine benchmarks · global U-18 midfielders',
      bars: [['Passing range', 94], ['Vision', 90], ['Set pieces', 83], ['Pressing', 78], ['Pace', 71]],
      timeline: [
        ['Apr 2026', 'Selected — South America U-18 regional combine, São Paulo'],
        ['Jan 2026', 'Term benchmark: top decile for progressive passes (global U-18 peers)'],
        ['Aug 2025', 'Agent mandate registered · visible to guardians and club'],
        ['Jun 2024', 'Passport created by registered grassroots coach, Olinda']
      ],
      footage: [
        ['State final full match · Recife', 'Certified'],
        ['Combine scrimmage · São Paulo', 'Certified'],
        ['Deep-lying playmaker reel', 'Certified']
      ],
      safeguarding: [
        ['Guardian access', 'Active · 1 guardian'],
        ['Club approaches (logged)', '5 · all visible'],
        ['Agent mandates', '1 · registered & visible']
      ],
      worth: { amount: '€1.4M', trend: '+52% this term', note: 'Top 1% of global U-18 midfielders' },
      ai: [
        ['Passes per 90', '91 · 89% completed'],
        ['Progressive passes per 90', '12.3'],
        ['Ball recoveries per 90', '8.1'],
        ['Preferred build-up zone', 'Left half, deep pivot']
      ],
      reps: [
        ['Agent', 'Horizonte Sports Group · registered mandate'],
        ['Social media', 'Bola Criativa Mídia · 480K followers'],
        ['Commercial deals', '1 · boot partner, logged & visible']
      ]
    },

    yuki: {
      initials: 'YT',
      name: 'Yuki Tanaka',
      meta: [
        ['Age', '15'], ['Position', 'Goalkeeper'], ['Foot', 'Right'],
        ['Height', '1.85 m'], ['Academy', 'Kawasaki Verde'], ['Passport ID', 'GFE-JP-15208']
      ],
      tiles: [
        ['24', 'Verified matches this season'], ['11', 'Clean sheets'],
        ['81%', 'Save rate (certified matches)'], ['93rd', 'Reflex-test percentile (U-16)']
      ],
      barsTitle: 'Combine benchmarks · global U-16 goalkeepers',
      bars: [['Reflexes', 93], ['Distribution', 88], ['Sweeping', 81], ['One-v-one', 79], ['Command of area', 74]],
      timeline: [
        ['Jun 2026', 'Selected — East Asia U-16 regional combine, Osaka'],
        ['Mar 2026', 'Term benchmark: top decile for reflexes & distribution (global U-16 peers)'],
        ['Apr 2025', 'Joined Kawasaki Verde academy · education plan registered'],
        ['Oct 2024', 'Passport created by registered school coach, Kawasaki']
      ],
      footage: [
        ['Prefecture final · full match', 'Certified'],
        ['Combine shot-stopping session', 'Certified'],
        ['Distribution assessment reel', 'Certified']
      ],
      safeguarding: [
        ['Guardian access', 'Active · 2 guardians'],
        ['Club approaches (logged)', '2 · all visible'],
        ['Agent mandates', 'None on record']
      ],
      worth: { amount: '€320K', trend: '+25% this term', note: 'Top 5% of global U-16 goalkeepers' },
      ai: [
        ['Save rate, shots inside box', '74%'],
        ['Distribution accuracy', '88%'],
        ['Average sweeping distance', '18.4 m off line'],
        ['Reaction time (shot-stopping)', '0.19 s']
      ],
      reps: [
        ['Agent', 'None — guardian-managed'],
        ['Social media', 'Family-run · Tokyo Pitch Media advising'],
        ['Commercial deals', 'None on record']
      ]
    },

    lena: {
      initials: 'LK',
      name: 'Lena Kovačić',
      meta: [
        ['Age', '16'], ['Position', 'Centre-back'], ['Foot', 'Right'],
        ['Height', '1.76 m'], ['Academy', 'Sava Academy Zagreb'], ['Passport ID', 'GFE-HR-33174']
      ],
      tiles: [
        ['26', 'Verified matches this season'], ['74%', 'Duels won'],
        ['4', 'Goals (set pieces)'], ['92nd', 'Aerial-duel percentile (U-17)']
      ],
      barsTitle: 'Combine benchmarks · global U-17 defenders',
      bars: [['Leadership', 94], ['Aerial duels', 92], ['Tackling', 89], ['Build-up play', 85], ['Pace', 76]],
      timeline: [
        ['May 2026', 'Named captain — Croatia U-17 girls regional selection'],
        ['Feb 2026', 'Selected — Southeast Europe U-17 regional combine, Zagreb'],
        ['Jul 2025', 'Joined Sava Academy Zagreb · education plan registered'],
        ['Sep 2024', 'Passport created by registered grassroots coach, Velika Gorica']
      ],
      footage: [
        ['Cup final full match · Zagreb', 'Certified'],
        ['Combine defending session', 'Certified'],
        ['Build-up & duels reel', 'Certified']
      ],
      safeguarding: [
        ['Guardian access', 'Active · 2 guardians'],
        ['Club approaches (logged)', '4 · all visible'],
        ['Agent mandates', 'None on record']
      ],
      worth: { amount: '€520K', trend: '+44% this term', note: 'Top 3% of global U-17 defenders' },
      ai: [
        ['Aerial duels won', '78%'],
        ['Line-breaking passes per 90', '6.8'],
        ['Progressive carries per 90', '4.2'],
        ['Defensive-line height (avg)', '42 m · high line']
      ],
      reps: [
        ['Agent', 'None — guardian-managed'],
        ['Social media', 'Adria Athlete Studio · 96K followers'],
        ['Commercial deals', 'None on record']
      ]
    }
  };

  var els = {
    avatar: document.getElementById('ppAvatar'),
    name: document.getElementById('ppName'),
    meta: document.getElementById('ppMeta'),
    tiles: document.getElementById('ppTiles'),
    timeline: document.getElementById('ppTimeline'),
    barsTitle: document.getElementById('ppBarsTitle'),
    bars: document.getElementById('ppBars'),
    footage: document.getElementById('ppFootage'),
    safeguarding: document.getElementById('ppSafe'),
    worth: document.getElementById('ppWorth'),
    ai: document.getElementById('ppAi'),
    reps: document.getElementById('ppReps')
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function kvPair(parent, wrapTag, kText, vText) {
    var wrap = el(wrapTag);
    wrap.appendChild(el('div', 'k', kText));
    wrap.appendChild(el('div', 'v', vText));
    parent.appendChild(wrap);
  }

  function ordinal(n) {
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) return n + 'th';
    switch (n % 10) {
      case 1: return n + 'st';
      case 2: return n + 'nd';
      case 3: return n + 'rd';
      default: return n + 'th';
    }
  }

  function render(player) {
    els.avatar.textContent = player.initials;
    els.name.textContent = player.name;

    els.meta.textContent = '';
    player.meta.forEach(function (pair) { kvPair(els.meta, 'div', pair[0], pair[1]); });

    els.tiles.textContent = '';
    player.tiles.forEach(function (pair) {
      var tile = el('div', 'tile');
      tile.appendChild(el('div', 'v', pair[0]));
      tile.appendChild(el('div', 'k', pair[1]));
      els.tiles.appendChild(tile);
    });

    els.timeline.textContent = '';
    player.timeline.forEach(function (item) {
      var li = el('li');
      li.appendChild(el('div', 'when', item[0]));
      li.appendChild(el('div', 'what', item[1]));
      els.timeline.appendChild(li);
    });

    els.barsTitle.textContent = player.barsTitle;
    els.bars.textContent = '';
    player.bars.forEach(function (bar) {
      var row = el('div', 'bar-row');
      var top = el('div', 'top');
      top.appendChild(el('span', null, bar[0]));
      top.appendChild(el('span', 'volt', ordinal(bar[1])));
      var track = el('div', 'bar-track');
      var fill = el('div', 'bar-fill');
      fill.style.width = reduceMotion ? bar[1] + '%' : '0%';
      fill.setAttribute('data-w', bar[1]);
      track.appendChild(fill);
      row.appendChild(top);
      row.appendChild(track);
      els.bars.appendChild(row);
    });

    renderRows(els.footage, player.footage);
    renderRows(els.safeguarding, player.safeguarding);
    renderRows(els.ai, player.ai);
    renderRows(els.reps, player.reps);

    els.worth.textContent = '';
    els.worth.appendChild(el('div', 'k', 'Estimated market value'));
    els.worth.appendChild(el('div', 'v', player.worth.amount));
    els.worth.appendChild(el('div', 'trend', '▲ ' + player.worth.trend));
    els.worth.appendChild(el('div', 'note', player.worth.note));
  }

  function renderRows(list, rows) {
    list.textContent = '';
    rows.forEach(function (row) {
      var li = el('li');
      li.appendChild(el('span', null, row[0]));
      li.appendChild(el('span', 'ok', row[1]));
      list.appendChild(li);
    });
  }

  function growBars() {
    if (reduceMotion) return;
    var fills = els.bars.querySelectorAll('.bar-fill[data-w]');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fills.forEach(function (fill) { fill.style.width = fill.getAttribute('data-w') + '%'; });
      });
    });
  }

  function select(tab, focus) {
    var player = PLAYERS[tab.getAttribute('data-player')];
    if (!player) return;

    tabs.forEach(function (t) {
      var active = t === tab;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });
    dash.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();

    if (reduceMotion) {
      render(player);
      return;
    }
    dash.classList.add('is-swapping');
    window.setTimeout(function () {
      render(player);
      dash.classList.remove('is-swapping');
      growBars();
    }, 200);
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      select(tabs[(i + dir + tabs.length) % tabs.length], true);
    });
  });

  /* Deep link: passport.html#mateus opens that passport */
  function selectFromHash(animate) {
    var key = location.hash.slice(1);
    if (!PLAYERS[key]) return;
    var hashTab = document.getElementById('tab-' + key);
    if (animate) {
      select(hashTab, false);
      return;
    }
    tabs.forEach(function (t) {
      var active = t === hashTab;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });
    dash.setAttribute('aria-labelledby', hashTab.id);
    render(PLAYERS[key]);
  }
  selectFromHash(false);
  window.addEventListener('hashchange', function () { selectFromHash(true); });

  /* Animate the default bars when the dashboard scrolls into view */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { growBars(); seen.unobserve(entry.target); }
      });
    }, { threshold: 0.25 });
    els.bars.querySelectorAll('.bar-fill').forEach(function (fill) {
      if (!fill.getAttribute('data-w')) {
        fill.setAttribute('data-w', parseFloat(fill.style.width) || 0);
        fill.style.width = '0%';
      }
    });
    seen.observe(els.bars);
  }
})();
