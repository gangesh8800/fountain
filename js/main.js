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

  // Header: transparent over the home hero, solid once scrolled.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Smooth motion — transform and opacity only, so phones stay smooth.
  // Content is visible by default: the .reveal styles in CSS only
  // hide elements once this script adds the .js class to <html>.
  // IntersectionObserver then reveals each block once, as it scrolls
  // into view, with an 80ms stagger between siblings. The delay is
  // set inline and cleared right after the reveal, so it never slows
  // a later hover. If the observer is unavailable, or the visitor
  // prefers reduced motion, everything simply stays fully visible.
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Project videos — silent by default. The visitor taps a video's
  // button to hear it; tapping again mutes it. Each video pauses when
  // scrolled out of view, and never autoplays for reduced-motion visitors.
  var videoCards = document.querySelectorAll('.video-card');
  for (var i = 0; i < videoCards.length; i++) {
    (function (card) {
      var video = card.querySelector('video');
      var soundBtn = card.querySelector('.sound-btn');
      if (!video || !soundBtn) { return; }
      soundBtn.addEventListener('click', function () {
        video.muted = !video.muted;
        var on = !video.muted;
        soundBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        soundBtn.setAttribute('aria-label', on ? 'Mute video sound' : 'Unmute video sound');
        if (on) { video.play(); }
      });
      if (reduceMotion) {
        video.removeAttribute('autoplay');
        video.pause();
      } else if ('IntersectionObserver' in window) {
        var videoObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { video.play(); }
            else { video.pause(); }
          });
        }, { threshold: 0.2 });
        videoObserver.observe(video);
      }
    })(videoCards[i]);
  }

  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.prototype.filter.call(el.parentNode.children, function (child) {
            return child.classList && child.classList.contains('reveal');
          });
          var index = siblings.indexOf(el);
          if (index > 0) {
            el.style.transitionDelay = (index * 80) + 'ms';
            setTimeout(function () { el.style.transitionDelay = ''; }, 700 + index * 80);
          }
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
