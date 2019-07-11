'use strict';
/**
 * Слушает изменения значений фильтра и показвает объявления по этим значениям
 * Зависимости rendering.js, sorting.js
 */
(function () {
  var MAP_FILTER = document.querySelector('.map__filters');

  var updateRenderAnnouncements = window.debounce(function () {
    window.rendering(window.sortingData());
  });

  MAP_FILTER.addEventListener('change', updateRenderAnnouncements);

})();
