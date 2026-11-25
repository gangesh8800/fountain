// enquiry.js — enquiry form validation + WhatsApp link.
// The form never sends anything itself: on submit it builds the
// enquiry text and opens WhatsApp, ready for the visitor to send.

(function () {
  'use strict';

  var BIZ_WA = '919711427227';
  var form = document.getElementById('enqForm');
  if (!form) return;

  var serviceSelect = document.getElementById('inService');
  var lastSummary = '';

  // Service links pre-select the enquiry form option.
  document.querySelectorAll('[data-service]').forEach(function (link) {
    link.addEventListener('click', function () {
      var wanted = link.getAttribute('data-service').replace(/\s+/g, ' ').trim();
      for (var i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.replace(/\s+/g, ' ').trim() === wanted) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('inName').value.trim();
    var phone = document.getElementById('inPhone').value
      .replace(/[\s\-()]/g, '')
      .replace(/^\+91/, '')
      .replace(/^91(?=\d{10}$)/, '');

    var ok = true;
    var fieldName = document.getElementById('f-name');
    var fieldPhone = document.getElementById('f-phone');
    fieldName.classList.toggle('invalid', !name);
    if (!name) ok = false;
    var phoneOk = /^[6-9]\d{9}$/.test(phone);
    fieldPhone.classList.toggle('invalid', !phoneOk);
    if (!phoneOk) ok = false;
    if (!ok) {
      (name ? document.getElementById('inPhone') : document.getElementById('inName')).focus();
      return;
    }

    var service = serviceSelect.options[serviceSelect.selectedIndex].text;
    var city = document.getElementById('inCity').value.trim();
    var msg = document.getElementById('inMsg').value.trim();
    var ref = 'GWFE-' + Date.now().toString(36).toUpperCase().slice(-6);

    document.getElementById('enqRef').textContent = ref;
    lastSummary =
      'New Fountain Enquiry — ' + ref + '\n' +
      'Name: ' + name + '\n' +
      'Phone / WhatsApp: ' + phone + '\n' +
      'Interested in: ' + service + '\n' +
      (city ? 'Project city: ' + city + '\n' : '') +
      (msg ? 'About the site: ' + msg + '\n' : '') +
      '— Sent from the Global Water Fountains Enterprises website';

    document.getElementById('enqSummary').textContent = lastSummary;
    document.getElementById('waSendBtn').href =
      'https://wa.me/' + BIZ_WA + '?text=' + encodeURIComponent(lastSummary);
    document.getElementById('formFields').style.display = 'none';
    document.getElementById('enqSuccess').classList.add('show');
    document.getElementById('copyNote').textContent = '';
    document.getElementById('enqSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('copyBtn').addEventListener('click', function () {
    var note = document.getElementById('copyNote');
    function done() { note.textContent = 'Copied — paste it anywhere to keep or share it.'; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastSummary).then(done, function () {
        note.textContent = 'Copy was blocked — long-press the summary above to copy it manually.';
      });
    } else {
      note.textContent = 'Long-press the summary above to copy it.';
    }
  });

  document.getElementById('againBtn').addEventListener('click', function () {
    form.reset();
    document.getElementById('enqSuccess').classList.remove('show');
    document.getElementById('formFields').style.display = '';
  });

  ['inName', 'inPhone'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
      this.closest('.field').classList.remove('invalid');
    });
  });
})();
