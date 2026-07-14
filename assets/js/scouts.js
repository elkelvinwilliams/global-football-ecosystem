/* =====================================================================
   GLOBAL FOOTBALL ECOSYSTEM — Scout console demo
   Filterable demo player pool with shortlisting. All players fictional.
   ===================================================================== */
(function () {
  'use strict';

  var grid = document.getElementById('scoutGrid');
  if (!grid) return;

  var POOL = [
    { key: 'amara', initials: 'AD', name: 'Amara Diallo', pos: 'Forward', age: 16, country: 'Senegal', region: 'Africa',
      stats: ['Pace · 96th percentile', '19 goals this season'], passport: true },
    { key: 'mateus', initials: 'MR', name: 'Mateus Rocha', pos: 'Midfielder', age: 17, country: 'Brazil', region: 'South America',
      stats: ['Progressive passes · 94th', '12 assists this season'], passport: true },
    { key: 'yuki', initials: 'YT', name: 'Yuki Tanaka', pos: 'Goalkeeper', age: 15, country: 'Japan', region: 'Asia',
      stats: ['Reflexes · 93rd percentile', '11 clean sheets'], passport: true },
    { key: 'lena', initials: 'LK', name: 'Lena Kovačić', pos: 'Defender', age: 16, country: 'Croatia', region: 'Europe',
      stats: ['Aerial duels · 92nd', '74% duels won'], passport: true },
    { key: 'kofi', initials: 'KM', name: 'Kofi Mensah', pos: 'Forward', age: 17, country: 'Ghana', region: 'Africa',
      stats: ['Finishing · 90th percentile', '15 goals this season'], passport: false },
    { key: 'valentina', initials: 'VR', name: 'Valentina Reyes', pos: 'Midfielder', age: 16, country: 'Colombia', region: 'South America',
      stats: ['Vision · 89th percentile', '9 assists this season'], passport: false },
    { key: 'arjun', initials: 'AP', name: 'Arjun Pillai', pos: 'Defender', age: 16, country: 'India', region: 'Asia',
      stats: ['Stamina · 91st percentile', '31 verified matches'], passport: false },
    { key: 'emre', initials: 'EA', name: 'Emre Aksoy', pos: 'Goalkeeper', age: 17, country: 'Türkiye', region: 'Europe',
      stats: ['Command of area · 87th', '9 clean sheets'], passport: false }
  ];

  var CLUBPOOL = [
    { key: 'etoile', initials: 'ED', name: 'Étoile de Dakar', country: 'Senegal', region: 'Africa',
      stats: ['High press · vertical transitions', '212 players · 12 combine picks'], passport: true },
    { key: 'recife', initials: 'RF', name: 'Recife Futuro FC', country: 'Brazil', region: 'South America',
      stats: ['Possession · third-man play', '324 players · 9 combine picks'], passport: true },
    { key: 'kawasaki', initials: 'KV', name: 'Kawasaki Verde', country: 'Japan', region: 'Asia',
      stats: ['Compact block · sweeper-keeper', '148 players · 6 combine picks'], passport: true },
    { key: 'sava', initials: 'SA', name: 'Sava Academy Zagreb', country: 'Croatia', region: 'Europe',
      stats: ['High line · set pieces', '196 players · 8 combine picks'], passport: true },
    { key: 'nairobi', initials: 'NR', name: 'Nairobi Rise', country: 'Kenya', region: 'Africa',
      stats: ['Counter-press · wing overloads', '164 players · 5 combine picks'], passport: false },
    { key: 'altiplano', initials: 'AF', name: 'Altiplano FC', country: 'Bolivia', region: 'South America',
      stats: ['Direct play · altitude conditioning', '117 players · 3 combine picks'], passport: false }
  ];

  var state = { view: 'players', pos: 'all', region: 'all' };
  var shortlist = {};
  var requested = {};
  var posGroup = document.getElementById('posGroup');

  var resultCount = document.getElementById('resultCount');
  var shortlistCount = document.getElementById('shortlistCount');
  var emptyState = document.getElementById('emptyState');

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function updateShortlistCount() {
    var n = Object.keys(shortlist).filter(function (k) { return shortlist[k]; }).length;
    shortlistCount.textContent = 'Shortlist · ' + n;
  }

  function card(p, isClub) {
    var art = el('article', 'scout-card');

    var head = el('div', 'sc-head');
    head.appendChild(el('span', 'chip-avatar', p.initials));
    var idBox = el('div', 'sc-id');
    idBox.appendChild(el('h3', null, p.name));
    idBox.appendChild(el('div', 'sc-sub',
      isClub ? 'Academy · ' + p.country : p.pos + ' · ' + p.age + ' · ' + p.country));
    head.appendChild(idBox);

    var star = el('button', 'star');
    star.setAttribute('aria-pressed', shortlist[p.key] ? 'true' : 'false');
    star.setAttribute('aria-label', 'Shortlist ' + p.name);
    star.textContent = '★';
    star.addEventListener('click', function () {
      shortlist[p.key] = !shortlist[p.key];
      star.setAttribute('aria-pressed', shortlist[p.key] ? 'true' : 'false');
      updateShortlistCount();
    });
    head.appendChild(star);
    art.appendChild(head);

    var ul = el('ul', 'sc-stats');
    p.stats.forEach(function (s) { ul.appendChild(el('li', null, s)); });
    art.appendChild(ul);

    var row = el('div', 'sc-actions');
    if (p.passport) {
      var a = el('a', 'btn btn-outline sc-btn', isClub ? 'View club passport' : 'View passport');
      a.href = (isClub ? 'clubs.html#' : 'passport.html#') + p.key;
      row.appendChild(a);
    } else {
      var b = el('button', 'btn btn-outline sc-btn', requested[p.key] ? 'Requested ✓' : 'Request access');
      if (requested[p.key]) b.classList.add('is-done');
      b.addEventListener('click', function () {
        requested[p.key] = true;
        b.textContent = 'Requested ✓';
        b.classList.add('is-done');
      });
      row.appendChild(b);
    }
    var badge = el('span', 'sc-verified', isClub ? 'GFE-licensed' : 'GFE-verified');
    row.appendChild(badge);
    art.appendChild(row);

    return art;
  }

  function renderGrid() {
    var isClubs = state.view === 'clubs';
    if (posGroup) posGroup.hidden = isClubs;

    var pool = isClubs ? CLUBPOOL : POOL;
    var visible = pool.filter(function (p) {
      return (isClubs || state.pos === 'all' || p.pos === state.pos) &&
             (state.region === 'all' || p.region === state.region);
    });
    grid.textContent = '';
    visible.forEach(function (p) { grid.appendChild(card(p, isClubs)); });
    var noun = isClubs ? ' club' : ' player';
    resultCount.textContent = visible.length + noun + (visible.length === 1 ? '' : 's');
    emptyState.hidden = visible.length !== 0;
  }

  document.querySelectorAll('.chip[data-filter]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.getAttribute('data-filter');
      state[group] = chip.getAttribute('data-value');
      document.querySelectorAll('.chip[data-filter="' + group + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      renderGrid();
    });
  });

  renderGrid();
  updateShortlistCount();
})();
