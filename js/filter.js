'use strict';
/**
 * Модуль фильтрации объявлений
 */
(function () {
  var HOUSING_TYPE = document.querySelector('#housing-type');
  /**
   * Получает отсортированные данные по значению фильтра и рендерит их
   * @param {HTMLElement} element
   */
  var onChangeValue = function (element) {

    element.addEventListener('change', function () {
      var data = window.sortData(element.value);
      window.renderAnnouncements(data);
    });
  };

  onChangeValue(HOUSING_TYPE);
})();
