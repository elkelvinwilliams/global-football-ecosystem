/* =====================================================================
   GLOBAL FOOTBALL ECOSYSTEM — Player passport demo
   Renders four switchable demo passports from data, each with four
   sub-views (overview, match log, growth charts, education).
   All players, clubs and academies are fictional. Dependency-free;
   respects reduced motion.
   ===================================================================== */
(function () {
  'use strict';

  var dash = document.getElementById('passportDash');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.passport-switch [role="tab"]'));
  if (!dash || !tabs.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Terms used on the growth charts: two terms a year */
  var TERMS = ['’24·1', '’24·2', '’25·1', '’25·2', '’26·1'];

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
      ],
      matches: [
        ['12 Jun 26', 'U-17 League', 'ASC Jaraaf U-17', 'W 3–1', '90', '2 G', '8.4'],
        ['29 May 26', 'Regional combine', 'Combine XI · Accra', 'D 2–2', '80', '1 G · 1 A', '8.1'],
        ['17 May 26', 'U-17 League', 'Dakar SC U-17', 'W 2–0', '90', '1 G', '7.9'],
        ['03 May 26', 'U-17 Cup', 'Génération Espoir U-17', 'L 1–2', '90', '1 G', '7.6'],
        ['19 Apr 26', 'U-17 League', 'Casa Sud U-17', 'W 4–0', '72', '2 G · 1 A', '8.8'],
        ['05 Apr 26', 'U-17 League', 'Guédiawaye Nord U-17', 'W 1–0', '90', '—', '7.2']
      ],
      growth: { pct: [61, 68, 77, 85, 91], valueK: [90, 160, 320, 540, 850] },
      education: [
        ['School', 'Lycée de Thiès · enrolled'],
        ['Attendance this term', '96%'],
        ['GFE modules completed', 'Financial literacy · Media basics'],
        ['Next education review', 'Sep 2026']
      ],
      availability: [
        ['Current status', 'Fully available'],
        ['Days missed this season', '4 · ankle knock (Oct)'],
        ['Medical clearance', 'Valid · renewed May 2026'],
        ['Workload flag', 'Normal · U-17 limits enforced']
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
      ],
      matches: [
        ['08 Jun 26', 'U-18 State League', 'Recife Leste U-18', 'W 2–1', '90', '1 A', '8.2'],
        ['25 May 26', 'U-18 State League', 'Olinda Mar U-18', 'D 1–1', '90', '1 G', '7.8'],
        ['10 May 26', 'Combine scrimmage', 'Combine XI · São Paulo', 'W 3–2', '60', '2 A', '8.6'],
        ['26 Apr 26', 'U-18 Cup', 'Salvador Baía U-18', 'W 1–0', '90', '1 A', '7.9'],
        ['12 Apr 26', 'U-18 State League', 'Caruaru Serra U-18', 'L 0–1', '90', '—', '7.1'],
        ['29 Mar 26', 'U-18 State League', 'Paulista Norte U-18', 'W 4–1', '78', '1 G · 2 A', '9.0']
      ],
      growth: { pct: [70, 74, 80, 86, 90], valueK: [250, 420, 700, 1050, 1400] },
      education: [
        ['School', 'Colégio Recife Norte · enrolled'],
        ['Attendance this term', '93%'],
        ['GFE modules completed', 'Financial literacy · Contracts 101'],
        ['Next education review', 'Aug 2026']
      ],
      availability: [
        ['Current status', 'Fully available'],
        ['Days missed this season', '0'],
        ['Medical clearance', 'Valid · renewed Mar 2026'],
        ['Workload flag', 'Watch · high minutes, under review']
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
      ],
      matches: [
        ['14 Jun 26', 'U-16 Prefecture League', 'Yokohama Bay U-16', 'W 1–0', '90', '5 saves · CS', '8.0'],
        ['31 May 26', 'Regional combine', 'Combine XI · Osaka', 'D 0–0', '90', '7 saves · CS', '8.7'],
        ['17 May 26', 'U-16 Prefecture League', 'Shonan Coast U-16', 'W 2–1', '90', '4 saves', '7.5'],
        ['03 May 26', 'U-16 Cup', 'Tokyo Machi U-16', 'L 1–2', '90', '6 saves', '7.8'],
        ['19 Apr 26', 'U-16 Prefecture League', 'Chiba Port U-16', 'W 3–0', '90', '2 saves · CS', '7.4'],
        ['05 Apr 26', 'U-16 Prefecture League', 'Saitama Hills U-16', 'W 1–0', '90', '8 saves · CS', '9.1']
      ],
      growth: { pct: [55, 62, 70, 78, 84], valueK: [60, 110, 180, 240, 320] },
      education: [
        ['School', 'Kawasaki Minami HS · enrolled'],
        ['Attendance this term', '98%'],
        ['GFE modules completed', 'Media basics'],
        ['Next education review', 'Oct 2026']
      ],
      availability: [
        ['Current status', 'Fully available'],
        ['Days missed this season', '2 · illness (Jan)'],
        ['Medical clearance', 'Valid · renewed Apr 2026'],
        ['Workload flag', 'Normal · U-16 limits enforced']
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
      ],
      matches: [
        ['07 Jun 26', 'U-17 League (W)', 'Split Adriatic U-17', 'W 2–0', '90', '78% duels · CS', '8.3'],
        ['24 May 26', 'U-17 Cup final (W)', 'Osijek Istok U-17', 'W 1–0', '90', '1 G · CS', '8.9'],
        ['10 May 26', 'U-17 League (W)', 'Rijeka Marina U-17', 'W 3–1', '90', '82% duels', '8.0'],
        ['26 Apr 26', 'U-17 League (W)', 'Zadar Luka U-17', 'D 1–1', '90', '1 G (set piece)', '7.7'],
        ['12 Apr 26', 'Regional combine', 'Combine XI · Zagreb', 'W 2–1', '70', '75% duels', '8.2'],
        ['29 Mar 26', 'U-17 League (W)', 'Pula Arena U-17', 'W 2–0', '90', 'CS', '7.6']
      ],
      growth: { pct: [58, 66, 75, 83, 89], valueK: [80, 150, 260, 390, 520] },
      education: [
        ['School', 'XV. gimnazija Zagreb · enrolled'],
        ['Attendance this term', '97%'],
        ['GFE modules completed', 'Financial literacy · Captaincy & leadership'],
        ['Next education review', 'Sep 2026']
      ],
      availability: [
        ['Current status', 'Fully available'],
        ['Days missed this season', '9 · hamstring (Nov)'],
        ['Medical clearance', 'Valid · renewed Feb 2026'],
        ['Workload flag', 'Normal · U-17 limits enforced']
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
    reps: document.getElementById('ppReps'),
    matches: document.getElementById('ppMatches'),
    edu: document.getElementById('ppEdu'),
    avail: document.getElementById('ppAvail'),
    chartPct: document.getElementById('chartPct'),
    chartVal: document.getElementById('chartVal')
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

  function fmtValueK(k) {
    return k >= 1000 ? '€' + (k / 1000).toFixed(1).replace('.0', '') + 'M' : '€' + k + 'K';
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

  /* ---- Charts (single volt series on the dark panel surface) ---- */

  var CHART = { w: 340, h: 158, padL: 34, padR: 18, padT: 16, padB: 26 };

  function chartFrame(yMax, yTicks, fmt) {
    var plotW = CHART.w - CHART.padL - CHART.padR;
    var plotH = CHART.h - CHART.padT - CHART.padB;
    var s = '';
    yTicks.forEach(function (t) {
      var y = (CHART.padT + plotH * (1 - t / yMax)).toFixed(1);
      s += '<line x1="' + CHART.padL + '" y1="' + y + '" x2="' + (CHART.w - CHART.padR) + '" y2="' + y +
        '" stroke="rgba(242,247,240,0.08)" stroke-width="1"/>';
      s += '<text x="' + (CHART.padL - 6) + '" y="' + y + '" fill="#7c8c80" font-size="8.5" text-anchor="end" dominant-baseline="middle">' + fmt(t) + '</text>';
    });
    return s;
  }

  function xLabels(labels) {
    var plotW = CHART.w - CHART.padL - CHART.padR;
    var s = '';
    labels.forEach(function (lab, i) {
      var x = CHART.padL + (labels.length === 1 ? plotW / 2 : i * (plotW / (labels.length - 1)));
      s += '<text x="' + x.toFixed(1) + '" y="' + (CHART.h - 8) + '" fill="#7c8c80" font-size="8.5" text-anchor="middle">' + lab + '</text>';
    });
    return s;
  }

  function attachTips(container) {
    var tip = el('div', 'tip');
    container.appendChild(tip);
    Array.prototype.forEach.call(container.querySelectorAll('[data-tip]'), function (hit) {
      hit.addEventListener('mouseenter', function () {
        tip.textContent = hit.getAttribute('data-tip');
        var c = container.getBoundingClientRect();
        var r = hit.getBoundingClientRect();
        tip.style.left = (r.left - c.left + r.width / 2) + 'px';
        tip.style.top = (r.top - c.top) + 'px';
        tip.classList.add('show');
      });
      hit.addEventListener('mouseleave', function () { tip.classList.remove('show'); });
    });
  }

  function lineChart(container, labels, values, tipFmt) {
    var yMax = 100;
    var plotW = CHART.w - CHART.padL - CHART.padR;
    var plotH = CHART.h - CHART.padT - CHART.padB;
    var pts = values.map(function (v, i) {
      return [
        CHART.padL + i * (plotW / (values.length - 1)),
        CHART.padT + plotH * (1 - v / yMax)
      ];
    });
    var poly = pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
    var base = (CHART.padT + plotH).toFixed(1);
    var area = poly + ' ' + pts[pts.length - 1][0].toFixed(1) + ',' + base + ' ' + pts[0][0].toFixed(1) + ',' + base;

    var s = '<svg viewBox="0 0 ' + CHART.w + ' ' + CHART.h + '" role="img" aria-label="Benchmark percentile by term: ' +
      values.map(function (v, i) { return labels[i] + ' ' + ordinal(v); }).join(', ') + '">';
    s += chartFrame(yMax, [0, 50, 100], function (t) { return t; });
    s += '<polygon points="' + area + '" fill="rgba(198,249,78,0.08)"/>';
    s += '<polyline points="' + poly + '" fill="none" stroke="#c6f94e" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
    pts.forEach(function (p, i) {
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="#c6f94e" stroke="#081f16" stroke-width="2"/>';
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="12" fill="transparent" data-tip="' +
        labels[i] + ' · ' + tipFmt(values[i]) + '"><title>' + labels[i] + ' · ' + tipFmt(values[i]) + '</title></circle>';
    });
    var last = pts[pts.length - 1];
    s += '<text x="' + last[0].toFixed(1) + '" y="' + (last[1] - 9).toFixed(1) +
      '" fill="#c6f94e" font-size="11" font-weight="700" text-anchor="end">' + tipFmt(values[values.length - 1]) + '</text>';
    s += xLabels(labels) + '</svg>';

    container.innerHTML = s;
    attachTips(container);
  }

  function barChart(container, labels, values) {
    var yMax = Math.ceil(Math.max.apply(null, values) * 1.15 / 100) * 100;
    var plotW = CHART.w - CHART.padL - CHART.padR;
    var plotH = CHART.h - CHART.padT - CHART.padB;
    var slot = plotW / values.length;
    var bw = slot * 0.52;
    var base = CHART.padT + plotH;
    var r = 4;

    var s = '<svg viewBox="0 0 ' + CHART.w + ' ' + CHART.h + '" role="img" aria-label="Estimated market value by term: ' +
      values.map(function (v, i) { return labels[i] + ' ' + fmtValueK(v); }).join(', ') + '">';
    s += chartFrame(yMax, [0, yMax / 2, yMax], fmtValueK);
    values.forEach(function (v, i) {
      var x = CHART.padL + i * slot + (slot - bw) / 2;
      var top = CHART.padT + plotH * (1 - v / yMax);
      var h = base - top;
      var rr = Math.min(r, h);
      s += '<path d="M' + x.toFixed(1) + ',' + base.toFixed(1) +
        ' V' + (top + rr).toFixed(1) +
        ' Q' + x.toFixed(1) + ',' + top.toFixed(1) + ' ' + (x + rr).toFixed(1) + ',' + top.toFixed(1) +
        ' H' + (x + bw - rr).toFixed(1) +
        ' Q' + (x + bw).toFixed(1) + ',' + top.toFixed(1) + ' ' + (x + bw).toFixed(1) + ',' + (top + rr).toFixed(1) +
        ' V' + base.toFixed(1) + ' Z" fill="#c6f94e" data-tip="' + labels[i] + ' · ' + fmtValueK(v) + '">' +
        '<title>' + labels[i] + ' · ' + fmtValueK(v) + '</title></path>';
      if (i === values.length - 1) {
        s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (top - 5).toFixed(1) +
          '" fill="#c6f94e" font-size="11" font-weight="700" text-anchor="middle">' + fmtValueK(v) + '</text>';
      }
    });
    var midX = CHART.padL;
    s += '<line x1="' + midX + '" y1="' + base.toFixed(1) + '" x2="' + (CHART.w - CHART.padR) + '" y2="' + base.toFixed(1) +
      '" stroke="rgba(242,247,240,0.18)" stroke-width="1"/>';
    // shift bar x labels to slot centres
    var lab = '';
    labels.forEach(function (t, i) {
      var x = CHART.padL + i * slot + slot / 2;
      lab += '<text x="' + x.toFixed(1) + '" y="' + (CHART.h - 8) + '" fill="#7c8c80" font-size="8.5" text-anchor="middle">' + t + '</text>';
    });
    s += lab + '</svg>';

    container.innerHTML = s;
    attachTips(container);
  }

  /* ---- Render a player into every view ---- */

  function render(player) {
    els.avatar.textContent = player.initials;
    els.name.textContent = player.name;

    els.meta.textContent = '';
    player.meta.forEach(function (pair) {
      var wrap = el('div');
      wrap.appendChild(el('div', 'k', pair[0]));
      wrap.appendChild(el('div', 'v', pair[1]));
      els.meta.appendChild(wrap);
    });

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
    renderRows(els.edu, player.education);
    renderRows(els.avail, player.availability);

    els.worth.textContent = '';
    els.worth.appendChild(el('div', 'k', 'Estimated market value'));
    els.worth.appendChild(el('div', 'v', player.worth.amount));
    els.worth.appendChild(el('div', 'trend', '▲ ' + player.worth.trend));
    els.worth.appendChild(el('div', 'note', player.worth.note));

    els.matches.textContent = '';
    player.matches.forEach(function (m) {
      var tr = el('tr');
      tr.appendChild(el('td', null, m[0]));
      tr.appendChild(el('td', null, m[1]));
      tr.appendChild(el('td', null, m[2]));
      tr.appendChild(el('td', null, m[3]));
      tr.appendChild(el('td', 'num', m[4]));
      tr.appendChild(el('td', null, m[5]));
      var tdRate = el('td', 'num');
      tdRate.appendChild(el('span', 'rate', m[6]));
      tr.appendChild(tdRate);
      els.matches.appendChild(tr);
    });

    lineChart(els.chartPct, TERMS, player.growth.pct, ordinal);
    barChart(els.chartVal, TERMS, player.growth.valueK);
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

  /* ---- Player switcher (top-level tabs) ---- */

  function setPlayerTabState(tab) {
    tabs.forEach(function (t) {
      var active = t === tab;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
    });
    dash.setAttribute('aria-labelledby', tab.id);
  }

  function select(tab, focus) {
    var player = PLAYERS[tab.getAttribute('data-player')];
    if (!player) return;
    setPlayerTabState(tab);
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

  /* ---- Sub-view tabs (overview / matches / growth / education) ---- */

  var vtabs = Array.prototype.slice.call(document.querySelectorAll('.view-tabs [role="tab"]'));
  function selectView(tab, focus) {
    vtabs.forEach(function (t) {
      var active = t === tab;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.tabIndex = active ? 0 : -1;
      document.getElementById(t.getAttribute('data-view')).hidden = !active;
    });
    if (focus) tab.focus();
    if (tab.getAttribute('data-view') === 'viewOverview') growBars();
  }
  vtabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectView(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      selectView(vtabs[(i + dir + vtabs.length) % vtabs.length], true);
    });
  });

  /* ---- Deep link + initial render ---- */

  function playerKeyFromHash() {
    var key = location.hash.slice(1);
    return PLAYERS[key] ? key : null;
  }

  var initKey = playerKeyFromHash() || 'amara';
  setPlayerTabState(document.getElementById('tab-' + initKey));
  render(PLAYERS[initKey]);

  window.addEventListener('hashchange', function () {
    var key = playerKeyFromHash();
    if (key) select(document.getElementById('tab-' + key), false);
  });

  /* ---- Animate benchmark bars when the dashboard scrolls into view ---- */

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { growBars(); seen.unobserve(entry.target); }
      });
    }, { threshold: 0.25 });
    seen.observe(els.bars);
  }
})();
