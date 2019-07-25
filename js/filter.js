'use strict';
/**
 * Модуль фильтра данных объявлений
 * Зависимости upload.js
 * Метод window.filteringData доступен для других модулей
 */
(function () {
  var QUANTITY_OUTPUT_DATA = 5;
  var housingPriceMap = {
    low: [0, 9999],
    middle: [10000, 50000],
    high: [50000, Infinity]
  };

  var filterСriteria = {
    /**
     * Проверка данных со значением поля фильтра "тип жилья"
     * @param {object} data
     * @param {HTMLElement} field
     * @return {boolean}
     */
    'housing-type': function (data, field) {
      return data.offer.type === field.value;
    },
    /**
     * Проверка данных со значением поля фильтра "цена за ночь"
     * @param {object} data
     * @param {HTMLElement} field
     * @return {boolean}
     */
    'housing-price': function (data, field) {
      return data.offer.price >= housingPriceMap[field.value][0] && data.offer.price <= housingPriceMap[field.value][1];
    },
    /**
     * Проверка данных со значением поля фильтра "количество комнат"
     * @param {object} data
     * @param {HTMLElement} field
     * @return {boolean}
     */
    'housing-rooms': function (data, field) {
      return data.offer.rooms.toString() === field.value;
    },
    /**
     * Проверка данных со значением поля фильтра "количество гостей"
     * @param {object} data
     * @param {HTMLElement} field
     * @return {boolean}
     */
    'housing-guests': function (data, field) {
      return data.offer.guests.toString() === field.value;
    },
    /**
     * Проверка данных со значением поля фильтра "дополнительные удобства"
     * @param {object} data
     * @param {HTMLElement} field
     * @return {boolean}
     */
    'housing-features': function (data, field) {
      var featuresElements = Array.from(field.querySelectorAll('.map__checkbox:checked'));

      return featuresElements.every(function (item) {
        return data.offer.features.indexOf(item.value) !== -1;
      });
    }
  };
  /**
   * Фильтрует данные по значениям фильтра и берет только первые 5
   * @return {object}
   */
  window.filteringData = function () {
    return window.dataAnnouncements.filter(function (item) {
      return window.form.filterElements.every(function (field) {
        return field.value === 'any' ? true : filterСriteria[field.id](item, field);
      });
    }).slice(0, QUANTITY_OUTPUT_DATA);
  };

})();
