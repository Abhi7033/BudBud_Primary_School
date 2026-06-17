(function () {
  'use strict';

  /* ---- Sticky nav background on scroll ---- */
  const nav = document.getElementById('nav');
  const backTop = document.getElementById('backTop');
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    backTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const closeMenu = () => {
    links.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('.stat__num[data-count]');
  const runCount = (el) => {
    const target = +el.dataset.count;
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(c => c.textContent = c.dataset.count);
  }

  /* ---- Email form -> opens mail client (mailto) ---- */
  const form = document.getElementById('emailForm');
  const SCHOOL_EMAIL = 'Budbudhindifpschool@gmail.com';
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = form.name.value.trim();
    const from = form.from.value.trim();
    const subject = form.subject.value.trim() || 'Website Enquiry';
    const message = form.message.value.trim();

    const bodyLines = [
      message,
      '',
      '—',
      'From: ' + (name || 'Website visitor'),
    ];
    if (from) bodyLines.push('Reply to: ' + from);
    bodyLines.push('Sent via the school website.');

    const href = 'mailto:' + SCHOOL_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(bodyLines.join('\n'));
    window.location.href = href;
  });

  /* ---- Footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
