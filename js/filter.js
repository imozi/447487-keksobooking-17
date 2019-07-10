'use strict';
/**
 * Слушает изменения значений фильтра и показвает объявления по этим значениям
 * Зависимости rendering.js, sorting.js
 */
(function () {
  var HOUSING_TYPE = document.querySelector('#housing-type');

  var updateRenderAnnouncements = window.debounce(function () {
    window.rendering(window.sortData());
  });

  HOUSING_TYPE.addEventListener('change', updateRenderAnnouncements);

})();
