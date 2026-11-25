// filter.js — projects page filter. Plain JS, no framework.
// Cards are visible by default: with JS off, or if this file fails,
// all 9 projects simply show. Buttons are real <button> elements,
// so keyboard and screen-reader users get the same control.

(function () {
  'use strict';

  var buttons = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.proj-grid .proj');
  var count = document.getElementById('filterCount');
  var empty = document.getElementById('filterEmpty');
  if (!buttons.length || !cards.length) return;

  function labelFor(filter) {
    if (filter === 'all') return 'all';
    var btn = document.querySelector('.filter-btn[data-filter="' + filter + '"]');
    return btn ? btn.textContent.trim().toLowerCase() : filter;
  }

  function apply(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.hidden = !match;
      if (match) shown += 1;
    });
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-filter') === filter ? 'true' : 'false');
    });
    if (count) {
      count.textContent = filter === 'all'
        ? 'Showing all ' + cards.length + ' projects'
        : 'Showing ' + shown + ' of ' + cards.length + ' projects — ' + labelFor(filter);
    }
    if (empty) empty.hidden = shown !== 0;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-filter'));
    });
  });
})();
