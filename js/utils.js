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
     * Удаление нужного элементов из DOM
     * @param {HTMLElement} element
     */
    clearDomElement: function (element) {
      element.remove();
    }
  };

})();
