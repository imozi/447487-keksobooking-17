'use strict';
/**
 * Модуль сортировки данных
 * Зависимости upload.js
 * Метод sortingData доступен для других модулей
 */
(function () {
  var QUANTITY_OUTPUT_DATA = 5;
  /**
   * Проверка фильтра с типом жилья по значению (для сортировки данных)
   * @param {object} announcement
   * @return {boolean}
   */
  var checkType = function (announcement) {
    var housingTypeValue = document.querySelector('#housing-type').value;
    return (housingTypeValue === 'any') || announcement.offer.type === housingTypeValue;
  };
  /**
   * Сортировка данных по значению фильтра и вывод только 5 данных
   * @return {object}
   */
  window.sortingData = function () {
    return window.dataAnnouncements.filter(checkType).slice(0, QUANTITY_OUTPUT_DATA);
  };

})();
