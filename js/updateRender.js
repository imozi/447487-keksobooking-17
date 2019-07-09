'use strict';
/**
 * Обновление рендеринга объявлений при изменении значений фильтра
 */
(function () {
  var HOUSING_TYPE = document.querySelector('#housing-type');

  var updateRenderAnnouncements = window.debounce(function () {
    window.renderAnnouncements(window.sortData());
  });

  HOUSING_TYPE.addEventListener('change', updateRenderAnnouncements);
})();
