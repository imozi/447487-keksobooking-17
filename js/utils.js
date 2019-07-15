'use strict';
/**
 * Утилиты, хэлперы.
 * Методы removeClass, clearDomElement, isEscEvent , onDocumentKeyPress доступны для других модулей
 */
(function () {
  var ESC_CODE = 27;

  window.util = {
    /**
     * Удалить нужный класс
     * @param {selector} element
     * @param {className} classRemove
     */
    removeClass: function (element, classRemove) {
      var classListElement = document.querySelector(element).classList;
      classListElement.remove(classRemove);
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
     * @param {function} func - функция котокую нужно выполнить
     */
    isEscEvent: function (evt, func) {
      if (evt.keyCode === ESC_CODE) {
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
