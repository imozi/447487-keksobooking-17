'use strict';
/**
 * Утилиты, хэлперы.
 * Методы removeClass, clearDomElement, isEscEvent , onDocumentKeyPress доступны для других модулей
 */
(function () {
  var escCode = 27;

  window.util = {
    /**
     * Удалить нужный класс
     * @param {string} element
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
    },
    /**
     * Проверяет если нажата клавиша ESC то выполняет переданую функцию
     * @param {ObjectEvent} evt
     * @param {function} func - функция котокую надо выполнить
     */
    isEscEvent: function (evt, func) {
      if (evt.keyCode === escCode) {
        func();
      }
    },
    /**
     * По нажатию на кнопку ESC на документе закрывает карточку
     * @param {ObjectEvent} evt
     */
    onDocumentKeyPress: function (evt) {
      window.util.isEscEvent(evt, window.card.close);
    }
  };

})();
