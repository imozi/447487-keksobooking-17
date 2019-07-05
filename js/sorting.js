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
      return (value === 'any') ? announcement : announcement.offer.type === value;
    });

    return sortedData;
  };

})();
