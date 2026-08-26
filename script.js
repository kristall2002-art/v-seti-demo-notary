/* Демо-скрипт лендинга нотариуса Таракановского Л.Ф.
   Все "живые" данные — клиентская имитация (демонстрация). */
(function () {
  'use strict';

  /* ---- Мобильное меню ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  /* ---- Кнопка "наверх" ---- */
  var toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  /* ---- Аккордеоны (документы + FAQ) ---- */
  document.querySelectorAll('.accordion').forEach(function (acc) {
    acc.querySelectorAll('.acc-head').forEach(function (head) {
      head.addEventListener('click', function () {
        head.parentElement.classList.toggle('open');
      });
    });
  });

  /* ---- Светофор загруженности (демо, зависит от часа) ---- */
  (function traffic() {
    var wrap = document.getElementById('traffic');
    var label = document.getElementById('traffic-label');
    if (!wrap || !label) return;
    var lights = wrap.querySelectorAll('.light');
    var now = new Date();
    var day = now.getDay();      // 0=вс
    var hour = now.getHours();
    var state; // 0 green, 1 yellow, 2 red

    if (day === 0) {              // воскресенье — закрыто
      state = 2;
      label.textContent = 'Воскресенье — выходной. Запишитесь на будни или субботу';
    } else if (hour < 9 || hour >= 19) {
      state = 2;
      label.textContent = 'Сейчас нерабочее время — оставьте заявку, перезвоним';
    } else if (hour >= 11 && hour < 14) {
      state = 1;
      label.textContent = 'Средняя загруженность — возможно небольшое ожидание';
    } else if (hour >= 16) {
      state = 1;
      label.textContent = 'Ближе к вечеру плотнее — лучше записаться заранее';
    } else {
      state = 0;
      label.textContent = 'Сейчас свободно — можно приходить';
    }
    lights.forEach(function (l, i) {
      // порядок в DOM: red(0) yellow(1) green(2); state 0=green,1=yellow,2=red
      var map = { 0: 2, 1: 1, 2: 0 };
      l.classList.toggle('active', i === map[state]);
    });
  })();

  /* ---- Календарь загрузки на неделю (демо) ---- */
  (function week() {
    var box = document.getElementById('week');
    if (!box) return;
    var names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    var stats = ['free', 'mid', 'free', 'busy', 'mid', 'free'];
    var text = {
      free: 'свободно',
      mid: 'средне',
      busy: 'плотно'
    };
    var today = new Date().getDay(); // 1..6 = Пн..Сб
    names.forEach(function (n, i) {
      var d = document.createElement('div');
      d.className = 'day ' + stats[i];
      var isToday = (i + 1) === today;
      d.innerHTML = '<span class="dname">' + n + (isToday ? ' •' : '') + '</span>' +
        '<span class="dstat">' + text[stats[i]] + '</span>';
      box.appendChild(d);
    });
  })();

  /* ---- Форма записи (демо, без отправки) ---- */
  (function bookForm() {
    var form = document.getElementById('book-form');
    var ok = document.getElementById('book-ok');
    if (!form) return;
    // минимальная дата — сегодня
    var dateInput = document.getElementById('f-date');
    if (dateInput) {
      var t = new Date();
      dateInput.min = t.toISOString().slice(0, 10);
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        if (!el.value) { valid = false; el.style.borderColor = '#c0392b'; }
        else { el.style.borderColor = ''; }
      });
      if (!valid) return;
      form.hidden = true;
      if (ok) ok.hidden = false;
    });
  })();
})();
