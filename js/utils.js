'use strict';
/**
 * Утилиты, хэлперы.
 */
window.util = (function () {
  return {
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
     * Добавление нужного атрибута
     * @param {HTMLElement} elements
     * @param {string} attr
     */
    addAttr: function (elements, attr) {
      if (elements.length >= 0) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute(attr, '');
        }
      } else {
        elements.setAttribute(attr, '');
      }
    },
    /**
     * Удаление нужного атрибута
     * @param {HTMLElement} elements
     * @param {string} attr
     */
    clearAttr: function (elements, attr) {
      if (elements.length >= 0) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].removeAttribute(attr);
        }
      } else {
        elements.removeAttribute(attr);
      }
    }
  };
})();
