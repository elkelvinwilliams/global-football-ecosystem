/* =====================================================================
   GLOBAL FOOTBALL ECOSYSTEM — Club passport demo
   Renders four switchable demo club passports from data, each with a
   playing-style film. All clubs fictional. Dependency-free.
   ===================================================================== */
(function () {
  'use strict';

  var dash = document.getElementById('clubDash');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.passport-switch [role="tab"]'));
  if (!dash || !tabs.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CLUBS = {
    etoile: {
      initials: 'ED',
      name: 'Étoile de Dakar',
      video: 'assets/video/style-etoile.mp4',
      poster: 'assets/video/style-etoile.jpg',
      tags: ['High press', 'Vertical transitions', '4-3-3'],
      meta: [
        ['Founded', '2014'], ['City', 'Dakar, Senegal'], ['Age groups', 'U-12 – U-17'],
        ['Badged coaches', '14'], ['Licence tier', 'Tier 1'], ['Passport ID', 'GFE-CLB-SN-0112']
      ],
      licence: { tier: 'Tier 1', status: 'Renewed Mar 2026 · audit passed', note: 'Safeguarding & education: fully compliant' },
      tiles: [
        ['212', 'Players registered'], ['186', 'Player passports issued'],
        ['7', 'Alumni in pro academies'], ['12', 'Combine selections 2026']
      ],
      dnaTitle: 'Style DNA · vs GFE network U-17',
      dna: [['Press height', 92], ['Transition speed', 90], ['Directness', 88], ['Possession', 55], ['Aerial play', 61]],
      timeline: [
        ['May 2026', '12 players selected for the West Africa U-17 combine, Accra'],
        ['Mar 2026', 'Tier 1 licence renewed · safeguarding audit passed'],
        ['Nov 2025', 'Playing-style film certified by GFE Vision'],
        ['Sep 2025', 'Education partnership signed with Lycée de Thiès']
      ],
      facilities: [
        ['Pitches', '2 grass · 1 artificial, floodlit'],
        ['Filming setup', 'Vision-certified · 2 fixed cameras'],
        ['Classroom', 'On site · daily study hours'],
        ['Medical', 'Physio 5 days/week · insured']
      ],
      compliance: [
        ['Safeguarding officer', 'Certified · A. Ndiaye'],
        ['Education partner', 'Lycée de Thiès · active'],
        ['Licence audit', 'Passed · Mar 2026'],
        ['Guardian portal', 'Active · 178 families']
      ],
      alumni: [
        ['Amara Diallo (16, FW)', 'Current · combine selection'],
        ['Ibrahima Sarr (19, MF)', 'Pro academy · Morocco'],
        ['Ousmane Ba (20, DF)', 'First division · Senegal']
      ]
    },

    recife: {
      initials: 'RF',
      name: 'Recife Futuro FC',
      video: 'assets/video/style-recife.mp4',
      poster: 'assets/video/style-recife.jpg',
      tags: ['Possession', 'Third-man play', 'Build from the back'],
      meta: [
        ['Founded', '2009'], ['City', 'Recife, Brazil'], ['Age groups', 'U-13 – U-18'],
        ['Badged coaches', '19'], ['Licence tier', 'Tier 1'], ['Passport ID', 'GFE-CLB-BR-0347']
      ],
      licence: { tier: 'Tier 1', status: 'Renewed Jan 2026 · audit passed', note: 'Safeguarding & education: fully compliant' },
      tiles: [
        ['324', 'Players registered'], ['297', 'Player passports issued'],
        ['15', 'Alumni in pro academies'], ['9', 'Combine selections 2026']
      ],
      dnaTitle: 'Style DNA · vs GFE network U-18',
      dna: [['Possession', 94], ['Build-up quality', 91], ['Chance quality', 87], ['Press height', 68], ['Directness', 38]],
      timeline: [
        ['Apr 2026', '9 players selected for the South America U-18 combine, São Paulo'],
        ['Jan 2026', 'Tier 1 licence renewed · education audit passed'],
        ['Oct 2025', 'Playing-style film certified by GFE Vision'],
        ['Jul 2025', 'Girls program launched · U-15 and U-17 squads']
      ],
      facilities: [
        ['Pitches', '3 grass · 1 futsal court'],
        ['Filming setup', 'Vision-certified · 3 fixed cameras'],
        ['Classroom', 'Partner school on site'],
        ['Medical', 'Full-time physio · nutritionist']
      ],
      compliance: [
        ['Safeguarding officer', 'Certified · C. Almeida'],
        ['Education partner', 'Colégio Recife Norte · active'],
        ['Licence audit', 'Passed · Jan 2026'],
        ['Guardian portal', 'Active · 289 families']
      ],
      alumni: [
        ['Mateus Rocha (17, MF)', 'Current · combine selection'],
        ['João Ferraz (20, FW)', 'Série A academy · Brazil'],
        ['Valentina Reyes (16, MF)', 'Partner exchange · Colombia']
      ]
    },

    kawasaki: {
      initials: 'KV',
      name: 'Kawasaki Verde',
      video: 'assets/video/style-kawasaki.mp4',
      poster: 'assets/video/style-kawasaki.jpg',
      tags: ['Compact block', 'Sweeper-keeper', 'Counter-attack'],
      meta: [
        ['Founded', '2016'], ['City', 'Kawasaki, Japan'], ['Age groups', 'U-12 – U-16'],
        ['Badged coaches', '11'], ['Licence tier', 'Tier 2'], ['Passport ID', 'GFE-CLB-JP-0521']
      ],
      licence: { tier: 'Tier 2', status: 'Renewed Apr 2026 · Tier 1 review booked', note: 'Safeguarding compliant · facilities upgrade in progress' },
      tiles: [
        ['148', 'Players registered'], ['131', 'Player passports issued'],
        ['4', 'Alumni in pro academies'], ['6', 'Combine selections 2026']
      ],
      dnaTitle: 'Style DNA · vs GFE network U-16',
      dna: [['Block compactness', 95], ['Keeper sweeping', 93], ['Turnover strikes', 89], ['Press height', 52], ['Possession', 47]],
      timeline: [
        ['Jun 2026', '6 players selected for the East Asia U-16 combine, Osaka'],
        ['Apr 2026', 'Tier 2 licence renewed · Tier 1 review scheduled'],
        ['Dec 2025', 'Playing-style film certified by GFE Vision'],
        ['Apr 2025', 'Joined the GFE network · first passports issued']
      ],
      facilities: [
        ['Pitches', '1 artificial, floodlit · shared gym'],
        ['Filming setup', 'Vision-certified · 1 fixed camera'],
        ['Classroom', 'Partner school · Kawasaki Minami HS'],
        ['Medical', 'Physio 3 days/week · insured']
      ],
      compliance: [
        ['Safeguarding officer', 'Certified · H. Mori'],
        ['Education partner', 'Kawasaki Minami HS · active'],
        ['Licence audit', 'Passed · Apr 2026'],
        ['Guardian portal', 'Active · 126 families']
      ],
      alumni: [
        ['Yuki Tanaka (15, GK)', 'Current · combine selection'],
        ['Ren Takeda (18, DF)', 'J-League academy · Japan'],
        ['Sora Fujimoto (19, MF)', 'University first team · Japan']
      ]
    },

    sava: {
      initials: 'SA',
      name: 'Sava Academy Zagreb',
      video: 'assets/video/style-sava.mp4',
      poster: 'assets/video/style-sava.jpg',
      tags: ['High line', 'Set pieces', 'Aerial dominance'],
      meta: [
        ['Founded', '2011'], ['City', 'Zagreb, Croatia'], ['Age groups', 'U-13 – U-17 · girls & boys'],
        ['Badged coaches', '16'], ['Licence tier', 'Tier 1'], ['Passport ID', 'GFE-CLB-HR-0284']
      ],
      licence: { tier: 'Tier 1', status: 'Renewed Feb 2026 · audit passed', note: 'Safeguarding & education: fully compliant' },
      tiles: [
        ['196', 'Players registered'], ['184', 'Player passports issued'],
        ['9', 'Alumni in pro academies'], ['8', 'Combine selections 2026']
      ],
      dnaTitle: 'Style DNA · vs GFE network U-17',
      dna: [['Defensive line height', 95], ['Aerial duels', 93], ['Set-piece threat', 91], ['Press height', 74], ['Possession', 63]],
      timeline: [
        ['May 2026', 'U-17 girls cup won · captain named to regional selection'],
        ['Feb 2026', 'Tier 1 licence renewed · 8 combine selections confirmed'],
        ['Sep 2025', 'Playing-style film certified by GFE Vision'],
        ['Jun 2025', 'Set-piece lab opened · dedicated coach hired']
      ],
      facilities: [
        ['Pitches', '2 grass · indoor hall, winter-ready'],
        ['Filming setup', 'Vision-certified · 2 fixed cameras'],
        ['Classroom', 'Partner · XV. gimnazija Zagreb'],
        ['Medical', 'Physio daily · cardiac screening']
      ],
      compliance: [
        ['Safeguarding officer', 'Certified · I. Horvat'],
        ['Education partner', 'XV. gimnazija Zagreb · active'],
        ['Licence audit', 'Passed · Feb 2026'],
        ['Guardian portal', 'Active · 171 families']
      ],
      alumni: [
        ['Lena Kovačić (16, CB)', 'Current · regional captain'],
        ['Petra Novak (19, FW)', 'First-division women · Croatia'],
        ['Marko Šimić (20, GK)', 'Pro academy · Austria']
      ]
    }
  };

  var els = {
    avatar: document.getElementById('cbAvatar'),
    name: document.getElementById('cbName'),
    meta: document.getElementById('cbMeta'),
    licence: document.getElementById('cbLicence'),
    filmTitle: document.getElementById('cbFilmTitle'),
    video: document.getElementById('cbVideo'),
    tags: document.getElementById('cbTags'),
    tiles: document.getElementById('cbTiles'),
    dnaTitle: document.getElementById('cbDnaTitle'),
    dna: document.getElementById('cbDna'),
    timeline: document.getElementById('cbTimeline'),
    facilities: document.getElementById('cbFacilities'),
    compliance: document.getElementById('cbCompliance'),
    alumni: document.getElementById('cbAlumni')
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
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

  function renderRows(list, rows) {
    list.textContent = '';
    rows.forEach(function (row) {
      var li = el('li');
      li.appendChild(el('span', null, row[0]));
      li.appendChild(el('span', 'ok', row[1]));
      list.appendChild(li);
    });
  }

  function render(club) {
    els.avatar.textContent = club.initials;
    els.name.textContent = club.name;

    els.meta.textContent = '';
    club.meta.forEach(function (pair) {
      var wrap = el('div');
      wrap.appendChild(el('div', 'k', pair[0]));
      wrap.appendChild(el('div', 'v', pair[1]));
      els.meta.appendChild(wrap);
    });

    els.licence.textContent = '';
    els.licence.appendChild(el('div', 'k', 'GFE club licence'));
    els.licence.appendChild(el('div', 'v', club.licence.tier));
    els.licence.appendChild(el('div', 'trend', club.licence.status));
    els.licence.appendChild(el('div', 'note', club.licence.note));

    els.filmTitle.textContent = 'Playing style · ' + club.name;
    if (els.video.getAttribute('data-club') !== club.name) {
      els.video.pause();
      els.video.setAttribute('poster', club.poster);
      var sources = els.video.querySelectorAll('source');
      sources[0].setAttribute('src', club.video);
      if (sources[1]) sources[1].setAttribute('src', club.video.replace(/\.mp4$/, '.webm'));
      els.video.setAttribute('data-club', club.name);
      els.video.load();
    }

    els.tags.textContent = '';
    club.tags.forEach(function (t) { els.tags.appendChild(el('span', 'tag', t)); });

    els.tiles.textContent = '';
    club.tiles.forEach(function (pair) {
      var tile = el('div', 'tile');
      tile.appendChild(el('div', 'v', pair[0]));
      tile.appendChild(el('div', 'k', pair[1]));
      els.tiles.appendChild(tile);
    });

    els.dnaTitle.textContent = club.dnaTitle;
    els.dna.textContent = '';
    club.dna.forEach(function (bar) {
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
      els.dna.appendChild(row);
    });

    els.timeline.textContent = '';
    club.timeline.forEach(function (item) {
      var li = el('li');
      li.appendChild(el('div', 'when', item[0]));
      li.appendChild(el('div', 'what', item[1]));
      els.timeline.appendChild(li);
    });

    renderRows(els.facilities, club.facilities);
    renderRows(els.compliance, club.compliance);
    renderRows(els.alumni, club.alumni);
  }

  function growBars() {
    if (reduceMotion) return;
    var fills = els.dna.querySelectorAll('.bar-fill[data-w]');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fills.forEach(function (fill) { fill.style.width = fill.getAttribute('data-w') + '%'; });
      });
    });
  }

  function setTabState(tab) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });
    dash.setAttribute('aria-labelledby', tab.id);
  }

  function select(tab, focus) {
    var club = CLUBS[tab.getAttribute('data-club')];
    if (!club) return;
    setTabState(tab);
    if (focus) tab.focus();

    if (reduceMotion) {
      render(club);
      return;
    }
    dash.classList.add('is-swapping');
    window.setTimeout(function () {
      render(club);
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

  /* Deep link + initial render */
  function clubKeyFromHash() {
    var key = location.hash.slice(1);
    return CLUBS[key] ? key : null;
  }

  var initKey = clubKeyFromHash() || 'etoile';
  setTabState(document.getElementById('tab-' + initKey));
  render(CLUBS[initKey]);

  window.addEventListener('hashchange', function () {
    var key = clubKeyFromHash();
    if (key) select(document.getElementById('tab-' + key), false);
  });

  /* Animate DNA bars when the dashboard scrolls into view */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { growBars(); seen.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    seen.observe(els.dna);
  }
})();
