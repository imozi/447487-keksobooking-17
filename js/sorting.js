'use strict';
/**
 * Модуль сортировки данных
 */
window.sortData = (function () {
  /**
   * Сортировка копии данных по значению
   * @param {string} value
   * @return {object}
   */
  return function (value) {
    var sortedData = sortedData = window.dataAnnouncements.slice().filter(function (announcement) {
      if (value === 'any') {
        return announcement;
      }
      return announcement.offer.type === value;
    });

    return sortedData;
  };

})();
