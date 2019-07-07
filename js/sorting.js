'use strict';
/**
 * Модуль сортировки данных
 */
window.sortData = (function () {
  /**
   * Сортировка данных по значению и вывод только 5 данных
   * @param {string} value
   * @return {object}
   */
  return function (value) {
    var sortedData = window.dataAnnouncements.filter(function (announcement) {
      return (value === 'any') ? announcement : announcement.offer.type === value;
    }).slice(0, 6);

    return sortedData;
  };
})();
