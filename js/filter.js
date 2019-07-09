'use strict';
/**
 * Слушает изменения значений фильтра и показвает объявления по этим значениям
 */
(function () {
  var HOUSING_TYPE = document.querySelector('#housing-type');

  var updateRenderAnnouncements = window.debounce(function () {
    window.renderingAnnouncement(window.sortData());
  });

  HOUSING_TYPE.addEventListener('change', updateRenderAnnouncements);
})();
