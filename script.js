/* ============================================================
   SHUBHAM BAKRE — PORTFOLIO · script.js
   Features:
   - Theme toggle (persisted, respects OS preference)
   - Active section tracking → sidebar nav highlight
   - Scroll reveal (IntersectionObserver)
   - Animated number counters (triggered on scroll-into-view)
   - Card mouse-follow radial gradient
   - Hamburger menu (mobile)
   ============================================================ */

(function () {
  'use strict';

  const html = document.documentElement;

  /* ── Theme ─────────────────────────────────────────────────── */
  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('sb-theme', t);
  }
  const saved  = localStorage.getItem('sb-theme');
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || system);

  function toggleTheme() {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  const mob = document.getElementById('themeToggleMobile');
  if (mob) mob.addEventListener('click', toggleTheme);

  /* ── Hamburger ─────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      mobileNav.classList.toggle('open', open);
      mobileNav.setAttribute('aria-hidden', !open);
    });
    mobileNav.querySelectorAll('.mnav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', true);
      });
    });
  }

  /* ── Scroll reveal ─────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          // Stagger children in same parent
          var siblings = e.target.parentElement
            ? Array.from(e.target.parentElement.querySelectorAll('.reveal:not(.visible)'))
            : [];
          var idx = siblings.indexOf(e.target);
          e.target.style.transitionDelay = Math.min(idx, 3) * 80 + 'ms';
          e.target.classList.add('visible');
          rio.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(function (el) { rio.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Animated number counters ──────────────────────────────── */
  function animateCounter(el) {
    var raw    = el.textContent.replace(/[^0-9]/g, '');
    var target = parseInt(raw, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    if (isNaN(target)) return;
    var start    = performance.now();
    var duration = 1400;
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
      var val  = Math.round(target * ease);
      el.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var statEls = document.querySelectorAll('.stat-num[data-count]');
  if ('IntersectionObserver' in window && statEls.length) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          sio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { sio.observe(el); });
  }

  /* ── Active nav section tracking ───────────────────────────── */
  var sections  = document.querySelectorAll('section[id]');
  var snavLinks = document.querySelectorAll('.snav-link[data-section]');

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    var current = '';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });
    snavLinks.forEach(function (a) {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── Card mouse-follow radial gradient ─────────────────────── */
  document.querySelectorAll('[data-card]').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      card.style.backgroundImage =
        'radial-gradient(300px circle at ' + x + 'px ' + y + 'px, ' +
        'rgba(129,140,248,0.07), transparent 60%)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.backgroundImage = '';
    });
  });

})();
