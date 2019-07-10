'use strict';
/**
 * Утилиты, хэлперы.
 */
(function () {
  window.util = {
    /**
     * Удалить нужный класс
     * @param {HTMLElement} element
     * @param {string} nameClass
     */
    removeClass: function (element, nameClass) {
      var classListElement = document.querySelector(element).classList;
      classListElement.remove(nameClass);
    },
    /**
     * Получние рандомного числа из диапозона
     * @param {number} min
     * @param {number} max
     * @return {number} возвращает рандомное число из диапозона
     */
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    /**
     * Получние рандомного значние из массива
     * @param {array} array
     * @return {string} возвращает рандомного значние из массива
     */
    getRandomValue: function (array) {
      return array[window.util.getRandomNumber(0, array.length)];
    },
    /**
     * Удаление нужных элементов из DOM дерева
     * @param {HTMLElement} element
     */
    clearDomElement: function (element) {
      element.remove();
    },
  };

})();
