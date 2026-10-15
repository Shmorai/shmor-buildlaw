/* Shmor site kit: menu toggle + on-site search (pages are found via /search-index.json) */
(function () {
  'use strict';
  var btn = document.querySelector('[data-menu]'), nav = document.querySelector('[data-nav]');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  var out = document.getElementById('search-results');
  if (!out) return;
  var q = (new URLSearchParams(location.search).get('q') || '').trim();
  var input = document.querySelector('.search input[name=q]');
  if (input) input.value = q;
  if (!q) return;
  document.getElementById('search-title').textContent = 'Results for “' + q + '”';
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var words = q.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 1; });
  fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (pages) {
    var hits = pages.map(function (p) {
      var score = words.reduce(function (s, w) { return s + (p.terms.indexOf(w) > -1 ? 1 : 0); }, 0);
      return { p: p, score: score };
    }).filter(function (h) { return h.score > 0; }).sort(function (a, b) { return b.score - a.score; });
    out.innerHTML = hits.length
      ? hits.map(function (h) { return '<a class="card' + (h.p.img ? ' has-img' : '') + '" href="' + h.p.path + '">' + (h.p.img ? '<img class="card-img" src="' + esc(h.p.img) + '" alt="" loading="lazy" width="600" height="360">' : '') + '<h3>' + esc(h.p.title) + '</h3><p>' + esc(h.p.text) + '</p><span class="cta">Explore →</span></a>'; }).join('')
      : '<p class="empty">No pages matched. Try a broader search, or browse the guides below.</p>' +
        pages.slice(0, 6).map(function (p) { return '<a class="card" href="' + p.path + '"><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></a>'; }).join('');
  }).catch(function () { out.innerHTML = '<p class="empty">Search is unavailable right now.</p>'; });
})();

/* "specs" blocks with "tabs": filter the cards by data-tag (every card shows without JS) */
(function () {
  'use strict';
  document.querySelectorAll('[data-tabs]').forEach(function (bar) {
    var grid = bar.nextElementSibling;
    bar.hidden = false;
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-tab]');
      if (!b) return;
      var id = b.getAttribute('data-tab');
      bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      grid.querySelectorAll('[data-tag]').forEach(function (c) { c.hidden = id !== 'all' && c.getAttribute('data-tag') !== id; });
    });
  });
})();

/* Fold the top menu into the menu button whenever it doesn't fit (any screen width) */
(function () {
  'use strict';
  var root = document.documentElement, bar = document.querySelector('.site-header .bar'), nav = document.querySelector('[data-nav]');
  if (!bar || !nav) return;
  function fit() {
    root.classList.remove('nav-compact');
    nav.classList.remove('open');
    if (getComputedStyle(nav).display === 'none') return; // phone layout already uses the menu button
    var over = bar.scrollWidth > bar.clientWidth + 1 || nav.scrollWidth > nav.clientWidth + 1 ||
      nav.getBoundingClientRect().right > bar.getBoundingClientRect().right + 1;
    if (over) root.classList.add('nav-compact');
  }
  fit();
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();

/* BuildLaw: payment deadline calculator ("html" block with [data-calc]).
   Counts days as section 116 of the Construction Act requires: the start date isn't
   counted, and Christmas Day, Good Friday and bank holidays are skipped (GOV.UK feed). */
(function () {
  'use strict';
  var root = document.querySelector('[data-calc]');
  if (!root) return;
  var f = root.querySelector('form'), out = root.querySelector('[data-calc-out]'), status = root.querySelector('[data-calc-status]');
  var holidays = null;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var parse = function (s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); };
  var fmt = function (d) { return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); };
  function excluded(d, region) {
    if (d.getMonth() === 11 && d.getDate() === 25) return true;
    return !!(holidays && holidays[region] && holidays[region][iso(d)]);
  }
  function shift(start, n, region, dir) {
    var d = new Date(start), counted = 0, guard = 0;
    while (counted < n && guard++ < 400) {
      d.setDate(d.getDate() + dir);
      if (!excluded(d, region)) counted++;
    }
    return d;
  }
  function row(k, d, note) {
    return '<li><span class="k">' + k + '</span><span class="d">' + fmt(d) + '</span>' + (note ? '<span class="n">' + note + '</span>' : '') + '</li>';
  }
  function run() {
    var v = f.due.value;
    if (!v) { out.innerHTML = '<li><span class="n">Choose a payment due date to see your deadlines.</span></li>'; return; }
    var region = f.region.value, due = parse(v);
    var pn = Math.max(0, +f.pn.value || 0), fd = Math.max(0, +f.fd.value || 0), pl = Math.max(0, +f.pl.value || 0);
    var payNotice = shift(due, pn, region, 1), finalDate = shift(due, fd, region, 1), payLess = shift(finalDate, pl, region, -1);
    var noticeDay = new Date(finalDate); noticeDay.setDate(noticeDay.getDate() + 1);
    var suspend = shift(noticeDay, 7, region, 1);
    out.innerHTML =
      row('Payment due date', due, 'The date the payment becomes due.') +
      row('Payment notice by', payNotice, pn + ' days after the due date (payer or specified person).') +
      row('Pay less notice by', payLess, pl + ' days before the final date, if paying less than the notified sum.') +
      row('Final date for payment', finalDate, fd + ' days after the due date. Pay by this date.') +
      row('Earliest suspension', suspend, 'If still unpaid and notice of intention to suspend is given on ' + fmt(noticeDay) + ' (7 days’ notice).');
  }
  f.addEventListener('input', run);
  f.addEventListener('submit', function (e) { e.preventDefault(); run(); });
  if (!f.due.value) f.due.value = iso(new Date());
  run();
  fetch('https://www.gov.uk/bank-holidays.json').then(function (r) { return r.json(); }).then(function (j) {
    holidays = {};
    Object.keys(j).forEach(function (k) { holidays[k] = {}; j[k].events.forEach(function (e) { holidays[k][e.date] = 1; }); });
    if (status) status.textContent = 'Bank holidays loaded from GOV.UK.';
    run();
  }).catch(function () { if (status) status.textContent = 'Couldn’t load bank holidays from GOV.UK, so only Christmas Day is skipped. Check any bank holidays yourself.'; });
})();
