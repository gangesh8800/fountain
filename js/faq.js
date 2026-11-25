// faq.js — FAQ accordion, one question open at a time.

(function () {
  'use strict';

  document.querySelectorAll('.faq button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq');
      var wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('button').setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
