'use strict';
/**
 * Модуль фильтрования объявлений
 * Слушает изменения значений фильтра и показвает объявления по этим значениям
 * Зависимости rendering.js, sorting.js
 */
(function () {
  var mapFilter = document.querySelector('.map__filters');

  var updateRenderAnnouncements = window.debounce(function () {
    window.rendering.pin(window.sortingData());
  });

  mapFilter.addEventListener('change', updateRenderAnnouncements);

})();
