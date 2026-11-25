// main.js — nav toggle and scroll effects.
// No inline handlers: everything is wired up here.

(function () {
  'use strict';

  // Mobile nav toggle (the button is only shown on small screens).
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // One authored moment, not the same entrance on every section:
  // only project and service cards fade in as they scroll into view.
  // Content is visible by default: this only adds a one-shot
  // .fade-in animation. If the script or IntersectionObserver is
  // unavailable, or the visitor prefers reduced motion, content
  // simply stays fully visible.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('.proj, .svc').forEach(function (el) {
      observer.observe(el);
    });
  }
})();
